import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import * as ts from 'typescript';
import { constants } from '@sitecore-jss/sitecore-jss';

// TODO:adjust when mesh endpoint is live
const meshEndpoint = `${process.env.SITECORE_EDGE_URL ||
  constants.SITECORE_EDGE_URL_DEFAULT}/api/v1/mesh`;

export const resolveComponentImportFiles = (appPath: string) => {
  appPath = path.isAbsolute(appPath) ? appPath : path.resolve(process.cwd(), appPath);
  const tsConfig = ts.readConfigFile(path.resolve(appPath, 'tsconfig.json'), ts.sys.readFile);

  if (tsConfig.error) {
    throw new Error(`Error reading tsconfig.json from JSS app root: ${tsConfig.error.messageText}`);
  }

  const tsOptions = {
    ...tsConfig.config.compilerOptions,
    baseUrl: appPath,
  };

  const componentBuilderPath = path.resolve(appPath, 'src', 'temp', 'componentBuilder.ts');

  const tsHost = ts.createCompilerHost(tsOptions, true);
  const sourceFile = tsHost.getSourceFile(componentBuilderPath, ts.ScriptTarget.Latest, (msg) => {
    throw new Error(`Failed to parse ${componentBuilderPath}: ${msg}`);
  });

  if (!sourceFile) throw ReferenceError(`Failed to find file ${componentBuilderPath}`);

  const componentImportsMap: Map<string, string> = new Map();
  const importNodesMap: Record<string, string> = {};
  let mapExportName: string = '';
  const mapAssignments: ts.CallExpression[] = [];

  ts.forEachChild(sourceFile, (childNode) => {
    if (ts.isImportDeclaration(childNode)) {
      if (childNode.importClause) {
        const moduleName = childNode.moduleSpecifier.getText().replace(/['"]/g, '');
        if (!moduleName.startsWith('node:') && moduleName.indexOf('/node_modules') === -1) {
          const resolvedModule = ts.nodeModuleNameResolver(
            moduleName,
            componentBuilderPath,
            tsOptions,
            tsHost
          );
          const resolvedFile = resolvedModule?.resolvedModule?.resolvedFileName;
          // module imports will be resolved to /node_modules location - we don't support that yet
          if (resolvedFile && resolvedFile.indexOf('node_modules') === -1) {
            // gotta use OS-agnostic path
            importNodesMap[childNode.importClause.getText()] = path.resolve(resolvedFile);
          }
        }
      }
    } else if (ts.isExpressionStatement(childNode)) {
      ts.forEachChild(childNode, (expressionNode) => {
        if (ts.isCallExpression(expressionNode)) {
          if (expressionNode.expression.getText().indexOf('set') !== -1) {
            // get map.set assignments
            mapAssignments.push(expressionNode);
          }
        }
      });
    } else if (ts.isExportAssignment(childNode)) {
      // get component map export variable
      mapExportName = childNode.expression.getText();
    }
  });
  for (const mapAssignment of mapAssignments) {
    // only consider exported map
    if (mapAssignment.getText().startsWith(mapExportName)) {
      const componentKey = mapAssignment.arguments[1].getText();
      const componentImport = Object.keys(importNodesMap).find((importStatement) => {
        const matcher = new RegExp(`\\b(${componentKey})\\b`);
        return importStatement.match(matcher) !== null;
      });
      if (componentImport) {
        const componentValue = importNodesMap[componentImport];
        componentImportsMap.set(componentKey, componentValue);
      }
    }
  }
  return componentImportsMap;
};
export const sendCode = async (componentName: string, componentPath: string, token: string) => {
  if (!fs.existsSync(componentPath)) {
    console.error(chalk.red(`Component file not found: ${componentPath}`));
    return;
  }
  const code = fs.readFileSync(componentPath);
  const response = await fetch(meshEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      componentName,
      code: code.toString(),
    }),
  });

  if (!response.ok) {
    console.error(
      chalk.red(`Failed to send extracted code from ${componentPath}: ${response.statusText}`)
    );
  } else {
    console.log(chalk.green(`Code from ${componentPath} extracted and sent to mesh endpoint`));
  }
};

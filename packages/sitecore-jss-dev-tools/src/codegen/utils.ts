import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import * as ts from 'typescript';
import { constants } from '@sitecore-jss/sitecore-jss';

// TODO:adjust when mesh endpoint is live
const meshEndpoint = `${process.env.SITECORE_EDGE_URL ||
  constants.SITECORE_EDGE_URL_DEFAULT}/api/v1/mesh`;

/**
 * Description properties for the files sent to the mesh endpoint
 */
export type ExcractedFile = {
  name: string;
  path: string;
  type: ExtractedFileType;
};

/**
 * Type of file to be sent to the mesh endpoint
 */
export enum ExtractedFileType {
  Component = 'component',
  Json = 'json',
  Package = 'package.json',
}

/**
 * Parses the componentBuilder.ts file and returns a map of component names
 * and their respective import strings
 * @param {string} appPath path to the JSS app root
 * @returns map of component names and their respective import strings
 */
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

  // compiler host to process the componentBuilder.ts file and component sources
  const tsHost = ts.createCompilerHost(tsOptions, true);
  const builderSourceFile = tsHost.getSourceFile(
    componentBuilderPath,
    ts.ScriptTarget.Latest,
    (msg) => {
      throw new Error(`Failed to parse ${componentBuilderPath}: ${msg}`);
    }
  );

  if (!builderSourceFile) throw ReferenceError(`Failed to find file ${componentBuilderPath}`);

  const componentImportsMap: Map<string, string> = new Map();
  const importNodesMap: Record<string, string> = {};
  let mapExportName: string = '';
  const mapAssignments: ts.CallExpression[] = [];

  // step 1: get all import statements and map assignments (map.set) from componentBuilder file
  ts.forEachChild(builderSourceFile, (childNode) => {
    // first, all import statements are parsed
    if (ts.isImportDeclaration(childNode) && childNode.importClause) {
      // import path is extracted
      const moduleName = childNode.moduleSpecifier.getText().replace(/['"]/g, '');
      // unless the import is a nodeJS one, or points to dependency package, resolve full path to the imported source file
      if (moduleName.startsWith('node:') || moduleName.indexOf('/node_modules') > -1) {
        return;
      }
      const resolvedModule = ts.nodeModuleNameResolver(
        moduleName,
        componentBuilderPath,
        tsOptions,
        tsHost
      );
      const resolvedFile = resolvedModule?.resolvedModule?.resolvedFileName;
      // module imports paths will be resolved to /node_modules location - we don't support that yet
      if (resolvedFile && resolvedFile.indexOf('node_modules') === -1) {
        importNodesMap[childNode.importClause.getText()] = path.resolve(resolvedFile);
      }
    } else if (ts.isExpressionStatement(childNode)) {
      // parse map assignments (map.set(..)) to get registered components
      ts.forEachChild(childNode, (expressionNode) => {
        if (
          ts.isCallExpression(expressionNode) &&
          expressionNode.expression.getText().indexOf('set') !== -1
        ) {
          // get map.set assignments
          mapAssignments.push(expressionNode);
        }
      });
    } else if (ts.isExportAssignment(childNode)) {
      // get component map export variable
      // In case there are multiple assignment statements a file, we need to only pick ones that related to exported map
      mapExportName = childNode.expression.getText();
    }
  });

  // step 2: parse mapAssignments and retrieve import paths
  // only for components registered into component map
  for (const mapAssignment of mapAssignments) {
    // only consider the map variable that is exported
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

/**
 * Sends extracted component code to mesh endpoint
 * @param {ExcractedFile} file properties of the file to be sent
 * @param {string} token bearer token for authentication into mesh endpoint
 */
export const sendCode = async (file: ExcractedFile, token: string) => {
  if (!fs.existsSync(file.path)) {
    console.error(chalk.red(`File planned for code extraction not found: ${file.path}`));
    return;
  }
  const code = fs.readFileSync(file.path);
  const response = await fetch(meshEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: file.name,
      content: code.toString(),
      labels: {
        properties: {
          type: file.type,
        },
      },
    }),
  });

  if (!response.ok) {
    console.error(
      chalk.red(`Failed to send extracted code from ${file.path}: ${response.statusText}`)
    );
  } else {
    console.log(chalk.green(`Code from ${file.path} extracted and sent to mesh endpoint`));
  }
};

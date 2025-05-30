import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import * as ts from 'typescript';
import { constants, debug } from '@sitecore-jss/sitecore-jss';

// MESH_URL is temporary option to use until mesh is onboarded into Edge Proxy
const meshEndpoint = `${process.env.SITECORE_MESH_URL ||
  process.env.SITECORE_EDGE_URL ||
  constants.SITECORE_EDGE_URL_DEFAULT}/api/v1/contentsdk/code/extracted`;

/**
 * Description properties for the files sent to the mesh endpoint
 */
export type ExtractedFile = {
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
  PackageJson = 'package.json',
}

/**
 * Parses the componentBuilder.ts file and returns a map of component names
 * and their respective import strings
 * @param {string} appPath path to the JSS app root
 * @param {string} componentBuilderPath path to the app's component builder file. Default: 'src/temp/componentBuilder.ts'
 * @returns map of component names and their respective import strings
 */
export const resolveComponentImportFiles = (
  appPath: string,
  componentBuilderPath: string = './src/temp/componentBuilder.ts'
) => {
  appPath = path.isAbsolute(appPath) ? appPath : path.resolve(process.cwd(), appPath);
  const tsConfig = ts.readConfigFile(path.resolve(appPath, 'tsconfig.json'), ts.sys.readFile);

  if (tsConfig.error) {
    throw new Error(`Error reading tsconfig.json from JSS app root: ${tsConfig.error.messageText}`);
  }

  const tsOptions = {
    ...tsConfig.config.compilerOptions,
    baseUrl: appPath,
  };

  const componentBuilderFullPath = path.isAbsolute(componentBuilderPath)
    ? componentBuilderPath
    : path.resolve(appPath, componentBuilderPath);

  // compiler host to process the componentBuilder.ts file and component sources
  const tsHost = ts.createCompilerHost(tsOptions, true);
  const builderSourceFile = tsHost.getSourceFile(
    componentBuilderFullPath,
    ts.ScriptTarget.Latest,
    (msg) => {
      throw new Error(`Failed to parse ${componentBuilderFullPath}: ${msg}`);
    }
  );

  if (!builderSourceFile) throw ReferenceError(`Failed to find file ${componentBuilderFullPath}`);
  // this map matches all raw import strings (i.e. * as component) to import strings
  const importStringsMap: Record<string, string> = {};
  // this map will match component names only to full resolved source file paths
  const componentImportsMap: Map<string, string> = new Map();

  // name of the export from componentBuilder.ts
  let mapExportName: string = '';
  // all map.set() assignments in file
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
        componentBuilderFullPath,
        tsOptions,
        tsHost
      );
      const resolvedFile = resolvedModule?.resolvedModule?.resolvedFileName;
      // module imports paths will be resolved to /node_modules location - we don't support that yet
      if (resolvedFile) {
        if (resolvedFile.indexOf('node_modules') === -1 && !resolvedFile.endsWith('.d.ts')) {
          importStringsMap[childNode.importClause.getText()] = path.resolve(resolvedFile);
        }
      } else {
        console.warn('Could not resolve a file for import %s', moduleName);
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
      const componentImport = Object.keys(importStringsMap).find((importStatement) => {
        const matcher = new RegExp(`\\b(${componentKey})\\b`);
        return importStatement.match(matcher) !== null;
      });
      if (componentImport) {
        const componentValue = importStringsMap[componentImport];
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
export const sendCode = async (file: ExtractedFile, token: string) => {
  if (!fs.existsSync(file.path)) {
    console.error(chalk.red(`File planned for code extraction not found: ${file.path}`));
    return;
  }
  const code = fs.readFileSync(file.path);
  try {
    const response = await fetch(meshEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // EnvironmentId can have any value - but it's required
        EnvironmentId: 'JSS',
        name: file.name,
        content: code.toString(),
        labels: {
          type: file.type,
        },
      }),
    });

    if (!response.ok) {
      console.error(
        chalk.red(`Failed to send extracted code from ${file.path}: ${response.statusText}`)
      );
      debug.http('Error details: %o', {
        status: response.status,
        text: await response.text(),
        url: response.url,
        headers: response.headers,
      });
      return;
    }
  } catch (error) {
    console.error(
      chalk.red(
        `Fetch request to send extracted code from ${file.path} failed: ${JSON.stringify(error)}`
      )
    );
    return;
  }
  console.log(chalk.green(`Code from ${file.path} extracted and sent to mesh endpoint`));
};

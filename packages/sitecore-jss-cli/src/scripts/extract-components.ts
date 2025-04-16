import chalk from 'chalk';
import path from 'path';
import { Argv } from 'yargs';
import fs from 'fs';
import * as ts from 'typescript';
import { readConfigFile } from 'typescript';
import { constants } from '@sitecore-jss/sitecore-jss-dev-tools';

const M2M_ENDPOINT = 'https://auth-staging-1.sitecore-staging.com/oauth/token';

// TODO:adjust when mesh endpoint is live
const meshEndpoint = `${process.env.SITECORE_EDGE_URL ||
  constants.SITECORE_EDGE_URL_DEFAULT}/api/v1/mesh`;

/**
 * @param {Argv} yargs
 */
export function args(yargs: Argv) {
  return yargs.option('appFolder', {
    requiresArg: false,
    type: 'string',
    describe: 'Path to app folder to get components from',
  });
}

/**
 * @param {Argv} yargs
 */
export default function builder(yargs: Argv) {
  return yargs.command(
    'extract-components',
    'Reads component files and posts their code for AI learning',
    args,
    handler
  );
}

/**
 * Handler fo the extract-component API command
 * Reads imports from the componentBuilder.ts file and posts the code to the mesh endpoint
 * @param {object} args - The arguments passed to the command, with optional appName string
 * @returns {Promise<void>} void
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handler(args: any) {
  // TODO: add alternative consent procedure when refining later
  if (!process.env.EXTRACT_CONSENT) {
    console.log(chalk.yellow('Skipping code extraction, EXTRACT_CONSENT is not set'));
    return;
  }
  const basePath = args.appFolder ? resolveAppPath(args.appFolder) : process.cwd();
  try {
    const componentPaths = resolveImportFiles(basePath);
    const bearer = await fetchBearerToken();
    if (!bearer) {
      console.error(chalk.red('Failed to get bearer token, aborting code extraction'));
      return;
    }

    for (const componentPath of componentPaths!) {
      await sendCode(componentPath, bearer);
    }
  } catch (error) {
    console.error(chalk.red('Error during component extraction:', error));
  }
}

const resolveAppPath = (appFolder: string) => {
  if (path.isAbsolute(appFolder)) return appFolder;
  return path.resolve(process.cwd(), appFolder);
};

export const fetchBearerToken = async () => {
  try {
    // TODO:adjust when M2M endpoint is live
    const authenticateResponse = await fetch(M2M_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        client_id: process.env.M2M_CLIENT_ID,
        client_secret: process.env.M2M_CLIENT_SECRET,
        audience: process.env.M2M_AUDIENCE,
        grant_type: 'client_credentials',
      }),
    });
    const jsonResponse = await authenticateResponse.json();
    return jsonResponse.access_token;
  } catch (error) {
    console.error(chalk.red('Error authenticating with M2M token endpoint:', error));
    return null;
  }
};

export const resolveImportFiles = (appPath: string) => {
  const tsConfig = readConfigFile(path.resolve(appPath, 'tsconfig.json'), ts.sys.readFile);

  if (tsConfig.error) {
    throw new Error(`Error reading tsconfig.json from JSS app root: ${tsConfig.error.messageText}`);
  }

  const tsOptions = tsConfig.config.compilerOptions;

  const componentBuilderPath = path.resolve(appPath, 'src', 'temp', 'componentBuilder.ts');

  const tsHost = ts.createCompilerHost(tsOptions, true);
  const sourceFile = tsHost.getSourceFile(componentBuilderPath, ts.ScriptTarget.Latest, (msg) => {
    throw new Error(`Failed to parse ${componentBuilderPath}: ${msg}`);
  });

  const parseNodes = (node: ts.Node) => {
    if (ts.isImportDeclaration(node)) {
      const moduleName = node.moduleSpecifier.getText().replace(/['"]/g, '');
      if (!moduleName.startsWith('node:') && moduleName.indexOf('/node_modules') === -1) {
        const resolvedModule = ts.nodeModuleNameResolver(moduleName, __filename, tsOptions, tsHost);
        if (resolvedModule?.resolvedModule?.resolvedFileName) {
          importing.push(resolvedModule.resolvedModule.resolvedFileName);
        }
      }
    } else ts.forEachChild(node, parseNodes);
  };

  if (!sourceFile) throw ReferenceError(`Failed to find file ${componentBuilderPath}`);
  const importing: string[] = [];
  parseNodes(sourceFile);
  return importing;
};

export const sendCode = async (componentPath: string, token: string) => {
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
    body: code,
  });

  if (!response.ok) {
    console.error(chalk.red('Failed to send extracted code:', response.statusText));
  } else {
    console.log(chalk.green('Code extracted and sent to mesh'));
  }
};

import chalk from 'chalk';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import rlSync from 'readline-sync';
import urljoin from 'url-join';
import { ScJssConfig, JssConfiguration } from '../resolve-scjssconfig';
import { findAppNameInConfig } from './find-app-name';
import { createSecretPatchContents, writeSecretPatchFile } from './secret-patch';

// tslint:disable:max-line-length

const userConfigFileName = 'scjssconfig.json';

export const userConfigPath = path.resolve(process.cwd(), userConfigFileName);

function getInteractiveData(
  initialData: string | undefined,
  allowInteraction: boolean,
  paramName: string,
  prompt: string,
  examplePrompt: string,
  validation?: RegExp,
  validationMessage?: string,
  skipValidationIfNonInteractive: boolean = false
): string {
  if (!allowInteraction && !initialData && !skipValidationIfNonInteractive) {
    throw new Error(`Non interactive mode specified and ${paramName} not provided.`);
  }

  if (allowInteraction) {
    const finalPrompt = initialData ? `${prompt} [${initialData}]: ` : `${prompt} ${examplePrompt}: `;
    return rlSync.question(finalPrompt,
      {
        defaultInput: initialData,
        limit: validation,
        limitMessage: validationMessage,
      }
    );
  }

  const result = initialData as string;

  if (validation && validationMessage && !validation.test(result)) {
    if (skipValidationIfNonInteractive) {
      console.error(chalk.yellow(validationMessage));
    } else {
      throw new Error(validationMessage);
    }
  }

  return result;
}

export function setup(interactive: boolean, outputFile?: string, initialData?: JssConfiguration, configName = 'sitecore') {
  const getValidation = (regexp: RegExp) => initialData?.skipValidation ? undefined : regexp;

  let config: ScJssConfig = {
    sitecore: {
      instancePath: '',
    },
  };

  if (!outputFile) {
    outputFile = userConfigPath;
  }

  // read in any existing config file so that we can keep its values
  if (outputFile && fs.existsSync(outputFile)) {
    try {
      const existingFile = fs.readFileSync(outputFile, 'utf8');
      const existingJson = JSON.parse(existingFile) as ScJssConfig;

      console.log(chalk.green(`Found existing ${outputFile}. The existing config will become defaults in this setup session.`));
      config = existingJson;
    } catch (e) {
      console.warn(chalk.yellow(`Found existing ${outputFile} but error reading it. Existing values will be ignored.`), e);
    }
  }

  const existingConfigObject = config[configName] || {} as JssConfiguration;

  // merge existing values with any CLI arguments (which should override any preexisting values)
  if (initialData) {
    config[configName] = {
      ...config[configName],
      instancePath: initialData.instancePath || existingConfigObject.instancePath,
      apiKey: initialData.apiKey || existingConfigObject.apiKey,
      deploySecret: initialData.deploySecret || existingConfigObject.deploySecret,
      deployUrl: initialData.deployUrl || existingConfigObject.deployUrl,
      layoutServiceHost: initialData.layoutServiceHost || existingConfigObject.layoutServiceHost,
    };
  }

  const configObject = config[configName];

  // INSTANCE PATH
  const getInstancePath = (initialPath?: string) => {
    configObject.instancePath = getInteractiveData(
      initialPath,
      interactive,
      'instancePath',
      'Path to the Sitecore folder',
      '(e.g. c:\\inetpub\\wwwroot\\my.siteco.re)',
      getValidation(/[A-z]/),
      'Invalid input.',
      true
    );

    if (configObject.instancePath) {
      if (!fs.existsSync(configObject.instancePath)) {
        console.log(chalk.red(`${configObject.instancePath} did not exist!`));
        if (interactive) {
          getInstancePath();
        } else {
          process.exit(1);
        }
      }
    } else {
      console.warn(chalk.yellow('Non-interactive mode specified and no instancePath given. File/config deployment will not be available.'));
    }
  };

  // if you are setting up for the first time, we don't need an instance path for a remote Sitecore instance
  if (interactive) {
    if (!configObject.instancePath && rlSync.keyInYN('Is your Sitecore instance on this machine or accessible via network share?')) {
      getInstancePath(configObject.instancePath);
    } else if (configObject.instancePath) {
      getInstancePath(configObject.instancePath);
    }
  }

  // DEPLOY URL/LS HOST
  const defaultDeployUrl = '/sitecore/api/jss/import';

  if (!interactive && !configObject.layoutServiceHost) {
    // tslint:disable-next-line:no-string-throw
    throw 'Non interactive mode specified and layoutServiceHost not provided.';
  }

  if (interactive) {
    configObject.layoutServiceHost = getInteractiveData(
      configObject.layoutServiceHost,
      interactive,
      'host',
      'Sitecore hostname',
      '(e.g. http://myapp.local.siteco.re; see /sitecore/config; ensure added to hosts)',
      getValidation(/^https?:\/\/(.*)/),
      'Invalid input. Must start with http(s)'
    );
  }

  if (interactive) {
    configObject.deployUrl = getInteractiveData(
      configObject.deployUrl || urljoin(configObject.layoutServiceHost as string, defaultDeployUrl),
      interactive,
      'host',
      'Sitecore import service URL',
      '(usually same as hostname)',
      getValidation(/^https?:\/\/(.*)/),
      'Invalid input. Must start with http(s)'
    );
  }

  // API KEY
  configObject.apiKey = getInteractiveData(
    configObject.apiKey,
    interactive,
    'apiKey',
    'Sitecore API Key',
    '(ID of API key item)',
    getValidation(/^{?[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}?$/i),
    'Invalid API Key. Should be a GUID / Sitecore Item ID.'
  );

  // DEPLOY SECRET
  configObject.deploySecret = getInteractiveData(
    configObject.deploySecret,
    interactive,
    'deploySecret',
    'Please enter your deployment secret',
    '(32+ random chars; or press enter to generate one)',
    getValidation(/^(.{32,}|)$/),
    'Invalid secret. Should be blank or at least 32 random characters.',
    true
  );

  if (!configObject.deploySecret && interactive) {
    configObject.deploySecret = Math.random().toString(36).substring(2, 15)
     + Math.random().toString(36).substring(2, 15)
     + Math.random().toString(36).substring(2, 15)
     + Math.random().toString(36).substring(2, 15);

    console.log(`Deployment secret has been generated. Ensure the JSS app config on the Sitecore end has the same secret set.`);
  }

  if (configObject.deploySecret) {
    const appConfig = glob.sync('./sitecore/config/*.config').find((file) => !file.match(/deploysecret/));
    if (appConfig) {
      const appName = findAppNameInConfig(appConfig);

      if (appName) {
        const patchFile = path.resolve(`./sitecore/config/${appName}.deploysecret.config`);

        writeSecretPatchFile(patchFile, appName, configObject.deploySecret);
        console.log(`Deploy secret Sitecore config written to ${chalk.green(patchFile)}`);
        console.log('Ensure this configuration is deployed to Sitecore.');
      } else {
        console.log(chalk.yellow(`Unable to resolve JSS app name in ${appConfig}`));
        console.log(chalk.yellow(`For deployment to succeed the app's 'deploySecret' must be set in a Sitecore config patch similar to:`));
        console.log(createSecretPatchContents('YOUR-JSS-APP-NAME-HERE', configObject.deploySecret));
        console.log('');
      }
    } else {
      console.log(chalk.yellow(`No JSS config patches were in ./sitecore/config to get the JSS app name from.`));
      console.log(chalk.yellow(`For deployment to succeed the app's 'deploySecret' must be set in a Sitecore config patch similar to:`));
      console.log(createSecretPatchContents('YOUR-JSS-APP-NAME-HERE', configObject.deploySecret));
      console.log('');
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(config, null, 2));

  let hostName = 'undefined';
  if (configObject.layoutServiceHost) {
    hostName = configObject.layoutServiceHost.replace(/https?:\/\//, '');
  }

  console.log(`JSS connection settings saved to ${chalk.green(outputFile)}`);
  console.log();
  console.log(chalk.green('NEXT STEPS'));
  console.log(`* Ensure the ${chalk.green('hostName')} in /sitecore/config/*.config is configured as ${chalk.green(hostName)}, and in hosts file if needed.`);
  if (configObject.instancePath) {
    console.log(`* Deploy your configuration (i.e. '${chalk.green('jss deploy config')}')`);
    console.log(`* Deploy your app (i.e. '${chalk.green('jss deploy app -c -d')}')`);
  } else {
    console.log(`* Deploy the app's items (i.e. ${chalk.green('jss deploy items -c -d')})`);
    console.log(`* Create a production build (i.e. ${chalk.green('jss build')})`);
    console.log(`* Copy the build artifacts to the Sitecore instance in the ${chalk.green('sitecoreDistPath')} set in package.json.`);
    console.warn(`${chalk.yellow('  > Note:')} ${chalk.red('jss deploy config')}, ${chalk.red('jss deploy files')}, and ${chalk.red('jss deploy app')} cannot be used with remote Sitecore.`);
  }
  console.log(`* Test your app in integrated mode by visiting ${chalk.green(configObject.layoutServiceHost as string)}`);
}

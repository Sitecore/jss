import resolve from 'resolve';

export interface JssConfiguration {
  deployUrl?: string;
  deploySecret?: string;
  instancePath?: string;
  apiKey?: string;
  layoutServiceHost?: string;
  skipValidation?: boolean;
}

export interface ScJssConfig {
  [configName: string]: JssConfiguration;
  sitecore: JssConfiguration;
}

/**
 * @param {any} config
 */
export function resolveScJssConfig({
  configPath = './scjssconfig.json',
  configName = 'sitecore',
  assert = true,
} = {}): Promise<ScJssConfig> {
  return new Promise((resolvePromise, rejectPromise) => {
    resolve(configPath, { basedir: process.cwd() }, (error, jssConfigJson) => {
      if (error) {
        if (assert) {
          console.error(
            'The scjssconfig.json file was missing, and is required. Please set up your connection with `jss setup` and try again.'
          );
        }
        rejectPromise();
      } else {
        const json = require(jssConfigJson as string);

        if (!json[configName]) {
          console.error(`The scjssconfig.json did not contain the ${configName} configuration.`);
          rejectPromise();
        }

        resolvePromise({
          sitecore: json[configName],
        });
      }
    });
  });
}

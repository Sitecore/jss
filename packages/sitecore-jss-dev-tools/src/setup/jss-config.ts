import fs from 'fs';
import { userConfigPath } from './setup';

export const replaceConfigTokens = (val: string) => {
  if (!fs.existsSync(userConfigPath)) {
    throw new Error(`[JSS Config] Please run setup or create the file "${userConfigPath}"`);
  }
  const config = JSON.parse(fs.readFileSync(userConfigPath, { encoding: 'utf8' }));

  if (!val) {
    return val;
  }

  let newVal = val;

  // ensure instance path is defined if used
  // this would result in copying files to random places
  if (newVal.indexOf('{sitecoreInstancePath}') > -1 && !config.sitecore.instancePath) {
    throw new Error(
      `instancePath config variable was used but was undefined or empty. You likely need to run npm run setup or update your ${userConfigPath}`
    );
  }

  // variable replacement {var} => var from jss config
  Object.keys(config.sitecore).forEach((key) => {
    let variableValue = `{${key}}`;

    // special case
    if (key === 'instancePath') {
      variableValue = '{sitecoreInstancePath}';
    }

    newVal = newVal.replace(variableValue, config.sitecore[key]);
  });

  return newVal;
};

/* eslint-disable */
import { Config } from './utils';

import { componentTemplate } from './templates/component-src';

const componentsFolderConfig: Config = {
  directories: [
    { name: 'default', path: '' }
  ],
  templates: {
    '[name].tsx': componentTemplate,
  },
};

export default componentsFolderConfig;

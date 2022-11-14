import { ComponentsFolderConfig } from './utils';

import { componentTemplate } from './templates/component-src';

// theme: {},
// site: {},
// helper: {},

const componentsFolderConfig: ComponentsFolderConfig = {
  levels: [ { name: 'Shared', short: 'Components used by everyone' }, ],
  directories: [
    { name: 'default', short: 'The default component folder', path: '' }
  ],
  templates: [
    { name: 'default', short: 'The default component template', fileName: '[name].tsx', template: componentTemplate }
  ],
};

export default componentsFolderConfig;

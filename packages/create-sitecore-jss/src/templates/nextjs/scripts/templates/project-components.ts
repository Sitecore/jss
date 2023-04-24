﻿import { ComponentFile } from './component-factory';

export const generateProjectComponents = (components: ComponentFile[], project: string): string => {
  return `/* eslint-disable */
// Do not edit this file, it is auto-generated at build time!
// See scripts/generate-component-factory.ts to modify the generation of this file.
${components
  .map(
    c =>
      `export * as ${c.componentName} from 'src/projects/${project}/components/${c.componentName}';`
  )
  .join('\n')}
`;
};

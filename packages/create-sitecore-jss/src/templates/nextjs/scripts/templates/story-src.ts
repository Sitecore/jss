/**
 * Generates Storybook story boilerplate for a component under `src/stories`
 * @param componentFileName - the component name
 * @returns component story boilerplate as a string
 */
function generateStorySrc(
  componentFileName: string,
  componentName: string,
  componentPath: string
): string {
  return `import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ${componentName}, { ${componentName}Props as Props } from './${componentFileName}';
import { StorybookArgs, withFields, withSitecoreContext } from 'storybook-utils/utils';

export default {
  title: 'Components/${componentPath}${componentFileName}',
  component: ${componentName},
} as ComponentMeta<typeof ${componentName}>;

type Args = StorybookArgs<Props>;

const Template: ComponentStory<typeof ${componentName}> = (args) => <${componentName} {...args} />;

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: '${componentFileName}',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: '${componentFileName}',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'Heading',
  },
});

Default.decorators = [withSitecoreContext()];
`;
}

export default generateStorySrc;

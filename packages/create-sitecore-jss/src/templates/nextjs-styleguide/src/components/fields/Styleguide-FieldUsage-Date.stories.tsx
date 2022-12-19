import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  StorybookArgs,
  StorybookEditingArgs,
  withFields,
  withSitecoreContext,
} from 'storybook-utils/utils';
import StyleguideFieldUsageDate, {
  StyleguideFieldUsageDateProps as Props,
} from './Styleguide-FieldUsage-Date';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-Date',
  component: StyleguideFieldUsageDate,
} as ComponentMeta<typeof StyleguideFieldUsageDate>;

const Template: ComponentStory<typeof StyleguideFieldUsageDate> = (args) => (
  <StyleguideFieldUsageDate {...args} />
);

type Args = StorybookArgs<Props>;

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-FieldUsage-Date',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-Date',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'Date',
    description: `<p><small>Both <code>Date</code> and <code>DateTime</code> field types are available. Choosing <code>DateTime</code> will make Sitecore show editing UI for time; both types store complete date and time values internally. Date values in JSS are formatted using <a href="https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations" target="_blank">ISO 8601 formatted strings</a>, for example <code>2012-04-23T18:25:43.511Z</code>.</small></p>
      <div class="alert alert-warning"><small>Note: this is a JavaScript date format (e.g. <code>new Date().toISOString()</code>), and is different from how Sitecore stores date field values internally. Sitecore-formatted dates will not work.</small></div>`,
    date: '2012-05-04T00:00:00Z',
    dateTime: '2018-03-14T15:00:00Z',
  },
});
Default.decorators = [withSitecoreContext()];

type EditingArgs = StorybookEditingArgs<Props, 'date' | 'dateTime'>;

export const Editing = Template.bind({});
Editing.args = withFields<EditingArgs, Props>(
  {
    params: {
      name: 'Styleguide-FieldUsage-Date',
    },
    rendering: {
      uid: '{00000000-0000-0000-0000-000000000000}',
      componentName: 'Styleguide-FieldUsage-Date',
      dataSource: '{00000000-0000-0000-0000-000000000000}',
    },
    fields: {
      heading: "<span class='jss-border'>Date Editing</span>",
      description: `<p class='jss-border'><small>Both <code>Date</code> and <code>DateTime</code> field types are available. Choosing <code>DateTime</code> will make Sitecore show editing UI for time; both types store complete date and time values internally. Date values in JSS are formatted using <a href="https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations" target="_blank">ISO 8601 formatted strings</a>, for example <code>2012-04-23T18:25:43.511Z</code>.</small></p>
      <div class="alert alert-warning"><small class='jss-border'>Note: this is a JavaScript date format (e.g. <code>new Date().toISOString()</code>), and is different from how Sitecore stores date field values internally. Sitecore-formatted dates will not work.</small></div>`,
      date: {
        value: '2012-05-04T00:00:00Z',
        editable: "<span class='jss-border'>2012-05-04T00:00:00Z</span>",
      },
      dateTime: {
        value: '2018-03-14T15:00:00Z',
        editable: "<span class='jss-border'>2018-03-14T15:00:00Z</span>",
      },
    },
  },
  true
);
Editing.decorators = [withSitecoreContext()];

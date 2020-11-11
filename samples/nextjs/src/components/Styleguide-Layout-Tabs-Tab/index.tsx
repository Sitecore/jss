import { Text, RichText, withSitecoreContext, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentWithContextProps } from 'lib/component-props';

type StyleguideLayoutTabsTabProps = StyleguideComponentWithContextProps & {
  fields: {
    content: Field<string>;
    title: Field<string>;
  };
};

/**
 * This is a single tab within the tabs sample component. These are added to the tabs placeholder.
 * This component demonstrates conditionally altering rendering when in the Sitecore Experience Editor to improve
 * author experience.
 */
const StyleguideLayoutTabsTab = (props: StyleguideLayoutTabsTabProps) => (
  <div data-e2e-class="styleguide-layout-tabs-tab">
    {/*
      When we're editing the tabs we stack each tab vertically,
      which means there's no regular tab titles rendered.
      So we conditionally render the tab title here, when editing. */}
    {props.sitecoreContext && props.sitecoreContext.pageEditing && (
      <Text tag="h5" field={props.fields.title} />
    )}

    {/* React.Fragment tells React to not use any wrapping tag for the component */}
    <RichText field={props.fields.content} />
  </div>
);

export default withSitecoreContext()(StyleguideLayoutTabsTab);

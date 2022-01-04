import {
  Text,
  RichText,
  Field,
  useSitecoreContext,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type StyleguideLayoutTabsTabProps = ComponentProps & {
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
const StyleguideLayoutTabsTab = (props: StyleguideLayoutTabsTabProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  return (
    <div data-e2e-class="styleguide-layout-tabs-tab">
      {/*
          When we're editing the tabs we stack each tab vertically,
          which means there's no regular tab titles rendered.
          So we conditionally render the tab title here, when editing. */}
      {sitecoreContext && sitecoreContext.pageEditing && (
        <Text tag="h5" field={props.fields.title} />
      )}

      {/* React.Fragment tells React to not use any wrapping tag for the component */}
      <RichText field={props.fields.content} />
    </div>
  );
};

export default withDatasourceCheck()<StyleguideLayoutTabsTabProps>(StyleguideLayoutTabsTab);

import { Field, Placeholder, Text, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentProps } from 'lib/component-props';

type StyleguideSectionProps = StyleguideComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

/**
 * Represents a category of styleguide specimens within the Styleguide-Layout.
 * Usage examples are added to the `styleguide-section` placeholder that this
 * exposes.
 */
const StyleguideSection = (props: StyleguideSectionProps): JSX.Element => (
  <div className="pt-3" id={`i${props.rendering.uid && props.rendering.uid.replace(/[{}]/g, '')}`}>
    <Text className="border-bottom" field={props.fields.heading} tag="h3" />
    <Placeholder name="<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>jss-styleguide-section" rendering={props.rendering} />
  </div>
);

export default withDatasourceCheck()<StyleguideSectionProps>(StyleguideSection);

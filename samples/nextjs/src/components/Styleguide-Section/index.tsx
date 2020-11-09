import { ComponentRendering, Field, Placeholder, Text } from '@sitecore-jss/sitecore-jss-nextjs';

interface StyleguideSectionProps {
  fields: {
    heading: Field<string>;
  }
  rendering: ComponentRendering;
}

/**
 * Represents a category of styleguide specimens within the Styleguide-Layout.
 * Usage examples are added to the `styleguide-section` placeholder that this
 * exposes.
 */
const StyleguideSection: React.FC<StyleguideSectionProps> = (props) => (
  <div className="pt-3" id={`i${props.rendering.uid && props.rendering.uid.replace(/[{}]/g, '')}`}>
    <Text className="border-bottom" field={props.fields.heading} tag="h3" />
    <Placeholder name="jss-styleguide-section" rendering={props.rendering} />
  </div>
);

export default StyleguideSection;

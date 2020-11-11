import { RichText, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from 'components/Styleguide-Specimen';
import { StyleguideComponentProps, StyleguideSpecimenFields } from 'lib/component-props';

type StyleguideFieldUsageRichTextProps = StyleguideComponentProps &
  StyleguideSpecimenFields & {
    fields: {
      sample: Field<string>;
      sample2: Field<string>;
    };
  };

/**
 * Demonstrates usage of a Rich Text (HTML) content field within JSS.
 */
const StyleguideFieldUsageRichText = (props: StyleguideFieldUsageRichTextProps): JSX.Element => (
  <StyleguideSpecimen {...props} e2eId="styleguide-fieldusage-richtext">
    {/* Basic use of a rich text field. Wraps in a <div>. */}
    <RichText field={props.fields.sample} />

    {/* Advanced usage of rich text field. Specifies a custom wrapper tag, turns off Sitecore editing, and has a CSS class on the wrapper */}
    <RichText
      field={props.fields.sample2}
      tag="section"
      editable={false}
      className="text-center"
      data-sample="other-attributes-pass-through"
    />
  </StyleguideSpecimen>
);

export default StyleguideFieldUsageRichText;

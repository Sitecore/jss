import { File, FileField, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from 'components/styleguide/Styleguide-Specimen';
import { ComponentProps } from 'lib/component-props';
import { StyleguideSpecimenFields } from 'lib/component-props/styleguide';

type StyleguideFieldUsageFileProps = ComponentProps &
  StyleguideSpecimenFields & {
    fields: {
      file: FileField;
    };
  };

/**
 * Demonstrates usage of a File content field within JSS.
 * File types are stored within Sitecore's Media Library data, and can be edited.
 */
const StyleguideFieldUsageFile = (props: StyleguideFieldUsageFileProps): JSX.Element => (
  <StyleguideSpecimen {...props} e2eId="styleguide-fieldusage-file">
    {/* Renders a file link */}
    <File field={props.fields.file} />
    <br />

    {/* Renders a file link with a custom body and opening in a new tab */}
    <File field={props.fields.file} target="_blank">
      Custom link body
    </File>
  </StyleguideSpecimen>
);

export default withDatasourceCheck()<StyleguideFieldUsageFileProps>(StyleguideFieldUsageFile);

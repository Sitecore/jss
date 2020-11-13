import { Text, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentProps, StyleguideSpecimenFields } from 'lib/component-props';

type StyleguideSpecimenProps = StyleguideComponentProps &
  StyleguideSpecimenFields & {
    e2eId: string;
    children: React.ReactNode;
  };

/**
 * Helper component that displays explanatory information and where to find the definitions
 * of styleguide specimens.
 */
const StyleguideSpecimen = ({
  fields: { heading, description },
  children,
  rendering,
  e2eId,
}: StyleguideSpecimenProps): JSX.Element => (
  <div
    className="pt-3"
    id={`i${rendering.uid && rendering.uid.replace(/[{}]/g, '')}`}
    data-e2e-id={e2eId}
  >
    <Text tag="h4" field={heading} />
    <RichText field={description} />

    <p>
      <small>
        Implementation: <code>/src/components/{rendering.componentName}/index.js</code>
        <br />
        Definition:{' '}
        <code>/sitecore/definitions/components/{rendering.componentName}.sitecore.js</code>
      </small>
    </p>
    <div className="border p-2">{children}</div>
  </div>
);

export default StyleguideSpecimen;

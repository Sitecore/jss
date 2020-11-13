import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from 'components/Styleguide-Specimen';
import { StyleguideComponentWithContextProps, StyleguideSpecimenFields } from 'lib/component-props';

type StyleguideSitecoreContextProps = StyleguideComponentWithContextProps &
  StyleguideSpecimenFields;

/**
 * Demonstrates gaining access to the route-level Sitecore Context from
 * within other components.
 */
const StyleguideSitecoreContext = (props: StyleguideSitecoreContextProps) => (
  <StyleguideSpecimen {...props} e2eId="styleguide-sitecore-context">
    <p>The current Sitecore Context is...</p>
    <pre style={{ maxHeight: '400px', overflow: 'scroll' }}>
      {JSON.stringify(props.sitecoreContext, null, 2)}
    </pre>
  </StyleguideSpecimen>
);

export default withSitecoreContext()(StyleguideSitecoreContext);

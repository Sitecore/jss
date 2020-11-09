import { ComponentRendering, Field, RouteData, withSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from '../Styleguide-Specimen';

interface StyleguideSitecoreContextProps {
  fields: {
    heading: Field<string>;
    description: Field<string>;
  }
  rendering: ComponentRendering;
  sitecoreContext: RouteData;
}


/**
 * Demonstrates gaining access to the route-level Sitecore Context from
 * within other components.
 */
const StyleguideSitecoreContext: React.FC<StyleguideSitecoreContextProps> = (props) => (
  <StyleguideSpecimen {...props} e2eId="styleguide-sitecore-context">
    <p>The current Sitecore Context is...</p>
    <pre style={{ maxHeight: '400px', overflow: 'scroll' }}>
      {JSON.stringify(props.sitecoreContext, null, 2)}
    </pre>
  </StyleguideSpecimen>
);

export default withSitecoreContext()(StyleguideSitecoreContext);

import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from './Styleguide-Specimen';
import { ComponentProps } from 'lib/component-props';
import { StyleguideSpecimenFields } from 'lib/component-props/styleguide';

type StyleguideSitecoreContextProps = ComponentProps & StyleguideSpecimenFields;

/**
 * Demonstrates gaining access to the route-level Sitecore Context from
 * within other components.
 */
const StyleguideSitecoreContext = (props: StyleguideSitecoreContextProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  return (
    <StyleguideSpecimen {...props} e2eId="styleguide-sitecore-context">
      <p>The current Sitecore Context is...</p>
      <pre style={{ maxHeight: '400px', overflow: 'scroll' }}>
        {JSON.stringify(sitecoreContext, null, 2)}
      </pre>
    </StyleguideSpecimen>
  );
};

export default StyleguideSitecoreContext;

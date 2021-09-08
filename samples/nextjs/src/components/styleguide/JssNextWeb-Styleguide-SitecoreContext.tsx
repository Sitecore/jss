import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from './JssNextWeb-Styleguide-Specimen';
import {
  StyleguideSpecimenFields,
  StyleguideSitecoreContextValue,
  StyleguideComponentProps,
} from 'lib/component-props';

type StyleguideSitecoreContextProps = StyleguideComponentProps & StyleguideSpecimenFields;

/**
 * Demonstrates gaining access to the route-level Sitecore Context from
 * within other components.
 */
const StyleguideSitecoreContext = (props: StyleguideSitecoreContextProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext<StyleguideSitecoreContextValue>();

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

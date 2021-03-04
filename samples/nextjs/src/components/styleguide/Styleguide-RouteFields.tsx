import Link from 'next/link';
import { Text, Field, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from './Styleguide-Specimen';
import {
  StyleguideComponentProps,
  StyleguideSitecoreContextValue,
  StyleguideSpecimenFields,
} from 'lib/component-props';

type StyleguideRouteFieldsProps = StyleguideComponentProps & StyleguideSpecimenFields;

type StyleguideRouteFieldsContext = StyleguideSitecoreContextValue & {
  route: {
    fields: {
      pageTitle: Field<string>;
    };
  };
};

/**
 * Demonstrates gaining access to route-level fields.
 * This technique builds on the Styleguide-SitecoreContext technique,
 * to also get the route level field data and make it editable.
 */
const StyleguideRouteFields = (props: StyleguideRouteFieldsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext<StyleguideRouteFieldsContext>();

  return (
    <StyleguideSpecimen {...props} e2eId="styleguide-route-fields">
      <p>
        Route level <code>pageTitle</code> field:{' '}
        {sitecoreContext.route && <Text field={sitecoreContext.route.fields.pageTitle} />}
      </p>
      <p>
        <Link href="/styleguide/custom-route-type">
          <a>Sample of using a custom route type</a>
        </Link>
      </p>
    </StyleguideSpecimen>
  );
};

export default StyleguideRouteFields;

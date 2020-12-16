import Link from 'next/link';
import {
  // Field,
  withSitecoreContext,
  Text,
  Field,
  // RouteData,
} from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from 'components/Styleguide-Specimen';
import { StyleguideComponentWithContextProps, StyleguideSpecimenFields } from 'lib/component-props';
import { getPublicUrl } from 'lib/util';

type StyleguideRouteFieldsProps = StyleguideComponentWithContextProps &
  StyleguideSpecimenFields & {
    sitecoreContext: {
      route: {
        fields: {
          pageTitle: Field<string>;
        };
      };
    };
  };

/**
 * Demonstrates gaining access to route-level fields.
 * This technique builds on the Styleguide-SitecoreContext technique,
 * to also get the route level field data and make it editable.
 */
const StyleguideRouteFields = (props: StyleguideRouteFieldsProps): JSX.Element => {
  // Prefix next/link paths with a publicUrl to disable Next.js prefetching in the Sitecore Experience Editor.
  // If you're not supporting the Experience Editor, you can remove this.
  const publicUrl = getPublicUrl();

  return (
    <StyleguideSpecimen {...props} e2eId="styleguide-route-fields">
      <p>
        Route level <code>pageTitle</code> field:{' '}
        {props.sitecoreContext.route && (
          <Text field={props.sitecoreContext.route.fields.pageTitle} />
        )}
      </p>
      <p>
        <Link href={`${publicUrl}/styleguide/custom-route-type`}>
          <a>Sample of using a custom route type</a>
        </Link>
      </p>
    </StyleguideSpecimen>
  );
};

export default withSitecoreContext()(StyleguideRouteFields);

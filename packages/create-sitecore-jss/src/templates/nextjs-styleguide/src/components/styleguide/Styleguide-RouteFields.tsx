import Link from 'next/link';
import { Text, Field, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from './Styleguide-Specimen';
import { ComponentProps } from 'lib/component-props';
import { StyleguideSpecimenFields } from 'lib/component-props/styleguide';

type StyleguideRouteFieldsProps = ComponentProps & StyleguideSpecimenFields;

type StyleguideRouteFields = {
  pageTitle: Field<string>;
};

/**
 * Demonstrates gaining access to route-level fields.
 * This technique builds on the Styleguide-SitecoreContext technique,
 * to also get the route level field data and make it editable.
 */
const StyleguideRouteFields = (props: StyleguideRouteFieldsProps): JSX.Element => {
  const value = useSitecoreContext();
  const fields = value.sitecoreContext.route?.fields as StyleguideRouteFields;

  return (
    <StyleguideSpecimen {...props} e2eId="styleguide-route-fields">
      <p>
        Route level <code>pageTitle</code> field:{' '}
        {value.sitecoreContext.route && <Text field={fields.pageTitle} />}
      </p>
      <p>
        <Link href="/styleguide/custom-route-type">
          Sample of using a custom route type
        </Link>
      </p>
    </StyleguideSpecimen>
  );
};

export default StyleguideRouteFields;

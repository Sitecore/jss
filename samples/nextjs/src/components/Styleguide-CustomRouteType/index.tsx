import Link from 'next/link';
import { withSitecoreContext, Text, RichText, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentWithContextProps } from 'lib/component-props';

type StyleguideCustomRouteTypeProps = StyleguideComponentWithContextProps & {
  sitecoreContext: {
    route: {
      fields: {
        headline: Field<string>;
        author: Field<string>;
        content: Field<string>;
      };
    };
  };
};

// this fancy destructure syntax is essentially equivalent to
// const fields = props.sitecoreContext.route.fields
const StyleguideCustomRouteType = ({
  sitecoreContext: {
    route: { fields },
  },
}: StyleguideCustomRouteTypeProps) => (
  <div data-e2e-id="styleguide-customroutetype">
    <Text tag="h3" field={fields.headline} />

    <p>
      <em>
        By <Text field={fields.author} />
      </em>
    </p>

    <RichText field={fields.content} />

    <Link href="/styleguide">
      <a>Return to the Styleguide</a>
    </Link>
  </div>
);

// withSitecoreContext() is the magical glue that gives you route-level context access
// see the context examples in the styleguide for more details.
export default withSitecoreContext()(StyleguideCustomRouteType);

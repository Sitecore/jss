import Link from 'next/link';
import { withSitecoreContext, Text, RichText, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentWithContextProps } from 'lib/component-props';
import { getPublicUrl } from 'lib/util';

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
}: StyleguideCustomRouteTypeProps): JSX.Element => {
  // Prefix next/link paths with a publicUrl to disable Next.js prefetching in the Sitecore Experience Editor.
  // If you're not supporting the Experience Editor, you can remove this.
  const publicUrl = getPublicUrl();

  return (
    <div data-e2e-id="styleguide-customroutetype">
      <Text tag="h3" field={fields.headline} />

      <p>
        <em>
          By <Text field={fields.author} />
        </em>
      </p>

      <RichText field={fields.content} />

      <Link href={`${publicUrl}/styleguide`}>
        <a>Return to the Styleguide</a>
      </Link>
    </div>
  );
};

// withSitecoreContext() is the magical glue that gives you route-level context access
// see the context examples in the styleguide for more details.
export default withSitecoreContext()(StyleguideCustomRouteType);

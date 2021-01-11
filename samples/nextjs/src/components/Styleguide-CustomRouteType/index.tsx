import Link from 'next/link';
import { useSitecoreContext, Text, RichText, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideSitecoreContextValue } from 'lib/component-props';
import { getPublicUrl } from 'lib/util';

type StyleguideCustomRouteTypeContext = StyleguideSitecoreContextValue & {
  route: {
    fields: {
      headline: Field<string>;
      author: Field<string>;
      content: Field<string>;
    };
  };
};

const StyleguideCustomRouteType = (): JSX.Element => {
  // useSitecoreContext() is the magical glue that gives you route-level context access
  // see the context examples in the styleguide for more details.
  // this fancy destructure syntax is essentially equivalent to
  // const fields = props.sitecoreContext.route.fields
  const {
    sitecoreContext: {
      route: { fields },
    },
  } = useSitecoreContext<StyleguideCustomRouteTypeContext>();

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

export default StyleguideCustomRouteType;

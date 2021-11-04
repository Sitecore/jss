import Link from 'next/link';
import { useSitecoreContext, Text, RichText, Field } from '@sitecore-jss/sitecore-jss-nextjs';

type StyleguideCustomRouteTypeFields = {
  headline: Field<string>;
  author: Field<string>;
  content: Field<string>;
};

const StyleguideCustomRouteType = (): JSX.Element => {
  // useSitecoreContext() is the magical glue that gives you route-level context access
  // see the context examples in the styleguide for more details.
  // this fancy destructure syntax is essentially equivalent to
  // const fields = props.sitecoreContext.route.fields
  const value = useSitecoreContext();
  const fields = value.sitecoreContext.route?.fields as StyleguideCustomRouteTypeFields;

  return (
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
};

export default StyleguideCustomRouteType;

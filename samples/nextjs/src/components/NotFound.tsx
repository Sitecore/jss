import { LayoutServiceContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Head from 'next/head';

type NotFoundProps = {
  context?: LayoutServiceContext;
};

/**
 * Rendered in case if we have 404 error
 */
const NotFound = ({ context }: NotFoundProps): JSX.Element => (
  <>
    <Head>
      <title>404: NotFound</title>
    </Head>
    <div style={{ padding: 10 }}>
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
      {context && (
        <p>
          Site: {context.site?.name}
          <br />
          Language: {context.language}
        </p>
      )}
      <a href="/">Go to the Home page</a>
    </div>
  </>
);

export default NotFound;

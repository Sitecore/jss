import { SitecorePageProps } from 'lib/page-props';
import { context } from 'src/lib/context';
import config from 'temp/config';

/**
 * The Bootstrap component is the entry point for performing any initialization logic
 * that needs to happen early in the application's lifecycle.
 */
const Bootstrap = (props: SitecorePageProps): JSX.Element | null => {
  /**
   * Initializes the application Context and associated Software Development Kits (SDKs).
   * This function is the entry point for setting up the application's context and any SDKs that are required for its proper functioning.
   * It prepares the resources needed to interact with various services and features within the application.
   */
  context.init({
    siteName: props.site?.name || config.sitecoreSiteName,
    pageState: props.layoutData?.sitecore?.context?.pageState,
  });

  return null;
};

export default Bootstrap;

import { SitecorePageProps } from 'lib/page-props';
import { initContext } from 'src/lib/context';
import { siteResolver } from 'lib/site-resolver';
import config from 'temp/config';

/**
 * The Bootstrap component is the entry point for performing any initialization logic
 * that needs to happen early in the application's lifecycle.
 */
const Bootstrap = (props: SitecorePageProps): JSX.Element | null => {
  const site = props.layoutData?.sitecore.context.site;
  const siteInfo = siteResolver.getByName(site?.name || config.siteName);

  // Initialize the Context value for the app
  initContext({ siteName: siteInfo.name });

  return null;
};

export default Bootstrap;

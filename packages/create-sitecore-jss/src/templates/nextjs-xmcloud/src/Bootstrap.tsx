import { SitecorePageProps } from 'lib/page-props';
import { initContext } from 'src/lib/context';
import { siteResolver } from 'lib/site-resolver';
import config from 'temp/config';

const Bootstrap = (props: SitecorePageProps): JSX.Element | null => {
  const site = props.layoutData?.sitecore.context.site;
  const siteInfo = siteResolver.getByName(site?.name || config.siteName);

  // Initialize the Context of the App
  initContext({ siteName: siteInfo.name });

  return null;
};

export default Bootstrap;

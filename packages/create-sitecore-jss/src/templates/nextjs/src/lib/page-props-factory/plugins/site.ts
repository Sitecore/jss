import { SitecorePageProps } from 'lib/page-props';
import { Plugin } from '..';
import { siteResolver } from 'lib/site-resolver';
import config from 'temp/config';

class SitePlugin implements Plugin {
  order = 0;

  async exec(props: SitecorePageProps) {
    // Resolve site by name
    props.site = siteResolver.getByName(config.jssAppName);

    return props;
  }
}

export const sitePlugin = new SitePlugin();

import type { Plugin, SitecorePageProps, PagePropsFactoryConfig } from "..";
import { siteResolver } from "@lib/site-resolver";

class SitePlugin implements Plugin {
  order = 0;

  async exec(props: SitecorePageProps, config: PagePropsFactoryConfig) {
    // Resolve site by name
    props.site = siteResolver.getByName(config.siteName);

    return props;
  }
}

export const sitePlugin = new SitePlugin();

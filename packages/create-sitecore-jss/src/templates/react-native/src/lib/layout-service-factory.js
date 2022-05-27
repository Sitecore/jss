import { RestLayoutService } from "@sitecore-jss/sitecore-jss-react-native";
import { default as env } from 'expo-constants';

class LayoutServiceFactory {
  create() {
    return new RestLayoutService({
      apiHost: env.manifest.extra.sitecoreApiHost,
      apiKey: env.manifest.extra.sitecoreApiKey,
      siteName: env.manifest.extra.jssAppName,
      configurationName: "default",
    });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();

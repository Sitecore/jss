import { normalizePersonalizedRewrite } from '@sitecore-jss/sitecore-jss-nextjs';
import { Plugin } from '..';

class PersonalizePlugin implements Plugin {
  exec(path: string) {
    // Remove personalize rewrite segment from the path
    return normalizePersonalizedRewrite(path);
  }
}

export const personalizePlugin = new PersonalizePlugin();

import { normalizePersonalizedRewrite } from '@sitecore-jss/sitecore-jss-nextjs';
import { Plugin } from '..';

class PersonalizePlugin implements Plugin {
  /**
   * Extract normalized Sitecore item path from query
   * @param {string} path
   */
  exec(path: string) {
    return normalizePersonalizedRewrite(path);
  }
}

export const personalizePlugin = new PersonalizePlugin();

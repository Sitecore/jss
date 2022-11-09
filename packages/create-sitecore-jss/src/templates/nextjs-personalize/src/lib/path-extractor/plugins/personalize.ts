import { normalizePersonalizedRewrite } from '@sitecore-jss/sitecore-jss-nextjs';
import { Plugin } from '..';

class PersonalizePlugin implements Plugin {
  order = 0;

  exec(path: string) {
    // Ensure multisite rewrite data is removed
    path = normalizePersonalizedRewrite(path);

    return path;
  }
}

export const personalizePlugin = new PersonalizePlugin();

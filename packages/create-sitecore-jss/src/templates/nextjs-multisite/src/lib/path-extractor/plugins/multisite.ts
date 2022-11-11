import { normalizeMultisiteRewrite } from '@sitecore-jss/sitecore-jss-nextjs';
import { Plugin } from '..';

class MultisitePlugin implements Plugin {
  order = 0;

  exec(path: string) {
    // Ensure multisite rewrite data is removed
    path = normalizeMultisiteRewrite(path);

    return path;
  }
}

export const multisitePlugin = new MultisitePlugin();

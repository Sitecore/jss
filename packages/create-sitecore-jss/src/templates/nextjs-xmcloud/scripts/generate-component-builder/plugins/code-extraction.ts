import { ComponentBuilderPlugin } from '..';
import { extractComponents } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Provides Sitecore Components (FEaaS) packages configuration
 */
class CodeExtractorPlugin implements ComponentBuilderPlugin {
  order = 9999;

  exec() {
    extractComponents();
  }
    
}

export const feaasPlugin = new CodeExtractorPlugin();

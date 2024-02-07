import debug from 'debug';

const rootNamespace = 'sitecore-jss';

export type Debugger = debug.Debugger;

/**
 * Enable debug logging dynamically
 * @param {string} namespaces space-separated list of namespaces to enable
 */
export const enableDebug = (namespaces: string) => debug.enable(namespaces);

/**
 * Default Sitecore JSS 'debug' module debuggers. Uses namespace prefix 'sitecore-jss:'.
 * See {@link https://www.npmjs.com/package/debug} for details.
 */
export default {
  common: debug(`${rootNamespace}:common`),
  http: debug(`${rootNamespace}:http`),
  layout: debug(`${rootNamespace}:layout`),
  dictionary: debug(`${rootNamespace}:dictionary`),
  editing: debug(`${rootNamespace}:editing`),
  sitemap: debug(`${rootNamespace}:sitemap`),
  multisite: debug(`${rootNamespace}:multisite`),
  robots: debug(`${rootNamespace}:robots`),
  redirects: debug(`${rootNamespace}:redirects`),
  personalize: debug(`${rootNamespace}:personalize`),
  errorpages: debug(`${rootNamespace}:errorpages`),
  revalidate: debug(`${rootNamespace}:revalidate`),
};

import debug from 'debug';
import isServer from './utils/is-server';

const rootNamespace = 'sitecore-jss';

export type Debugger = debug.Debugger;

// On server/node side, allow switching from the built-in
// `%o` (pretty-print single line) and `%O` (pretty-print multiple line)
// with a `DEBUG_MULTILINE` environment variable.
if (
  isServer() &&
  process?.env?.DEBUG_MULTILINE === 'true' &&
  debug.formatters.o &&
  debug.formatters.O
) {
  debug.formatters.o = debug.formatters.O;
}

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
};

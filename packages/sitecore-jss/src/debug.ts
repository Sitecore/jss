import debug from 'debug';

const rootNamespace = 'sitecore-jss';

/**
 * Default Sitecore JSS 'debug' module debuggers. Uses namespace prefix 'sitecore-jss:'.
 * See {@link https://www.npmjs.com/package/debug} for details.
 */
export default Object.freeze({
  http: debug(`${rootNamespace}:http`),
  layout: debug(`${rootNamespace}:layout`),
  dictionary: debug(`${rootNamespace}:dictionary`),
  experienceEditor: debug(`${rootNamespace}:experience-editor`),
  sitemap: debug(`${rootNamespace}:sitemap`),
});

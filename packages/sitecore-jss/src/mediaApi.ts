// what is `import x = require('x');`? great question: https://github.com/Microsoft/TypeScript/issues/5073
import unescape = require('lodash.unescape');
import URL = require('url-parse');

// finds an img tag with HTML attributes
const imgTagRegex = /<img([^>]+)\/>/i;

// finds all the HTML attributes in a string
const htmlAttrsRegex = /([^=\s]+)(="([^"]*)")?/gi;

// finds the Sitecore media URL prefix
const mediaUrlPrefixRegex = /\/([-~]{1})\/media\//i;

/**
 * Makes a request to Sitecore Content Service for the specified item path.
 */
export const findEditorImageTag = (editorMarkup: string) => {
  // match the tag
  const tagMatch = editorMarkup.match(imgTagRegex);
  if (!tagMatch || tagMatch.length < 2) {
    return null;
  }

  // find the attrs and turn them into a Map
  const attrs = {} as { [key: string]: string };
  let match = htmlAttrsRegex.exec(tagMatch[1]);
  while (match != null) {
    attrs[match[1]] = unescape(match[3]);
    match = htmlAttrsRegex.exec(tagMatch[1]);
  }

  return {
    imgTag: tagMatch[0],
    attrs,
  };
};

/**
 * Receives a Sitecore media URL and replaces `/~/media` or `/-/media` with `/~/jssmedia` or `/-/jssmedia`, respectively.
 * Can use `mediaUrlPrefix` in order to use custom checker.
 * This replacement allows the JSS media handler to be used for JSS app assets.
 * Also, any provided `params` are used as the querystring parameters for the media URL.
 */
export const updateImageUrl = (
  url: string,
  params?: { [key: string]: string | undefined },
  mediaUrlPrefix: RegExp = mediaUrlPrefixRegex
) => {
  // polyfill node `global` in browser to workaround https://github.com/unshiftio/url-parse/issues/150
  if (typeof window !== 'undefined' && !(window as any).global) {
    (window as any).global = {};
  }
  const parsed = URL(url, {}, true);

  parsed.set('query', { ...parsed.query, ...params });

  const match = mediaUrlPrefix.exec(parsed.pathname);
  if (match && match.length > 1) {
    // regex will provide us with /-/ or /~/ type
    parsed.set('pathname', parsed.pathname.replace(mediaUrlPrefix, `/${match[1]}/jssmedia/`));
  }

  return parsed.toString();
};

/**
 * Receives an array of `srcSet` parameters that are iterated and used as parameters to generate
 * a corresponding set of updated Sitecore media URLs via @see updateImageUrl. The result is a comma-delimited
 * list of media URLs with respective dimension parameters.
 *
 * @example
 * // returns '/ipsum.jpg?h=1000&w=1000 1000w, /ipsum.jpg?mh=250&mw=250 250w'
 * getSrcSet('/ipsum.jpg', [{ h: 1000, w: 1000 }, { mh: 250, mw: 250 } ])
 *
 * More information about `srcSet`: {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img}
 */
export const getSrcSet = (
  url: string,
  srcSet: Array<{ [key: string]: string | undefined }>,
  imageParams?: { [key: string]: string | undefined },
  mediaUrlPrefix?: RegExp
) => {
  return srcSet
    .map((params) => {
      const newParams = { ...imageParams, ...params } as { [key: string]: string | undefined };
      const imageWidth = newParams.w || newParams.mw;
      if (!imageWidth) {
        return null;
      }
      return `${updateImageUrl(url, newParams, mediaUrlPrefix)} ${imageWidth}w`;
    })
    .filter((value) => value)
    .join(', ');
};

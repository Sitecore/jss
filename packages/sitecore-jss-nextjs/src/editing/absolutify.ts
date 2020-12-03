/**
 * Adapted from https://github.com/sorensen/absolutify, with some adjustments for our purposes:
 *  1. Capture and pass the _entire_ URL to iterator function (bug)
 *  2. Don't include anchor fragment links
 *  3. Added srcset and poster attributes
 *  4. Converted to TypeScript
 */

/**
 * Iterator function
 */
type IteratorFunction = (url: string, attributeName: string) => string;

/*!
 * The magic, find all occurences of `attr="/`, ignoring any `//` found,
 * ensure that the leading `/` of the url is not captured
 *
 * HTML attribute list from: http://stackoverflow.com/questions/2725156/complete-list-of-html-tag-attributes-which-have-a-url-value
 */
const rx = /((href|src|codebase|cite|background|cite|action|profile|formaction|icon|manifest|archive|srcset|poster)=["'])(([.]+\/)|(?:\/))(?!\/)/g;

/*!
 * Match the same as above, but capture the full URL for iteration
 */
const captureRx = /((href|src|codebase|cite|background|cite|action|profile|formaction|icon|manifest|archive|srcset|poster)=["'])((([.]+\/)|(?:\/))(?!\/)[^"']+)/g;

/**
 * URL replacement using function iteration, this is handled slightly
 * different as the user will be supplied with the full attribute value
 * for replacement, and will be inserted back correctly
 */
const iterate = function (str: string, iterator: IteratorFunction): string {
  return str.replace(captureRx, (_full, prefix, prop, url) => {
    return prefix + iterator(url, prop);
  });
};

/**
 * Replace all relative urls in a given HTML string with absolute
 *
 * @param {string} str The html source
 * @param {(string|IteratorFunction)} url The base url to use for replacement, or an iterator function called with (url, attributeName)
 * @return {string} The replaced html source
 */
export default function absolutify(str: string, url: string | IteratorFunction): string {
  if (typeof url === 'string') {
    return str.replace(rx, '$1' + url + '/$4');
  }
  return iterate(str, url);
}

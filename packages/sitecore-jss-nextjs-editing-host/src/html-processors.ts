
import absolutify from './absolutify';

export interface HtmlProcessor {
  /**
   * Process HTML string
   * @param html {string} The input HTML to process
   * @returns {string} The HTML with processing applied
   */
  processHtml(html: string): string;
}

/**
 * Absolutify HTML processor
 * @constructor
 * @param {string} publicUrl The public URL. This will be used when replacing relative links with absolute ones.
 * @param {string[]} ignoredPaths URL path prefixes that should be ignored during link replacement.
 */
export class AbsolutifyHtmlProcessor implements HtmlProcessor {
  constructor(readonly publicUrl: string, readonly ignoredPaths?: string[]) {}

  processHtml(html: string) {

    return absolutify(html, (relativeUrl) => {
      const ignored = this.ignoredPaths && this.ignoredPaths.some(
        // Check both with a leading slash "/" and without
        (value) => relativeUrl.startsWith(value) || relativeUrl.startsWith('/' + value)
      );
      if (ignored) {
        return relativeUrl;
      }
      return this.publicUrl.replace(/\/$/, '') + relativeUrl;
    });
  }
}

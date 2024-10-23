/**
 * Remove angular comments and angular-specific bindings
 * @param {string} html
 */
export function cleanHtml(html: string): string {
  return html
    .replace(/<!--[^>]*-->/g, '')
    .replace(/\s*ng-reflect-[^=]*="[^"]*"/g, '')
    .trim();
}

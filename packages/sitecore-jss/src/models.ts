/**
 * Html <link> tag data model
 */
export type HTMLLink = {
  [key: string]: unknown;
} & Pick<HTMLLinkElement, 'rel' | 'href'>;

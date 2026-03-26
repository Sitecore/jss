import React, { forwardRef, JSX } from 'react';
import NextLink from 'next/link';
import { LinkProps as NextLinkProps } from 'next/link';
import {
  Link as ReactLink,
  LinkFieldValue,
  LinkField,
  LinkProps as ReactLinkProps,
} from '@sitecore-jss/sitecore-jss-react';

/**
 * The list of NextLink props to be supported by the Link component.
 */
const supportedNextLinkProps = [
  'as',
  'onNavigate',
  'passHref',
  'prefetch',
  'replace',
  'scroll',
  'shallow',
] as const;

export type LinkProps = ReactLinkProps & {
  /**
   * If `href` match with `internalLinkMatcher` regexp, then it's internal link and NextLink will be rendered
   * @default /^\//g
   */
  internalLinkMatcher?: RegExp;
} & Pick<NextLinkProps, typeof supportedNextLinkProps[number]>;

/**
 * Matches relative URLs that end with a file extension.
 */
const FILE_EXTENSION_MATCHER = /^\/.*\.\w+$/;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref): JSX.Element | null => {
    const {
      field,
      editable = true,
      children,
      internalLinkMatcher = /^\//g,
      showLinkTextWithChildrenPresent,
      ...rest
    } = props;

    if (
      !field ||
      (!(field as LinkFieldValue).editable &&
        !field.value &&
        !(field as LinkFieldValue).href &&
        !field.metadata)
    ) {
      return null;
    }

    const value = ((field as LinkFieldValue).href
      ? field
      : (field as LinkField).value) as LinkFieldValue;
    // fallback to {} if value is undefined; could happen if field is LinkFieldValue, href is empty in metadata mode
    const { href, querystring, anchor } = value || {};

    const isEditing =
      editable && ((field as LinkFieldValue).editable || (field as LinkFieldValue).metadata);

    if (href && !isEditing) {
      const text = showLinkTextWithChildrenPresent || !children ? value.text || value.href : null;

      const isMatching = internalLinkMatcher.test(href);
      const isFileUrl = FILE_EXTENSION_MATCHER.test(href);

      // determine if a link is a route or not. File extensions are not routes and should not be pre-fetched.
      if (isMatching && !isFileUrl) {
        delete rest.emptyFieldEditingComponent;

        return (
          <NextLink
            href={{ pathname: href, query: querystring, hash: anchor }}
            key="link"
            title={value.title}
            target={value.target}
            className={value.class}
            {...rest}
            locale={false}
            ref={ref}
            {...(process.env.TEST
              ? {
                  'data-nextjs-link': true,
                  'data-nextjs-link-prefetch': props.prefetch,
                }
              : {})}
          >
            {text}
            {children}
          </NextLink>
        );
      }
    }

    const reactLinkProps = sanitizeLinkProps(props);

    return (
      <ReactLink
        {...reactLinkProps}
        ref={ref}
        {...(process.env.TEST ? { 'data-react-link': true } : {})}
      />
    );
  }
);

Link.displayName = 'NextLink';

/**
 * Sanitize props for ReactLink by removing Next.js and internal props to prevent invalid DOM attributes.
 * @param {LinkProps} props - The props the Link component received.
 * @returns sanitized props for ReactLink.
 */
function sanitizeLinkProps(props: LinkProps) {
  const internalProps: (keyof LinkProps)[] = ['internalLinkMatcher'];

  const sanitizedProps: LinkProps = { ...props };
  for (const prop of [...supportedNextLinkProps, ...internalProps]) {
    delete sanitizedProps[prop as keyof LinkProps];
  }

  return sanitizedProps;
}

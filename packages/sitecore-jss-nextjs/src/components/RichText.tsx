import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  RichText as ReactRichText,
  RichTextPropTypes,
  RichTextProps as ReactRichTextProps,
} from '@sitecore-jss/sitecore-jss-react';

export type RichTextProps = ReactRichTextProps & {
  /**
   * Selector which should be used in order to prefetch it and attach event listeners
   * @default 'a[href^="/"]'
   */
  internalLinksSelector?: string;

  /**
   * Controls the prefetch of internal links. This can be beneficial if you have RichText fields
   * with large numbers of internal links in them.
   * @default true
   */
  prefetchLinks?: boolean;
};

const prefetched: { [cacheKey: string]: boolean } = {};

export const RichText = (props: RichTextProps = {tag: 'div', editable: true}): JSX.Element => {
  const { internalLinksSelector = 'a[href^="/"]', prefetchLinks = true, ...rest } = props;
  const hasText = props.field && props.field.value;
  const isEditing = props.editable && props.field && props.field.editable;

  const router = useRouter();
  const richTextRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // NOT IN EXPERIENCE EDITOR
    if (hasText && !isEditing) {
      initializeLinks();
    }
  }, [hasText]);

  const routeHandler = (ev: MouseEvent) => {
    if (!ev.currentTarget) return;

    ev.preventDefault();

    const pathname = (ev.currentTarget as HTMLAnchorElement).href;

    router.push(pathname, pathname, { locale: false });
  };

  const initializeLinks = () => {
    const node = richTextRef.current;

    // selects all links that start with '/'
    const internalLinks = node && node.querySelectorAll<HTMLAnchorElement>(internalLinksSelector);

    if (!internalLinks || !internalLinks.length) return;

    internalLinks.forEach((link) => {
      if (link.target === '_blank') return;

      if (prefetchLinks && !prefetched[link.pathname]) {
        router.prefetch(link.pathname, undefined, { locale: false });
        prefetched[link.pathname] = true;
      }

      link.addEventListener('click', routeHandler, false);
    });
  };

  return <ReactRichText ref={richTextRef} {...rest} />;
};

RichText.propTypes = {
  internalLinksSelector: PropTypes.string,
  ...RichTextPropTypes,
};

RichText.displayName = 'NextRichText';

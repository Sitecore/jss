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
   * - `true` (default): The full route & its data will be prefetched.
   * - `hover`: Prefetching will happen on hover.
   * - `false`: Prefetching will not happen.
   * @default true
   */
  prefetchLinks?: boolean | 'hover';
};

export const prefetched: { [cacheKey: string]: boolean } = {};

export const RichText = (props: RichTextProps): JSX.Element => {
  const {
    internalLinksSelector = 'a[href^="/"]',
    prefetchLinks = true,
    editable = true,
    ...rest
  } = props;
  const hasText = props.field && props.field.value;
  const isEditing = editable && props.field && (props.field.editable || props.field.metadata);

  const router = useRouter();
  const richTextRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // NOT IN EDIT MODE
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

      const prefetch = () => {
        router.prefetch(link.pathname, undefined, { locale: false });

        prefetched[link.pathname] = true;
      };

      if (!prefetched[link.pathname] && prefetchLinks !== false) {
        if (prefetchLinks === true) {
          prefetch();
        }

        if (prefetchLinks === 'hover') {
          const mouseOverHandler = () => {
            prefetch();

            link.removeEventListener('mouseover', mouseOverHandler);
          };

          link.addEventListener('mouseover', mouseOverHandler, false);
        }
      }

      link.addEventListener('click', routeHandler, false);
    });
  };

  return <ReactRichText ref={richTextRef} editable={editable} {...rest} />;
};

RichText.propTypes = {
  internalLinksSelector: PropTypes.string,
  ...RichTextPropTypes,
};

RichText.displayName = 'NextRichText';

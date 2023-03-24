'use client';

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
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
};

const prefetched: { [cacheKey: string]: boolean } = {};

export const RichText = (props: RichTextProps): JSX.Element => {
  const { internalLinksSelector = 'a[href^="/"]', ...rest } = props;

  const hasText = props.field && props.field.value;
  const isEditing = props.editable && props.field && props.field.editable;

  const router = useRouter();
  const richTextRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // NOT IN EXPERIENCE EDITOR
    if (hasText && !isEditing) {
      initializeLinks();
    }
  }, []);

  const routeHandler = (ev: MouseEvent) => {
    if (!ev.target) return;

    ev.preventDefault();

    const pathname = (ev.target as HTMLAnchorElement).href;

    router.push(pathname);
  };

  const initializeLinks = () => {
    const node = richTextRef.current;

    // selects all links that start with '/'
    const internalLinks = node && node.querySelectorAll<HTMLAnchorElement>(internalLinksSelector);

    if (!internalLinks || !internalLinks.length) return;

    internalLinks.forEach((link) => {
      if (link.target !== '_blank') {
        if (!prefetched[link.pathname]) {
          router.prefetch(link.pathname);
          prefetched[link.pathname] = true;
        }
        link.addEventListener('click', routeHandler, false);
      }
    });
  };

  return (
    <ReactRichText
      ref={richTextRef}
      {...rest}
      tag={props.tag ?? 'div'}
      editable={props.editable ?? true}
    />
  );
};

RichText.propTypes = {
  internalLinksSelector: PropTypes.string,
  ...RichTextPropTypes,
};

RichText.displayName = 'NextRichText';

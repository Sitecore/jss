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
};

const prefetched: { [cacheKey: string]: boolean } = {};

export const RichText = (props: RichTextProps) => {
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
  });

  const routeHandler = (ev: MouseEvent) => {
    if (!ev.target) return;

    ev.preventDefault();

    const pathname = (ev.target as HTMLAnchorElement).pathname;

    router.push(pathname, pathname, { locale: false });
  };

  const initializeLinks = () => {
    const node = richTextRef.current;

    // selects all links that start with '/'
    const internalLinks = node && node.querySelectorAll<HTMLAnchorElement>(internalLinksSelector);

    if (!internalLinks || !internalLinks.length) return;

    internalLinks.forEach((link) => {
      if (!prefetched[link.pathname]) {
        router.prefetch(link.pathname, undefined, { locale: false });
        prefetched[link.pathname] = true;
      }

      link.removeEventListener('click', routeHandler, false);
      link.addEventListener('click', routeHandler, false);
    });
  };

  return <ReactRichText ref={richTextRef} {...rest} />;
};

RichText.propTypes = {
  internalLinksSelector: PropTypes.string,
  ...RichTextPropTypes,
};

RichText.defaultProps = {
  tag: 'div',
  editable: true,
};

RichText.displayName = 'NextRichText';

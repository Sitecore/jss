import React, { ReactElement } from 'react';
import NextLink from 'next/link';

export interface LinkFieldValue {
  href?: string;
  className?: string;
  title?: string;
  target?: string;
  editable?: string;
  [attributeName: string]: any;
}

export interface LinkField {
  value?: LinkFieldValue;
  editableFirstPart?: string;
  editableLastPart?: string;
}

export type LinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  /** The link field data. */
  field: LinkField | LinkFieldValue;
  /**
   * Can be used to explicitly disable inline editing.
   * If true and `field.editable` has a value, then `field.editable` will be processed and rendered as component output. If false, `field.editable` value will be ignored and not rendered.
   * @default true
   */
  editable?: boolean;

  /**
   * Displays a link text ('description' in Sitecore) even when children exist
   * NOTE: when in Sitecore Experience Editor, this setting is ignored due to technical limitations, and the description is always rendered.
   */
  showLinkTextWithChildrenPresent?: boolean;

  /**
   * Should component prefetch route
   */
  prefetch?: boolean;

  /**
   * Locale which will be used when prefetch route
   */
  locale?: string;
};

export const Link = ({
  field,
  editable,
  children,
  showLinkTextWithChildrenPresent,
  prefetch,
  locale,
  ...otherProps
}: LinkProps) => {
  if (!field || (!field.editableFirstPart && !field.value && !(field as LinkFieldValue).href)) {
    return null;
  }

  const resultTags: ReactElement[] = [];

  // EXPERIENCE EDITOR RENDERING
  if (editable && field.editableFirstPart) {
    let markup = field.editableFirstPart + field.editableLastPart;

    // in an ideal world, we'd pre-render React children here and inject them between editableFirstPart and editableLastPart.
    // However, we cannot combine arbitrary unparsed HTML (innerHTML) based components with actual vDOM components (the children)
    // because the innerHTML is not parsed - it'd make a discontinuous vDOM. So, we'll go for the next best compromise of rendering the link field and children separately
    // as siblings. Should be "good enough" for most cases - and write your own helper if it isn't. Or bring xEditor out of 2006.

    const htmlProps = {
      className: 'sc-link-wrapper',
      dangerouslySetInnerHTML: {
        __html: markup,
      },
      ...otherProps,
      key: 'editable',
    };

    resultTags.push(<span {...htmlProps} />);

    // don't render normal link tag when editing, if no children exist
    // this preserves normal-ish behavior if not using a link body (no hacks required)
    if (!children) {
      return resultTags[0];
    }
  }

  const link = (field as LinkFieldValue).href ? field : field.value;

  if (!link || !link.href) return null;

  const text = showLinkTextWithChildrenPresent || !children ? link.text || link.href : null;

  if (link.target === '_blank' && !link.rel) {
    // information disclosure attack prevention keeps target blank site from getting ref to window.opener
    otherProps.rel = 'noopener noreferrer';
  }

  resultTags.push(
    <NextLink href={link.href} key="link" prefetch={prefetch} locale={locale}>
      <a title={link.title} target={link.target} className={link.class} {...otherProps}>
        {text}
        {children}
      </a>
    </NextLink>
  );

  return <>{resultTags}</>;
};

Link.defaultProps = {
	editable: true
}

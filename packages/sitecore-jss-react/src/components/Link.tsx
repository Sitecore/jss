import React, { ReactElement, RefAttributes, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { withFieldMetadata } from '../enhancers/withFieldMetadata';

export interface LinkFieldValue {
  [attributeName: string]: unknown;
  href?: string;
  className?: string;
  class?: string;
  title?: string;
  target?: string;
  text?: string;
  anchor?: string;
  querystring?: string;
  linktype?: string;
}

export interface LinkField {
  value: LinkFieldValue;
  editableFirstPart?: string;
  editableLastPart?: string;
}

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  RefAttributes<HTMLAnchorElement> & {
    /** The link field data. */
    field: (LinkField | LinkFieldValue) & { metadata?: { [key: string]: unknown } };
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
  };

export const Link: React.FC<LinkProps> = withFieldMetadata<LinkProps, HTMLAnchorElement>(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLAnchorElement, LinkProps>(
    ({ field, editable = true, showLinkTextWithChildrenPresent, ...otherProps }, ref) => {
      const children = otherProps.children as React.ReactNode;
      const dynamicField: LinkField | LinkFieldValue = field;

      if (
        !field ||
        (!dynamicField.editableFirstPart &&
          !dynamicField.value &&
          !(dynamicField as LinkFieldValue).href)
      ) {
        return null;
      }

      const resultTags: ReactElement<unknown>[] = [];

      // EXPERIENCE EDITOR RENDERING
      if (editable && dynamicField.editableFirstPart) {
        const markup = (dynamicField.editableFirstPart as string) + dynamicField.editableLastPart;

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

        // Exclude children, since 'dangerouslySetInnerHTML' and 'children' can't be set together
        // and children will be added as a sibling
        delete htmlProps.children;

        resultTags.push(<span {...htmlProps} />);

        // don't render normal link tag when editing, if no children exist
        // this preserves normal-ish behavior if not using a link body (no hacks required)
        if (!children) {
          return resultTags[0];
        }
      }

      // handle link directly on field for forgetful devs
      const link = (dynamicField as LinkFieldValue).href
        ? (field as LinkFieldValue)
        : (dynamicField as LinkField).value;

      if (!link) {
        return null;
      }

      const anchor = link.linktype !== 'anchor' && link.anchor ? `#${link.anchor}` : '';
      const querystring = link.querystring ? `?${link.querystring}` : '';

      const anchorAttrs: { [attr: string]: unknown } = {
        href: `${link.href}${querystring}${anchor}`,
        className: link.class,
        title: link.title,
        target: link.target,
      };

      if (anchorAttrs.target === '_blank' && !anchorAttrs.rel) {
        // information disclosure attack prevention keeps target blank site from getting ref to window.opener
        anchorAttrs.rel = 'noopener noreferrer';
      }

      const linkText = showLinkTextWithChildrenPresent || !children ? link.text || link.href : null;

      resultTags.push(
        React.createElement(
          'a',
          { ...anchorAttrs, ...otherProps, key: 'link', ref },
          linkText,
          children
        )
      );

      return <React.Fragment>{resultTags}</React.Fragment>;
    }
  ),
  true
);

export const LinkPropTypes = {
  field: PropTypes.oneOfType([
    PropTypes.shape({
      href: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
    }),
    PropTypes.shape({
      value: PropTypes.object,
      editableFirstPart: PropTypes.string,
      editableLastPart: PropTypes.string,
    }),
  ]).isRequired,
  editable: PropTypes.bool,
  showLinkTextWithChildrenPresent: PropTypes.bool,
};

Link.propTypes = LinkPropTypes;

Link.displayName = 'Link';

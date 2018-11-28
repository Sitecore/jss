import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';

export interface LinkFieldValue {
  href?: string;
  className?: string;
  title?: string;
  target?: string;
  [attributeName: string]: any;
}

export interface LinkField {
  value: LinkFieldValue;
  editableFirstPart?: string;
  editableLastPart?: string;
}

export type LinkProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
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
};

export const Link: React.SFC<LinkProps> = ({ field, editable, children, showLinkTextWithChildrenPresent, ...otherProps }) => {
  const dynamicField: any = field;

  if (!field || (!dynamicField.editableFirstPart && !dynamicField.value && !dynamicField.href)) {
    return null;
  }

  const resultTags: ReactElement<any>[] = [];

  // EXPERIENCE EDITOR RENDERING
  if (editable && dynamicField.editableFirstPart) {
    let markup = dynamicField.editableFirstPart + dynamicField.editableLastPart;

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

  // handle link directly on field for forgetful devs
  const link = dynamicField.href ? field : dynamicField.value;
  if (!link) {
    return null;
  }

  const anchorAttrs: any = {
    href: link.href,
    className: link.class,
    title: link.title,
    target: link.target,
  };

  if (anchorAttrs.target === '_blank' && !anchorAttrs.rel) {
    // information disclosure attack prevention keeps target blank site from getting ref to window.opener
    anchorAttrs.rel = 'noopener noreferrer';
  }

  let linkText = showLinkTextWithChildrenPresent || !children ? (link.text || link.href) : null;

  resultTags.push(React.createElement('a', { ...anchorAttrs, ...otherProps, key: 'link' }, linkText, children));

  return <React.Fragment>{resultTags}</React.Fragment>;
};

Link.propTypes = {
  field: PropTypes.oneOfType([
    PropTypes.shape({
      href: PropTypes.string,
    }),
    PropTypes.shape({
      value: PropTypes.object,
      editableFirstPart: PropTypes.string,
      editableLastPart: PropTypes.string,
    }),
  ]),
  editable: PropTypes.bool,
};

Link.defaultProps = {
  editable: true,
};

Link.displayName = 'Link';

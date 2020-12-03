import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import {
  Link as ReactLink,
  LinkFieldValue,
  LinkProps as ReactLinkProps,
  LinkPropTypes,
} from '@sitecore-jss/sitecore-jss-react';

export type LinkProps = ReactLinkProps & {
	/**
	 * If `href` starts with `internalLinkMatcher` value, then it's internal link and NextLink will be rendered
	 * @defaultvalue '/'
	 */
	internalLinkMatcher?: string;
};

export const Link = (props: LinkProps) => {
  const { editable, internalLinkMatcher = '/', showLinkTextWithChildrenPresent, ...htmlLinkProps } = props;

  const value = (props.field as LinkFieldValue).href ? props.field : props.field.value;
  const hasValidHref = value && value.href;
  const isEditing = editable && (props.field as LinkFieldValue).editable;

  if (hasValidHref && !isEditing) {
    const text =
      showLinkTextWithChildrenPresent || !props.children ? value.text || value.href : null;

    // determine if a link is a route or not.
    if (value.href.startsWith(internalLinkMatcher)) {
      return (
        <NextLink href={value.href} key="link" locale={false}>
          <a title={value.title} target={value.target} className={value.class} {...htmlLinkProps}>
            {text}
            {props.children}
          </a>
        </NextLink>
      );
    }
  }

  return <ReactLink {...props} />;
};

Link.defaultProps = {
  editable: true,
};

Link.displayName = 'NextLink';

Link.propTypes = {
	internalLinkMatcher: PropTypes.string,
	...LinkPropTypes
};

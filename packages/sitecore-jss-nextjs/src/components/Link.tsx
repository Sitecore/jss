import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import {
  Link as ReactLink,
  LinkFieldValue,
  LinkField,
  LinkProps as ReactLinkProps,
  LinkPropTypes,
} from '@sitecore-jss/sitecore-jss-react';

export type LinkProps = ReactLinkProps & {
  /**
   * If `href` match with `internalLinkMatcher` regexp, then it's internal link and NextLink will be rendered
   * @default /^\//g
   */
  internalLinkMatcher?: RegExp;
};

export const Link = (props: LinkProps): JSX.Element => {
  const {
    editable,
    internalLinkMatcher = /^\//g,
    showLinkTextWithChildrenPresent,
    ...htmlLinkProps
  } = props;

  const value = ((props.field as LinkFieldValue).href
    ? props.field
    : (props.field as LinkField).value) as LinkFieldValue;
  const { href } = value;
  const isEditing = editable && (props.field as LinkFieldValue).editable;

  if (href && !isEditing) {
    const text =
      showLinkTextWithChildrenPresent || !props.children ? value.text || value.href : null;

    // determine if a link is a route or not.
    if (internalLinkMatcher.test(href)) {
      return (
        <NextLink href={href} key="link" locale={false}>
          <a title={value.title} target={value.target} className={value.class} {...htmlLinkProps}>
            {text}
            {props.children}
          </a>
        </NextLink>
      );
    }
  }

  // prevent passing internalLinkMatcher as it is an invalid DOM element prop
  const reactLinkProps = { ...props };
  delete reactLinkProps.internalLinkMatcher;

  return <ReactLink {...reactLinkProps} />;
};

Link.defaultProps = {
  editable: true,
};

Link.displayName = 'NextLink';

Link.propTypes = {
  internalLinkMatcher: PropTypes.instanceOf(RegExp),
  ...LinkPropTypes,
};

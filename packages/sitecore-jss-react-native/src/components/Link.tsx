import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import HtmlView from 'react-native-htmlview';
import { Text, View, Linking, TouchableWithoutFeedback } from 'react-native';

export interface LinkFieldValue {
  [attributeName: string]: unknown;
  href?: string;
  text?: string;
}

export interface LinkField {
  value: LinkFieldValue;
  editableFirstPart?: string;
  editableLastPart?: string;
}

export type LinkProps = {
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

  style?: { [attr: string]: unknown };
  textStyle?: { [attr: string]: unknown };
};

export const Link: React.FunctionComponent<LinkProps> = ({
  field,
  editable,
  children,
  showLinkTextWithChildrenPresent,
  style,
  textStyle,
  ...otherProps
}) => {
  const dynamicField = field;

  if (!field || (!dynamicField.editableFirstPart && !dynamicField.value && !(dynamicField as LinkFieldValue).href)) {
    return null;
  }

  const resultTags: ReactElement<unknown>[] = [];

  const { editableFirstPart, editableLastPart } = dynamicField as LinkField;

  // EXPERIENCE EDITOR RENDERING
  if (editable && editableFirstPart) {
    const markup: string = editableFirstPart + editableLastPart;

    // in an ideal world, we'd pre-render React children here and inject them between editableFirstPart and editableLastPart.
    // However, we cannot combine arbitrary unparsed HTML (innerHTML) based components with actual vDOM components (the children)
    // because the innerHTML is not parsed - it'd make a discontinuous vDOM. So, we'll go for the next best compromise of rendering the link field and children separately
    // as siblings. Should be "good enough" for most cases - and write your own helper if it isn't. Or bring xEditor out of 2006.

    resultTags.push(<HtmlView value={markup} />);

    // don't render normal link tag when editing, if no children exist
    // this preserves normal-ish behavior if not using a link body (no hacks required)
    if (!children) {
      return resultTags[0];
    }
  }

  // handle link directly on field for forgetful devs
  const link = ((dynamicField as LinkFieldValue).href
    ? field
    : (dynamicField as LinkField).value) as LinkFieldValue;

  if (!link) {
    return null;
  }

  const linkText = showLinkTextWithChildrenPresent || !children ? link.text || link.href : null;

  resultTags.push(
    <TouchableWithoutFeedback onPress={() => link.href && Linking.openURL(link.href)} key="link" {...otherProps}>
      <View style={style}>
        {linkText && <Text style={textStyle}>{linkText}</Text>}
        {children}
      </View>
    </TouchableWithoutFeedback>
  );

  return <View>{resultTags}</View>;
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
    })
  ]).isRequired,
  editable: PropTypes.bool,
};

Link.defaultProps = {
  editable: true,
};

Link.displayName = 'Link';

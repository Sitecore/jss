import React, { ComponentType, forwardRef } from 'react';
import { FieldMetadataValue } from '@sitecore-jss/sitecore-jss/layout';
import PropTypes from 'prop-types';

interface FieldMetadataProps {
  metadata: FieldMetadataValue;
  children: React.ReactNode;
}

/**
 * The component which renders field metadata markup
 * @param {FieldMetadataProps} props the props of the component
 * @returns metadata markup wrapped around children
 */
const FieldMetadata = (props: FieldMetadataProps): JSX.Element => {
  const data = JSON.stringify(props.metadata);
  const attributes = {
    type: 'text/sitecore',
    chrometype: 'field',
    className: 'scpm',
  };
  const codeOpenAttributes = { ...attributes, kind: 'open' };
  const codeCloseAttributes = { ...attributes, kind: 'close' };

  return (
    <>
      <code {...codeOpenAttributes}>{data}</code>
      {props.children}
      <code {...codeCloseAttributes}></code>
    </>
  );
};

/**
 * Wraps the field component with metadata markup intended to be used for chromes hydration in Pages
 * @param {ComponentType<FieldComponentProps>} FieldComponent the field component
 * @param {boolean} isForwardRef set to 'true' if forward reference is needed
 */
export function withFieldMetadata<FieldComponentProps extends Record<string, any>>(
  FieldComponent: ComponentType<FieldComponentProps>,
  isForwardRef = false
) {
  if (isForwardRef) {
    // eslint-disable-next-line react/display-name
    return forwardRef(
      ({ ...props }: FieldComponentProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
        const metadata = (props as any).field?.metadata;

        if (!metadata || !props?.editable) {
          return <FieldComponent {...props} ref={ref} />;
        }

        return (
          <FieldMetadata metadata={metadata}>
            <FieldComponent {...props} ref={ref} />
          </FieldMetadata>
        );
      }
    );
  }
  // eslint-disable-next-line react/display-name
  return ({ ...props }: FieldComponentProps) => {
    const metadata = (props as any).field?.metadata;

    if (!metadata || !props?.editable) {
      return <FieldComponent {...props} />;
    }

    return (
      <FieldMetadata metadata={metadata}>
        <FieldComponent {...props} />
      </FieldMetadata>
    );
  };
}

export const FieldMetadataPropTypes = PropTypes.shape({
  contextItem: PropTypes.shape({
    id: PropTypes.string,
    language: PropTypes.string,
    revision: PropTypes.string,
    version: PropTypes.number,
  }),
  fieldId: PropTypes.string,
  fieldType: PropTypes.string,
  rawValue: PropTypes.string,
});

import React, { ComponentType, forwardRef } from 'react';
import { FieldMetadata } from '@sitecore-jss/sitecore-jss/utils';
import PropTypes from 'prop-types';

interface MetadataWrapperProps {
  metadata: FieldMetadata;
  children: React.ReactNode;
}

const MetadataWrapper = (props: MetadataWrapperProps): JSX.Element => {
  const data = JSON.stringify(props.metadata);
  const defaultAttributes = {
    type: 'text/sitecore',
    chrometype: 'field',
    className: 'scpm',
  };
  const codeOpenAttributes = { ...defaultAttributes, kind: 'open' };
  const codeCloseAttributes = { ...defaultAttributes, kind: 'close' };

  return (
    <>
      <code {...codeOpenAttributes}>{data}</code>
      {props.children}
      <code {...codeCloseAttributes}></code>
    </>
  );
};

/**
 * Wraps the field component with metadata markup intended to be used for chromes hydartion
 * @param {ComponentType<FieldComponentProps>} FieldComponent the field component
 */
export function withMetadata<FieldComponentProps extends Record<string, any>>(
  FieldComponent: ComponentType<FieldComponentProps>
) {
  // eslint-disable-next-line react/display-name
  return forwardRef(
    ({ ...props }: FieldComponentProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
      const metadata = (props as any).field?.metadata;

      if (!metadata || !props?.editable) {
        return <FieldComponent {...props} ref={ref} />;
      }

      return (
        <MetadataWrapper metadata={metadata}>
          <FieldComponent {...props} ref={ref} />
        </MetadataWrapper>
      );
    }
  );
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

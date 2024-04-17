import React, { ComponentType, forwardRef } from 'react';

/** The field metadata */
export interface FieldMetadata {
  contextItem?: FieldMetadataContextItem;
  fieldId?: string;
  fieldType?: string;
  rawValue?: string;
}

/** The field's context item metadata  */
export interface FieldMetadataContextItem {
  id?: string;
  language?: string;
  revision?: string;
  version?: number;
}

interface MetadataWrapperProps {
  metadata: any;
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
  return forwardRef(({ ...props }: FieldComponentProps, ref: any) => {
    const metadata = (props as any)?.field?.metadata;

    if (!props?.field || !metadata || !props?.editable) {
      return <FieldComponent {...props} ref={ref} />;
    }

    return (
      <MetadataWrapper metadata={metadata}>
        <FieldComponent {...props} ref={ref} />
      </MetadataWrapper>
    );
  });
}

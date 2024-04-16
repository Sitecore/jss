import React, { ComponentType, forwardRef } from 'react';

/** The field metadata */
export interface FieldMetadata {
  contextItem?: FieldMetadataContextItem | null | undefined;
  fieldId?: string | null | undefined;
  fieldType?: string | null | undefined;
  rawValue?: string | null | undefined;
}

/** The field's context item metadata  */
export interface FieldMetadataContextItem {
  id?: string | null | undefined;
  language?: string | null | undefined;
  revision?: string | null | undefined;
  version?: number | null | undefined;
}

export interface FieldMetadataWrapperProps {
  metadata: any;
  children: React.ReactNode;
}

export const FieldMetadataWrapper = (props: FieldMetadataWrapperProps): JSX.Element => {
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
export function withFieldMetadataWrapper<FieldComponentProps extends Record<string, any>>(
  FieldComponent: ComponentType<FieldComponentProps>
) {
  // eslint-disable-next-line react/display-name
  return forwardRef(({ ...props }: FieldComponentProps, ref: any) => {
    const metadata = (props as any)?.field?.metadata;

    if (!props?.field) {
      return null;
    }

    if (!metadata || !props.editable) {
      return <FieldComponent {...props} ref={ref} />;
    }

    return (
      <FieldMetadataWrapper metadata={metadata}>
        <FieldComponent {...props} ref={ref} />
      </FieldMetadataWrapper>
    );
  });
}

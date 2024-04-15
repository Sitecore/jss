import React, { FunctionComponent } from 'react';

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

export interface FieldMetadataComponentProps {
  htmlAttributes?: {
    type: string;
    chrometype: string;
    className: string;
  };
  data: string;
}

const defaultAttributes = {
  type: 'text/sitecore',
  chrometype: 'field',
  className: 'scpm',
};

export const FieldMetadataComponent: FunctionComponent<FieldMetadataComponentProps> = (
  props: React.PropsWithChildren<FieldMetadataComponentProps>
) => {
  const attributes = {
    ...defaultAttributes,
    ...props.htmlAttributes,
  };
  const codeOpenAttributes = { ...attributes, kind: 'open' };
  const codeCloseAttributes = { ...attributes, kind: 'close' };

  return (
    <React.Fragment>
      <code {...codeOpenAttributes}>{props.data}</code>
      {props.children}
      <code {...codeCloseAttributes}></code>
    </React.Fragment>
  );
};

export const getFieldMetadataMarkup = (metadata: FieldMetadata, children: any) => {
  const props: FieldMetadataComponentProps = {
    data: JSON.stringify(metadata),
  };

  return <FieldMetadataComponent {...props}>{children}</FieldMetadataComponent>;
};

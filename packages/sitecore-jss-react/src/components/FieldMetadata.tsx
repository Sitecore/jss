import React, { FunctionComponent } from 'react';

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

  return (
    <React.Fragment>
      <code {...attributes} kind="open">
        {props.data}
      </code>
      {props.children}
      <code {...attributes} kind="close"></code>
    </React.Fragment>
  );
};

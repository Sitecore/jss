import { LinkField, TextField } from './rendering-field';

interface LayoutServiceLinkField {
  field: {
    link: LinkField;
  };
}

export interface SxaLinkListFields {
  data: {
    datasource: {
      children: {
        results: LayoutServiceLinkField[];
      };
      field: {
        title: TextField;
      };
    };
  };
}

export interface SxaTitleSourceItem {
  url: {
    path: string;
    siteName: string;
  };
  field: {
    jsonValue: {
      value: string;
      editable?: string;
      metadata?: { [key: string]: unknown };
    };
  };
}

export interface SxaTitleFields {
  data: {
    datasource: SxaTitleSourceItem;
    contextItem: SxaTitleSourceItem;
  };
}

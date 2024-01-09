import type { Field } from '@sitecore-jss/sitecore-jss/layout';

// gql response types
export type IQueryResult<T> = {
  contextItem: {
    id: string;
    pageTitle: IPageTitle;
    children: {
      results: T[];
    };
  };
  datasource: IDatasource;
  errors: {};
};

export type IResultsItem = {
  id: string;
  pageTitle: IPageTitle;
  url: {
    path: string;
  };
};

export type IDatasource = {
  id: string;
  name: string;
  sample1: {
    value: string;
    jsonValue: Field<string>;
  };
  sample2: {
    text: string;
    url: string;
    target: string;
    definition: {
      type: string;
      shared: string;
    };
    jsonValue: Field<string>;
  };
};

export type IPageTitle = {
  value: string;
  jsonValue: Field<string>;
};



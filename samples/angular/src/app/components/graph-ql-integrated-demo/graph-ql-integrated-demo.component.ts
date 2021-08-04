import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

interface QueryResult {
  data: {
    datasource: DataSource;
    contextItem: {
      id: string;
      children: ItemSearchResults;
      pageTitle: {
        value: string;
      };
    };
  };
};

type DataSource = {
  sample1: {
    jsonValue:{
      value:string;
    };
    value: string;
  };
  sample2: {
    definition: {
      type: string;
      shared: boolean;
    };
    jsonValue: {
      value: {
        href: string;
        linktype: string;
        target: string;
        text: string;
        url: string;
      };
    };
    target: string;
    text: string;
    url: string;
  };
  name: string;
  id: string;
};

type Item = {
  id: string;
  url: {
    path: string;
  };
  pageTitle: {
    value: string;
    jsonValue: {
      value: string;
    };
  };
};

type ItemSearchResults = {
  results: Item[];
};

@Component({
  selector: 'app-graph-ql-integrated-demo',
  templateUrl: './graph-ql-integrated-demo.component.html',
})
export class GraphQLIntegratedDemoComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  queryResult: QueryResult;

  constructor() {}

  ngOnInit() {
    this.queryResult = (this.rendering.fields as unknown) as QueryResult;
  }
}

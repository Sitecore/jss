import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

interface QueryResult {
  data: {
    datasource: {
      sample1: {
        jss: string;
        value: string;
      };
      sample2: {
        definition: {
          type: string;
          shared: boolean;
        };
        jss: string;
        target: string;
        text: string;
        url: string;
      };
      name: string;
      id: string;
    };
    contextItem: {
      id: string;
      pageTitle: {
        value: string;
      };
      children: unknown[];
    };
  };
}

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

import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { ApolloQueryResult } from 'apollo-client';

@Component({
  selector: 'app-graph-ql-integrated-demo',
  templateUrl: './graph-ql-integrated-demo.component.html',
})
export class GraphQLIntegratedDemoComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  queryResult: ApolloQueryResult<any>;

  constructor() { }

  ngOnInit() {
    this.queryResult = this.rendering.fields as any;
  }
}

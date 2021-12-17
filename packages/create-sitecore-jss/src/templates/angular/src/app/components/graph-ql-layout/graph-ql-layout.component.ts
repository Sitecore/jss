import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { JssContextService } from '../../jss-context.service';

@Component({
  selector: 'app-graph-ql-layout',
  templateUrl: './graph-ql-layout.component.html',
})
export class GraphQLLayoutComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  disconnectedMode: boolean;

  constructor(private contextService: JssContextService) { }

  ngOnInit() {
    this.disconnectedMode = this.contextService.state.value.sitecore.route.itemId === 'available-in-connected-mode';
  }
}

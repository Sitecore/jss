import { Component, OnInit, Input, inject } from '@angular/core';
import { ComponentRendering, JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { JssContextService } from '../../jss-context.service';

@Component({
  selector: 'app-graph-ql-layout',
  templateUrl: './graph-ql-layout.component.html',
  imports: [JssModule]
})
export class GraphQLLayoutComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  disconnectedMode: boolean;
  private contextService = inject(JssContextService);

  ngOnInit() {
    this.disconnectedMode = this.contextService.stateValue.sitecore.route.itemId === 'available-in-connected-mode';
  }
}

import { Component, OnInit, OnDestroy, Input, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { JssContextService } from '../../jss-context.service';
import { ComponentRendering, JssModule, LayoutServiceData } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-styleguide-custom-route-type',
  templateUrl: './styleguide-custom-route-type.component.html',
  imports: [JssModule]
})
export class StyleguideCustomRouteTypeComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  contextFields: { [name: string]: unknown };

  private contextSubscription: Subscription;
  private jssContext = inject(JssContextService);

  ngOnInit() {
    this.contextSubscription = this.jssContext.state.subscribe((state: LayoutServiceData) => {
      this.contextFields = state.sitecore.route.fields;
    });
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }
}

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { JssContextService } from '../../jss-context.service';
import { Field, ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-styleguide-route-fields',
  templateUrl: './styleguide-route-fields.component.html',
})
export class StyleguideRouteFieldsComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  contextFields: { [name: string]: Field };

  private contextSubscription: Subscription;

  constructor(private jssContext: JssContextService) { }

  ngOnInit() {
    this.contextSubscription = this.jssContext.state.subscribe((state) => {
      this.contextFields = state.sitecore.route.fields;
    });
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }
}

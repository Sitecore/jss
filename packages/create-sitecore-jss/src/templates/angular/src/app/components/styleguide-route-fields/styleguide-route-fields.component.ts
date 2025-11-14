import { Component, OnInit, OnDestroy, Input, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { JssContextService } from '../../jss-context.service';
import { ComponentRendering, JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { StyleguideSpecimenComponent } from '../shared/styleguide-specimen/styleguide-specimen.component';

@Component({
  selector: 'app-styleguide-route-fields',
  templateUrl: './styleguide-route-fields.component.html',
  imports: [JssModule, StyleguideSpecimenComponent]
})
export class StyleguideRouteFieldsComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  contextFields: { [name: string]: unknown };

  private contextSubscription: Subscription;
  private jssContext = inject(JssContextService);

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

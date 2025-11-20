/* eslint-disable no-console */
import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { JssContextService } from '../../jss-context.service';
import { StyleguideSpecimenComponent } from '../shared/styleguide-specimen/styleguide-specimen.component';
import { Subscription } from 'rxjs';

/**
 * Demonstrates gaining access to the route-level Sitecore Context from
 * within other components.
 *
 * NOTE: if not using async pipe, ensure you unsubscribe from the context
 * in ngOnDestroy(). See styleguide-layout-tabs for an example.
 */

@Component({
  selector: 'app-styleguide-sitecore-context',
  templateUrl: './styleguide-sitecore-context.component.html',
  imports: [StyleguideSpecimenComponent]
})
export class StyleguideSitecoreContextComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  private contextSubscription: Subscription;

  // inject the JssContextService, which maintains the current Sitecore Context
  private jssContext = inject(JssContextService);

  ngOnInit() {
    this.contextSubscription = this.jssContext.state.subscribe((state: unknown) => {
      console.debug('The current Sitecore Context in styleguide-sitecore-context.component.ts is...', state);
    });
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }
}

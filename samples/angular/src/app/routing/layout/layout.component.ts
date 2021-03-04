/* eslint-disable no-shadow */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { JssState } from '../../JssState';
import { ActivatedRoute } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { RouteData, Field, LayoutServiceContextData } from '@sitecore-jss/sitecore-jss-angular';
import { Subscription } from 'rxjs';

enum LayoutState {
  Layout,
  NotFound,
  Error
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit, OnDestroy {
  route: RouteData;
  state: LayoutState;
  LayoutState = LayoutState;
  subscription: Subscription;
  errorContextData: LayoutServiceContextData;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly meta: MetaService,
  ) { }

  ngOnInit() {
    // route data is populated by the JssRouteResolver
    this.subscription = this.activatedRoute.data.subscribe((data: { jssState: JssState }) => {
      if (!data.jssState) {
        this.state = LayoutState.NotFound;
        return;
      }

      if (data.jssState.sitecore && data.jssState.sitecore.route) {
        this.route = data.jssState.sitecore.route;
        this.setMetadata(this.route.fields);
        this.state = LayoutState.Layout;
      }

      if (data.jssState.routeFetchError) {
        if (data.jssState.routeFetchError.status >= 400 && data.jssState.routeFetchError.status < 500) {
          this.state = LayoutState.NotFound;
        } else {
          this.state = LayoutState.Error;
        }

        this.errorContextData = data.jssState.routeFetchError.data && data.jssState.routeFetchError.data.sitecore;
      }
    });
  }

  ngOnDestroy() {
    // important to unsubscribe when the component is destroyed
    this.subscription.unsubscribe();
  }

  setMetadata(routeFields: { [name: string]: Field }) {
    // set page title, if it exists
    if (routeFields && routeFields.pageTitle) {
      this.meta.setTitle(routeFields.pageTitle.value as string || 'Page');
    }
  }

  onPlaceholderLoaded(placeholderName: string) {
    // you may optionally hook to the loaded event for a placeholder,
    // which can be useful for analytics and other DOM-based things that need to know when a placeholder's content is available.
    console.log(`layout.component.ts: placeholder component fired loaded event for the ${placeholderName} placeholder`);
  }
}

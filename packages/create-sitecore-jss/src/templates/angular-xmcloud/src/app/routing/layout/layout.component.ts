/* eslint-disable no-shadow, no-console */
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  RouteData,
  Field,
  LayoutServiceContextData,
  getContentStylesheetLink,
} from '@sitecore-jss/sitecore-jss-angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JssState } from '../../JssState';
import { JssMetaService } from '../../jss-meta.service';
import { JssLinkService } from '../../jss-link.service';
import { environment as env } from '../../../environments/environment';

enum LayoutState {
  Layout,
  NotFound,
  Error,
}

interface RouteFields {
  [name: string]: unknown;
  pageTitle?: Field<string>;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit, OnDestroy {
  route: RouteData<RouteFields>;
  state: LayoutState;
  LayoutState = LayoutState;
  subscription: Subscription;
  errorContextData: LayoutServiceContextData;
  mainClassPageEditing: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly meta: JssMetaService,
    private linkService: JssLinkService
  ) {}

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
        this.mainClassPageEditing = data.jssState.sitecore.context.pageEditing
          ? 'editing-mode'
          : 'prod-mode';

        const contentStyles = getContentStylesheetLink(
          { sitecore: data.jssState.sitecore },
          env.sitecoreEdgeContextId,
          env.sitecoreEdgeUrl
        );

        if (contentStyles) {
          this.linkService.addHeadLinks(contentStyles);
        }
      }

      if (data.jssState.routeFetchError) {
        if (
          data.jssState.routeFetchError.status >= 400 &&
          data.jssState.routeFetchError.status < 500
        ) {
          this.state = LayoutState.NotFound;
        } else {
          this.state = LayoutState.Error;
        }

        this.errorContextData =
          data.jssState.routeFetchError.data && data.jssState.routeFetchError.data.sitecore;
      }
    });
  }

  ngOnDestroy() {
    // important to unsubscribe when the component is destroyed
    this.subscription.unsubscribe();
  }

  setMetadata(routeFields: RouteFields) {
    // set page title, if it exists
    if (routeFields && routeFields.pageTitle) {
      this.meta.setTitle(routeFields.pageTitle.value || 'Page');
    }
  }

  onPlaceholderLoaded(_placeholderName: string) {
    // you may optionally hook to the loaded event for a placeholder,
    // which can be useful for analytics and other DOM-based things that need to know when a placeholder's content is available.
  }
}

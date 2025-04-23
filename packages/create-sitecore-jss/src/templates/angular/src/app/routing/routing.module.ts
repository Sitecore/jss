import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment, UrlMatchResult } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { jssRouteResolver } from './jss-route-resolver.service';
import { JssRouteBuilderService } from './jss-route-builder.service';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationComponent } from './navigation/navigation.component';
import { TranslateModule } from '@ngx-translate/core';
import { ScriptsModule } from './scripts/scripts.module';

export function jssRouteMatcher(url: UrlSegment[]): UrlMatchResult {
  // use the route builder to parse out language / server route
  const routeParser = new JssRouteBuilderService();
  const route = routeParser.parseRouteUrl(url.map((segment) => segment.toString()));
  if (route == null) {
    return null;
  }

  // convert props to route parameters
  const posParams: { [key: string]: UrlSegment } = {};
  Object.keys(route).forEach((key) => {
    posParams[key] = new UrlSegment(route[key], null);
  });

  return {
    consumed: url,
    posParams,
  };
}

const routes: Routes = [
  { path: 'NotFound', component: NotFoundComponent },
  { path: 'ServerError', component: ServerErrorComponent },
  {
    // matcher is effectively a catch-all route
    matcher: jssRouteMatcher,
    component: LayoutComponent,
    resolve: {
      jssState: jssRouteResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      initialNavigation: 'enabledBlocking',
    }),
    JssModule,
    TranslateModule,
    BrowserModule,
    ScriptsModule,
  ],
  exports: [RouterModule, TranslateModule],
  declarations: [NotFoundComponent, ServerErrorComponent, LayoutComponent, NavigationComponent],
  providers: [JssRouteBuilderService],
})
export class RoutingModule {}

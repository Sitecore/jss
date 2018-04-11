import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment, UrlMatchResult } from '@angular/router';
import { JssRouteComponent } from './components/jss-route/jss-route.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { JssRouteResolver } from './jss-route-resolver.service';
import { JssRouteBuilderService } from './jss-route-builder.service';

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
    posParams
  };
}

const routes: Routes = [
  { path: 'NotFound', component: NotFoundComponent },
  { path: 'ServerError', component: ServerErrorComponent },
  {
    // matcher is effectively a catch-all route
    matcher: jssRouteMatcher,
    component: JssRouteComponent,
    resolve: {
      jssState: JssRouteResolver
    },
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    JssRouteResolver,
    JssRouteBuilderService,
  ]
})
export class AppRoutingModule { }

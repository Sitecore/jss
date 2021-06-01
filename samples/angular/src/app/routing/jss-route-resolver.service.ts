import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { JssContextService } from '../jss-context.service';
import { JssState } from '../JssState';
import { Observable } from 'rxjs';
import { isEditorActive } from '@sitecore-jss/sitecore-jss-angular';

@Injectable()
export class JssRouteResolver implements Resolve<JssState> {
  constructor(
    private jssService: JssContextService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JssState> {
    // in experience editor, we need to reload to avoid confusing the editor ribbon
    if (isEditorActive() && window) {
      const currentLocation = window.location.pathname + window.location.search + window.location.hash;
      if (currentLocation !== state.url) {
        window.location.assign(state.url);
        return null;
      }
    }

    // route params are created by custom route matcher in app-routing.module
    return this.jssService.changeRoute(route.params.serverRoute, route.params.language);
  }
}

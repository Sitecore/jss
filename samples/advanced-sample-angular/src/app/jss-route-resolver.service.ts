import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { JssState, JssService } from './jss.service';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';
import { LayoutServiceError } from './layoutService/layout.service';
import { isExperienceEditorActive } from '@sitecore-jss/sitecore-jss-angular';

@Injectable()
export class JssRouteResolver implements Resolve<JssState> {
  constructor(
    private jssService: JssService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JssState> {
    // in experience editor, we need to reload to avoid confusing the editor ribbon
    if (isExperienceEditorActive() && window) {
      const currentLocation = window.location.pathname + window.location.search;
      if (currentLocation !== state.url) {
        window.location.assign(state.url);
        return null;
      }
    }

    // route params are created by custom route matcher in app-routing.module
    return this.jssService.changeRoute(route.params.serverRoute, route.params.language).pipe(
      map(jssState => {
        if (jssState) {
          return jssState;
        }
        this.router.navigate(['/NotFound']);
        return null;
      }),
      catchError((error: LayoutServiceError) => {
        if (error.status >= 400 && error.status < 500) {
          this.router.navigate(['/NotFound']);
        } else {
          this.router.navigate(['/ServerError']);
        }
        return observableOf(null);
      })
    );
  }
}

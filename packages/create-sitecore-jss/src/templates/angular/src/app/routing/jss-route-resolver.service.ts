import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { JssContextService } from '../jss-context.service';
import { JssState } from '../JssState';
import { Observable } from 'rxjs';

@Injectable()
export class JssRouteResolver implements Resolve<JssState> {
  constructor(
    private jssService: JssContextService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<JssState> {
    // route params are created by custom route matcher in app-routing.module
    return this.jssService.changeRoute(route.params.serverRoute, route.params.language);
  }
}

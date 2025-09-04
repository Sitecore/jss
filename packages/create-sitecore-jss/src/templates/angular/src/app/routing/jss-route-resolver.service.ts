import { inject } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { JssContextService } from '../jss-context.service';
import { JssState } from '../JssState';

export const jssRouteResolver: ResolveFn<JssState> = (route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  // route params are created by custom route matcher in app-routing.module
  const jssService = inject(JssContextService);
  return jssService.changeRoute(route.params.serverRoute, route.params.language);
};

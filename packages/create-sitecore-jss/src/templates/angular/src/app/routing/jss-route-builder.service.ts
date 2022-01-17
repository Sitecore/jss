import { environment as env } from '../../environments/environment';
import { Injectable } from '@angular/core';

export class JssRoute {
  [key: string]: string;
  language: string;
  serverRoute: string;
}

@Injectable()
export class JssRouteBuilderService {
  buildRouteUrl(route: JssRoute) {
    if (!route.language) {
      route.language = env.defaultLanguage;
    }
    if (!route.serverRoute) {
      route.serverRoute = env.defaultServerRoute;
    }
    return `/${route.language}${route.serverRoute}`;
  }

  parseRouteUrl(url: string[], isSSR?: boolean): JssRoute {
    const route = new JssRoute();
    // In case if we are in SSR, server will extract language from cookies
    route.language = isSSR ? undefined : env.defaultLanguage;
    route.serverRoute = env.defaultServerRoute;

    if (url.length === 0) {
      return route;
    }

    const languageRegex = /^([a-zA-Z]{2})(-[a-zA-Z]{2})?$/; // e.g. 'en' or 'en-GB'
    let languageSegment = url[0].toString();

    if (languageSegment.match(languageRegex)) {
      languageSegment = languageSegment.replace(languageRegex, function(_v, p1, p2) {
        if (p2) {
          // DA-dk -> da-DK
          return p1.toLowerCase() + p2.toUpperCase();
        }

        // EN -> en
        return p1.toLowerCase();
      });

      route.language = languageSegment;
      route.serverRoute = url.length > 1 ? url.slice(1).join('/') : env.defaultServerRoute;
    } else {
      route.serverRoute = url.join('/');
    }
    if (!route.serverRoute.startsWith('/')) {
      route.serverRoute = '/' + route.serverRoute;
    }

    return route;
  }
}

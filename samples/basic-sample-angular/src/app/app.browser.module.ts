import { NgModule } from '@angular/core';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { getRouteData } from './data';
import { JSS_ROUTE_DATA } from './data.token';
import { environment } from '../environments/environment';

export let localRouteData;

if (environment.production) {
  localRouteData = { SC_CONFIG: (window as any).__data };
} else {
  localRouteData = {
    SC_CONFIG: {
      sitecore: {
        context: {
          pageEditing: false
        },
        route: getRouteData('/')
      },
      viewBag: {},
    }
  };
}

@NgModule({
  imports: [
    AppModule
  ],
  providers: [
    { provide: JSS_ROUTE_DATA, useValue: localRouteData }
  ],
  bootstrap: [AppComponent],
})
export class AppBrowserModule { }

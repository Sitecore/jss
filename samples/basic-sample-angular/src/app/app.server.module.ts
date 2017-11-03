import { NgModule, ReflectiveInjector } from '@angular/core';
import { ServerModule, INITIAL_CONFIG } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { JSS_ROUTE_DATA } from './data.token';


@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    ServerModule,
  ],
  providers: [
    { provide: JSS_ROUTE_DATA, useExisting: INITIAL_CONFIG }
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent],
})
export class AppServerModule { }

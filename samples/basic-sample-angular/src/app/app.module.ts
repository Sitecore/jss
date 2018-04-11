import { BrowserModule, BrowserTransferStateModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppJssInfrastructureModule } from './app-jss-infrastructure.module';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { JssRouteComponent } from './components/jss-route/jss-route.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NotFoundComponent,
    ServerErrorComponent,
    JssRouteComponent
  ],
  imports: [
    // withServerTransition is needed to enable universal rendering
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    BrowserTransferStateModule,
    HttpClientModule,
    AppRoutingModule,
    AppJssInfrastructureModule,
    JssModule.withComponents([
      { name: 'Welcome', type: WelcomeComponent }
    ])
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

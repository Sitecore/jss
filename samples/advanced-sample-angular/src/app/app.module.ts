import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MetaModule } from '@ngx-meta/core';

import { AppRoutingModule } from './app-routing.module';
import { AppJssInfrastructureModule } from './app-jss-infrastructure.module';
import { AppComponentsModule } from './app-components.module';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    // withServerTransition is needed to enable universal rendering
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    BrowserTransferStateModule,
    HttpClientModule,
    MetaModule.forRoot(),
    AppRoutingModule,
    AppJssInfrastructureModule,
    AppComponentsModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

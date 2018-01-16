import { BrowserModule, BrowserTransferStateModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { JssService } from './jss.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    // withServerTransition is needed to enable universal rendering
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    BrowserTransferStateModule,
    HttpClientModule,
    JssModule.withComponents([
      { name: 'Welcome', type: WelcomeComponent }
    ])
  ],
  providers: [
    JssService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

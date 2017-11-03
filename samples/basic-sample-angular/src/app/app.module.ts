import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { JssModule } from '@sitecore-jss/sitecore-jss-angular';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    // withServerTransition is needed to enable universal rendering
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    HttpClientModule,
    JssModule.withComponents([
      { name: 'Welcome', type: WelcomeComponent }
    ])
  ]
})
export class AppModule { }

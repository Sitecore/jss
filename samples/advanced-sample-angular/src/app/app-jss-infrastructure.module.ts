import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferState } from '@angular/platform-browser';

import { JssService } from './jss.service';
import { LayoutService } from './layoutService/layout.service';
import { ConnectedLayoutService } from './layoutService/connected-layout.service';
import { DisconnectedLayoutService } from './layoutService/disconnected-layout.service';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JssTranslationClientLoaderService } from './jss-translation-client-loader.service';
import { JssTranslationLoaderService } from './jss-translation-loader.service';

import { SitecoreAuthService } from './sitecore-auth.service';

import { environment } from '../environments/environment';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient, transferState: TransferState) => {
          if (environment.scConnected) {
            return new JssTranslationClientLoaderService(transferState, new JssTranslationLoaderService(http));
          } else {
            return new TranslateHttpLoader(http, '/data/dictionary/');
          }
        },
        deps: [HttpClient, TransferState]
      }
    }),
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    JssService,
    {
      provide: LayoutService,
      useFactory: (httpClient: HttpClient) => {
        if (environment.scConnected) {
          return new ConnectedLayoutService();
        } else {
          return new DisconnectedLayoutService(httpClient);
        }
      },
      deps: [HttpClient]
    },
    SitecoreAuthService
  ],
})
export class AppJssInfrastructureModule { }

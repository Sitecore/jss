import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferState } from '@angular/platform-browser';

import { JssService } from './jss.service';
import { LayoutService } from './layout.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { JssTranslationClientLoaderService } from './jss-translation-client-loader.service';
import { JssTranslationLoaderService } from './jss-translation-loader.service';

import { SitecoreAuthService } from './sitecore-auth.service';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient, transferState: TransferState) => {
          return new JssTranslationClientLoaderService(transferState, new JssTranslationLoaderService(http));
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
        return new LayoutService();
      },
      deps: [HttpClient]
    },
    SitecoreAuthService
  ],
})
export class AppJssInfrastructureModule { }

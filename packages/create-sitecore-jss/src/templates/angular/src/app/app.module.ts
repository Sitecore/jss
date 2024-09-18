import { APP_ID, NgModule, TransferState, PLATFORM_ID } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing/routing.module';
import { JssLayoutService } from './layout/jss-layout.service';
import { AppComponentsModule } from './components/app-components.module';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { JssTranslationClientLoaderService } from './i18n/jss-translation-client-loader.service';
import { JssTranslationLoaderService } from './i18n/jss-translation-loader.service';
import { GraphQLModule } from './jss-graphql.module';
import { JssMetaService } from './jss-meta.service';
import { JssContextService } from './jss-context.service';

@NgModule({
  imports: [
    HttpClientModule,
    GraphQLModule,
    RoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (platformId: object) =>
          new JssTranslationClientLoaderService(new JssTranslationLoaderService(), platformId),
        deps: [PLATFORM_ID, TransferState],
      },
    }),
    AppComponentsModule,
  ],
  providers: [
    // The token is needed in cases when multiple applications are bootstrapped on a page
    { provide: APP_ID, useValue: 'my-app' },
    JssContextService,
    JssLayoutService,
    JssMetaService,

    // IMPORTANT: you must set the base href with this token, not a <base> tag in the HTML.
    // the Sitecore Experience Editor will not work correctly when a base tag is used.
    { provide: APP_BASE_HREF, useValue: '/' },
    // {
    //   provide: 'JSS_SERVER_VIEWBAG',
    //   useFactory: (transferState: TransferState) => {
    //     return transferState.get(jssKey, null);
    //   },
    //   deps: [TransferState],
    // },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

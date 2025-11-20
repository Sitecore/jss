import { NgModule, TransferState } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { JssContextService } from './jss-context.service';
import { JssContextServerSideService } from './jss-context.server-side.service';
import { JssTranslationServerLoaderService } from './i18n/jss-translation-server-loader.service';
import { JSS_SERVER_VIEWBAG } from './src/app/injection-tokens';
import { ViewBag } from './ViewBag';

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    ServerModule,
    TranslateModule.forRoot({
      // <-- *Important* to get translation values server-side
      loader: {
        provide: TranslateLoader,
        useFactory: (
          ssrViewBag: ViewBag,
          transferState: TransferState
        ) => new JssTranslationServerLoaderService(ssrViewBag, transferState),
        deps: [JSS_SERVER_VIEWBAG, TransferState],
      },
    }),
  ],
  providers: [
    // *Important*: Get JSS route data server-side from Sitecore or proxy (server.bundle injection)
    { provide: JssContextService, useClass: JssContextServerSideService },
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent],
})
export class AppServerModule {}

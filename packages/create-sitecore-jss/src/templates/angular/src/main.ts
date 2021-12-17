import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { handleEditorAnchors } from '@sitecore-jss/sitecore-jss-angular';

if (environment.production) {
  enableProdMode();
}

// Waiting for DOMContentLoaded is a temporary workaround to get TransferState working in the client
// See https://github.com/angular/angular/issues/20484 for further info.
document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));

    // allows Experience Editor anchor tag's onclick events to properly propagate
    handleEditorAnchors();
  });

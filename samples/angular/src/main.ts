import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { isEditorActive } from '@sitecore-jss/sitecore-jss-angular';

if (environment.production) {
  enableProdMode();
}

// Waiting for DOMContentLoaded is a temporary workaround to get TransferState working in the client
// See https://github.com/angular/angular/issues/20484 for further info.
document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));
  });

// Angular gives the href attribute priority over the onclick attribute, so we must replace
// the href attribute to avoid overriding the onclick in Experience Editor
if (isEditorActive()) {
  // Mutation Observer API: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/MutationObserver
  const targetNode = document.querySelector('body');
  const callback = (mutationList: MutationRecord[]) => {
    mutationList.forEach((mutation: MutationRecord) => {
      const btns: NodeListOf<HTMLAnchorElement> = (document.querySelectorAll('.scChromeDropDown > a[href="#"]'));
      switch(mutation.type) {
        case 'childList':
          btns.forEach((link: HTMLAnchorElement) => {
            link.href = 'javascript:void(0);';
          });
          return;
        default:
          return;
      }
    });
  };
  const observer: MutationObserver = new MutationObserver(callback);
  const observerOptions = {
    childList: true,
    subtree: true
  };

  observer.observe(targetNode, observerOptions);
}


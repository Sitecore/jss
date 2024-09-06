import { Directive, OnInit, Renderer2, Inject } from '@angular/core';
// import { EditMode, LayoutServicePageState } from '@sitecore-jss/sitecore-jss/layout';
import { getJssPagesClientData } from '@sitecore-jss/sitecore-jss/editing';
import { JssStateService } from '../services/jss-state.service';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[scEditingScripts]',
})
export class EditingScriptsDirective implements OnInit {
  constructor(
    private renderer: Renderer2,
    private stateService: JssStateService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // const state = this.stateService.stateValue;
    // const { pageState, editMode } = state.sitecore?.context || {};

    const clientData = {
      'hrz-canvas-state': {
        itemId: '1329a009-1b93-4855-8855-894bc40d7135',
        itemVersion: 1,
        siteName: 'iki-jss-test',
        language: 'en',
        deviceId: 'fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3',
        pageMode: 'NORMAL',
        variant: null,
      },
      'hrz-canvas-verification-token': 'test',
    };

    const clientScripts = [
      'https://xmc-xmcloudteste68d-ikilatestjs4f4a-stagingbbba-s.sitecore-staging.cloud/sitecore modules/Shell/SXA/xa-inline-editor.js?v=40.0.799.1885',
      'https://feaasstatic.blob.core.windows.net/packages/page-extension/latest/page.js',
      'https://pages-staging.sitecore-staging.cloud/horizon/canvas/horizon.canvas.js?v=4B1EC22451B48724544F8C83FDDB6E9E',
    ];

    console.log(123, JSON.stringify(this.stateService.stateValue, null, 2));
    console.log(456, this.stateService.stateValue.sitecore?.context);

    // Don't render anything if not in editing/preview mode
    // if (pageState === LayoutServicePageState.Normal) return;

    // if (editMode === EditMode.Metadata) {
    const jssClientData = { ...clientData, ...getJssPagesClientData() };

    clientScripts?.forEach((src: string) => {
      const scriptElement = this.renderer.createElement('script');
      scriptElement.src = src;
      this.renderer.appendChild(this.document.body, scriptElement);
    });

    Object.keys(jssClientData).forEach((id: string) => {
      const scriptElement = this.renderer.createElement('script');
      scriptElement.id = id;
      scriptElement.type = 'application/json';
      scriptElement.innerHTML = JSON.stringify((jssClientData as any)[id]);
      this.renderer.appendChild(this.document.body, scriptElement);
    });
    // }
  }
}

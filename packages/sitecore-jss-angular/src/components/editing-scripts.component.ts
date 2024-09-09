import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { getJssPagesClientData } from '@sitecore-jss/sitecore-jss/editing';
import { JssStateService } from '../services/jss-state.service';
import { DOCUMENT } from '@angular/common';
import { EditMode, LayoutServicePageState } from '@sitecore-jss/sitecore-jss/layout';

/**
 * Component that renders editing scripts and client data for the current page in Sitecore Editor.
 * Only renders scripts when Metadata mode is used.
 */
@Component({
  selector: 'sc-editing-scripts',
  template: '',
})
export class EditingScriptsComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private stateService: JssStateService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    const state = this.stateService.stateValue;
    const { pageState, editMode, clientData, clientScripts } = state.sitecore?.context || {};

    // Don't render anything if not in editing mode
    if (
      pageState === LayoutServicePageState.Normal ||
      pageState === LayoutServicePageState.Preview
    ) {
      return;
    }

    if (editMode === EditMode.Metadata) {
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
        scriptElement.innerHTML = JSON.stringify(jssClientData[id]);
        this.renderer.appendChild(this.document.body, scriptElement);
      });
    }
  }
}

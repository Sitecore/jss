import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';
import { getEdgeProxyFormsUrl } from '@sitecore-jss/sitecore-jss/graphql';
import { Component, OnInit, Input, Inject, ElementRef, PLATFORM_ID } from '@angular/core';
import { EDGE_CONFIG, EdgeConfigToken } from '../services/shared.token';
import { isPlatformBrowser } from '@angular/common';

/**
 * Shape of the Form component rendering data.
 * FormId is the rendering parameter that specifies the ID of the Sitecore Form to render.
 */
export type FormRendering = {
  params: {
    FormId: string;
  };
} & ComponentRendering;

/**
 * A component that renders a Sitecore Form.
 * It fetches the form markup from the Sitecore Edge service and renders it in the component's template.
 */
@Component({
  selector: 'app-form',
  template: `
    <ng-container *ngIf="!rendering.params.FormId">
      <div
        style="background: darkorange; outline: 5px solid orange; padding: 10px; color: white; max-width: 500px;"
      >
        <h2>{{ rendering.componentName }}</h2>
        <p>JSS component is missing FormId rendering parameter.</p>
      </div>
    </ng-container>
    <ng-container *ngIf="hasError">
      <div class="sc-jss-placeholder-error">There was a problem loading this section</div>
    </ng-container>
  `,
})
export class FormComponent implements OnInit {
  /**
   * The rendering data for the component
   */
  @Input() rendering: FormRendering;

  hasError = false;

  constructor(
    @Inject(EDGE_CONFIG) private edgeConfig: EdgeConfigToken,
    @Inject(PLATFORM_ID) private platformId: { [key: string]: unknown },
    private elRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadForm();
    }
  }

  /**
   * Fetches the form markup from the Sitecore Edge service and renders it in the component's template.
   */
  async loadForm() {
    const { sitecoreEdgeContextId, sitecoreEdgeUrl } = this.edgeConfig;

    if (!this.rendering.params.FormId) {
      console.warn(
        'Form was not able to render since FormId is not provided in the rendering data',
        JSON.stringify(this.rendering, null, 2)
      );

      return;
    }

    const url = getEdgeProxyFormsUrl(
      sitecoreEdgeContextId,
      this.rendering.params.FormId,
      sitecoreEdgeUrl
    );

    try {
      const rsp = await fetch(url, {
        method: 'GET',
        cache: 'no-cache',
      });

      const content = await rsp.text();

      if (rsp.status !== 200) {
        this.hasError = true;

        console.warn(
          `Form '${this.rendering.params.FormId}' was not able to render with the current rendering data`,
          JSON.stringify(this.rendering, null, 2),
          content
        );

        return;
      }

      this.elRef.nativeElement.innerHTML = content;

      this.executeScriptElements();
    } catch (error) {
      console.warn(
        `Form '${this.rendering.params.FormId}' was not able to render with the current rendering data`,
        JSON.stringify(this.rendering, null, 2),
        error
      );

      this.hasError = true;
    }
  }

  /**
   * When you set the innerHTML property of an element, the browser does not execute any <script> tags included in the HTML string
   * This method ensures that any <script> elements within the loaded HTML are executed.
   * It re-creates the script elements and appends the to the component's template, then removes old script elements to avoid duplication.
   */
  executeScriptElements() {
    const scriptElements = this.elRef.nativeElement.querySelectorAll('script');

    Array.from(scriptElements).forEach((scriptElement) => {
      const clonedElement = document.createElement('script');

      Array.from(scriptElement.attributes).forEach((attribute) => {
        clonedElement.setAttribute(attribute.name, attribute.value);
      });

      clonedElement.text = scriptElement.text;

      scriptElement?.parentNode?.replaceChild(clonedElement, scriptElement);
    });
  }
}

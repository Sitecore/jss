/* eslint-disable prefer-const */
import { ComponentRendering, LayoutServicePageState } from '@sitecore-jss/sitecore-jss/layout';
import { form, debug } from '@sitecore-jss/sitecore-jss';
import {
  Component,
  OnInit,
  Input,
  Inject,
  ElementRef,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { EDGE_CONFIG, EdgeConfigToken } from '../services/shared.token';
import { JssStateService } from '../services/jss-state.service';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

let { executeScriptElements, loadForm, subscribeToFormSubmitEvent } = form;

/**
 * Mock function to replace the form module functions for `testing` purposes.
 * @param {any} formModule - The form module to mock
 */
export const mockFormModule = (formModule: any) => {
  executeScriptElements = formModule.executeScriptElements;
  loadForm = formModule.loadForm;
  subscribeToFormSubmitEvent = formModule.subscribeToFormSubmitEvent;
};

/**
 * Shape of the Form component rendering data.
 * FormId is the rendering parameter that specifies the ID of the Sitecore Form to render.
 */
export type FormRendering = {
  params: {
    FormId: string;
    styles?: string;
  };
} & ComponentRendering;

/**
 * A component that renders a Sitecore Form.
 * It fetches the form markup from the Sitecore Edge service and renders it in the component's template.
 */
@Component({
  selector: 'app-form',
  template: `
    <ng-container *ngIf="isEditing">
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
    </ng-container>
  `,
})
export class FormComponent implements OnInit, OnDestroy {
  /**
   * The rendering data for the component
   */
  @Input() rendering: FormRendering;

  hasError = false;

  isEditing = false;

  private contextSubscription: Subscription;

  constructor(
    @Inject(EDGE_CONFIG) private edgeConfig: EdgeConfigToken,
    @Inject(PLATFORM_ID) private platformId: { [key: string]: unknown },
    private elRef: ElementRef<HTMLElement>,
    private jssState: JssStateService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadForm();

      this.contextSubscription = this.jssState.state.subscribe(({ sitecore }) => {
        this.isEditing = sitecore?.context.pageState !== LayoutServicePageState.Normal;
      });
    }
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }

  /**
   * Fetches the form markup from the Sitecore Edge service and renders it in the component's template.
   */
  async loadForm() {
    const { sitecoreEdgeContextId, sitecoreEdgeUrl } = this.edgeConfig;

    try {
      const content = await loadForm(
        sitecoreEdgeContextId,
        this.rendering.params.FormId,
        sitecoreEdgeUrl
      );

      this.elRef.nativeElement.innerHTML = content;
      this.elRef.nativeElement.className = this.rendering.params?.styles?.trimEnd() || '';
      this.elRef.nativeElement.id = this.rendering.params?.RenderingIdentifier || '';

      const form = this.elRef.nativeElement.querySelector('form');

      if (!form) {
        debug.form(
          `Form '${this.rendering.params.FormId}' was not able to render since form element was not found`
        );
        return;
      }

      executeScriptElements(this.elRef.nativeElement);

      if (!this.isEditing) {
        subscribeToFormSubmitEvent(form, this.rendering.uid);
      }
    } catch {
      this.hasError = true;
    }
  }
}

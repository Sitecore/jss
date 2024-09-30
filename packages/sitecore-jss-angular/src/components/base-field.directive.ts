import {
  Directive,
  Type,
  ViewContainerRef,
  EmbeddedViewRef,
  TemplateRef,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { RenderingField } from './rendering-field';
import { GenericFieldValue, isFieldValueEmpty } from '@sitecore-jss/sitecore-jss/layout';
import { FieldMetadataMarkerComponent } from './field-metadata-marker.component';
import { MetadataKind } from '@sitecore-jss/sitecore-jss/editing';

/**
 * Base class that contains common functionality for the field directives.
 */
@Directive()
export abstract class BaseFieldDirective {
  protected viewRef: EmbeddedViewRef<unknown>;
  protected abstract field: RenderingField<GenericFieldValue>;
  protected abstract editable: boolean;
  /**
   * Custom template to render in Pages in Metadata edit mode if field value is empty
   */
  protected abstract emptyFieldEditingTemplate: TemplateRef<unknown>;
  /**
   * Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided
   */
  protected abstract defaultFieldEditingComponent: Type<unknown>;

  constructor(
    protected viewContainer: ViewContainerRef,
    protected renderer: Renderer2, // Inject Renderer2 for DOM manipulation
    protected elementRef: ElementRef
  ) {}

  /**
   * Determines if directive should render the field as is
   * Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty
   */
  protected shouldRender() {
    return !!this.field?.editable || !isFieldValueEmpty(this.field);
  }

  /**
   * Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.
   */
  protected renderEmpty() {
    if (this.field?.metadata && this.editable) {
      this.renderMetadata(MetadataKind.Open);
      if (this.emptyFieldEditingTemplate) {
        this.viewContainer.createEmbeddedView(this.emptyFieldEditingTemplate);
      } else {
        if (this.field?.metadata?.fieldType === 'Image') {
          const img = this.renderer.createElement('img');

          // Set image attributes
          this.renderer.setAttribute(img, 'alt', '');
          this.renderer.setAttribute(
            img,
            'src',
            'data:image/svg+xml,%3Csvg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 240 240" style="enable-background:new 0 0 240 240;" xml:space="preserve"%3E%3Cstyle type="text/css"%3E .st0%7Bfill:none;%7D .st1%7Bfill:%23969696;%7D .st2%7Bfill:%23FFFFFF;%7D .st3%7Bfill:%23FFFFFF;stroke:%23FFFFFF;stroke-width:0.75;stroke-miterlimit:10;%7D%0A%3C/style%3E%3Cg%3E%3Crect class="st0" width="240" height="240"/%3E%3Cg%3E%3Cg%3E%3Crect x="20" y="20" class="st1" width="200" height="200"/%3E%3C/g%3E%3Cg%3E%3Ccircle class="st2" cx="174" cy="67" r="14"/%3E%3Cpath class="st2" d="M174,54c7.17,0,13,5.83,13,13s-5.83,13-13,13s-13-5.83-13-13S166.83,54,174,54 M174,52 c-8.28,0-15,6.72-15,15s6.72,15,15,15s15-6.72,15-15S182.28,52,174,52L174,52z"/%3E%3C/g%3E%3Cpolyline class="st3" points="29.5,179.25 81.32,122.25 95.41,137.75 137.23,91.75 209.5,179.75 "/%3E%3C/g%3E%3C/g%3E%3C/svg%3E'
          );
          this.renderer.setAttribute(img, 'class', 'scEmptyImage');
          this.renderer.setStyle(img, 'min-width', '48px');
          this.renderer.setStyle(img, 'min-height', '48px');
          this.renderer.setStyle(img, 'max-width', '400px');
          this.renderer.setStyle(img, 'max-height', '400px');
          this.renderer.setStyle(img, 'cursor', 'pointer');

          const parentNode = this.renderer.parentNode(this.elementRef.nativeElement);
          if (parentNode) {
            this.renderer.insertBefore(parentNode, img, this.elementRef.nativeElement);
          }
        } else if (
          this.field?.metadata?.fieldType === 'General Link' ||
          this.field?.metadata?.fieldType === 'Single Line Text'
        ) {
          const span = this.renderer.createElement('span');

          this.renderer.setAttribute(span, 'sc-default-empty-text-field-editing-placeholder', '');

          const parentNode = this.renderer.parentNode(this.elementRef.nativeElement);
          if (parentNode) {
            this.renderer.insertBefore(parentNode, span, this.elementRef.nativeElement);
          }
        }
      }
      this.renderMetadata(MetadataKind.Close);
    }
  }

  /**
   * Renders a metadata chrome marker for the field. Required by Pages in editMode 'metadata'.
   * @param {string} kind - 'open' or 'close' to indicate the start or end of the metadata chrome
   */
  protected renderMetadata(kind: MetadataKind) {
    if (this.field?.metadata && this.editable) {
      const metadataChrome = this.viewContainer.createComponent(FieldMetadataMarkerComponent);
      metadataChrome.setInput('kind', kind);
      if (kind === MetadataKind.Open) {
        metadataChrome.setInput('metadata', this.field.metadata);
      }
    }
  }
}

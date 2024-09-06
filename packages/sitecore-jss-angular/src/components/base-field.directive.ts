import { Directive, Type, ViewContainerRef, EmbeddedViewRef, TemplateRef } from '@angular/core';
import { RenderingField } from './rendering-field';
import { GenericFieldValue, isFieldValueEmpty } from '@sitecore-jss/sitecore-jss/layout';

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

  constructor(protected viewContainer: ViewContainerRef) {}

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
      if (this.emptyFieldEditingTemplate) {
        this.viewContainer.createEmbeddedView(this.emptyFieldEditingTemplate);
      } else {
        this.viewContainer.clear();
        this.viewContainer.createComponent(this.defaultFieldEditingComponent);
      }
    }
  }
}

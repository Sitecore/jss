import { Directive, ViewContainerRef, EmbeddedViewRef, inject } from '@angular/core';
import { RenderingField } from './rendering-field';
import { GenericFieldValue, isFieldValueEmpty } from '@sitecore-jss/sitecore-jss/layout';

/**
 * Base class that contains common functionality for the field directives.
 */
@Directive()
export abstract class BaseFieldDirective {
  protected viewContainer = inject(ViewContainerRef);
  protected viewRef: EmbeddedViewRef<unknown>;
  protected abstract field: RenderingField<GenericFieldValue>;
  protected abstract editable: boolean;

  /**
   * Determines if directive should render the field as is
   * Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty
   */
  protected shouldRender() {
    return !!this.field?.editable || !isFieldValueEmpty(this.field);
  }
}

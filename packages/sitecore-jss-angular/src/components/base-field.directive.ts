import { Directive, Type, ViewContainerRef, EmbeddedViewRef, TemplateRef } from '@angular/core';
import { RenderingField } from './rendering-field';
import { GenericFieldValue, isFieldValueEmpty } from '@sitecore-jss/sitecore-jss/layout';

@Directive()
export abstract class BaseFieldDirective {
  protected viewRef: EmbeddedViewRef<unknown>;
  protected abstract field: RenderingField<GenericFieldValue>;
  protected abstract emptyFieldEditingTemplate: TemplateRef<unknown>;
  protected abstract editable: boolean;

  constructor(protected viewContainer: ViewContainerRef) {}

  protected shouldRender() {
    return !!this.field?.editable || !isFieldValueEmpty(this.field);
  }

  private shouldRenderEmptyEditingComponent() {
    return this.field?.metadata && this.editable;
  }

  protected renderEmpty(emptyFieldEditingComponent: Type<unknown>) {
    if (this.shouldRenderEmptyEditingComponent()) {
      if (this.emptyFieldEditingTemplate) {
        this.viewContainer.createEmbeddedView(this.emptyFieldEditingTemplate);
      } else {
        this.viewContainer.clear();
        this.viewContainer.createComponent(emptyFieldEditingComponent);
      }
    }
  }
}

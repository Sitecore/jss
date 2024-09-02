import { Directive, Type, ViewContainerRef, EmbeddedViewRef, TemplateRef } from '@angular/core';

@Directive()
export abstract class BaseFieldDirective {
  protected viewRef: EmbeddedViewRef<unknown>;

  constructor(protected viewContainer: ViewContainerRef) {}

  protected renderEmptyFieldEditingComponent(
    emptyFieldEditingComponent: Type<unknown> | TemplateRef<unknown>
  ) {
    if (typeof emptyFieldEditingComponent === 'object') {
      this.viewContainer.createEmbeddedView(emptyFieldEditingComponent as TemplateRef<unknown>);
    } else {
      this.viewContainer.clear();
      this.viewContainer.createComponent(emptyFieldEditingComponent as Type<unknown>);
    }
  }
}

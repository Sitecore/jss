import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { TextField } from '../components/rendering-field';
import { BaseFieldDirective } from '../components/base-field.directive';
import { DefaultEmptyFieldEditingComponent } from '../components/default-empty-text-field-editing-placeholder.component';

@Directive({
  selector: '[scTestBase]',
})
export class TestBaseDirective extends BaseFieldDirective implements OnChanges {
  @Input('scTestBaseEditable') editable = true;
  @Input('scTestBase') field: TextField;
  @Input('scTestBaseEmptyFieldEditingTemplate') emptyFieldEditingTemplate: TemplateRef<unknown>;
  protected defaultFieldEditingComponent: Type<unknown>;

  constructor(viewContainer: ViewContainerRef, private templateRef: TemplateRef<unknown>) {
    super(viewContainer);
    this.defaultFieldEditingComponent = DefaultEmptyFieldEditingComponent;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.field || changes.editable || changes.encode) {
      this.viewContainer.clear();

      this.updateView();
    }
  }

  private updateView() {
    if (!this.shouldRender()) {
      super.renderEmpty();
      return;
    }

    this.renderMetadataTag('open');
    this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
    this.renderMetadataTag('close');

    const field = this.field;
    const editable = this.editable;

    const html = field.editable && editable ? field.editable : field.value;

    this.viewRef.rootNodes.forEach((node) => {
      node.textContent = html;
    });
  }
}

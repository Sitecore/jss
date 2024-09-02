import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TextField } from './rendering-field';
import { BaseFieldDirective } from './base-field.directive';
import { DefaultEmptyFieldEditingComponent } from './default-empty-field-editing.component';

@Directive({
  selector: '[scText]',
})
export class TextDirective extends BaseFieldDirective implements OnChanges {
  @Input('scTextEditable') editable = true;

  @Input('scTextEncode') encode = true;

  @Input('scText') field: TextField;

  @Input('scTextEmptyFieldEditingTemplate') emptyFieldEditingTemplate: TemplateRef<unknown>;

  constructor(viewContainer: ViewContainerRef, private templateRef: TemplateRef<unknown>) {
    super(viewContainer);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.field || changes.editable || changes.encode) {
      if (!this.viewRef) {
        this.viewContainer.clear();
        this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
      }

      this.updateView();
    }
  }

  private updateView() {
    if (!this.shouldRender()) {
      console.log('should not render');
      super.renderEmpty(DefaultEmptyFieldEditingComponent);
      return;
    }

    const field = this.field;
    let editable = this.editable;

    // can't use editable value if we want to output unencoded
    if (!this.encode) {
      editable = false;
    }

    const html = field.editable && editable ? field.editable : field.value;
    const setDangerously = (field.editable && editable) || !this.encode;

    this.viewRef.rootNodes.forEach((node) => {
      if (setDangerously) {
        node.innerHTML = html;
      } else {
        node.textContent = html;
      }
    });
  }
}

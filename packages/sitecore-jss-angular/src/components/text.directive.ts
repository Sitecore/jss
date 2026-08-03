import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, inject } from '@angular/core';
import { TextField } from './rendering-field';
import { BaseFieldDirective } from './base-field.directive';

@Directive({
  selector: '[scText]',
})
export class TextDirective extends BaseFieldDirective implements OnChanges {
  @Input('scTextEditable') editable = true;

  @Input('scTextEncode') encode = true;

  @Input('scText') field: TextField;

  private templateRef = inject(TemplateRef);

  ngOnChanges(changes: SimpleChanges) {
    if (changes.field || changes.editable || changes.encode) {
      this.viewContainer.clear();

      this.updateView();
    }
  }

  private updateView() {
    if (!this.shouldRender()) {
      return;
    }

    this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef);

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

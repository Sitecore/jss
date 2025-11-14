import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  Type,
  inject,
} from '@angular/core';
import { TextField } from './rendering-field';

@Directive({
  selector: '[scText]',
})
export class TextDirective implements OnChanges {
  @Input('scTextEditable') editable = true;

  @Input('scTextEncode') encode = true;

  @Input('scText') field: TextField;

  private viewRef: EmbeddedViewRef<unknown>;

  /**
   * Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided
   */
  protected defaultFieldEditingComponent: Type<unknown> = DefaultEmptyFieldEditingComponent;
  private templateRef = inject(TemplateRef);

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
    const field = this.field;
    let editable = this.editable;

    if (!field || (!field.editable && (field.value === undefined || field.value === ''))) {
      return;
    }

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

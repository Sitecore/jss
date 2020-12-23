import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { RichTextField } from './rendering-field';

@Directive({
  selector: '[scRichText]',
})
export class RichTextDirective implements OnChanges {
  private viewRef: EmbeddedViewRef<any>;

  @Input('scRichTextEditable') editable = true;

  @Input('scRichText') field: RichTextField;

  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.field || changes.editable) {
      if (!this.viewRef) {
        this.viewContainer.clear();
        this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
      }

      this.updateView();
    }
  }

  private updateView() {
    const field = this.field;
    if (!field || (!field.editable && !field.value)) {
      return;
    }

    const html = field.editable && this.editable ? field.editable : field.value;
    this.viewRef.rootNodes.forEach((node) => {
      node.innerHTML = html;
    });
  }
}

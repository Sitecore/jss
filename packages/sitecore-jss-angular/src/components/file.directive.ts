import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { FileField } from './rendering-field';

/**
 * File fields cannot be managed via the EE. We never output "editable."
 */
@Directive({ selector: '[scFile]' })
export class FileDirective implements OnChanges {
  @Input('scFile') field: FileField;

  private viewRef: EmbeddedViewRef<unknown>;

  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<unknown>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.field) {
      if (!this.viewRef) {
        this.viewContainer.clear();
        this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
      }

      this.updateView();
    }
  }

  private updateView() {
    const field = this.field;

    if (!field || (!field.value && !field.src)) {
      return;
    }

    const file = field.src ? field : field.value;
    this.viewRef.rootNodes.forEach((node) => {
      if (!file) return;

      node.href = file.src;
      if (node.innerHTML === '') {
        node.innerHTML = file.title || file.displayName;
      }
    });
  }
}

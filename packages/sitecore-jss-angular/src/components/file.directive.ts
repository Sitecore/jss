import { Directive, EmbeddedViewRef, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { FileField } from './rendering-field';

/**
 * File fields cannot be managed via the EE. We never output "editable."
 */
@Directive({ selector: '[scFile]' })
export class FileDirective implements OnChanges {
  private viewRef: EmbeddedViewRef<any>;

  // tslint:disable-next-line:no-input-rename
  @Input('scFile') field: FileField;

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) { }

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
      node.href = file.src;
      if (node.innerHTML === '') {
        node.innerHTML = file.title || file.displayName;
      }
    });
  }
}

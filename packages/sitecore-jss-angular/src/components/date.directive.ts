import { DatePipe } from '@angular/common';
import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DateField } from './rendering-field';
import { BaseFieldDirective } from './base-field.directive';
import { DefaultEmptyFieldEditingComponent } from './default-empty-text-field-editing-placeholder.component';

@Directive({
  selector: '[scDate]',
})
export class DateDirective extends BaseFieldDirective implements OnChanges {
  @Input('scDateFormat') format?: string;

  @Input('scDateTimezone') timezone?: string;

  @Input('scDateLocale') locale?: string;

  @Input('scDateEditable') editable = true;

  @Input('scDate') field: DateField;

  @Input('scDateEmptyFieldEditingTemplate') emptyFieldEditingTemplate: TemplateRef<unknown>;

  constructor(
    viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<unknown>,
    private datePipe: DatePipe
  ) {
    super(viewContainer);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.field || changes.format) {
      if (!this.viewRef) {
        this.viewContainer.clear();
        this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
      }

      this.updateView();
    }
  }

  private updateView() {
    if (!this.shouldRender()) {
      super.renderEmpty(DefaultEmptyFieldEditingComponent);
      return;
    }

    const field = this.field;

    const html = field.editable && this.editable ? field.editable : field.value;
    const setDangerously = field.editable && this.editable;

    this.viewRef.rootNodes.forEach((node) => {
      if (setDangerously) {
        node.innerHTML = html;
      } else {
        node.textContent = this.datePipe.transform(html, this.format, this.timezone, this.locale);
      }
    });
  }
}

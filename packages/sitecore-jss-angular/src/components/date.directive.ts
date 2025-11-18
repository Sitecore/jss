import { DatePipe } from '@angular/common';
import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { DateField } from './rendering-field';

@Directive({
  selector: '[scDate]',
})
export class DateDirective implements OnChanges {
  @Input('scDateFormat') format?: string;

  @Input('scDateTimezone') timezone?: string;

  @Input('scDateLocale') locale?: string;

  @Input('scDateEditable') editable = true;

  @Input('scDate') field: DateField;

  /**
   * Custom template to render in Pages in Metadata edit mode if field value is empty
   */
  @Input('scDateEmptyFieldEditingTemplate') emptyFieldEditingTemplate: TemplateRef<unknown>;
  private templateRef = inject(TemplateRef);
  private datePipe = inject(DatePipe);
  private viewRef: EmbeddedViewRef<unknown>;
  private viewContainer = inject(ViewContainerRef);

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
    const field = this.field;

    if (!field || (!field.editable && !field.value)) {
      return;
    }

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

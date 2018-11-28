import { DatePipe } from '@angular/common';
import { Directive, EmbeddedViewRef, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { TextField } from './rendering-field';

@Directive({
  selector: '[scDate]',
})
export class DateDirective implements OnChanges {
  private viewRef: EmbeddedViewRef<any>;

  // tslint:disable-next-line:no-input-rename
  @Input('scDateFormat') format?: string;

  // tslint:disable-next-line:no-input-rename
  @Input('scDateTimezone') timezone?: string;

  // tslint:disable-next-line:no-input-rename
  @Input('scDateLocale') locale?: string;

  // tslint:disable-next-line:no-input-rename
  @Input('scDateEditable') editable = true;

  // tslint:disable-next-line:no-input-rename
  @Input('scDate') field: TextField;

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private datePipe: DatePipe
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['field'] || changes['format']) {
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

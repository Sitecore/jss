import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { TextField } from './rendering-field';
import { BaseFieldDirective } from './base-field.directive';
import { DefaultEmptyFieldEditingComponent } from './default-empty-text-field-editing-placeholder.component';
import { MetadataKind } from '@sitecore-jss/sitecore-jss/editing';

@Directive({
  selector: '[scText]',
})
export class TextDirective extends BaseFieldDirective implements OnChanges {
  @Input('scTextEditable') editable = true;

  @Input('scTextEncode') encode = true;

  @Input('scText') field: TextField;

  /**
   * Custom template to render in Pages in Metadata edit mode if field value is empty
   */
  @Input('scTextEmptyFieldEditingTemplate') emptyFieldEditingTemplate: TemplateRef<unknown>;

  /**
   * Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided
   */
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

    this.renderMetadata(MetadataKind.Open);
    this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
    this.renderMetadata(MetadataKind.Close);

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

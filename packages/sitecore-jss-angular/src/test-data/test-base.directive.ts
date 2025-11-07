import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  Type,
  inject,
} from '@angular/core';
import { TextField } from '../components/rendering-field';
import { BaseFieldDirective } from '../components/base-field.directive';
import { DefaultEmptyFieldEditingComponent } from '../components/default-empty-text-field-editing-placeholder.component';
import { MetadataKind } from '@sitecore-jss/sitecore-jss/editing';

@Directive({
  selector: '[scTestBase]',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
})
export class TestBaseDirective extends BaseFieldDirective implements OnChanges {
  @Input('scTestBaseEditable') editable = true;
  @Input('scTestBase') field: TextField;
  @Input('scTestBaseEmptyFieldEditingTemplate') emptyFieldEditingTemplate: TemplateRef<unknown>;
  protected defaultFieldEditingComponent: Type<unknown> = DefaultEmptyFieldEditingComponent;
  private templateRef = inject(TemplateRef);

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
    const editable = this.editable;

    const html = field.editable && editable ? field.editable : field.value;

    this.viewRef.rootNodes.forEach((node) => {
      node.textContent = html;
    });
  }
}

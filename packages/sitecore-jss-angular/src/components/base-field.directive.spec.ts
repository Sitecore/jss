import { Component, DebugElement, Input, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TextField } from './rendering-field';
import { TestBaseDirective } from '../test-data/test-base.directive';

@Component({
  selector: 'test-base',
  template: `
    <span *scTestBase="field; editable: editable"></span>
  `,
})
class TestComponent {
  @Input() field: TextField;
  @Input() editable = true;
}

const emptyTextFieldEditingTemplateId = 'emptyTextFieldEditingTemplate';
const emptyTextFieldEditingTemplate =
  '<span>[This is a *custom* empty field component for text]</span>';

@Component({
  selector: 'test-base-template',
  template: `
    <span
      *scTestBase="
        field;
        editable: editable;
        emptyFieldEditingTemplate: ${emptyTextFieldEditingTemplateId}
      "
    ></span>

    <ng-template #${emptyTextFieldEditingTemplateId}>
      ${emptyTextFieldEditingTemplate}
    </ng-template>
  `,
})
class TestEmptyTemplateComponent {
  @Input() field: TextField;
  @Input() emptyFieldEditingTemplate: TemplateRef<unknown>;
  @Input() editable = true;
}

describe('<span *scTestBase />', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let deSpan: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestBaseDirective, TestComponent, TestEmptyTemplateComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    de = fixture.debugElement;
    deSpan = de.query(By.css('span'));
    comp = fixture.componentInstance;
  });

  describe('edit mode chromes', () => {
    it('should render field value if it is present', () => {
      const field: { [prop: string]: unknown } = {
        value: 'value',
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = deSpan.nativeElement.innerHTML;
      expect(rendered).toBe('value');
    });

    it('should render field editable if it is present', () => {
      const field: { [prop: string]: unknown } = {
        value: 'value',
        editable: 'editable',
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = deSpan.nativeElement.innerHTML;
      expect(rendered).toBe(field.editable);
    });

    it('should render nothing if field.editable and value are missing', () => {
      const field: { [prop: string]: unknown } = {
        value: '',
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = deSpan.nativeElement.innerHTML;
      expect(rendered).toBe('');
    });
  });

  describe('edit mode metadata', () => {
    const testMetadata = {
      contextItem: {
        id: '{09A07660-6834-476C-B93B-584248D3003B}',
        language: 'en',
        revision: 'a0b36ce0a7db49418edf90eb9621e145',
        version: 1,
      },
      fieldId: '{414061F4-FBB1-4591-BC37-BFFA67F745EB}',
      fieldType: 'single-line',
      rawValue: 'Test1',
    };

    it('should render field value if field value is not empty', () => {
      const field: { [prop: string]: unknown } = {
        value: 'value',
        metadata: testMetadata,
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = deSpan.nativeElement.innerHTML;
      expect(rendered).toBe('value');
    });

    describe('field value is empty', () => {
      it('should render default empty editing component if custom is not provided', () => {
        const field = {
          value: '',
          metadata: testMetadata,
        };
        comp.field = field;
        fixture.detectChanges();

        const rendered = de.nativeElement.innerHTML;
        expect(rendered).toContain('<span>[No text in field]</span>');
      });

      it('should render custom empty editing template if provided', () => {
        fixture = TestBed.createComponent(TestEmptyTemplateComponent);
        fixture.detectChanges();

        de = fixture.debugElement;
        comp = fixture.componentInstance;

        const field = {
          value: '',
          metadata: testMetadata,
        };
        comp.field = field;
        fixture.detectChanges();

        const rendered = de.nativeElement.innerHTML;
        expect(rendered).toContain(emptyTextFieldEditingTemplate);
      });

      it('should render nothing when field value is empty, when editing is explicitly disabled', () => {
        const field = {
          value: '',
          metadata: testMetadata,
        };
        comp.field = field;
        comp.editable = false;
        fixture.detectChanges();

        const rendered = deSpan.nativeElement.innerHTML;
        expect(rendered).toBe('');
      });
    });
  });
});

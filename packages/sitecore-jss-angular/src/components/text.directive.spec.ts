import { Component, DebugElement, Input, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { textField as eeTextData } from '../test-data/ee-data';
import { TextField } from './rendering-field';
import { TextDirective } from './text.directive';

@Component({
  selector: 'test-text',
  template: `
    <span *scText="field; editable: editable; encode: encode"></span>
  `,
})
class TestComponent {
  @Input() field: TextField;
  @Input() editable = true;
  @Input() encode = true;
}

const emptyTextFieldEditingTemplateId = 'emptyTextFieldEditingTemplate';
const emptyTextFieldEditingTemplate =
  '<span>[This is a *custom* empty field component for text]</span>';

@Component({
  selector: 'test-empty-template-text',
  template: `
    <span
      *scText="
        field;
        editable: editable;
        encode: encode;
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
  @Input() encode = true;
}

describe('<span *scText />', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextDirective, TestComponent, TestEmptyTemplateComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    de = fixture.debugElement;
    comp = fixture.componentInstance;
  });

  it('should render nothing with missing field', () => {
    const deSpan = de.query(By.css('span'));
    expect(deSpan).toBeNull();
  });

  it('should render nothing with missing editable and value', () => {
    const field: { [prop: string]: unknown } = {};
    comp.field = field;
    fixture.detectChanges();

    const deSpan = de.query(By.css('span'));
    expect(deSpan).toBeNull();
  });

  it('should render nothing with empty value', () => {
    const field: { [prop: string]: unknown } = {
      value: '',
    };

    comp.field = field;
    fixture.detectChanges();
    const deSpan = de.query(By.css('span'));
    expect(deSpan).toBeNull();
  });

  it('should render editable with editable value', () => {
    const field: { [prop: string]: unknown } = {
      value: 'value',
      editable: 'editable',
    };

    comp.field = field;
    fixture.detectChanges();
    const rendered = de.query(By.css('span')).nativeElement.innerHTML;
    expect(rendered).toBe('editable');
  });

  it('should render value with editing explicitly disabled', () => {
    const field: { [prop: string]: unknown } = {
      value: 'value',
      editable: 'editable',
    };
    comp.field = field;
    comp.editable = false;
    fixture.detectChanges();

    const rendered = de.query(By.css('span')).nativeElement.innerHTML;
    expect(rendered).toBe('value');
  });

  it('should encode values with editing explicitly disabled', () => {
    const field: { [prop: string]: unknown } = {
      value: 'value < >',
    };

    comp.field = field;
    comp.editable = false;
    fixture.detectChanges();

    const rendered = de.query(By.css('span')).nativeElement.innerHTML;
    expect(rendered).toContain('&lt; &gt;');
  });

  it('should render value with with just a value', () => {
    const field: { [prop: string]: unknown } = {
      value: 'value',
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.query(By.css('span')).nativeElement.innerHTML;
    expect(rendered).toBe('value');
  });

  it('should render number value', () => {
    const field: { [prop: string]: unknown } = {
      value: 1.23,
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.query(By.css('span')).nativeElement.innerHTML;
    expect(rendered).toBe('1.23');
  });

  it('should render zero number value', () => {
    const field: { [prop: string]: unknown } = {
      value: 0,
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.query(By.css('span')).nativeElement.innerHTML;
    expect(rendered).toBe('0');
  });

  it('should render embedded html as-is when encoding is disabled', () => {
    const field: { [prop: string]: unknown } = {
      value: '<input type="text">some crazy stuff<script code="whaaaat">uh oh</script>',
    };
    comp.field = field;
    comp.encode = false;
    fixture.detectChanges();

    const rendered = de.query(By.css('span')).nativeElement.innerHTML;
    expect(rendered).toBe(field.value);
  });

  it('should render ee HTML', () => {
    const field = {
      editable: eeTextData,
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.query(By.css('span')).nativeElement.innerHTML;
    expect(rendered).toContain('<input');
    expect(rendered).toContain('<span class="scChromeData">');
  });

  // it('should render other attributes with other props provided', () => {
  //   const field = {
  //     value: 'value',
  //   };
  //   const rendered = mount(<Text field={field} tag="h1" className="cssClass" id="lorem" />).find('h1');
  //   expect(rendered).to.have.length(1);
  //   expect(rendered.html()).to.contain('<h1 class="cssClass" id="lorem">');
  //   expect(rendered.html()).to.contain('value');
  // });

  describe('editMode metadata', () => {
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

    it('should render default empty field component when field value is empty', () => {
      const field = {
        value: '',
        metadata: testMetadata,
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.nativeElement.innerHTML;
      expect(rendered).toContain('<span>[No text in field]</span>');
    });

    it('should render custom empty field component when provided, when field value is empty', () => {
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

      const deSpan = de.query(By.css('span'));
      expect(deSpan).toBeNull();
    });

    describe('with "metadata" property value', () => {
      describe('and edtiging enabled', () => {
        it('should render <img /> with metadata chrome tags', () => {
          const field = {
            metadata: { foo: 'bar' },
            value: 'foo',
          };
          comp.editable = true;
          comp.field = field;
          fixture.detectChanges();

          const fieldValue = de.query(By.css('span'));
          const metadataOpenTag = fieldValue.nativeElement.previousElementSibling;
          const metadataCloseTag = fieldValue.nativeElement.nextElementSibling;

          expect(metadataOpenTag).toBeDefined();
          expect(metadataOpenTag?.tagName).toEqual('CODE');
          expect(metadataOpenTag?.getAttribute('kind')).toEqual('open');
          expect(metadataOpenTag?.getAttribute('chrometype')).toEqual('field');

          expect(metadataOpenTag?.textContent).toContain(JSON.stringify(field.metadata));

          expect(metadataCloseTag).toBeDefined();
          expect(metadataCloseTag?.tagName).toEqual('CODE');
          expect(metadataOpenTag?.getAttribute('chrometype')).toEqual('field');
          expect(metadataCloseTag?.getAttribute('kind')).toEqual('close');
        });

        it('should render empty field with metadata chrome tags', () => {
          const field = {
            metadata: { foo: 'bar' },
            value: '',
          };
          comp.editable = true;
          comp.field = field;
          fixture.detectChanges();

          const fieldValue = de.query(By.css('sc-default-empty-text-field-editing-placeholder'));
          const metadataOpenTag = fieldValue.nativeElement.previousElementSibling;
          const metadataCloseTag = fieldValue.nativeElement.nextElementSibling;

          expect(metadataOpenTag).toBeDefined();
          expect(metadataOpenTag?.tagName).toEqual('CODE');
          expect(metadataOpenTag?.getAttribute('kind')).toEqual('open');
          expect(metadataOpenTag?.getAttribute('chrometype')).toEqual('field');

          expect(metadataOpenTag?.textContent).toContain(JSON.stringify(field.metadata));

          expect(metadataCloseTag).toBeDefined();
          expect(metadataCloseTag?.tagName).toEqual('CODE');
          expect(metadataOpenTag?.getAttribute('chrometype')).toEqual('field');
          expect(metadataCloseTag?.getAttribute('kind')).toEqual('close');
        });
      });

      describe('and edtiging disabled', () => {
        it('should render <img /> without metadata chrome tags', () => {
          const field = {
            metadata: { foo: 'bar' },
            value: 'foo',
          };
          comp.editable = false;
          comp.field = field;
          fixture.detectChanges();

          const fieldValue = de.query(By.css('span'));
          const metadataOpenTag = fieldValue.nativeElement.previousElementSibling;
          const metadataCloseTag = fieldValue.nativeElement.nextElementSibling;

          expect(metadataOpenTag).toBeNull();
          expect(metadataCloseTag).toBeNull();
        });
      });
    });

    describe('without "metadata" property value', () => {
      it('should render <img /> without metadata chrome tags', () => {
        const field = {
          value: 'foo ',
        };
        comp.editable = true;
        comp.field = field;
        fixture.detectChanges();

        const fieldValue = de.query(By.css('span'));
        const metadataOpenTag = fieldValue.nativeElement.previousElementSibling;
        const metadataCloseTag = fieldValue.nativeElement.nextElementSibling;

        expect(metadataOpenTag).toBeNull();
        expect(metadataCloseTag).toBeNull();
      });
    });
  });
});

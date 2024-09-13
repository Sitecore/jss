import { DatePipe, formatDate } from '@angular/common';
import { Component, DebugElement, Input, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { textField as eeTextData } from '../test-data/ee-data';
import { DateDirective } from './date.directive';
import { TextField } from './rendering-field';
import { EMPTY_DATE_FIELD_VALUE } from '@sitecore-jss/sitecore-jss/layout';

const testDate = new Date('2010-12-12T12:00Z');
const testIsoDateValue = testDate.toISOString();
const testLocale = 'en-US';
const testTimezone = '-0500';
const testFormat = 'M/d/yy, h:mm a';
const defaultFormattedDate = formatDate(testIsoDateValue, testFormat, testLocale, testTimezone);

@Component({
  selector: 'test-date',
  template: `
    <span
      *scDate="field; editable: editable; format: format; locale: locale; timezone: timezone"
    ></span>
  `,
})
class TestComponent {
  @Input() field: TextField;
  @Input() editable = true;
  @Input() format = testFormat;
  @Input() locale = testLocale;
  @Input() timezone = testTimezone;
}

const emptyDateFieldEditingTemplateId = 'emptyDateFieldEditingTemplate';
const emptyDateFieldEditingTemplate =
  '<span>[This is a *custom* empty field component for date]</span>';

@Component({
  selector: 'test-empty-template-date',
  template: `
    <span
      *scDate="
        field;
        editable: editable;
        emptyFieldEditingTemplate: ${emptyDateFieldEditingTemplateId}
      "
    ></span>
    <ng-template #${emptyDateFieldEditingTemplateId}>
      ${emptyDateFieldEditingTemplate}
    </ng-template>
  `,
})
class TestEmptyTemplateComponent {
  @Input() field: TextField;
  @Input() editable = true;
  @Input() format = testFormat;
  @Input() locale = testLocale;
  @Input() timezone = testTimezone;
  @Input() emptyFieldEditingTemplate: TemplateRef<unknown>;
}

describe('<span *scDate />', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateDirective, TestComponent, TestEmptyTemplateComponent],
      providers: [DatePipe],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    de = fixture.debugElement;
    comp = fixture.componentInstance;
  });

  it('should render nothing with missing field', () => {
    const span = de.query(By.css('span'));
    expect(span).toBeNull();
  });

  it('should render nothing with missing editable and value', () => {
    const field = {};
    comp.field = field;
    fixture.detectChanges();

    const span = de.query(By.css('span'));
    expect(span).toBeNull();
  });

  it('should render editable with editable value', () => {
    const field = {
      value: testIsoDateValue,
      editable: 'editable',
    };

    comp.field = field;
    fixture.detectChanges();
    const rendered = de.query(By.css('span')).nativeElement.innerHTML;
    expect(rendered).toBe('editable');
  });

  it('should render value with editing explicitly disabled', () => {
    const field = {
      value: testIsoDateValue,
      editable: 'editable',
    };
    comp.field = field;
    comp.editable = false;
    fixture.detectChanges();

    const rendered = de.query(By.css('span')).nativeElement.innerHTML;
    expect(rendered).toBe(defaultFormattedDate);
  });

  it('should render value with with just a value', () => {
    const field = {
      value: testIsoDateValue,
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.query(By.css('span')).nativeElement.innerHTML;
    expect(rendered).toBe(defaultFormattedDate);
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

  describe('editMode metadata', () => {
    const testMetadata = {
      contextItem: {
        id: '{09A07660-6834-476C-B93B-584248D3003B}',
        language: 'en',
        revision: 'a0b36ce0a7db49418edf90eb9621e145',
        version: 1,
      },
      fieldId: '{414061F4-FBB1-4591-BC37-BFFA67F745EB}',
      fieldType: 'date',
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

    it('should render default empty field component when field value is the default empty date value', () => {
      const field = {
        value: EMPTY_DATE_FIELD_VALUE,
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
      expect(rendered).toContain(emptyDateFieldEditingTemplate);
    });

    it('should render custom empty field component when provided, when field value the default empty date value', () => {
      fixture = TestBed.createComponent(TestEmptyTemplateComponent);
      fixture.detectChanges();

      de = fixture.debugElement;
      comp = fixture.componentInstance;

      const field = {
        value: EMPTY_DATE_FIELD_VALUE,
        metadata: testMetadata,
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.nativeElement.innerHTML;
      expect(rendered).toContain(emptyDateFieldEditingTemplate);
    });

    it('should render nothing when field value is empty, when editing is explicitly disabled', () => {
      const field = {
        value: '',
        metadata: testMetadata,
      };
      comp.field = field;
      comp.editable = false;
      fixture.detectChanges();

      const span = de.query(By.css('span'));
      expect(span).toBeNull();
    });

    describe('with "metadata" property value', () => {
      describe('and edtiging enabled', () => {
        it('should render <img /> with metadata chrome tags', () => {
          const field = {
            metadata: { foo: 'bar' },
            value: testIsoDateValue,
          };
          comp.editable = true;
          comp.field = field;
          fixture.detectChanges();

          const fieldValue = de.query(By.css('span'));
          const metadataOpenTag = fieldValue.nativeElement.previousElementSibling;
          const metadataCloseTag = fieldValue.nativeElement.nextElementSibling;

          expect(metadataOpenTag.outerHTML).toEqual(
            '<code scfieldmetadatamarker="" type="text/sitecore" chrometype="field" kind="open" class="scpm">{"foo":"bar"}</code>'
          );
          expect(metadataCloseTag.outerHTML).toEqual(
            '<code scfieldmetadatamarker="" type="text/sitecore" chrometype="field" kind="close" class="scpm"></code>'
          );
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

          expect(metadataOpenTag.outerHTML).toEqual(
            '<code scfieldmetadatamarker="" type="text/sitecore" chrometype="field" kind="open" class="scpm">{"foo":"bar"}</code>'
          );
          expect(metadataCloseTag.outerHTML).toEqual(
            '<code scfieldmetadatamarker="" type="text/sitecore" chrometype="field" kind="close" class="scpm"></code>'
          );
        });
      });

      describe('and editing disabled', () => {
        it('should render <img /> without metadata chrome tags', () => {
          const field = {
            metadata: { foo: 'bar' },
            value: testIsoDateValue,
          };
          comp.editable = false;
          comp.field = field;
          fixture.detectChanges();

          const dateField = de.query(By.css('span'));
          const metadataOpenTag = dateField.nativeElement.previousElementSibling;
          const metadataCloseTag = dateField.nativeElement.nextElementSibling;

          expect(metadataOpenTag).toBeNull();
          expect(metadataCloseTag).toBeNull();
        });
      });
    });

    describe('without "metadata" property value', () => {
      it('should render <img /> without metadata chrome tags', () => {
        const field = {
          value: testIsoDateValue,
        };
        comp.editable = true;
        comp.field = field;
        fixture.detectChanges();

        const dateField = de.query(By.css('span'));
        const metadataOpenTag = dateField.nativeElement.previousElementSibling;
        const metadataCloseTag = dateField.nativeElement.nextElementSibling;

        expect(metadataOpenTag).toBeNull();
        expect(metadataCloseTag).toBeNull();
      });
    });
  });
});

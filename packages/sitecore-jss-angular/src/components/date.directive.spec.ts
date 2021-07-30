import { DatePipe, formatDate } from '@angular/common';
import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { textField as eeTextData } from '../testData/ee-data';
import { DateDirective } from './date.directive';
import { TextField } from './rendering-field';

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

describe('<span *scDate />', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateDirective, TestComponent],
      providers: [DatePipe],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('span'));
    comp = fixture.componentInstance;
  });

  it('should render nothing with missing field', () => {
    const rendered = de.nativeElement.innerHTML;
    expect(rendered).toBe('');
  });

  it('should render nothing with missing editable and value', () => {
    const field = {};
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.nativeElement.innerHTML;
    expect(rendered).toBe('');
  });

  it('should render editable with editable value', () => {
    const field = {
      value: testIsoDateValue,
      editable: 'editable',
    };

    comp.field = field;
    fixture.detectChanges();
    const rendered = de.nativeElement.innerHTML;
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

    const rendered = de.nativeElement.innerHTML;
    expect(rendered).toBe(defaultFormattedDate);
  });

  it('should render value with with just a value', () => {
    const field = {
      value: testIsoDateValue,
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.nativeElement.innerHTML;
    expect(rendered).toBe(defaultFormattedDate);
  });

  it('should render ee HTML', () => {
    const field = {
      editable: eeTextData,
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.nativeElement.innerHTML;
    expect(rendered).toContain('<input');
    expect(rendered).toContain('<span class="scChromeData">');
  });
});

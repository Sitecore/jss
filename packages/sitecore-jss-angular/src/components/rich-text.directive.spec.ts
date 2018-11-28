import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { richTextField as eeRichTextData } from '../testData/ee-data';
import { RichTextDirective } from './rich-text.directive';

@Component({
  selector: 'test-rich-text',
  template: `
    <h1 *scRichText="field; editable: editable"></h1>
  `,
})
class TestComponent {
  @Input() field: any;
  @Input() editable = true;
}

describe('<div *scRichText />', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RichTextDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('h1'));
    comp = fixture.componentInstance;
  });

  it('should render nothing with missing field', () => {
    const rendered = de.nativeElement.innerHTML;
    expect(rendered).toBe('');
  });

  it('should render nothing with missing editable and value', () => {
    comp.field = {};
    fixture.detectChanges();

    const rendered = de.nativeElement.innerHTML;
    expect(rendered).toBe('');
  });

  it('should render editable with editable value', () => {
    const field = {
      value: 'value',
      editable: 'editable',
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.nativeElement.innerHTML;
    expect(rendered).toBe('editable');
  });

  it('should render value with editing explicitly disabled', () => {
    const field = {
      value: 'value',
      editable: 'editable',
    };
    comp.field = field;
    comp.editable = false;
    fixture.detectChanges();

    const rendered = de.nativeElement.innerHTML;
    expect(rendered).toBe('value');
  });

  it('should render value with with just a value', () => {
    const field = {
      value: 'value',
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.nativeElement.innerHTML;
    expect(rendered).toBe('value');
  });

  it('should render embedded html as-is', () => {
    const field = {
      value: '<input type="text">some crazy stuff<script code="whaaaat">uh oh</script>',
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.nativeElement.innerHTML;
    expect(rendered).toBe(field.value);
  });

  it('should render ee HTML', () => {
    const field = {
      editable: eeRichTextData,
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.nativeElement.innerHTML;
    expect(rendered).toContain('<input');
    expect(rendered).toContain('<span class="scChromeData">');
  });
});

import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { textField as eeTextData } from '../testData/ee-data';
import { TextDirective } from './text.directive';

@Component({
  selector: 'test-text',
  template: `
    <span *scText="field; editable: editable; encode: encode"></span>
  `,
})
class TestComponent {
  @Input() field: any;
  @Input() editable = true;
  @Input() encode = true;
}

describe('<span *scText />', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextDirective, TestComponent],
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

  it('should encode values with editing explicitly disabled', () => {
    const field = {
      value: 'value < >',
    };

    comp.field = field;
    comp.editable = false;
    fixture.detectChanges();

    const rendered = de.nativeElement.innerHTML;
    expect(rendered).toContain('&lt; &gt;');
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

  it('should render embedded html as-is when encoding is disabled', () => {
    const field = {
      value: '<input type="text">some crazy stuff<script code="whaaaat">uh oh</script>',
    };
    comp.field = field;
    comp.encode = false;
    fixture.detectChanges();

    const rendered = de.nativeElement.innerHTML;
    expect(rendered).toBe(field.value);
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

  // it('should render other attributes with other props provided', () => {
  //   const field = {
  //     value: 'value',
  //   };
  //   const rendered = mount(<Text field={field} tag="h1" className="cssClass" id="lorem" />).find('h1');
  //   expect(rendered).to.have.length(1);
  //   expect(rendered.html()).to.contain('<h1 class="cssClass" id="lorem">');
  //   expect(rendered.html()).to.contain('value');
  // });
});

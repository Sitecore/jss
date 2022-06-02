import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { richTextField as eeRichTextData } from '../test-data/ee-data';
import { RichTextField } from './rendering-field';
import { RichTextDirective } from './rich-text.directive';

@Component({
  selector: 'test-rich-text',
  template: `
    <h1 *scRichText="field; editable: editable"></h1>
  `,
})
class TestComponent {
  @Input() field: RichTextField;
  @Input() editable = true;
}

describe('<div *scRichText />', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RichTextDirective, TestComponent],
      imports: [RouterTestingModule.withRoutes([{ path: 'lorem', component: TestComponent }])],
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
    const field: { [prop: string]: unknown } = {
      value: '<a href="www.example.com">Hello World</a>',
      editable: 'editable',
    };
    comp.field = field;
    comp.editable = false;
    fixture.detectChanges();

    const rendered = de.nativeElement.innerHTML;
    expect(rendered).toBe('<a href="www.example.com">Hello World</a>');
  });

  it('should render value with with just a value', () => {
    const field: { [prop: string]: unknown } = {
      value: 'value',
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.nativeElement.innerHTML;
    expect(rendered).toBe('value');
  });

  it('should render embedded html as-is', () => {
    const field: { [prop: string]: unknown } = {
      value: '<input type="text">some crazy stuff<script code="whaaaat">uh oh</script>',
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.nativeElement.innerHTML;
    expect(rendered).toBe(field.value);
  });

  it('should navigate to an internal link using routerlink', () => {
    const field = {
      value: '<a href="/lorem">Click Me!</a>',
    };
    comp.field = field;
    fixture.detectChanges();
    const router: Router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');

    const renderedLink = de.nativeElement.querySelector('a[href]');
    expect(renderedLink.getAttribute('href')).toBe('/lorem');
    renderedLink.click();
    fixture.detectChanges();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/lorem');
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

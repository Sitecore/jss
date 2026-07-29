import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TextField } from './rendering-field';
import { TestBaseDirective } from '../test-data/test-base.directive';

@Component({
  selector: 'test-base',
  template: `
    <span *scTestBase="field; editable: editable"></span>
  `,
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
})
class TestComponent {
  @Input() field: TextField;
  @Input() editable = true;
}

describe('<span *scTestBase />', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestBaseDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    de = fixture.debugElement;
    comp = fixture.componentInstance;
  });

  describe('edit mode chromes', () => {
    it('should render field value if it is present', () => {
      const field: { [prop: string]: unknown } = {
        value: 'value',
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.query(By.css('span')).nativeElement.innerHTML;
      expect(rendered).toBe('value');
    });

    it('should render field editable if it is present', () => {
      const field: { [prop: string]: unknown } = {
        value: 'value',
        editable: 'editable',
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.query(By.css('span')).nativeElement.innerHTML;
      expect(rendered).toBe(field.editable);
    });

    it('should render nothing if field.editable and value are missing', () => {
      const field: { [prop: string]: unknown } = {
        value: '',
      };
      comp.field = field;
      fixture.detectChanges();

      const spanElement = de.query(By.css('span'));
      expect(spanElement).toBeNull();
    });
  });
});

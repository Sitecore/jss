import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FileDirective } from './file.directive';
import { FileField } from './rendering-field';

@Component({
  selector: 'test-file',
  template: `
    <a *scFile="field"></a>
  `,
})
class TestComponent {
  @Input() field: FileField;
}

describe('<a *scFile />', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);

    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('a'));
  });

  it('should render nothing with missing field', () => {
    expect(de.nativeElement.href).toBe('');
  });

  it('should render nothing with missing value', () => {
    const field = {
      editable: 'lorem',
    };
    comp.field = field;
    fixture.detectChanges();
    expect(de.nativeElement.href).toBe('');
  });

  it('should render with src directly on provided field', () => {
    const field = {
      src: '/lorem',
      title: 'ipsum',
    };

    comp.field = field;
    fixture.detectChanges();

    expect(de.nativeElement.href).toContain(field.src);
    expect(de.nativeElement.innerHTML).toContain(field.title);
  });

  it('should render display name if no title', () => {
    const field = {
      value: {
        src: '/lorem',
        displayName: 'ipsum',
      },
    };
    comp.field = field;
    fixture.detectChanges();

    expect(de.nativeElement.innerHTML).toContain(field.value.displayName);
  });
});

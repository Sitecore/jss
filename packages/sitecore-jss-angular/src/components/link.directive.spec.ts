import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { generalLinkField as eeLinkData } from '../testData/ee-data';
import { LinkDirective } from './link.directive';

@Component({
  selector: 'test-link',
  template: `
    <a *scLink="field; editable: editable; attrs: attrs" id="my-link"></a>
  `,
})
class TestComponent {
  @Input() field: any;
  @Input() editable = true;
  @Input() attrs = {};
}

describe('<a *scLink />', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    de = fixture.debugElement;

    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render nothing with missing field', () => {
    expect(de.children.length).toBe(0);
  });

  it('should render nothing with missing editable and value', () => {
    const field = {};
    comp.field = field;
    fixture.detectChanges();

    expect(de.children.length).toBe(0);
  });

  it('should render editable with an editable value', () => {
    const field = {
      editableFirstPart: '<a class="yo" href="/services">Lorem',
      editableLastPart: '</a>',
    };
    comp.field = field;
    fixture.detectChanges();

    expect(de.query(By.css('span')).nativeElement.innerHTML).toContain(field.editableFirstPart);
  });

  it('should render value with editing explicitly disabled', () => {
    const field = {
      value: {
        href: '/lorem',
        text: 'ipsum',
      },
      editable: '<a href="/services" class="yo">Lorem</a>',
    };
    comp.field = field;
    comp.editable = false;
    fixture.detectChanges();

    const rendered = de.query(By.css('a'));
    expect(rendered.nativeElement.href).toContain(field.value.href);
    expect(rendered.nativeElement.innerHTML).toBe(field.value.text);
  });

  it('should render with href directly on provided field', () => {
    const field = {
      href: '/lorem',
      text: 'ipsum',
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.query(By.css('a'));
    expect(rendered.nativeElement.href).toContain(field.href);
    expect(rendered.nativeElement.innerHTML).toBe(field.text);
  });

  it('should render ee HTML', () => {
    const field = {
      editableFirstPart: eeLinkData,
      editableLastPart: '</a>',
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.query(By.css('span'));
    expect(rendered).not.toBeNull();
    expect(rendered.nativeElement.innerHTML).toContain('<input');
    expect(rendered.nativeElement.innerHTML).toContain('chrometype="field"');
  });

  it('should render all value attributes', () => {
    const field = {
      value: {
        href: '/lorem',
        text: 'ipsum',
        class: 'my-link',
        title: 'My Link',
        target: '_blank',
      },
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.query(By.css('a'));
    expect(rendered.nativeElement.href).toContain(field.value.href);
    expect(rendered.nativeElement.className).toContain(field.value.class);
    expect(rendered.nativeElement.title).toContain(field.value.title);
    expect(rendered.nativeElement.target).toContain(field.value.target);
  });

  it('should render other attributes on wrapper span with other props provided with editable', () => {
    const field = {
      editableFirstPart: '<a href="/services" class="yo">Lorem',
      editableLastPart: '</a>',
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.query(By.css('span'));
    expect(rendered.nativeElement.id).toBe('my-link');
  });

  it('should apply attributes from attrs on wrapper span when rendering in editable mode', () => {
    const field = {
      editableFirstPart: '<a href="/services" class="yo">Lorem',
      editableLastPart: '</a>',
    };
    comp.field = field;
    comp.attrs = { title: 'footip' };
    fixture.detectChanges();

    const rendered = de.query(By.css('span'));
    expect(rendered.nativeElement.title).toBe('footip');
  });

  it('should merge attributes from attrs on link when rendering standard (non-editable mode) field', () => {
    const field = {
      value: {
        href: '/lorem',
        text: 'ipsum',
        class: 'my-link',
        title: 'My Link',
        target: '_blank',
      },
    };
    comp.field = field;
    comp.attrs = { title: 'footip' };
    fixture.detectChanges();

    const rendered = de.query(By.css('a'));
    expect(rendered.nativeElement.target).toBe('_blank');
    expect(rendered.nativeElement.title).toBe('footip');
  });
});

// tslint:disable-next-line:max-classes-per-file
@Component({
  selector: 'test-link-children',
  template: `
    <a *scLink="field; editable: editable; attrs: attrs" id="my-link"><span *ngIf="true">hello world</span></a>
  `,
})
class TestWithChildrenComponent {
  @Input() field: any;
  @Input() editable = true;
  @Input() attrs = {};
}

describe('<a *scLink>children</a>', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkDirective, TestWithChildrenComponent],
    });

    fixture = TestBed.createComponent(TestWithChildrenComponent);
    de = fixture.debugElement;

    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render children with an editable value', () => {
    const field = {
      editableFirstPart: '<a class="yo" href="/services">Lorem',
      editableLastPart: '</a>',
    };
    comp.field = field;
    fixture.detectChanges();

    expect(de.nativeElement.innerHTML).toContain('hello world');
  });

  it('should render children with href directly on provided field', () => {
    const field = {
      href: '/lorem',
      text: 'ipsum',
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.query(By.css('a'));
    expect(rendered.nativeElement.href).toContain(field.href);
    expect(rendered.nativeElement.innerHTML).toContain('<span>hello world</span>');
  });
});

import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { generalLinkField as eeLinkData } from '../testData/ee-data';
import { GenericLinkDirective } from './generic-link.directive';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LinkField } from './rendering-field';

@Component({
  selector: 'test-router-link',
  template: `
    <a *scGenericLink="field; editable: editable; attrs: attrs; extras: extras" id="my-link"></a>
  `,
})
class TestComponent {
  @Input() field: LinkField;
  @Input() editable = true;
  @Input() attrs = {};
  @Input() extras = {};
}

describe('<a *scGenericLink />', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericLinkDirective, TestComponent],
      imports: [RouterTestingModule],
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

@Component({
  selector: 'test-router-link-children',
  template: `
    <a *scGenericLink="field; editable: editable; attrs: attrs; extras: extras" id="my-link"
      ><span *ngIf="true">hello world</span></a
    >
  `,
})
class TestWithChildrenComponent {
  @Input() field: LinkField;
  @Input() editable = true;
  @Input() attrs = {};
  @Input() extras = {};
}

describe('<a *scGenericLink>children</a>', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericLinkDirective, TestWithChildrenComponent],
      imports: [RouterTestingModule],
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
    expect(rendered.nativeElement.innerHTML).toContain('<span>hello world</span>');
  });
});

describe('<a *scGenericLink></a>', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericLinkDirective, TestComponent],
      imports: [RouterTestingModule.withRoutes([{ path: 'lorem', component: TestComponent }])],
    });

    router = TestBed.get(Router);
    spyOn(router, 'navigate');
    fixture = TestBed.createComponent(TestComponent);
    de = fixture.debugElement;

    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to an internal link using routerlink', () => {
    const field = {
      href: 'lorem',
      text: 'ipsum',
    };
    comp.field = field;
    fixture.detectChanges();

    const renderedLink = de.query(By.css('a')).nativeElement;
    expect(renderedLink.getAttribute('href')).toBe(`/${field.href}`);
    renderedLink.click();
    fixture.detectChanges();
    expect(comp.extras).toEqual({});
    expect(router.navigate).toHaveBeenCalledWith(['lorem'], comp.extras);
  });

  it('should navigate to an internal link with query parameters using routerlink', () => {
    const field = {
      href: 'lorem',
      text: 'ipsum',
    };
    const queryParams = { queryParams: { foo: 'bar' } };
    comp.field = field;
    comp.extras = queryParams;
    fixture.detectChanges();

    const renderedLink = de.query(By.css('a')).nativeElement;
    expect(renderedLink.getAttribute('href')).toBe(`/${field.href}?foo=bar`);
    renderedLink.click();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['lorem'], queryParams);
  });

  it('should navigate to an external link using routerlink', () => {
    const field = {
      href: 'http://foo.bar/lorem',
      text: 'ipsum',
    };
    comp.field = field;
    fixture.detectChanges();

    const renderedLink = de.query(By.css('a')).nativeElement;
    expect(renderedLink.getAttribute('href')).toBe(field.href);
  });
});

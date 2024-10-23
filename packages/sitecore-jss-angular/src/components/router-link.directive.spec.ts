import { Component, DebugElement, Input, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { generalLinkField as eeLinkData } from '../test-data/ee-data';
import { RouterLinkDirective } from './router-link.directive';
import { RouterTestingModule } from '@angular/router/testing';
import { LinkField } from './rendering-field';

@Component({
  selector: 'test-router-link',
  template: `
    <a
      *scRouterLink="field; editable: editable; attrs: attrs"
      class="external-css-class"
      id="my-link"
    ></a>
  `,
})
class TestComponent {
  @Input() field: LinkField;
  @Input() editable = true;
  @Input() attrs = {};
}

const emptyLinkFieldEditingTemplateId = 'emptyLinkFieldEditingTemplate';
const emptyLinkFieldEditingTemplate = '<span>[This is a *custom* empty field template]</span>';
const emptyLinkFieldEditingTemplateDefaultTestString =
  '<span sc-default-empty-text-field-editing-placeholder="">[No text in field]</span>';

@Component({
  selector: 'test-empty-template-router-link',
  template: `
    <a
      *scRouterLink="
        field;
        editable: editable;
        attrs: attrs;
        emptyFieldEditingTemplate: ${emptyLinkFieldEditingTemplateId}
      "
      class="external-css-class"
      id="my-link"
    ></a>
    <ng-template #${emptyLinkFieldEditingTemplateId}>
      ${emptyLinkFieldEditingTemplate}
    </ng-template>
  `,
})
class TestEmptyTemplateComponent {
  @Input() field: LinkField;
  @Input() editable = true;
  @Input() attrs = {};
  @Input() emptyFieldEditingTemplate: TemplateRef<unknown>;
}

describe('<a *scRouterLink />', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouterLinkDirective, TestComponent, TestEmptyTemplateComponent],
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

    expect(de.nativeElement.querySelector('span').innerHTML).toContain(field.editableFirstPart);
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

    const rendered = de.nativeElement.querySelector('span');
    expect(rendered).not.toBeNull();
    expect(rendered.innerHTML).toContain('<input');
    expect(rendered.innerHTML).toContain('chrometype="field"');
  });

  it('should render all value attributes', () => {
    const field = {
      value: {
        anchor: 'sample-anchor',
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
    expect(rendered.nativeElement.href).toContain(`${field.value.href}#${field.value.anchor}`);
    expect(rendered.nativeElement.className).toBe('external-css-class my-link');
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

    const rendered = de.nativeElement.querySelector('span');
    expect(rendered.id).toBe('my-link');
  });

  it('should apply attributes from attrs on wrapper span when rendering in editable mode', () => {
    const field = {
      editableFirstPart: '<a href="/services" class="yo">Lorem',
      editableLastPart: '</a>',
    };
    comp.field = field;
    comp.attrs = { title: 'footip' };
    fixture.detectChanges();

    const rendered = de.nativeElement.querySelector('span');
    expect(rendered.title).toBe('footip');
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
    expect(rendered.nativeElement.className).toBe('external-css-class my-link');
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
      fieldType: 'link',
      rawValue: 'Test1',
    };

    it('should render default empty field component when field value href is not present', () => {
      const field = {
        value: { src: undefined },
        metadata: testMetadata,
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.nativeElement.innerHTML;
      expect(rendered).toContain(emptyLinkFieldEditingTemplateDefaultTestString);
    });

    it('should render default empty field component when field href is not present', () => {
      const field = {
        hred: undefined,
        metadata: testMetadata,
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.nativeElement.innerHTML;
      expect(rendered).toContain(emptyLinkFieldEditingTemplateDefaultTestString);
    });

    it('should render custom empty field component when provided, when field value href is not present', () => {
      fixture = TestBed.createComponent(TestEmptyTemplateComponent);
      fixture.detectChanges();

      de = fixture.debugElement;
      comp = fixture.componentInstance;

      const field = {
        value: { href: undefined },
        metadata: testMetadata,
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.nativeElement.innerHTML;
      expect(rendered).toContain(emptyLinkFieldEditingTemplate);
    });

    it('should render custom empty field component when provided, when field href is not present', () => {
      fixture = TestBed.createComponent(TestEmptyTemplateComponent);
      fixture.detectChanges();

      de = fixture.debugElement;
      comp = fixture.componentInstance;

      const field = {
        href: undefined,
        metadata: testMetadata,
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.nativeElement.innerHTML;
      expect(rendered).toContain(emptyLinkFieldEditingTemplate);
    });

    it('should render nothing when field value href is not present, when editing is explicitly disabled', () => {
      const field = {
        value: { href: undefined },
        metadata: testMetadata,
      };
      comp.field = field;
      comp.editable = false;
      fixture.detectChanges();
      expect(de.children.length).toBe(0);
    });

    it('should render nothing when field href is empty, when editing is explicitly disabled', () => {
      const field = {
        href: undefined,
        metadata: testMetadata,
      };
      comp.field = field;
      comp.editable = false;
      fixture.detectChanges();
      expect(de.children.length).toBe(0);
    });
  });
});

@Component({
  selector: 'test-router-link-children',
  template: `
    <a *scRouterLink="field; editable: editable; attrs: attrs" id="my-link"
      ><span *ngIf="true">hello world</span></a
    >
  `,
})
class TestWithChildrenComponent {
  @Input() field: LinkField;
  @Input() editable = true;
  @Input() attrs = {};
}

@Component({
  selector: 'test-empty-template-link',
  template: `
    <a
      *scRouterLink="
        field;
        editable: editable;
        attrs: attrs;
        emptyFieldEditingTemplate: ${emptyLinkFieldEditingTemplateId}
      "
      id="my-link"
      ><span *ngIf="true">hello world</span></a
    >
    <ng-template #${emptyLinkFieldEditingTemplateId}>
      ${emptyLinkFieldEditingTemplate}
    </ng-template>
  `,
})
class TestEmptyTemplateWithChildrenComponent {
  @Input() field: LinkField;
  @Input() editable = true;
  @Input() attrs = {};
  @Input() emptyFieldEditingTemplate: TemplateRef<unknown>;
}

describe('<a *scRouterLink>children</a>', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RouterLinkDirective,
        TestWithChildrenComponent,
        TestEmptyTemplateWithChildrenComponent,
      ],
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

  describe('editMode metadata', () => {
    const testMetadata = {
      contextItem: {
        id: '{09A07660-6834-476C-B93B-584248D3003B}',
        language: 'en',
        revision: 'a0b36ce0a7db49418edf90eb9621e145',
        version: 1,
      },
      fieldId: '{414061F4-FBB1-4591-BC37-BFFA67F745EB}',
      fieldType: 'link',
      rawValue: 'Test1',
    };

    it('should render default empty field component when field value href is not present', () => {
      const field = {
        value: { src: undefined },
        metadata: testMetadata,
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.nativeElement.innerHTML;
      expect(rendered).toContain(emptyLinkFieldEditingTemplateDefaultTestString);
    });

    it('should render default empty field component when field href is not present', () => {
      const field = {
        hred: undefined,
        metadata: testMetadata,
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.nativeElement.innerHTML;
      expect(rendered).toContain(emptyLinkFieldEditingTemplateDefaultTestString);
    });

    it('should render custom empty field component when provided, when field value href is not present', () => {
      fixture = TestBed.createComponent(TestEmptyTemplateWithChildrenComponent);
      fixture.detectChanges();

      de = fixture.debugElement;
      comp = fixture.componentInstance;

      const field = {
        value: { href: undefined },
        metadata: testMetadata,
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.nativeElement.innerHTML;
      expect(rendered).toContain(emptyLinkFieldEditingTemplate);
    });

    it('should render custom empty field component when provided, when field href is not present', () => {
      fixture = TestBed.createComponent(TestEmptyTemplateWithChildrenComponent);
      fixture.detectChanges();

      de = fixture.debugElement;
      comp = fixture.componentInstance;

      const field = {
        href: undefined,
        metadata: testMetadata,
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.nativeElement.innerHTML;
      expect(rendered).toContain(emptyLinkFieldEditingTemplate);
    });

    it('should render nothing when field value href is not present, when editing is explicitly disabled', () => {
      const field = {
        value: { href: undefined },
        metadata: testMetadata,
      };
      comp.field = field;
      comp.editable = false;
      fixture.detectChanges();
      expect(de.children.length).toBe(0);
    });

    it('should render nothing when field href is empty, when editing is explicitly disabled', () => {
      const field = {
        href: undefined,
        metadata: testMetadata,
      };
      comp.field = field;
      comp.editable = false;
      fixture.detectChanges();
      expect(de.children.length).toBe(0);
    });
  });
});

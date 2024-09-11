import { Component, DebugElement, Input, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { generalLinkField as eeLinkData } from '../test-data/ee-data';
import { LinkDirective } from './link.directive';
import { LinkField } from './rendering-field';

@Component({
  selector: 'test-link',
  template: `
    <a *scLink="field; editable: editable; attrs: attrs" id="my-link"></a>
  `,
})
class TestComponent {
  @Input() field: LinkField;
  @Input() editable = true;
  @Input() attrs = {};
}

const emptyLinkFieldEditingTemplateId = 'emptyLinkFieldEditingTemplate';
const emptyLinkFieldEditingTemplate = '<span>[This is a *custom* empty field template]</span>';
const emptyLinkFieldEditingTemplateDefaultTestString = '<span>[No text in field]</span>';

@Component({
  selector: 'test-empty-template-link',
  template: `
    <a
      *scLink="
        field;
        editable: editable;
        emptyFieldEditingTemplate: ${emptyLinkFieldEditingTemplateId}
      "
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

describe('<a *scLink />', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkDirective, TestComponent, TestEmptyTemplateComponent],
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

  it('should render nothing for empty field', () => {
    const field = {
      value: { href: '' },
    };
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
  });

  describe('should render empty href when href attribute is invalid', () => {
    it('undefined', () => {
      const field = {
        value: {
          href: '',
        },
        text: 'ipsum',
      };
      comp.editable = false;
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.query(By.css('a'));

      expect(rendered.nativeElement.href).toBe('');
      expect(rendered.nativeElement.innerHTML).toBe(field.text);
    });

    it('http://', () => {
      const field = {
        value: {
          href: 'http://',
        },
        text: 'ipsum',
      };
      comp.editable = false;
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.query(By.css('a'));

      expect(rendered.nativeElement.href).toBe('');
      expect(rendered.nativeElement.innerHTML).toBe(field.text);
    });

    it('https://', () => {
      const field = {
        value: {
          href: 'https://',
        },
        text: 'ipsum',
      };
      comp.editable = false;
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.query(By.css('a'));

      expect(rendered.nativeElement.href).toBe('');
      expect(rendered.nativeElement.innerHTML).toBe(field.text);
    });
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

    describe('with "metadata" property value', () => {
      describe('and edtiging enabled', () => {
        it('should render <img /> with metadata chrome tags', () => {
          const linkField = {
            metadata: { foo: 'bar' },
            value: {
              href: '/lorem',
              text: 'ipsum',
              class: 'my-link',
              title: 'My Link',
              target: '_blank',
            },
          };
          comp.editable = true;
          comp.field = linkField;
          fixture.detectChanges();

          const link = de.query(By.css('a')).nativeElement as HTMLElement;

          const metadataOpenTag = link.previousElementSibling;
          const metadataCloseTag = link.nextElementSibling;

          expect(metadataOpenTag).toBeDefined();
          expect(metadataOpenTag?.tagName).toEqual('CODE');
          expect(metadataOpenTag?.getAttribute('kind')).toEqual('open');
          expect(metadataOpenTag?.getAttribute('chrometype')).toEqual('field');

          expect(metadataOpenTag?.textContent).toContain(JSON.stringify(linkField.metadata));

          expect(metadataCloseTag).toBeDefined();
          expect(metadataCloseTag?.tagName).toEqual('CODE');
          expect(metadataOpenTag?.getAttribute('chrometype')).toEqual('field');
          expect(metadataCloseTag?.getAttribute('kind')).toEqual('close');
        });

        it('should render empty field with metadata chrome tags', () => {
          const field = {
            metadata: { foo: 'bar' },
            value: { src: undefined },
          };
          comp.editable = true;
          comp.field = field;
          fixture.detectChanges();

          const fieldValue = de.query(By.css('sc-default-empty-text-field-editing-placeholder'));
          const metadataOpenTag = fieldValue.nativeElement.previousElementSibling;
          const metadataCloseTag = fieldValue.nativeElement.nextElementSibling;

          expect(metadataOpenTag).toBeDefined();
          expect(metadataOpenTag?.tagName).toEqual('CODE');
          expect(metadataOpenTag?.getAttribute('kind')).toEqual('open');
          expect(metadataOpenTag?.getAttribute('chrometype')).toEqual('field');

          expect(metadataOpenTag?.textContent).toContain(JSON.stringify(field.metadata));

          expect(metadataCloseTag).toBeDefined();
          expect(metadataCloseTag?.tagName).toEqual('CODE');
          expect(metadataOpenTag?.getAttribute('chrometype')).toEqual('field');
          expect(metadataCloseTag?.getAttribute('kind')).toEqual('close');
        });
      });

      describe('and edtiging disabled', () => {
        it('should render <img /> without metadata chrome tags', () => {
          const linkField = {
            metadata: { foo: 'bar' },
            value: {
              href: '/lorem',
              text: 'ipsum',
              class: 'my-link',
              title: 'My Link',
              target: '_blank',
            },
          };
          comp.editable = false;
          comp.field = linkField;
          fixture.detectChanges();

          const link = de.query(By.css('a')).nativeElement as HTMLElement;

          const metadataOpenTag = link.previousElementSibling;
          const metadataCloseTag = link.nextElementSibling;

          expect(metadataOpenTag).toBeNull();
          expect(metadataCloseTag).toBeNull();
        });
      });
    });

    describe('without "metadata" property value', () => {
      it('should render <img /> without metadata chrome tags', () => {
        const linkField = {
          value: {
            href: '/lorem',
            text: 'ipsum',
            class: 'my-link',
            title: 'My Link',
            target: '_blank',
          },
        };
        comp.editable = true;
        comp.field = linkField;
        fixture.detectChanges();

        const link = de.query(By.css('a')).nativeElement as HTMLElement;

        const metadataOpenTag = link.previousElementSibling;
        const metadataCloseTag = link.nextElementSibling;

        expect(metadataOpenTag).toBeNull();
        expect(metadataCloseTag).toBeNull();
      });
    });
  });
});

@Component({
  selector: 'test-link-children',
  template: `
    <a *scLink="field; editable: editable; attrs: attrs" id="my-link"
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
      *scLink="
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

describe('<a *scLink>children</a>', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LinkDirective,
        TestWithChildrenComponent,
        TestEmptyTemplateWithChildrenComponent,
      ],
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

  it('should render children and value without href', () => {
    const field = {
      value: {
        href: '',
      },
      text: 'ipsum',
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.query(By.css('a'));

    expect(rendered.nativeElement.href).toBe('');
    expect(rendered.nativeElement.innerHTML).toContain('<span>hello world</span>');
  });

  describe('should render children and value with empty href when href attribute is invalid', () => {
    it('undefined', () => {
      const field = {
        value: {
          href: '',
        },
        text: 'ipsum',
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.query(By.css('a'));

      expect(rendered.nativeElement.href).toBe('');
      expect(rendered.nativeElement.innerHTML).toContain('<span>hello world</span>');
    });

    it('http://', () => {
      const field = {
        value: {
          href: 'http://',
        },
        text: 'ipsum',
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.query(By.css('a'));

      expect(rendered.nativeElement.href).toBe('');
      expect(rendered.nativeElement.innerHTML).toContain('<span>hello world</span>');
    });

    it('https://', () => {
      const field = {
        value: {
          href: 'https://',
        },
        text: 'ipsum',
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.query(By.css('a'));

      expect(rendered.nativeElement.href).toBe('');
      expect(rendered.nativeElement.innerHTML).toContain('<span>hello world</span>');
    });
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

    describe('with "metadata" property value', () => {
      describe('and edtiging enabled', () => {
        it('should render <img /> with metadata chrome tags', () => {
          const linkField = {
            metadata: { foo: 'bar' },
            value: {
              href: '/lorem',
              text: 'ipsum',
              class: 'my-link',
              title: 'My Link',
              target: '_blank',
            },
          };
          comp.editable = true;
          comp.field = linkField;
          fixture.detectChanges();

          const link = de.query(By.css('a')).nativeElement as HTMLElement;

          const metadataOpenTag = link.previousElementSibling;
          const metadataCloseTag = link.nextElementSibling;

          expect(metadataOpenTag).toBeDefined();
          expect(metadataOpenTag?.tagName).toEqual('CODE');
          expect(metadataOpenTag?.getAttribute('kind')).toEqual('open');
          expect(metadataOpenTag?.getAttribute('chrometype')).toEqual('field');

          expect(metadataOpenTag?.textContent).toContain(JSON.stringify(linkField.metadata));

          expect(metadataCloseTag).toBeDefined();
          expect(metadataCloseTag?.tagName).toEqual('CODE');
          expect(metadataOpenTag?.getAttribute('chrometype')).toEqual('field');
          expect(metadataCloseTag?.getAttribute('kind')).toEqual('close');
        });

        it('should render empty field with metadata chrome tags', () => {
          const field = {
            metadata: { foo: 'bar' },
            value: { src: undefined },
          };
          comp.editable = true;
          comp.field = field;
          fixture.detectChanges();

          const fieldValue = de.query(By.css('sc-default-empty-text-field-editing-placeholder'));
          const metadataOpenTag = fieldValue.nativeElement.previousElementSibling;
          const metadataCloseTag = fieldValue.nativeElement.nextElementSibling;

          expect(metadataOpenTag).toBeDefined();
          expect(metadataOpenTag?.tagName).toEqual('CODE');
          expect(metadataOpenTag?.getAttribute('kind')).toEqual('open');
          expect(metadataOpenTag?.getAttribute('chrometype')).toEqual('field');

          expect(metadataOpenTag?.textContent).toContain(JSON.stringify(field.metadata));

          expect(metadataCloseTag).toBeDefined();
          expect(metadataCloseTag?.tagName).toEqual('CODE');
          expect(metadataOpenTag?.getAttribute('chrometype')).toEqual('field');
          expect(metadataCloseTag?.getAttribute('kind')).toEqual('close');
        });
      });

      describe('and edtiging disabled', () => {
        it('should render <img /> without metadata chrome tags', () => {
          const linkField = {
            metadata: { foo: 'bar' },
            value: {
              href: '/lorem',
              text: 'ipsum',
              class: 'my-link',
              title: 'My Link',
              target: '_blank',
            },
          };
          comp.editable = false;
          comp.field = linkField;
          fixture.detectChanges();

          const link = de.query(By.css('a')).nativeElement as HTMLElement;

          const metadataOpenTag = link.previousElementSibling;
          const metadataCloseTag = link.nextElementSibling;

          expect(metadataOpenTag).toBeNull();
          expect(metadataCloseTag).toBeNull();
        });
      });
    });

    describe('without "metadata" property value', () => {
      it('should render <img /> without metadata chrome tags', () => {
        const linkField = {
          value: {
            href: '/lorem',
            text: 'ipsum',
            class: 'my-link',
            title: 'My Link',
            target: '_blank',
          },
        };
        comp.editable = true;
        comp.field = linkField;
        fixture.detectChanges();

        const link = de.query(By.css('a')).nativeElement as HTMLElement;

        const metadataOpenTag = link.previousElementSibling;
        const metadataCloseTag = link.nextElementSibling;

        expect(metadataOpenTag).toBeNull();
        expect(metadataCloseTag).toBeNull();
      });
    });
  });
});

@Component({
  selector: 'test-link-children',
  template: `
    <a *scLink="field" class="initialClass" id="my-link"></a>
  `,
})
class TestWithClassComponent {
  @Input() field: any;
  @Input() editable = true;
  @Input() attrs = {};
}
describe('<a *scLink class="class"></a>', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkDirective, TestWithClassComponent],
    });

    fixture = TestBed.createComponent(TestWithClassComponent);
    de = fixture.debugElement;

    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should maintain the class when generating the link and class is not overwritten', () => {
    const field = {
      class: '',
      href: '/lorem',
      text: 'ipsum',
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.query(By.css('a'));
    expect(rendered.nativeElement.getAttribute('class')).toBe('initialClass');
  });

  it('should merge the class when generating the link', () => {
    const field = {
      class: 'extraClass',
      href: '/lorem',
      text: 'ipsum',
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.query(By.css('a'));
    expect(rendered.nativeElement.getAttribute('class')).toBe('initialClass extraClass');
  });
});

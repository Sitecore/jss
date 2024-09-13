import { Component, DebugElement, Input, TemplateRef } from '@angular/core';
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

const emptyTextFieldEditingTemplateId = 'emptyTextFieldEditingTemplate';
const emptyTextFieldEditingTemplate =
  '<span>[This is a *custom* empty field component for text]</span>';

@Component({
  selector: 'test-empty-template-rich-text',
  template: `
    <h1
      *scRichText="
        field;
        editable: editable;
        emptyFieldEditingTemplate: ${emptyTextFieldEditingTemplateId}
      "
    ></h1>
    <ng-template #${emptyTextFieldEditingTemplateId}>
      ${emptyTextFieldEditingTemplate}
    </ng-template>
  `,
})
class TestEmptyTemplateComponent {
  @Input() field: RichTextField;
  @Input() emptyFieldEditingTemplate: TemplateRef<unknown>;
  @Input() editable = true;
}

describe('<div *scRichText />', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RichTextDirective, TestComponent, TestEmptyTemplateComponent],
      imports: [RouterTestingModule.withRoutes([{ path: 'lorem', component: TestComponent }])],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    de = fixture.debugElement;
    comp = fixture.componentInstance;
  });

  it('should render nothing with missing field', () => {
    const deh1 = de.query(By.css('h1'));
    expect(deh1).toBeNull();
  });

  it('should render nothing with missing editable and value', () => {
    comp.field = {};
    fixture.detectChanges();

    const deh1 = de.query(By.css('h1'));
    expect(deh1).toBeNull();
  });

  it('should render editable with editable value', () => {
    const field = {
      value: 'value',
      editable: 'editable',
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.query(By.css('h1')).nativeElement.innerHTML;
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

    const rendered = de.query(By.css('h1')).nativeElement.innerHTML;
    expect(rendered).toBe('<a href="www.example.com">Hello World</a>');
  });

  it('should render value with with just a value', () => {
    const field: { [prop: string]: unknown } = {
      value: 'value',
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.query(By.css('h1')).nativeElement.innerHTML;
    expect(rendered).toBe('value');
  });

  it('should render embedded html as-is', () => {
    const field: { [prop: string]: unknown } = {
      value: '<input type="text">some crazy stuff<script code="whaaaat">uh oh</script>',
    };
    comp.field = field;
    fixture.detectChanges();

    const rendered = de.query(By.css('h1')).nativeElement.innerHTML;
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

    const renderedLink = de.query(By.css('h1')).nativeElement.querySelector('a[href]');
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

    const rendered = de.query(By.css('h1')).nativeElement.innerHTML;
    expect(rendered).toContain('<input');
    expect(rendered).toContain('<span class="scChromeData">');
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
      fieldType: 'single-line',
      rawValue: 'Test1',
    };

    it('should render default empty field component when field value is empty', () => {
      const field = {
        value: '',
        metadata: testMetadata,
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.nativeElement.innerHTML;
      expect(rendered).toContain('<span>[No text in field]</span>');
    });

    it('should render custom empty field component when provided, when field value is empty', () => {
      fixture = TestBed.createComponent(TestEmptyTemplateComponent);
      fixture.detectChanges();

      de = fixture.debugElement;
      comp = fixture.componentInstance;

      const field = {
        value: '',
        metadata: testMetadata,
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.nativeElement.innerHTML;
      expect(rendered).toContain(emptyTextFieldEditingTemplate);
    });

    it('should render nothing when field value is empty, when editing is explicitly disabled', () => {
      const field = {
        value: '',
        metadata: testMetadata,
      };
      comp.field = field;
      comp.editable = false;
      fixture.detectChanges();

      const deh1 = de.query(By.css('h1'));
      expect(deh1).toBeNull();
    });

    describe('with "metadata" property value', () => {
      describe('and editing enabled', () => {
        it('should render <img /> with metadata chrome tags', () => {
          const field = {
            metadata: { foo: 'bar' },
            value: 'foo',
          };
          comp.editable = true;
          comp.field = field;
          fixture.detectChanges();

          const fieldValue = de.query(By.css('h1'));
          const metadataOpenTag = fieldValue.nativeElement.previousElementSibling;
          const metadataCloseTag = fieldValue.nativeElement.nextElementSibling;

          expect(metadataOpenTag?.outerHTML).toEqual(
            '<code scfieldmetadatamarker="" type="text/sitecore" chrometype="field" kind="open" class="scpm">{"foo":"bar"}</code>'
          );
          expect(metadataCloseTag?.outerHTML).toEqual(
            '<code scfieldmetadatamarker="" type="text/sitecore" chrometype="field" kind="close" class="scpm"></code>'
          );
        });

        it('should render empty field with metadata chrome tags', () => {
          const field = {
            metadata: { foo: 'bar' },
            value: '',
          };
          comp.editable = true;
          comp.field = field;
          fixture.detectChanges();

          const fieldValue = de.query(By.css('sc-default-empty-text-field-editing-placeholder'));
          const metadataOpenTag = fieldValue.nativeElement.previousElementSibling;
          const metadataCloseTag = fieldValue.nativeElement.nextElementSibling;

          expect(metadataOpenTag?.outerHTML).toEqual(
            '<code scfieldmetadatamarker="" type="text/sitecore" chrometype="field" kind="open" class="scpm">{"foo":"bar"}</code>'
          );
          expect(metadataCloseTag?.outerHTML).toEqual(
            '<code scfieldmetadatamarker="" type="text/sitecore" chrometype="field" kind="close" class="scpm"></code>'
          );
        });
      });

      describe('and editing disabled', () => {
        it('should render <img /> without metadata chrome tags', () => {
          const field = {
            metadata: { foo: 'bar' },
            value: 'foo',
          };
          comp.editable = false;
          comp.field = field;
          fixture.detectChanges();

          const fieldValue = de.query(By.css('h1'));
          const metadataOpenTag = fieldValue.nativeElement.previousElementSibling;
          const metadataCloseTag = fieldValue.nativeElement.nextElementSibling;

          expect(metadataOpenTag).toBeNull();
          expect(metadataCloseTag).toBeNull();
        });
      });
    });

    describe('without "metadata" property value', () => {
      it('should render <img /> without metadata chrome tags', () => {
        const field = {
          value: 'foo ',
        };
        comp.editable = true;
        comp.field = field;
        fixture.detectChanges();

        const fieldValue = de.query(By.css('h1'));
        const metadataOpenTag = fieldValue.nativeElement.previousElementSibling;
        const metadataCloseTag = fieldValue.nativeElement.nextElementSibling;

        expect(metadataOpenTag).toBeNull();
        expect(metadataCloseTag).toBeNull();
      });
    });
  });
});

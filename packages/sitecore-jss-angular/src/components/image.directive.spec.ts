import { Component, DebugElement, Input, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { imageField as eeImageData } from '../test-data/ee-data';
import { ImageDirective } from './image.directive';
import { ImageField } from './rendering-field';

@Component({
  selector: 'test-image',
  template: `
    <img class="some" id="another" *scImage="field; editable: editable" />
  `,
})
class TestComponent {
  @Input() field: ImageField | '';
  @Input() editable = true;
}

@Component({
  selector: 'test-image2',
  template: `
    <img
      height="1"
      width="1"
      *scImage="
        field;
        editable: editable;
        urlParams: params;
        attrs: imageAttrs;
        mediaUrlPrefix: mediaUrlPrefix
      "
    />
  `,
})
class AnotherTestComponent {
  @Input() field: ImageField;
  @Input() editable = true;
  @Input() params: { [param: string]: string | number } = {};
  @Input() imageAttrs: { [param: string]: unknown } = {};
  @Input() mediaUrlPrefix?: RegExp;
}

const emptyImageFieldEditingTemplateId = 'emptyImageFieldEditingTemplate';
const emptyImageFieldEditingTemplate = '<img src="" alt="Empty image">';
const emptyImageFieldEditingTemplateDefaultTestString =
  'M174,54c7.17,0,13,5.83,13,13s-5.83,13-13,13s-13-5.83-13-13S166.83,54,174,54 M174,52 c-8.28,0-15,6.72-15,15s6.72,15,15,15s15-6.72,15-15S182.28,52,174,52L174,52z';

@Component({
  selector: 'test-empty-template-image',
  template: `
    <img
      class="some"
      id="another"
      *scImage="
        field;
        editable: editable;
        emptyFieldEditingTemplate: ${emptyImageFieldEditingTemplateId}
      "
    />
    <ng-template #${emptyImageFieldEditingTemplateId}>
      ${emptyImageFieldEditingTemplate}
    </ng-template>
  `,
})
class TestEmptyTemplateComponent {
  @Input() field: ImageField;
  @Input() emptyFieldEditingTemplate: TemplateRef<unknown>;
  @Input() editable = true;
}

describe('<img *scImage />', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ImageDirective,
        TestComponent,
        AnotherTestComponent,
        TestEmptyTemplateComponent,
      ],
    });

    fixture = TestBed.createComponent(TestComponent);
    de = fixture.debugElement;

    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('with direct image object, no value/editable', () => {
    it('should render <img /> with url', () => {
      const media = {
        src: '/assets/img/test0.png',
        width: 8,
        height: 10,
      };

      comp.field = media;
      fixture.detectChanges();
      const img = de.query(By.css('img')).nativeElement;

      expect(img.src).toContain(media.src); // src also contains <base> href which is OK.
      expect(img.width).toBe(media.width);
      expect(img.height).toBe(media.height);
    });

    it('should render <img /> with non-media props', () => {
      const media = {
        src: '/assets/img/test0.png',
      };

      comp.field = media;
      fixture.detectChanges();

      const img = de.query(By.css('img')).nativeElement;
      expect(img.id).toBe('another');
    });
  });

  describe('with "value" property value', () => {
    it('should render <img /> component with "value" properties', () => {
      const media = {
        value: {
          src: '/assets/img/test0.png',
          alt: 'my image',
        },
      };
      comp.field = media;
      fixture.detectChanges();

      const img = de.query(By.css('img')).nativeElement;

      expect(img.src).toContain(media.value.src); // src also contains <base> href which is OK.
      expect(img.alt).toBe(media.value.alt);
    });

    it('should render <img /> with non-media props', () => {
      const media = {
        value: {
          src: '/assets/img/test0.png',
        },
      };
      comp.field = media;
      fixture.detectChanges();

      const img = de.query(By.css('img')).nativeElement;
      expect(img.id).toBe('another');
    });
  });

  describe('with "editable" property value', () => {
    it('should render wrapper containing experience editor value', () => {
      const media = {
        editable: eeImageData,
      };

      comp.field = media;
      fixture.detectChanges();

      const img = de.nativeElement.querySelector('.sc-image-wrapper');

      expect(img.innerHTML).toContain('<img');
      expect(img.innerHTML).toContain('<input');
    });

    it('should render inner editable img tag with added attributes', () => {
      const media = {
        editable: eeImageData,
      };

      comp.field = media;
      fixture.detectChanges();

      const img = de.nativeElement.getElementsByTagName('img')[0];
      expect(img.id).toBe('another');
      expect(img.className).toContain('some');
    });
  });

  describe('with complex inputs and overrides', () => {
    let fixture2: ComponentFixture<AnotherTestComponent>;
    let comp2: AnotherTestComponent;
    const media = {
      value: {
        src: '/-/media/assets/img/test0.png',
        alt: 'my image',
        height: '650',
        width: '300',
      },
    };
    const eeMedia = {
      editable: eeImageData,
    };
    const imageParams = {
      h: '100',
      w: '150',
    };
    const imageAttrs = {
      height: 100,
      width: 150,
    };

    beforeEach(() => {
      fixture2 = TestBed.createComponent(AnotherTestComponent);
      de = fixture2.debugElement;
      comp2 = fixture2.componentInstance;
      fixture2.detectChanges();

      comp2.params = imageParams;
      comp2.imageAttrs = imageAttrs;
      fixture2.detectChanges();
    });

    it('should render img with addtional props', () => {
      comp2.field = media;
      fixture2.detectChanges();

      const img = de.nativeElement.getElementsByTagName('img')[0];
      expect(img.height).toBe(100);
      expect(img.width).toBe(150);
    });

    it('should render img with addtional props in EE mode', () => {
      comp2.field = eeMedia;
      fixture2.detectChanges();

      const img = de.nativeElement.getElementsByTagName('img')[0];
      expect(img.height).toBe(100);
      expect(img.width).toBe(150);
    });

    it('should update image url', () => {
      comp2.field = media;
      fixture2.detectChanges();

      const img = de.nativeElement.getElementsByTagName('img')[0];
      const url = new URL(img.getAttribute('src'), 'http://test.com');
      expect(url.pathname).toContain('/-/jssmedia/');
      expect(url.searchParams.get('h')).toBe(imageParams.h);
      expect(url.searchParams.get('w')).toBe(imageParams.w);
      expect(url.searchParams.get('hash')).toBeNull();
    });

    it('should update image url in EE mode', () => {
      comp2.field = eeMedia;
      fixture2.detectChanges();

      const img = de.nativeElement.getElementsByTagName('img')[0];
      const url = new URL(img.getAttribute('src'), 'http://test.com');
      expect(url.pathname).toContain('/-/jssmedia/');
      expect(url.searchParams.get('h')).toBe(imageParams.h);
      expect(url.searchParams.get('w')).toBe(imageParams.w);
      expect(url.searchParams.get('hash')).toBeNull();
    });

    it('should update image url using custom mediaUrlPrefix', () => {
      const testImg = (expectedPrefix: string) => {
        const img = de.nativeElement.getElementsByTagName('img')[0];
        const url = new URL(img.getAttribute('src'), 'http://test.com');

        expect(url.pathname).toContain(expectedPrefix);
        expect(url.searchParams.get('h')).toBe(imageParams.h);
        expect(url.searchParams.get('w')).toBe(imageParams.w);
        expect(url.searchParams.get('hash')).toBeNull();
      };

      comp2.mediaUrlPrefix = /\/([-~]{1})test\//i;
      comp2.field = {
        value: {
          src: '/-test/assets/img/test0.png',
          alt: 'my image',
          height: '650',
          width: '300',
        },
      };

      fixture2.detectChanges();

      testImg('/-/jssmedia/');

      comp2.field = {
        value: {
          src: '/~test/assets/img/test0.png',
          alt: 'my image',
          height: '650',
          width: '300',
        },
      };

      fixture2.detectChanges();

      testImg('/~/jssmedia/');

      comp2.field = {
        value: {
          src: '/-invalid/assets/img/test0.png',
          alt: 'my image',
          height: '650',
          width: '300',
        },
      };

      fixture2.detectChanges();

      testImg('/-invalid/');
    });

    it('should update image url using custom mediaUrlPrefix with srcSet', () => {
      const testImg = (expectedPrefix: string) => {
        const img = de.nativeElement.getElementsByTagName('img')[0];
        const url = img.getAttribute('srcset');

        expect(url).toBe(
          `${expectedPrefix}assets/img/test0.png?h=100&w=150&mw=100 150w, ${expectedPrefix}assets/img/test0.png?h=100&w=150&mw=300 150w`
        );
      };

      comp2.imageAttrs = {
        srcSet: [{ mw: 100 }, { mw: 300 }],
      };
      comp2.mediaUrlPrefix = /\/([-~]{1})test\//i;

      comp2.field = {
        value: {
          src: '/-test/assets/img/test0.png',
          alt: 'my image',
        },
      };

      fixture2.detectChanges();

      testImg('/-/jssmedia/');

      comp2.field = {
        value: {
          src: '/~test/assets/img/test0.png',
          alt: 'my image',
        },
      };

      fixture2.detectChanges();

      testImg('/~/jssmedia/');

      comp2.field = {
        value: {
          src: '/~invalid/assets/img/test0.png',
          alt: 'my image',
        },
      };

      fixture2.detectChanges();

      testImg('/~invalid/');
    });
  });

  describe('with "editable" property value but editing disabled', () => {
    it('should render <img /> component with "value" properties', () => {
      const media = {
        editable: eeImageData,
        value: {
          src: '/assets/img/test0.png',
          alt: 'my image',
        },
      };
      comp.editable = false;
      comp.field = media;
      fixture.detectChanges();

      const img = de.query(By.css('img')).nativeElement;

      expect(img.src).toContain(media.value.src); // src also contains <base> href which is OK.
      expect(img.alt).toBe(media.value.alt);
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
      fieldType: 'image',
      rawValue: 'Test1',
    };

    it('should render default empty field component for Image when field value src is not present', () => {
      const field = {
        value: { src: undefined },
        metadata: testMetadata,
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.nativeElement.innerHTML;
      expect(rendered).toContain(emptyImageFieldEditingTemplateDefaultTestString);
    });

    it('should render default empty field component for Image when field src is not present', () => {
      const field = {
        src: undefined,
        metadata: testMetadata,
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.nativeElement.innerHTML;
      expect(rendered).toContain(emptyImageFieldEditingTemplateDefaultTestString);
    });

    it('should render custom empty field component when provided, when field value src is not present', () => {
      fixture = TestBed.createComponent(TestEmptyTemplateComponent);
      fixture.detectChanges();

      de = fixture.debugElement;
      comp = fixture.componentInstance;

      const field = {
        value: { src: undefined },
        metadata: testMetadata,
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.nativeElement.innerHTML;
      expect(rendered).toContain(emptyImageFieldEditingTemplate);
    });

    it('should render custom empty field component when provided, when field src is not present', () => {
      fixture = TestBed.createComponent(TestEmptyTemplateComponent);
      fixture.detectChanges();

      de = fixture.debugElement;
      comp = fixture.componentInstance;

      const field = {
        src: undefined,
        metadata: testMetadata,
      };
      comp.field = field;
      fixture.detectChanges();

      const rendered = de.nativeElement.innerHTML;
      expect(rendered).toContain(emptyImageFieldEditingTemplate);
    });

    it('should render nothing when field value src is not present, when editing is explicitly disabled', () => {
      const field = {
        value: { src: undefined },
        metadata: testMetadata,
      };
      comp.field = field;
      comp.editable = false;
      fixture.detectChanges();

      expect(de.children.length).toBe(0);
    });

    it('should render nothing when field src is not present, when editing is explicitly disabled', () => {
      const field = {
        src: undefined,
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
          const media = {
            metadata: { foo: 'bar' },
            value: {
              src: '/assets/img/test0.png',
              alt: 'my image',
            },
          };
          comp.editable = true;
          comp.field = media;
          fixture.detectChanges();

          const img = de.query(By.css('img')).nativeElement as HTMLElement;

          const metadataOpenTag = img.previousElementSibling;
          const metadataCloseTag = img.nextElementSibling;

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
            value: { src: undefined },
          };
          comp.editable = true;
          comp.field = field;
          fixture.detectChanges();

          const fieldValue = de.query(By.css('sc-default-empty-image-field-editing-placeholder'));
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
          const media = {
            metadata: { foo: 'bar' },
            value: {
              src: '/assets/img/test0.png',
              alt: 'my image',
            },
          };
          comp.editable = false;
          comp.field = media;
          fixture.detectChanges();

          const img = de.query(By.css('img')).nativeElement as HTMLElement;

          const metadataOpenTag = img.previousElementSibling;
          const metadataCloseTag = img.nextElementSibling;

          expect(metadataOpenTag).toBeNull();
          expect(metadataCloseTag).toBeNull();
        });
      });
    });

    describe('without "metadata" property value', () => {
      it('should render <img /> without metadata chrome tags', () => {
        const media = {
          value: {
            src: '/assets/img/test0.png',
            alt: 'my image',
          },
        };
        comp.editable = true;
        comp.field = media;
        fixture.detectChanges();

        const img = de.query(By.css('img')).nativeElement as HTMLElement;

        const metadataOpenTag = img.previousElementSibling;
        const metadataCloseTag = img.nextElementSibling;

        expect(metadataOpenTag).toBeNull();
        expect(metadataCloseTag).toBeNull();
      });
    });
  });

  it('should render no <img /> when media prop is empty', () => {
    const img = '';
    comp.field = img;
    fixture.detectChanges();

    expect(de.children.length).toBe(0);
  });
});

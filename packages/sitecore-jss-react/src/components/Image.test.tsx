/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiString from 'chai-string';
import { render } from '@testing-library/react';
import React from 'react';
import { imageField as eeImageData } from '../test-data/ee-data';
import { Image, ImageField } from './Image';
import { DefaultEmptyFieldEditingComponentImage } from './DefaultEmptyFieldEditingComponents';

const expect = chai.use(chaiString).expect;

describe('<Image />', () => {
  describe('with direct image object, no value/editable', () => {
    const props = {
      field: {
        src: '/assets/img/test0.png',
        width: '8',
        height: '10',
      },
      id: 'some-id',
      style: {
        width: '100%',
      },
      className: 'the-dude-abides',
    };

    const rendered = render(<Image {...props} />).container.querySelectorAll('img');

    it('should render <img /> with url', () => {
      expect(rendered).to.have.length(1);
      expect(rendered[0]?.getAttribute('src')).to.equal(props.field.src);
      expect(rendered[0]?.getAttribute('width')).to.equal(props.field.width);
      expect(rendered[0]?.getAttribute('height')).to.equal(props.field.height);
    });

    it('should render <img /> with non-media props', () => {
      expect(rendered[0]?.getAttribute('id')).to.equal(props.id);
    });

    it('should render <img /> with style and className props', () => {
      expect(rendered[0]?.getAttribute('style')).to.eql('width: 100%;');
      expect(rendered[0]?.getAttribute('class')).to.eql(props.className);
    });
  });

  describe('with responsive image object', () => {
    const props = {
      field: {
        src: '/assets/img/test0.png',
      },
      srcSet: [{ mw: 100 }, { mw: 300 }],
      sizes: '(min-width: 960px) 300px, 100px',
      id: 'some-id',
      className: 'the-dude-abides',
    };

    const rendered = render(<Image {...props} />).container.querySelectorAll('img');

    it('should render <img /> with needed img tags', () => {
      expect(rendered).to.have.length(1);
      expect(rendered[0]?.getAttribute('src')).to.equal(props.field.src);
      expect(rendered[0]?.getAttribute('srcSet')).to.equal(
        '/assets/img/test0.png?mw=100 100w, /assets/img/test0.png?mw=300 300w'
      );
      expect(rendered[0]?.getAttribute('sizes')).to.equal('(min-width: 960px) 300px, 100px');
    });

    it('should render <img /> with non-media props', () => {
      expect(rendered[0]?.getAttribute('id')).to.equal(props.id);
    });

    it('should render <img /> with style and className props', () => {
      expect(rendered[0]?.getAttribute('class')).to.eql(props.className);
    });
  });

  describe('with "value" property value', () => {
    const props = {
      field: { value: { src: '/assets/img/test0.png', alt: 'my image' } },
      id: 'some-id',
      style: { width: '100%' },
      className: 'the-dude-abides',
    };
    const rendered = render(<Image {...props} />).container.querySelectorAll('img');

    it('should render <img /> component with "value" properties', () => {
      expect(rendered).to.have.length(1);
      expect(rendered[0]?.getAttribute('src')).to.eql(props.field.value.src);
      expect(rendered[0]?.getAttribute('alt')).to.eql(props.field.value.alt);
    });

    it('should render <img /> with non-media props', () => {
      expect(rendered[0]?.getAttribute('id')).to.equal(props.id);
    });

    it('should render <img /> with style and className props', () => {
      expect(rendered[0]?.getAttribute('style')).to.eql('width: 100%;');
      expect(rendered[0]?.getAttribute('class')).to.eql(props.className);
    });
  });

  describe('with "editable" property value', () => {
    const props = {
      field: { editable: eeImageData },
      style: { width: '100%' },
      className: 'the-dude-abides',
    };
    const rendered = render(<Image {...props} />);
    const imgWrapper = rendered.container.querySelectorAll('.sc-image-wrapper');
    const img = rendered.container.querySelectorAll('img');

    it('should render wrapper containing experience editor value', () => {
      expect(imgWrapper).to.have.length(1);
      expect(img).to.not.be.undefined;
      expect(imgWrapper[0].innerHTML).to.contain('<input');
    });

    it('should render <img /> with style and className props', () => {
      expect(img[0]?.getAttribute('style')).to.equal('width:100%');
      expect(img[0]?.getAttribute('class')).to.equal(props.className);
    });
  });

  describe('with enhanced "editable" property value', () => {
    const props = {
      field: { editable: eeImageData },
      imageParams: { h: '100', w: '150' },
      id: 'some-id',
      height: '100',
      width: '150',
      style: { width: '100%' },
      className: 'the-dude-abides',
    };
    const rendered = render(<Image {...props} />);
    const img = rendered.container.querySelectorAll('img');

    it('should render img with additional props', () => {
      expect(img[0]?.getAttribute('id')).to.equal(props.id);
      expect(img[0]?.getAttribute('height')).to.equal(props.height);
      expect(img[0]?.getAttribute('width')).to.equal(props.width);
    });

    it('should update image url', () => {
      const url = new URL(img[0]?.getAttribute('src') as string, 'http://test.com');
      expect(url.pathname).to.contain('/-/jssmedia/');
      expect(url.searchParams.get('h')).to.equal(props.imageParams.h);
      expect(url.searchParams.get('w')).to.equal(props.imageParams.w);
      expect(url.hash).to.be.empty;
    });

    it('should render <img /> with style and className props', () => {
      expect(img[0]?.getAttribute('style')).to.equal('width:100%');
      expect(img[0]?.getAttribute('class')).to.equal(props.className);
    });
  });

  describe('with "editable" property value but editing disabled', () => {
    const props = {
      field: { editable: eeImageData, value: { src: '/assets/img/test0.png', alt: 'my image' } },
      editable: false,
      style: { width: '100%' },
      className: 'the-dude-abides',
    };
    const rendered = render(<Image {...props} />).container.querySelectorAll('img');

    it('should render <img /> component with "value" properties', () => {
      expect(rendered).to.have.length(1);
      expect(rendered[0]?.getAttribute('src')).to.eql(props.field.value.src);
      expect(rendered[0]?.getAttribute('alt')).to.eql(props.field.value.alt);
    });

    it('should render <img /> with style and className props', () => {
      expect(rendered[0]?.getAttribute('style')).to.eql('width: 100%;');
      expect(rendered[0]?.getAttribute('class')).to.eql(props.className);
    });
  });

  describe('with "class" and "className" property set', () => {
    const props = {
      field: { editable: eeImageData, value: { src: '/assets/img/test0.png', alt: 'my image' } },
      editable: false,
      style: { width: '100%' },
      className: 'the-dude',
      class: 'abides',
    };

    const rendered = render(<Image {...props} />).container.querySelectorAll('img');

    it('should attach "class" value at the end of class attribute', () => {
      expect(rendered[0]?.getAttribute('class')).to.eql(`${props.className} ${props.class}`);
    });
  });

  describe('with "mediaUrlPrefix" property', () => {
    it('should transform url with "value" property value', () => {
      const props = {
        field: { value: { src: '/~assets/img/test0.png', alt: 'my image' } },
        id: 'some-id',
        style: { width: '100%' },
        className: 'the-dude-abides',
        imageParams: { foo: 'bar' },
        mediaUrlPrefix: /\/([-~]{1})assets\//i,
      };
      const rendered = render(<Image {...props} />);

      expect(rendered.container.querySelectorAll('img')[0]?.getAttribute('src')).to.equal(
        '/~/jssmedia/img/test0.png?foo=bar'
      );

      const newProps = {
        ...props,
        field: { value: { src: '/-assets/img/test0.png', alt: 'my image' } },
      };

      rendered.rerender(<Image {...newProps} />);

      expect(rendered.container.querySelectorAll('img')[0]?.getAttribute('src')).to.equal(
        '/-/jssmedia/img/test0.png?foo=bar'
      );
    });

    it('should transform url with direct image object, no value/editable', () => {
      const props = {
        field: {
          src: '/~assets/img/test0.png',
          width: 8,
          height: 10,
        },
        id: 'some-id',
        style: {
          width: '100%',
        },
        className: 'the-dude-abides',
        imageParams: { foo: 'bar' },
        mediaUrlPrefix: /\/([-~]{1})assets\//i,
      };
      const rendered = render(<Image {...props} />);

      expect(rendered.container.querySelectorAll('img')[0]?.getAttribute('src')).to.equal(
        '/~/jssmedia/img/test0.png?foo=bar'
      );

      const newProps = {
        ...props,
        field: {
          src: '/-assets/img/test0.png',
          width: 8,
          height: 10,
        },
      };

      rendered.rerender(<Image {...newProps} />);

      expect(rendered.container.querySelectorAll('img')[0]?.getAttribute('src')).to.equal(
        '/-/jssmedia/img/test0.png?foo=bar'
      );
    });

    it('should transform url with responsive image object', () => {
      const props = {
        field: {
          src: '/~assets/img/test0.png',
        },
        srcSet: [{ mw: 100 }, { mw: 300 }],
        sizes: '(min-width: 960px) 300px, 100px',
        id: 'some-id',
        className: 'the-dude-abides',
        mediaUrlPrefix: /\/([-~]{1})assets\//i,
      };

      const rendered = render(<Image {...props} />);

      expect(rendered.container.querySelectorAll('img')[0]?.getAttribute('src')).to.equal(
        '/~assets/img/test0.png'
      );
      expect(rendered.container.querySelectorAll('img')[0]?.getAttribute('srcSet')).to.equal(
        '/~/jssmedia/img/test0.png?mw=100 100w, /~/jssmedia/img/test0.png?mw=300 300w'
      );

      const newProps = {
        ...props,
        field: {
          src: '/-assets/img/test0.png',
          width: 8,
          height: 10,
        },
        imageParams: { foo: 'bar' },
      };

      rendered.rerender(<Image {...newProps} />);

      expect(rendered.container.querySelectorAll('img')[0]?.getAttribute('src')).to.equal(
        '/-/jssmedia/img/test0.png?foo=bar'
      );
      expect(rendered.container.querySelectorAll('img')[0]?.getAttribute('srcSet')).to.equal(
        '/-/jssmedia/img/test0.png?foo=bar&mw=100 100w, /-/jssmedia/img/test0.png?foo=bar&mw=300 300w'
      );
    });
  });

  it('should render no <img /> when media prop is empty', () => {
    const img = '' as ImageField;
    const rendered = render(<Image media={img} />);
    expect(rendered.container.querySelectorAll('img')).to.have.length(0);
  });

  it('should render when field prop is used instead of media prop', () => {
    const imgField = {
      src: '/assets/img/test0.png',
      width: 8,
      height: 10,
    };
    const rendered = render(<Image field={imgField} />);
    expect(rendered.container.querySelectorAll('img')).to.have.length(1);
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

    it('should render field metadata component when metadata property is present', () => {
      const imgField = {
        src: '/assets/img/test0.png',
        width: 8,
        height: 10,
        metadata: testMetadata,
      };
      const rendered = render(<Image field={imgField} />);

      expect(rendered.container.innerHTML).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          '<img width="8" height="10" src="/assets/img/test0.png">',
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render default empty field component for Image when field value src is not present', () => {
      const field = {
        value: { src: undefined },
        metadata: testMetadata,
      };

      const rendered = render(<Image field={field} />);
      const defaultEmptyImagePlaceholder = render(<DefaultEmptyFieldEditingComponentImage />);
      expect(rendered.container.innerHTML).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          defaultEmptyImagePlaceholder.container.innerHTML,
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render default empty field component for Image when field src is not present', () => {
      const field = {
        src: undefined,
        metadata: testMetadata,
      };

      const rendered = render(<Image field={field} className="my-custom-class" />);
      const defaultEmptyImagePlaceholder = render(
        <DefaultEmptyFieldEditingComponentImage className="my-custom-class" />
      );
      expect(rendered.container.innerHTML).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          defaultEmptyImagePlaceholder.container.innerHTML,
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
      expect(rendered.container.innerHTML).to.contain('my-custom-class');
      expect(rendered.container.innerHTML).to.contain('scEmptyImage');
    });

    it('should render custom empty field component when provided, when field value src is not present', () => {
      const field = {
        value: { src: undefined },
        metadata: testMetadata,
      };

      const EmptyFieldEditingComponent: React.FC = () => (
        <span className="empty-field-value-placeholder">Custom Empty field value</span>
      );

      const rendered = render(
        <Image field={field} emptyFieldEditingComponent={EmptyFieldEditingComponent} />
      );

      expect(rendered.container.innerHTML).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          '<span class="empty-field-value-placeholder">Custom Empty field value</span>',
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render custom empty field component when provided, when field src is not present', () => {
      const field = {
        src: undefined,
        metadata: testMetadata,
      };

      const EmptyFieldEditingComponent: React.FC = () => (
        <span className="empty-field-value-placeholder">Custom Empty field value</span>
      );

      const rendered = render(
        <Image field={field} emptyFieldEditingComponent={EmptyFieldEditingComponent} />
      );

      expect(rendered.container.innerHTML).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          '<span class="empty-field-value-placeholder">Custom Empty field value</span>',
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render nothing when field value src is not present, when editing is explicitly disabled', () => {
      const field = {
        value: { src: undefined },
        metadata: testMetadata,
      };

      const rendered = render(<Image field={field} editable={false} />);

      expect(rendered.container.innerHTML).to.equal('');
    });

    it('should render nothing when field src is not present, when editing is explicitly disabled', () => {
      const field = {
        src: undefined,
        metadata: testMetadata,
      };

      const rendered = render(<Image field={field} editable={false} />);

      expect(rendered.container.innerHTML).to.equal('');
    });
  });
});

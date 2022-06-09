/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiString from 'chai-string';
import { render, getByRole } from '@testing-library/react';
import React from 'react';
import { imageField as eeImageData } from '../test-data/ee-data';
import { Image, ImageField } from './Image';

const expect = chai.use(chaiString).expect;

describe('<Image />', () => {
  describe('with direct image object, no value/editable', () => {
    const props = {
      media: {
        src: '/assets/img/test0.png',
        width: 8,
        height: 10,
      },
      id: 'some-id',
      style: {
        width: '100%',
      },
      className: 'the-dude-abides',
    };

    const rendered = render(<Image {...props} />);
    const image = getByRole<HTMLImageElement>(rendered.container, 'img');

    it('should render <img /> with url', () => {
      expect(image.src).to.equal(props.media.src);
      expect(image.width).to.equal(props.media.width);
      expect(image.height).to.equal(props.media.height);
    });

    it('should render <img /> with non-media props', () => {
      expect(image.id).to.equal(props.id);
    });

    it('should render <img /> with style and className props', () => {
      expect(image.getAttribute('style')).to.eql('width: 100%;');
      expect(image.className).to.eql(props.className);
    });
  });

  describe('with responsive image object', () => {
    const props = {
      media: {
        src: '/assets/img/test0.png',
      },
      srcSet: [{ mw: 100 }, { mw: 300 }],
      sizes: '(min-width: 960px) 300px, 100px',
      id: 'some-id',
      className: 'the-dude-abides',
    };

    const rendered = render(<Image {...props} />);
    const image = getByRole<HTMLImageElement>(rendered.container, 'img');

    it('should render <img /> with needed img tags', () => {
      expect(image.src).to.equal(props.media.src);
      expect(image.srcset).to.equal(
        '/assets/img/test0.png?mw=100 100w, /assets/img/test0.png?mw=300 300w'
      );
      expect(image.sizes).to.equal('(min-width: 960px) 300px, 100px');
    });

    it('should render <img /> with non-media props', () => {
      expect(image.id).to.equal(props.id);
    });

    it('should render <img /> with style and className props', () => {
      expect(image.className).to.eql(props.className);
    });
  });

  describe('with "value" property value', () => {
    const props = {
      media: { value: { src: '/assets/img/test0.png', alt: 'my image' } },
      id: 'some-id',
      style: { width: '100%' },
      className: 'the-dude-abides',
    };
    const rendered = render(<Image {...props} />);
    const image = getByRole<HTMLImageElement>(rendered.container, 'img');

    it('should render <img /> component with "value" properties', () => {
      expect(image.src).to.eql(props.media.value.src);
      expect(image.alt).to.eql(props.media.value.alt);
    });

    it('should render <img /> with non-media props', () => {
      expect(image.id).to.equal(props.id);
    });

    it('should render <img /> with style and className props', () => {
      expect(image.getAttribute('style')).to.eql('width: 100%;');
      expect(image.className).to.eql(props.className);
    });
  });

  describe('with "editable" property value', () => {
    const props = {
      media: { editable: eeImageData },
      style: { width: '100%' },
      className: 'the-dude-abides',
    };
    const rendered = render(<Image {...props} />).container.querySelectorAll('.sc-image-wrapper');
    const image = rendered[0].getElementsByTagName('img')[0];

    it('should render wrapper containing experience editor value', () => {
      expect(rendered).to.have.length(1);
      expect(rendered[0].innerHTML).to.contain('<input');
    });

    it('should render <img /> with style and className props', () => {
      expect(image.getAttribute('style')).to.equal('width:100%');
      expect(image.className).to.equal(props.className);
    });
  });

  describe('with enhanced "editable" property value', () => {
    const props = {
      media: { editable: eeImageData },
      imageParams: { h: '100', w: '150' },
      id: 'some-id',
      height: '100',
      width: '150',
      style: { width: '100%' },
      className: 'the-dude-abides',
    };
    const rendered = render(<Image {...props} />).container.querySelector('.sc-image-wrapper');
    const img = rendered.getElementsByTagName('img')[0];

    it('should render img with additional props', () => {
      expect(img.getAttribute('id')).to.equal(props.id);
      expect(img.getAttribute('height')).to.equal(props.height);
      expect(img.getAttribute('width')).to.equal(props.width);
    });

    it('should update image url', () => {
      const url = new URL(img.getAttribute('src') as string, 'http://test.com');
      expect(url.pathname).to.contain('/-/jssmedia/');
      expect(url.searchParams.get('h')).to.equal(props.imageParams.h);
      expect(url.searchParams.get('w')).to.equal(props.imageParams.w);
      expect(url.hash).to.be.empty;
    });

    it('should render <img /> with style and className props', () => {
      expect(img.getAttribute('style')).to.equal('width:100%');
      expect(img.getAttribute('class')).to.equal(props.className);
    });
  });

  describe('with "editable" property value but editing disabled', () => {
    const props = {
      media: { editable: eeImageData, value: { src: '/assets/img/test0.png', alt: 'my image' } },
      editable: false,
      style: { width: '100%' },
      className: 'the-dude-abides',
    };
    const rendered = render(<Image {...props} />).container.querySelector('img');

    it('should render <img /> component with "value" properties', () => {
      expect(rendered.src).to.eql(props.media.value.src);
      expect(rendered.alt).to.eql(props.media.value.alt);
    });

    it('should render <img /> with style and className props', () => {
      expect(rendered.getAttribute('style')).to.eql('width: 100%;');
      expect(rendered.className).to.eql(props.className);
    });
  });

  describe('with "class" and "className" property set', () => {
    const props = {
      media: { editable: eeImageData, value: { src: '/assets/img/test0.png', alt: 'my image' } },
      editable: false,
      style: { width: '100%' },
      className: 'the-dude',
      class: 'abides',
    };

    const rendered = render(<Image {...props} />).container.querySelector('img');

    it('should attach "class" value at the end of class attribute', () => {
      expect(rendered.className).to.eql(`${props.className} ${props.class}`);
    });
  });

  describe('with "mediaUrlPrefix" property', () => {
    it('should transform url with "value" property value', () => {
      const props = {
        media: { value: { src: '/~assets/img/test0.png', alt: 'my image' } },
        id: 'some-id',
        style: { width: '100%' },
        className: 'the-dude-abides',
        imageParams: { foo: 'bar' },
        mediaUrlPrefix: /\/([-~]{1})assets\//i,
      };
      const rendered = render(<Image {...props} />);
      const img = rendered.container.querySelector('img');

      expect(img.src).to.equal('/~/jssmedia/img/test0.png?foo=bar');

      rendered.rerender(
        <Image {...props} media={{ value: { src: '/-assets/img/test0.png', alt: 'my image' } }} />
      );

      expect(img.src).to.equal('/-/jssmedia/img/test0.png?foo=bar');
    });

    it('should transform url with direct image object, no value/editable', () => {
      const props = {
        media: {
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
      const image = rendered.container.querySelector('img');

      expect(image.src).to.equal('/~/jssmedia/img/test0.png?foo=bar');

      rendered.rerender(
        <Image
          {...{
            ...props,
            media: {
              src: '/-assets/img/test0.png',
              width: 8,
              height: 10,
            },
          }}
        />
      );

      expect(image.src).to.equal('/-/jssmedia/img/test0.png?foo=bar');
    });

    it('should transform url with responsive image object', () => {
      const props = {
        media: {
          src: '/~assets/img/test0.png',
        },
        srcSet: [{ mw: 100 }, { mw: 300 }],
        sizes: '(min-width: 960px) 300px, 100px',
        id: 'some-id',
        className: 'the-dude-abides',
        mediaUrlPrefix: /\/([-~]{1})assets\//i,
      };

      const rendered = render(<Image {...props} />);
      const image = rendered.container.querySelector('img');

      expect(image.src).to.equal('/~assets/img/test0.png');
      expect(image.srcset).to.equal(
        '/~/jssmedia/img/test0.png?mw=100 100w, /~/jssmedia/img/test0.png?mw=300 300w'
      );

      rendered.rerender(
        <Image
          {...{
            ...props,
            media: {
              src: '/-assets/img/test0.png',
              width: 8,
              height: 10,
            },
            imageParams: { foo: 'bar' },
          }}
        />
      );

      expect(image.src).to.equal('/-/jssmedia/img/test0.png?foo=bar');
      expect(image.srcset).to.equal(
        '/-/jssmedia/img/test0.png?foo=bar&mw=100 100w, /-/jssmedia/img/test0.png?foo=bar&mw=300 300w'
      );
    });
  });

  it('should render no <img /> when media prop is empty', () => {
    const img = '' as ImageField;
    const rendered = render(<Image media={img} />);
    expect(rendered.container.querySelector('img')).to.equal(null);
  });
});

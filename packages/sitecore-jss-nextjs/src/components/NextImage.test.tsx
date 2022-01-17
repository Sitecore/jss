/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiString from 'chai-string';
import { mount } from 'enzyme';
import React from 'react';
import { imageField as eeImageData } from '../testData/ee-data';
import { NextImage, ImageField, loader } from './NextImage';

const expect = chai.use(chaiString).expect;

describe('<NextImage />', () => {
  describe('Next loader function', () => {
    const props = {
      src: '/assets/img/test0.png',
      width: 100,
      height: 50,
    };
    const result = loader(props);

    it('should return url and set it to src', () => {
      expect(result).to.be.a('string');
      expect(result).to.equal('https://cm.jss.localhost/assets/img/test0.png?mw=100');
    });
  });

  // TODO: test error cases
  describe('error cases', () => {
    const props = {
      src: '/assets/img/test0.png',
      loader: () => new URL('test').href,
    };

    it('should throw an error if src is present', () => {
      expect(() => mount(<NextImage {...props} />)).throws(
        'Detected conflicting props src or loader. If you wish to use these props, use next/image directly.'
      );
    });

    it('should throw an error if loader is present', () => {
      expect(() => mount(<NextImage {...props} />)).to.have.length(0);
      expect(() => mount(<NextImage {...props} />)).throws(
        'Detected conflicting props src or loader. If you wish to use these props, use next/image directly.'
      );
    });

    describe('with direct image object, no value/editable', () => {
      const props = {
        field: {
          src: '/assets/img/test0.png',
        },
        width: 8,
        height: 10,
        id: 'some-id',
        className: 'w-100',
      };
      const rendered = mount(<NextImage {...props} />)
        .find('Image')
        .at(1);

      it('should render Next/Image with url', () => {
        expect(rendered).to.have.lengthOf(1);
        expect(rendered.prop('src')).to.equal(props.field.src);
        expect(rendered.prop('width')).to.equal(props.width);
        expect(rendered.prop('height')).to.equal(props.height);
      });

      it('should render Next/Image with non-media props', () => {
        expect(rendered.prop('id')).to.equal(props.id);
      });

      it('should render Next/Image with style and className props', () => {
        expect(rendered.prop('className')).to.eql(props.className);
      });
    });

    describe('with responsive image object', () => {
      const props = {
        field: { value: { src: '/assets/img/test0.png', alt: 'my image' } },
        layout: 'responsive' as const,
        sizes: '(min-width: 960px) 300px, 100px',
        width: 8,
        height: 10,
        id: 'some-id',
        className: 'the-dude-abides',
        placeholder: 'blur' as const,
        blurDataURL:
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      };

      const rendered = mount(<NextImage {...props} />)
        .find('Image')
        .at(1);

      it('should render Next/Image with needed props', () => {
        expect(rendered).to.have.length(1);
        expect(rendered.prop('src')).to.equal(props.field.value.src);
        expect(rendered.prop('placeholder')).to.equal(props.placeholder);
        expect(rendered.prop('sizes')).to.equal('(min-width: 960px) 300px, 100px');
        expect(rendered.prop('layout')).to.equal(props.layout);
        expect(rendered.prop('blurDataURL')).to.equal(props.blurDataURL);
      });

      it('should render Next/Image with non-media props', () => {
        expect(rendered.prop('id')).to.equal(props.id);
      });

      it('should render Next/Image with style and className props', () => {
        expect(rendered.prop('className')).to.eql(props.className);
      });
    });

    describe('with "value" property value', () => {
      const props = {
        field: { value: { src: '/assets/img/test0.png', alt: 'my image' } },
        width: 8,
        height: 10,
        id: 'some-id',
        className: 'the-dude-abides',
      };
      const rendered = mount(<NextImage {...props} />)
        .find('Image')
        .at(1);

      it('should render Next/Image component with "value" properties', () => {
        expect(rendered).to.have.length(1);
        expect(rendered.prop('src')).to.eql(props.field.value.src);
        expect(rendered.prop('alt')).to.eql(props.field.value.alt);
      });

      it('should render Next/Image with non-media props', () => {
        expect(rendered.prop('id')).to.equal(props.id);
      });

      it('should render Next/Image with style and className props', () => {
        expect(rendered.prop('className')).to.eql(props.className);
      });
    });

    describe('with "editable" property value but editing disabled', () => {
      const props = {
        field: { value: { src: '/assets/img/test0.png', alt: 'my image' } },
        width: 8,
        height: 10,
        alt: 'my image',
        editable: false,
        className: 'the-dude-abides w-100',
      };
      const rendered = mount(<NextImage {...props} />)
        .find('Image')
        .at(1);

      it('should render Next/Image component with "value" properties', () => {
        expect(rendered).to.have.length(1);
        expect(rendered.prop('src')).to.eql(props.field.value.src);
        expect(rendered.prop('alt')).to.eql(props.field.value.alt);
      });

      it('should render Next/Image with style and className props', () => {
        expect(rendered.prop('className')).to.eql(props.className);
      });
    });

    describe('with "mediaUrlPrefix" property', () => {
      it('should transform url with "value" property value', () => {
        const props = {
          field: { value: { src: '/~assets/img/test0.png', alt: 'my image' } },
          id: 'some-id',
          width: 100,
          height: 50,
          imageParams: { foo: 'bar' },
          mediaUrlPrefix: /\/([-~]{1})assets\//i,
        };
        const rendered = mount(<NextImage {...props} />);

        expect(
          rendered
            .find('Image')
            .at(1)
            .prop('src')
        ).to.equal('/~/jssmedia/img/test0.png?foo=bar');
        rendered.setProps({
          ...props,
          field: { src: '/-assets/img/test0.png' },
        });
        expect(
          rendered
            .find('Image')
            .at(1)
            .prop('src')
        ).to.equal('/-/jssmedia/img/test0.png?foo=bar');
      });

      it('should transform url with direct image object, no value/editable', () => {
        const props = {
          field: { value: { src: '/~assets/img/test0.png', alt: 'my image' } },
          width: 8,
          height: 10,
          id: 'some-id',
          imageParams: { foo: 'bar' },
          mediaUrlPrefix: /\/([-~]{1})assets\//i,
        };
        const rendered = mount(<NextImage {...props} />);
        expect(
          rendered
            .find('Image')
            .at(1)
            .prop('src')
        ).to.equal('/~/jssmedia/img/test0.png?foo=bar');
        rendered.setProps({
          ...props,
          field: { src: '/-assets/img/test0.png' },
          width: 8,
          height: 10,
        });
        expect(
          rendered
            .find('Image')
            .at(1)
            .prop('src')
        ).to.equal('/-/jssmedia/img/test0.png?foo=bar');
      });
    });

    it('should render no Next/Image when field prop is empty', () => {
      const img = '' as ImageField;
      const rendered = mount(<NextImage field={img} />)
        .find('Image')
        .at(1);
      expect(rendered).to.have.length(0);
    });
  });
});

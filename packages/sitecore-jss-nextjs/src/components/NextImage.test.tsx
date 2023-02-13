/* eslint-disable no-unused-expressions */
import chai, { use } from 'chai';
import chaiString from 'chai-string';
import { mount } from 'enzyme';
import React from 'react';
import { NextImage, sitecoreLoader } from './NextImage';
import { ImageField } from '@sitecore-jss/sitecore-jss-react';
import { ImageLoader } from 'next/image';
import { spy, match } from 'sinon';
import sinonChai from 'sinon-chai';
import { SinonSpy } from 'sinon';

use(sinonChai);
const expect = chai.use(chaiString).expect;
describe('sitecoreLoader', () => {
  [
    {
      description: 'relative URL',
      root: '/assets/img/test0.png',
    },
    {
      description: 'absolute URL',
      root: 'https://cm.jss.localhost/assets/img/test0.png',
    },
  ].forEach((value) => {
    describe(value.description, () => {
      it('should append mw query string param', () => {
        const params: Partial<ImageLoaderProps> = {
          src: value.root,
          width: 100,
        };
        const result = sitecoreLoader(params as ImageLoaderProps);
        expect(result).to.be.a('string');
        expect(result).to.equal(`${value.root}?mw=100`);
      });

      it('should override existing mw query string param', () => {
        const params: Partial<ImageLoaderProps> = {
          src: `${value.root}?mw=400`,
          width: 100,
        };
        const result = sitecoreLoader(params as ImageLoaderProps);
        expect(result).to.be.a('string');
        expect(result).to.equal(`${value.root}?mw=100`);
      });

      it('should preserve existing query string params', () => {
        const params: Partial<ImageLoaderProps> = {
          src: `${value.root}?mw=400&mh=100&q=50`,
          width: 100,
        };
        const result = sitecoreLoader(params as ImageLoaderProps);
        expect(result).to.be.a('string');
        expect(result).to.equal(`${value.root}?mw=100&mh=100&q=50`);
      });
    });
  });
});

describe('<NextImage />', () => {
  const HOSTNAME = 'https://cm.jss.localhost';
  const width = 8;
  type MockLoaderType = ImageLoader extends SinonSpy ? SinonSpy : SinonSpy<any, any>;
  const customLoader = ({ src }) => {
    const isQsPresent = src.split('?').length === 2;
    const widthParam = isQsPresent ? `&w=${width}` : `?w=${width}`;
    return new URL(`${HOSTNAME}${src}`).href + widthParam;
  };
  const mockLoader = (spy(customLoader) as unknown) as MockLoaderType;
  afterEach(() => {
    () => mockLoader.resetHistory();
  });

  describe('with direct image object, no value/editable', () => {
    const props = {
      field: {
        src: '/assets/img/test0.png',
      },
      width,
      height: 10,
    };

    const mounted = mount(<NextImage loader={mockLoader} {...props} />);
    const rendered = mounted.find('img');
    it('should render image with url', () => {
      expect(rendered).to.have.lengthOf(1);
      expect(rendered.prop('src')).to.equal(`${HOSTNAME}${props.field.src}?w=${props.width}`);
      expect(rendered.prop('width')).to.equal(props.width);
      expect(rendered.prop('height')).to.equal(props.height);

      expect(mockLoader.called).to.be.true;
      expect(mockLoader).to.have.been.calledWith(
        match({ src: props.field.src, width: props.width })
      );
    });
  });

  describe('with responsive image object', () => {
    const props = {
      field: { value: { src: '/assets/img/test0.png', alt: 'my image' } },
      sizes: '(min-width: 960px) 300px, 100px',
      width,
      height: 10,
      id: 'some-id',
      className: 'the-dude-abides',
    };

    const rendered = mount(<NextImage loader={mockLoader} {...props} />).find('img');

    it('should render image with needed props', () => {
      expect(rendered).to.have.length(1);
      expect(rendered.prop('src')).to.equal(`${HOSTNAME}${props.field.value.src}?w=${props.width}`);
      expect(rendered.prop('sizes')).to.equal('(min-width: 960px) 300px, 100px');
      expect(mockLoader.called).to.be.true;
      expect(mockLoader).to.have.been.calledWith(
        match({ src: props.field.value.src, width: props.width })
      );
    });

    it('should render image with non-media props', () => {
      expect(rendered.prop('id')).to.equal(props.id);
    });

    it('should render image with className prop', () => {
      expect(rendered.prop('className')).to.eql(props.className);
    });

    it('should render image without width/height when "fill" prop is provided', () => {
      const field = {
        value: { src: '/assets/img/test0.png', alt: 'my image', width: 200, height: 400 },
      };
      const rendered = mount(<NextImage loader={mockLoader} {...props} field={field} fill />).find('img');

      expect(rendered).to.have.length(1);
      expect(rendered.prop('src')).to.equal(`${HOSTNAME}${props.field.value.src}?w=${props.width}`);
      expect(rendered.prop('sizes')).to.equal('(min-width: 960px) 300px, 100px');
      expect(rendered.prop('height')).to.equal(undefined);
      expect(rendered.prop('width')).to.equal(undefined);
      expect(mockLoader.called).to.be.true;
      expect(mockLoader).to.have.been.calledWith(
        match({ src: props.field.value.src, width: props.width })
      );
    });
  });

  describe('with "value" property value', () => {
    const props = {
      field: { value: { src: '/assets/img/test0.png', alt: 'my image' } },
      width,
      height: 10,
      id: 'some-id',
      className: 'the-dude-abides',
    };
    const rendered = mount(<NextImage loader={mockLoader} {...props} />).find('img');

    it('should render image component with "value" properties', () => {
      expect(rendered).to.have.length(1);
      expect(rendered.prop('src')).to.eql(`${HOSTNAME}${props.field.value.src}?w=${props.width}`);
      expect(rendered.prop('alt')).to.eql(props.field.value.alt);
      expect(mockLoader.called).to.be.true;
      expect(mockLoader).to.have.been.calledWith(
        match({ src: props.field.value.src, width: props.width })
      );
    });

    it('should render image with non-media props', () => {
      expect(rendered.prop('id')).to.equal(props.id);
    });

    it('should render image with className prop', () => {
      expect(rendered.prop('className')).to.eql(props.className);
    });

    it('should render image when alt prop is missing', () => {
      const props = {
        field: { value: { src: '/assets/img/test0.png' } },
        width,
        height: 10,
        id: 'some-id',
        className: 'the-dude-abides',
      };

      const rendered = mount(<NextImage loader={mockLoader} {...props} />).find('img');

      expect(rendered).to.have.length(1);
      expect(rendered.prop('src')).to.eql(`${HOSTNAME}${props.field.value.src}?w=${props.width}`);
      expect(rendered.prop('alt')).to.eql('');
      expect(mockLoader.called).to.be.true;
      expect(mockLoader).to.have.been.calledWith(
        match({ src: props.field.value.src, width: props.width })
      );
    });
  });

  describe('with "editable" property value but editing disabled', () => {
    const props = {
      field: { value: { src: '/assets/img/test0.png', alt: 'my image' } },
      width,
      height: 10,
      alt: 'my image',
      editable: false,
      className: 'the-dude-abides w-100',
    };
    const rendered = mount(<NextImage loader={mockLoader} {...props} />).find('img');

    it('should render image component with "value" properties', () => {
      expect(rendered).to.have.length(1);
      expect(rendered.prop('src')).to.eql(`${HOSTNAME}${props.field.value.src}?w=${props.width}`);
      expect(rendered.prop('alt')).to.eql(props.field.value.alt);
      expect(mockLoader.called).to.be.true;
      expect(mockLoader).to.have.been.calledWith(
        match({ src: props.field.value.src, width: props.width })
      );
    });

    it('should render image with className prop', () => {
      expect(rendered.prop('className')).to.eql(props.className);
    });
  });

  describe('with "mediaUrlPrefix" property', () => {
    it('should transform url with "value" property value', () => {
      const props = {
        field: {
          value: { src: '/~assets/img/test0.png', alt: 'my image' },
        },
        id: 'some-id',
        width,
        height: 50,
        imageParams: { foo: 'bar' },
        mediaUrlPrefix: /\/([-~]{1})assets\//i,
      };
      const rendered = mount(<NextImage loader={mockLoader} {...props} />);

      expect(rendered.find('img').prop('src')).to.equal(
        `${HOSTNAME}/~/jssmedia/img/test0.png?foo=bar&w=8`
      );
      rendered.setProps({
        ...props,
        field: { src: '/-assets/img/test0.png' },
      });
      expect(rendered.find('img').prop('src')).to.equal(
        `${HOSTNAME}/-/jssmedia/img/test0.png?foo=bar&w=8`
      );
      expect(mockLoader.called).to.be.true;
      expect(mockLoader).to.have.been.calledWith(
        match({
          src: '/-/jssmedia/img/test0.png?foo=bar',
          width: props.width,
        })
      );
    });

    it('should transform url with direct image object, no value/editable', () => {
      const props = {
        field: {
          value: { src: '/~assets/img/test0.png', alt: 'my image' },
        },
        width,
        height: 10,
        id: 'some-id',
        imageParams: { foo: 'bar' },
        mediaUrlPrefix: /\/([-~]{1})assets\//i,
      };
      const rendered = mount(<NextImage loader={mockLoader} {...props} />);
      expect(rendered.find('img').prop('src')).to.equal(
        `${HOSTNAME}/~/jssmedia/img/test0.png?foo=bar&w=8`
      );
      rendered.setProps({
        ...props,
        field: { src: '/-assets/img/test0.png' },
        width,
        height: 10,
      });
      expect(rendered.find('img').prop('src')).to.equal(
        `${HOSTNAME}/-/jssmedia/img/test0.png?foo=bar&w=8`
      );
      expect(mockLoader.called).to.be.true;
      expect(mockLoader).to.have.been.calledWith(
        match({
          src: '/-/jssmedia/img/test0.png?foo=bar',
          width: props.width,
        })
      );
    });

    it('should render no image when field prop is empty', () => {
      const img = '' as ImageField;
      const rendered = mount(<NextImage field={img} />).find('img');
      expect(rendered).to.have.length(0);
    });
  });

  describe('error cases', () => {
    const src = '/assets/img/test0.png';
    it('should throw an error if src is present', () => {
      expect(() => mount(<NextImage src={src} />)).to.throw(
        'Detected src prop. If you wish to use src, use next/image directly.'
      );
    });
  });

  describe('With loader function passed by the user', () => {
    const userCustomLoader = ({ src }) => new URL(`https://cm.jss.localhost${src}`).href;
    const userMockLoader = (spy(userCustomLoader) as unknown) as ImageLoader;
    const props = {
      field: {
        src: '/assets/img/test0.png',
      },
      width,
      height: 10,
      loader: userMockLoader,
    };

    const rendered = mount(<NextImage {...props} />).find('img');

    it('should render image with url', () => {
      expect(rendered).to.have.lengthOf(1);
      expect(rendered.prop('src')).to.equal(`${HOSTNAME}${props.field.src}`);
      expect(rendered.prop('width')).to.equal(props.width);
      expect(rendered.prop('height')).to.equal(props.height);
      expect(userMockLoader).to.have.been.called;
      expect(userMockLoader).to.have.been.calledWith(
        match({ src: props.field.src, width: props.width })
      );
    });
  });
});

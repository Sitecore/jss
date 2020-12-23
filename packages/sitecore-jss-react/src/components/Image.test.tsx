/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiString from 'chai-string';
import { mount } from 'enzyme';
import React from 'react';
import URL from 'url-parse';
import { imageField as eeImageData } from '../testData/ee-data';
import { Image } from './Image';

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

    const rendered = mount(<Image {...props} />).find('img');

    it('should render <img /> with url', () => {
      expect(rendered).to.have.length(1);
      expect(rendered.prop('src')).to.equal(props.media.src);
      expect(rendered.prop('width')).to.equal(props.media.width);
      expect(rendered.prop('height')).to.equal(props.media.height);
    });

    it('should render <img /> with non-media props', () => {
      expect(rendered.prop('id')).to.equal(props.id);
    });

    it('should render <img /> with style and className props', () => {
      expect(rendered.prop('style')).to.eql(props.style);
      expect(rendered.prop('className')).to.eql(props.className);
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

    const rendered = mount(<Image {...props} />).find('img');

    it('should render <img /> with needed img tags', () => {
      expect(rendered).to.have.length(1);
      expect(rendered.prop('src')).to.equal(props.media.src);
      expect(rendered.prop('srcSet')).to.equal(
        '/assets/img/test0.png?mw=100 100w, /assets/img/test0.png?mw=300 300w'
      );
      expect(rendered.prop('sizes')).to.equal('(min-width: 960px) 300px, 100px');
    });

    it('should render <img /> with non-media props', () => {
      expect(rendered.prop('id')).to.equal(props.id);
    });

    it('should render <img /> with style and className props', () => {
      expect(rendered.prop('className')).to.eql(props.className);
    });
  });

  describe('with "value" property value', () => {
    const props = {
      media: { value: { src: '/assets/img/test0.png', alt: 'my image' } },
      id: 'some-id',
      style: { width: '100%' },
      className: 'the-dude-abides',
    };
    const rendered = mount(<Image {...props} />).find('img');

    it('should render <img /> component with "value" properties', () => {
      expect(rendered).to.have.length(1);
      expect(rendered.prop('src')).to.eql(props.media.value.src);
      expect(rendered.prop('alt')).to.eql(props.media.value.alt);
    });

    it('should render <img /> with non-media props', () => {
      expect(rendered.prop('id')).to.equal(props.id);
    });

    it('should render <img /> with style and className props', () => {
      expect(rendered.prop('style')).to.eql(props.style);
      expect(rendered.prop('className')).to.eql(props.className);
    });
  });

  describe('with "editable" property value', () => {
    const props = {
      media: { editable: eeImageData },
      style: { width: '100%' },
      className: 'the-dude-abides',
    };
    const rendered = mount(<Image {...props} />).find('.sc-image-wrapper');
    const img = rendered.getDOMNode().getElementsByTagName('img')[0];

    it('should render wrapper containing experience editor value', () => {
      expect(rendered).to.have.length(1);
      expect(img).to.not.be.undefined;
      expect(rendered.html()).to.contain('<input');
    });

    it('should render <img /> with style and className props', () => {
      expect(img.getAttribute('style')).to.equal('width:100%');
      expect(img.getAttribute('class')).to.equal(props.className);
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
    const rendered = mount(<Image {...props} />).find('.sc-image-wrapper');
    const img = rendered.getDOMNode().getElementsByTagName('img')[0];

    it('should render img with additional props', () => {
      expect(img.getAttribute('id')).to.equal(props.id);
      expect(img.getAttribute('height')).to.equal(props.height);
      expect(img.getAttribute('width')).to.equal(props.width);
    });

    it('should update image url', () => {
      const url = (URL as any)(img.getAttribute('src') as string, true);
      expect(url.pathname).to.contain('/-/jssmedia/');
      expect(url.query.h).to.equal(props.imageParams.h);
      expect(url.query.w).to.equal(props.imageParams.w);
      expect(url.query.hash).to.be.undefined;
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
    const rendered = mount(<Image {...props} />).find('img');

    it('should render <img /> component with "value" properties', () => {
      expect(rendered).to.have.length(1);
      expect(rendered.prop('src')).to.eql(props.media.value.src);
      expect(rendered.prop('alt')).to.eql(props.media.value.alt);
    });

    it('should render <img /> with style and className props', () => {
      expect(rendered.prop('style')).to.eql(props.style);
      expect(rendered.prop('className')).to.eql(props.className);
    });
  });

  describe('with "mediaUrlPrefix" property', () => {
    it('should transform url with "value" property value', () => {
      const props = {
        media: { value: { src: '/~assets/img/test0.png', alt: 'my image' } },
        id: 'some-id',
        style: { width: '100%' },
        className: 'the-dude-abides',
        mediaUrlPrefix: /\/([-~]{1})assets\//i,
      };
      const rendered = mount(<Image {...props} />);

      expect(rendered.find('img').prop('src')).to.equal('/~/jssmedia/img/test0.png');

      rendered.setProps({
        ...props,
        media: { value: { src: '/-assets/img/test0.png', alt: 'my image' } },
      });

      expect(rendered.find('img').prop('src')).to.equal('/-/jssmedia/img/test0.png');
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
        mediaUrlPrefix: /\/([-~]{1})assets\//i,
      };
      const rendered = mount(<Image {...props} />);

      expect(rendered.find('img').prop('src')).to.equal('/~/jssmedia/img/test0.png');

      rendered.setProps({
        ...props,
        media: {
          src: '/-assets/img/test0.png',
          width: 8,
          height: 10,
        },
      });

      expect(rendered.find('img').prop('src')).to.equal('/-/jssmedia/img/test0.png');
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

      const rendered = mount(<Image {...props} />);

      expect(rendered.find('img').prop('src')).to.equal('/~/jssmedia/img/test0.png');

      rendered.setProps({
        ...props,
        media: {
          src: '/-assets/img/test0.png',
          width: 8,
          height: 10,
        },
      });

      expect(rendered.find('img').prop('src')).to.equal('/-/jssmedia/img/test0.png');
    });
  });

  it('should render no <img /> when media prop is empty', () => {
    const img: any = '';
    const rendered = mount(<Image media={img} />);
    expect(rendered.find('img')).to.have.length(0);
  });
});

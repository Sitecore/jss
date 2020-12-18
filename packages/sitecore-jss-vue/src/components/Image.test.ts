/* eslint-disable @typescript-eslint/no-empty-function */
import { mount } from '@vue/test-utils';
import URL from 'url-parse';

import { imageField as eeImageData } from '../test/data/field-data-EE-on';
import { Image } from './Image';

describe('<Image />', () => {
  describe('with direct image object, no value/editable', () => {
    const props = {
      media: {
        src: '/assets/img/test0.png',
        width: '8',
        height: '10',
      },
    };
    const attrs = { id: 'some-id' };

    const rendered = mount(Image, { context: { props, attrs } }).find('img');
    const renderedAttrs = rendered.attributes();

    it('should render <img /> with url', () => {
      expect(renderedAttrs).toMatchObject(props.media);
    });

    it('should render <img /> with non-media props', () => {
      expect(renderedAttrs.id).toBe(attrs.id);
    });
  });

  describe('with "value" property value', () => {
    const props = {
      media: {
        value: {
          src: '/assets/img/test0.png',
          alt: 'my image',
        },
      },
    };
    const attrs = { id: 'some-id' };

    const rendered = mount(Image, { context: { props, attrs } }).find('img');
    const renderedAttrs = rendered.attributes();

    it('should render <img /> component with "value" properties', () => {
      expect(renderedAttrs).toMatchObject(props.media.value);
    });

    it('should render <img /> with non-media props', () => {
      expect(renderedAttrs.id).toBe(attrs.id);
    });
  });

  describe('with "editable" property value', () => {
    const props = {
      media: {
        editable: eeImageData,
      },
    };
    const rendered = mount(Image, { context: { props } }).find('.sc-image-wrapper');

    it('should render wrapper containing experience editor value', () => {
      expect(rendered.html().indexOf('<img')).toBeGreaterThan(-1);
      expect(rendered.html().indexOf('<input')).toBeGreaterThan(-1);
    });
  });

  describe('with enhanced "editable" property value', () => {
    const props = {
      media: {
        editable: eeImageData,
      },
      imageParams: {
        h: '100',
        w: '150',
      },
    };
    const attrs = { id: 'some-id', height: '100', width: '150' };

    const rendered = mount(Image, { context: { props, attrs } }).find('.sc-image-wrapper');
    const img = rendered.find('img');
    const imgAttrs = img.attributes();

    it('should render img with additional props', () => {
      expect(imgAttrs).toMatchObject(attrs);
    });
  });

  describe('update image url', () => {
    const attrs = { id: 'some-id', height: '100', width: '150' };

    it('should handle /-/media', () => {
      const props = {
        media: {
          value: {
            src: '/-/media/img/test0.png',
            alt: 'my image',
          },
        },
        imageParams: {
          h: '100',
          w: '150',
        },
      };

      const rendered = mount(Image, { context: { props, attrs } }).find('img');
      const img = rendered.find('img');

      const url = new URL(img.attributes().src, {}, true);
      expect(url.pathname).toContain('/-/jssmedia/');
      expect(url.query.h).toBe(props.imageParams.h);
      expect(url.query.w).toBe(props.imageParams.w);
    });

    it('should handle /~/media', () => {
      const props = {
        media: {
          value: {
            src: '/~/media/img/test0.png',
            alt: 'my image',
          },
        },
        imageParams: {
          h: '100',
          w: '150',
        },
      };

      const rendered = mount(Image, { context: { props, attrs } }).find('img');
      const img = rendered.find('img');

      const url = new URL(img.attributes().src, {}, true);
      expect(url.pathname).toContain('/~/jssmedia/');
      expect(url.query.h).toBe(props.imageParams.h);
      expect(url.query.w).toBe(props.imageParams.w);
    });

    it('should handle custom mediaUrlPrefix, /-assets', () => {
      const props = {
        media: {
          value: {
            src: '/-assets/img/test0.png',
            alt: 'my image',
          },
        },
        imageParams: {
          h: '100',
          w: '150',
        },
        mediaUrlPrefix: /\/([-~]{1})assets\//i,
      };

      const rendered = mount(Image, { context: { props, attrs } }).find('img');
      const img = rendered.find('img');

      const url = new URL(img.attributes().src, {}, true);
      expect(url.pathname).toContain('/-/jssmedia/');
      expect(url.query.h).toBe(props.imageParams.h);
      expect(url.query.w).toBe(props.imageParams.w);
    });

    it('should handle custom mediaUrlPrefix, /~assets', () => {
      const props = {
        media: {
          value: {
            src: '/~assets/img/test0.png',
            alt: 'my image',
          },
        },
        imageParams: {
          h: '100',
          w: '150',
        },
        mediaUrlPrefix: /\/([-~]{1})assets\//i,
      };

      const rendered = mount(Image, { context: { props, attrs } }).find('img');
      const img = rendered.find('img');

      const url = new URL(img.attributes().src, {}, true);
      expect(url.pathname).toContain('/~/jssmedia/');
      expect(url.query.h).toBe(props.imageParams.h);
      expect(url.query.w).toBe(props.imageParams.w);
    });
  });

  describe('update image srcSet', () => {
    const attrs = {
      srcSet: [{ mw: 100 }, { mw: 300 }],
    };

    it('should handle /-/media', () => {
      const props = {
        media: {
          value: {
            src: '/-/media/img/test0.png',
            alt: 'my image',
          },
        },
        imageParams: {
          h: '100',
          w: '150',
        },
      };

      const rendered = mount(Image, { context: { props, attrs } }).find('img');
      const img = rendered.find('img');

      expect(img.attributes().srcset).toBe('/-/jssmedia/img/test0.png?h=100&w=150&mw=100 150w, /-/jssmedia/img/test0.png?h=100&w=150&mw=300 150w');
    });

    it('should handle /~/media', () => {
      const props = {
        media: {
          value: {
            src: '/~/media/img/test0.png',
            alt: 'my image',
          },
        },
        imageParams: {
          h: '100',
          w: '150',
        },
      };

      const rendered = mount(Image, { context: { props, attrs } }).find('img');
      const img = rendered.find('img');

      expect(img.attributes().srcset).toBe('/~/jssmedia/img/test0.png?h=100&w=150&mw=100 150w, /~/jssmedia/img/test0.png?h=100&w=150&mw=300 150w');
    });

    it('should handle custom mediaUrlPrefix, /-assets', () => {
      const props = {
        media: {
          value: {
            src: '/-assets/img/test0.png',
            alt: 'my image',
          },
        },
        imageParams: {
          h: '100',
          w: '150',
        },
        mediaUrlPrefix: /\/([-~]{1})assets\//i,
      };

      const rendered = mount(Image, { context: { props, attrs } }).find('img');
      const img = rendered.find('img');

      expect(img.attributes().srcset).toBe('/-/jssmedia/img/test0.png?h=100&w=150&mw=100 150w, /-/jssmedia/img/test0.png?h=100&w=150&mw=300 150w');
    });

    it('should handle custom mediaUrlPrefix, /~assets', () => {
      const props = {
        media: {
          value: {
            src: '/~assets/img/test0.png',
            alt: 'my image',
          },
        },
        imageParams: {
          h: '100',
          w: '150',
        },
        mediaUrlPrefix: /\/([-~]{1})assets\//i,
      };

      const rendered = mount(Image, { context: { props, attrs } }).find('img');
      const img = rendered.find('img');

      expect(img.attributes().srcset).toBe('/~/jssmedia/img/test0.png?h=100&w=150&mw=100 150w, /~/jssmedia/img/test0.png?h=100&w=150&mw=300 150w');
    });

    it('should handle custom mediaUrlPrefix, invalid prefix', () => {
      const props = {
        media: {
          value: {
            src: '/~invalid/img/test0.png',
            alt: 'my image',
          },
        },
        imageParams: {
          h: '100',
          w: '150',
        },
        mediaUrlPrefix: /\/([-~]{1})assets\//i,
      };

      const rendered = mount(Image, { context: { props, attrs } }).find('img');
      const img = rendered.find('img');

      expect(img.attributes().srcset).toBe('/~invalid/img/test0.png?h=100&w=150&mw=100 150w, /~invalid/img/test0.png?h=100&w=150&mw=300 150w');
    });
  });

  describe('with "editable" property value but editing disabled', () => {
    const props = {
      media: {
        editable: eeImageData,
        value: {
          src: '/assets/img/test0.png',
          alt: 'my image',
        },
      },
      editable: false,
    };
    const rendered = mount(Image, { context: { props } }).find('img');

    it('should render <img /> component with "value" properties', () => {
      const renderedAttrs = rendered.attributes();
      expect(renderedAttrs).toMatchObject(props.media.value);
    });
  });

  it('should render no <img /> when media prop is empty', () => {
    const props: { media: null } = {
      media: null,
    };
    // Need to mock console.error as Vue will log an error for the missing "field" prop
    // that is marked as required.
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});
    const rendered = mount(Image, { context: { props } });
    expect(rendered.isEmpty()).toBe(true);
    errorSpy.mockRestore();
  });
});

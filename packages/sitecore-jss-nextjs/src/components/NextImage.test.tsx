/* eslint-disable no-unused-expressions */
import chai, { use } from 'chai';
import chaiString from 'chai-string';
import { mount } from 'enzyme';
import React from 'react';
import { NextImage } from './NextImage';
import {
  ImageField,
  DefaultEmptyFieldEditingComponentImage,
} from '@sitecore-jss/sitecore-jss-react';
import { ImageLoader } from 'next/image';
import { spy, match } from 'sinon';
import sinonChai from 'sinon-chai';
import { SinonSpy } from 'sinon';

use(sinonChai);
const expect = chai.use(chaiString).expect;

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
      const rendered = mount(<NextImage loader={mockLoader} {...props} field={field} fill />).find(
        'img'
      );

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
      const field = {
        src: '/assets/img/test0.png',
      };
      expect(() => mount(<NextImage src={src} field={field} />)).to.throw(
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
      const field = {
        value: { src: '/assets/img/test0.png', alt: 'my image' },
        metadata: testMetadata,
      };

      const rendered = mount(<NextImage field={field} fill={true} />);

      expect(rendered.html()).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          '<img alt="my image" loading="lazy" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; left: 0px; top: 0px; right: 0px; bottom: 0px; color: transparent;" sizes="100vw" srcset="/_next/image?url=%2Fassets%2Fimg%2Ftest0.png&amp;w=640&amp;q=75 640w, /_next/image?url=%2Fassets%2Fimg%2Ftest0.png&amp;w=750&amp;q=75 750w, /_next/image?url=%2Fassets%2Fimg%2Ftest0.png&amp;w=828&amp;q=75 828w, /_next/image?url=%2Fassets%2Fimg%2Ftest0.png&amp;w=1080&amp;q=75 1080w, /_next/image?url=%2Fassets%2Fimg%2Ftest0.png&amp;w=1200&amp;q=75 1200w, /_next/image?url=%2Fassets%2Fimg%2Ftest0.png&amp;w=1920&amp;q=75 1920w, /_next/image?url=%2Fassets%2Fimg%2Ftest0.png&amp;w=2048&amp;q=75 2048w, /_next/image?url=%2Fassets%2Fimg%2Ftest0.png&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=%2Fassets%2Fimg%2Ftest0.png&amp;w=3840&amp;q=75">',
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render default empty field component for Image when field value src is not present', () => {
      const field = {
        value: {},
        metadata: testMetadata,
      };

      const rendered = mount(<NextImage field={field} />);
      const defaultEmptyImagePlaceholder = mount(<DefaultEmptyFieldEditingComponentImage />);
      expect(rendered.html()).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          defaultEmptyImagePlaceholder.html(),
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render default empty field component for Image when field src is not present', () => {
      const field = {
        src: undefined,
        metadata: testMetadata,
      };

      const rendered = mount(<NextImage field={field} />);
      const defaultEmptyImagePlaceholder = mount(<DefaultEmptyFieldEditingComponentImage />);
      expect(rendered.html()).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          defaultEmptyImagePlaceholder.html(),
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render custom empty field component when provided, when field value src is not present', () => {
      const field = {
        value: {},
        metadata: testMetadata,
      };

      const EmptyFieldEditingComponent: React.FC = () => (
        <span className="empty-field-value-placeholder">Custom Empty field value</span>
      );

      const rendered = mount(
        <NextImage field={field} emptyFieldEditingComponent={EmptyFieldEditingComponent} />
      );

      expect(rendered.html()).to.equal(
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

      const rendered = mount(
        <NextImage field={field} emptyFieldEditingComponent={EmptyFieldEditingComponent} />
      );

      expect(rendered.html()).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          '<span class="empty-field-value-placeholder">Custom Empty field value</span>',
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render nothing when field value is not present, when editing is explicitly disabled', () => {
      const field = {
        value: {},
        metadata: testMetadata,
      };

      const rendered = mount(<NextImage field={field} editable={false} />);

      expect(rendered.html()).to.equal('');
    });

    it('should render nothing when field src is not present, when editing is explicitly disabled', () => {
      const field = {
        src: undefined,
        metadata: testMetadata,
      };

      const rendered = mount(<NextImage field={field} editable={false} />);

      expect(rendered.html()).to.equal('');
    });
  });
});

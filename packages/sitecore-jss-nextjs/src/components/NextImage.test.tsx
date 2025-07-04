/* eslint-disable no-unused-expressions */
import chai, { use } from 'chai';
import chaiString from 'chai-string';
import { render } from '@testing-library/react';
import React from 'react';
import { NextImage } from './NextImage';
import {
  ImageField,
  DefaultEmptyFieldEditingComponentImage,
  LayoutServicePageState,
  SitecoreContextReactContext,
} from '@sitecore-jss/sitecore-jss-react';
import { RenderingType } from '@sitecore-jss/sitecore-jss/layout';
import Image, { ImageLoader } from 'next/image';
import { spy, match } from 'sinon';
import sinonChai from 'sinon-chai';
import { SinonSpy } from 'sinon';

use(sinonChai);
const setContext = spy();
const expect = chai.use(chaiString).expect;
const testContextProps = {
  context: {
    pageState: LayoutServicePageState.Normal,
  },
  setContext,
};

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

    const mounted = render(
      <SitecoreContextReactContext.Provider value={testContextProps}>
        <NextImage loader={mockLoader} {...props} />
      </SitecoreContextReactContext.Provider>
    );

    const rendered = mounted.container.querySelectorAll('img');
    const img = rendered[0];

    it('should render image with url', () => {
      expect(rendered).to.have.lengthOf(1);
      expect(img.getAttribute('src')).to.equal(`${HOSTNAME}${props.field.src}?w=${props.width}`);
      expect(img.getAttribute('width')).to.equal(props.width.toString());
      expect(img.getAttribute('height')).to.equal(props.height.toString());

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

    const rendered = render(
      <SitecoreContextReactContext.Provider value={testContextProps}>
        <NextImage loader={mockLoader} {...props} />
      </SitecoreContextReactContext.Provider>
    ).container.querySelectorAll('img');

    const img = rendered[0];

    it('should render image with needed props', () => {
      expect(rendered).to.have.length(1);
      expect(img.getAttribute('src')).to.equal(
        `${HOSTNAME}${props.field.value.src}?w=${props.width}`
      );
      expect(img.getAttribute('sizes')).to.equal('(min-width: 960px) 300px, 100px');
      expect(mockLoader.called).to.be.true;
      expect(mockLoader).to.have.been.calledWith(
        match({ src: props.field.value.src, width: props.width })
      );
    });

    it('should render image with non-media props', () => {
      expect(img.getAttribute('id')).to.equal(props.id);
    });

    it('should render image with className prop', () => {
      expect(img.getAttribute('class')).to.eql(props.className);
    });

    it('should render image without width/height when "fill" prop is provided', () => {
      const field = {
        value: { src: '/assets/img/test0.png', alt: 'my image', width: 200, height: 400 },
      };
      const rendered = render(
        <SitecoreContextReactContext.Provider value={testContextProps}>
          <NextImage loader={mockLoader} {...props} field={field} fill />
        </SitecoreContextReactContext.Provider>
      ).container.querySelectorAll('img');

      const img = rendered[0];

      expect(rendered).to.have.length(1);
      expect(img.getAttribute('src')).to.equal(
        `${HOSTNAME}${props.field.value.src}?w=${props.width}`
      );
      expect(img.getAttribute('sizes')).to.equal('(min-width: 960px) 300px, 100px');
      expect(img.getAttribute('height')).to.equal(null);
      expect(img.getAttribute('width')).to.equal(null);
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
    const rendered = render(
      <SitecoreContextReactContext.Provider value={testContextProps}>
        <NextImage loader={mockLoader} {...props} />
      </SitecoreContextReactContext.Provider>
    ).container.querySelectorAll('img');

    const img = rendered[0];

    it('should render image component with "value" properties', () => {
      expect(rendered).to.have.length(1);
      expect(img.getAttribute('src')).to.eql(
        `${HOSTNAME}${props.field.value.src}?w=${props.width}`
      );
      expect(img.getAttribute('alt')).to.eql(props.field.value.alt);
      expect(mockLoader.called).to.be.true;
      expect(mockLoader).to.have.been.calledWith(
        match({ src: props.field.value.src, width: props.width })
      );
    });

    it('should render image with non-media props', () => {
      expect(img.getAttribute('id')).to.equal(props.id);
    });

    it('should render image with className prop', () => {
      expect(img.getAttribute('class')).to.eql(props.className);
    });

    it('should render image when alt prop is missing', () => {
      const props = {
        field: { value: { src: '/assets/img/test0.png' } },
        width,
        height: 10,
        id: 'some-id',
        className: 'the-dude-abides',
      };

      const rendered = render(
        <SitecoreContextReactContext.Provider value={testContextProps}>
          <NextImage loader={mockLoader} {...props} />
        </SitecoreContextReactContext.Provider>
      ).container.querySelectorAll('img');

      const img = rendered[0];

      expect(rendered).to.have.length(1);
      expect(img.getAttribute('src')).to.eql(
        `${HOSTNAME}${props.field.value.src}?w=${props.width}`
      );
      expect(img.getAttribute('alt')).to.eql('');
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
    const rendered = render(
      <SitecoreContextReactContext.Provider value={testContextProps}>
        <NextImage loader={mockLoader} {...props} />
      </SitecoreContextReactContext.Provider>
    );

    const img = rendered.container.querySelector('img');

    it('should render image component with "value" properties', () => {
      expect(img).to.exist;
      expect(img?.getAttribute('src')).to.eql(
        `${HOSTNAME}${props.field.value.src}?w=${props.width}`
      );
      expect(img?.getAttribute('alt')).to.eql(props.field.value.alt);
      expect(mockLoader.called).to.be.true;
      expect(mockLoader).to.have.been.calledWith(
        match({ src: props.field.value.src, width: props.width })
      );
    });

    it('should render image with className prop', () => {
      expect(img?.getAttribute('class')).to.eql(props.className);
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
      const rendered = render(
        <SitecoreContextReactContext.Provider value={testContextProps}>
          <NextImage loader={mockLoader} {...props} />
        </SitecoreContextReactContext.Provider>
      );

      const img1 = rendered.container.querySelector('img');

      expect(img1?.getAttribute('src')).to.equal(
        `${HOSTNAME}/~/jssmedia/img/test0.png?foo=bar&w=8`
      );
      const props2 = {
        ...props,
        field: { src: '/-assets/img/test0.png' },
      };
      const rendered2 = render(
        <SitecoreContextReactContext.Provider value={testContextProps}>
          <NextImage loader={mockLoader} {...props2} />
        </SitecoreContextReactContext.Provider>
      );

      const img2 = rendered2.container.querySelector('img');

      expect(img2?.getAttribute('src')).to.equal(
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

    it('should transform url with direct image object, no value', () => {
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
      const rendered = render(
        <SitecoreContextReactContext.Provider value={testContextProps}>
          <NextImage loader={mockLoader} {...props} />
        </SitecoreContextReactContext.Provider>
      );

      const img1 = rendered.container.querySelector('img');

      expect(img1?.getAttribute('src')).to.equal(
        `${HOSTNAME}/~/jssmedia/img/test0.png?foo=bar&w=8`
      );
      const props2 = {
        ...props,
        field: { src: '/-assets/img/test0.png' },
        width,
        height: 10,
      };
      const rendered2 = render(
        <SitecoreContextReactContext.Provider value={testContextProps}>
          <NextImage loader={mockLoader} {...props2} />
        </SitecoreContextReactContext.Provider>
      );
      const img2 = rendered2.container.querySelector('img');
      expect(img2?.getAttribute('src')).to.equal(
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
      const rendered = render(
        <SitecoreContextReactContext.Provider value={testContextProps}>
          <NextImage field={img} />
        </SitecoreContextReactContext.Provider>
      );
      expect(rendered.container.querySelectorAll('img')).to.have.length(0);
    });
  });

  describe('error cases', () => {
    const src = '/assets/img/test0.png';
    it('should throw an error if src is present', () => {
      const field = {
        src: '/assets/img/test0.png',
      };
      expect(() =>
        render(
          <SitecoreContextReactContext.Provider value={testContextProps}>
            <NextImage src={src} field={field} />
          </SitecoreContextReactContext.Provider>
        )
      ).to.throw('Detected src prop. If you wish to use src, use next/image directly.');
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

    const rendered = render(
      <SitecoreContextReactContext.Provider value={testContextProps}>
        <NextImage {...props} />
      </SitecoreContextReactContext.Provider>
    ).container.querySelectorAll('img');

    const img = rendered[0];

    it('should render image with url', () => {
      expect(rendered).to.have.lengthOf(1);
      expect(img.getAttribute('src')).to.equal(`${HOSTNAME}${props.field.src}`);
      expect(img.getAttribute('width')).to.equal(props.width.toString());
      expect(img.getAttribute('height')).to.equal(props.height.toString());
      expect(userMockLoader).to.have.been.called;
      expect(userMockLoader).to.have.been.calledWith(
        match({ src: props.field.src, width: props.width })
      );
    });
  });

  describe('editMode metadata', () => {
    const testEditingContext = {
      ...testContextProps,
      context: {
        pageState: LayoutServicePageState.Edit,
      },
    };
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

      const rendered = render(
        <SitecoreContextReactContext.Provider value={testEditingContext}>
          <NextImage field={field} fill={true} />
        </SitecoreContextReactContext.Provider>
      );
      // we expect imgSrc from nextjs optimizations to be absent in editing/metadata mode
      expect(rendered.container.innerHTML).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          '<img alt="my image" data-unoptimized="true" loading="lazy" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; left: 0px; top: 0px; right: 0px; bottom: 0px; color: transparent;" src="/assets/img/test0.png">',
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render default empty field component for Image when field value src is not present', () => {
      const field = {
        value: {},
        metadata: testMetadata,
      };

      const rendered = render(
        <SitecoreContextReactContext.Provider value={testEditingContext}>
          <NextImage field={field} />
        </SitecoreContextReactContext.Provider>
      );
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

      const rendered = render(
        <SitecoreContextReactContext.Provider value={testEditingContext}>
          <NextImage field={field} />
        </SitecoreContextReactContext.Provider>
      );
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

    it('should render custom empty field component when provided, when field value src is not present', () => {
      const field = {
        value: {},
        metadata: testMetadata,
      };

      const EmptyFieldEditingComponent: React.FC = () => (
        <span className="empty-field-value-placeholder">Custom Empty field value</span>
      );

      const rendered = render(
        <SitecoreContextReactContext.Provider value={testEditingContext}>
          <NextImage field={field} emptyFieldEditingComponent={EmptyFieldEditingComponent} />
        </SitecoreContextReactContext.Provider>
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
        <SitecoreContextReactContext.Provider value={testEditingContext}>
          <NextImage field={field} emptyFieldEditingComponent={EmptyFieldEditingComponent} />
        </SitecoreContextReactContext.Provider>
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

    it('should render nothing when field value is not present, when editing is explicitly disabled', () => {
      const field = {
        value: {},
        metadata: testMetadata,
      };

      const rendered = render(
        <SitecoreContextReactContext.Provider value={testEditingContext}>
          <NextImage field={field} editable={false} />
        </SitecoreContextReactContext.Provider>
      );

      expect(rendered.container.innerHTML).to.equal('');
    });

    it('should render nothing when field src is not present, when editing is explicitly disabled', () => {
      const field = {
        src: undefined,
        metadata: testMetadata,
      };

      const rendered = render(
        <SitecoreContextReactContext.Provider value={testEditingContext}>
          <NextImage field={field} editable={false} />
        </SitecoreContextReactContext.Provider>
      );

      expect(rendered.container.innerHTML).to.equal('');
    });
  });

  describe('unoptimized property manipulation', () => {
    const props = {
      field: { value: { src: '/assets/img/test0.png' } },
      width,
      height: 10,
      id: 'some-id',
      className: 'the-dude-abides',
    };

    it('should render unoptimized image in edit mode', () => {
      const testEditingContext = {
        ...testContextProps,
        context: {
          pageState: LayoutServicePageState.Edit,
        },
      };
      const rendered = render(
        <SitecoreContextReactContext.Provider value={testEditingContext}>
          <NextImage loader={mockLoader} {...props} />
        </SitecoreContextReactContext.Provider>
      ).container.querySelector('img');
      expect(rendered?.getAttribute('data-unoptimized')).to.equal('true');
    });

    it('should render unoptimized image in preview mode', () => {
      const testEditingContext = {
        ...testContextProps,
        context: {
          pageState: LayoutServicePageState.Preview,
        },
      };
      const rendered = render(
        <SitecoreContextReactContext.Provider value={testEditingContext}>
          <NextImage loader={mockLoader} {...props} />
        </SitecoreContextReactContext.Provider>
      ).container.querySelector('img');
      expect(rendered?.getAttribute('data-unoptimized')).to.equal('true');
    });

    it('should render unoptimized image in component rendering type', () => {
      const testEditingContext = {
        ...testContextProps,
        context: {
          ...testContextProps.context,
          renderingType: RenderingType.Component,
        },
      };
      const rendered = render(
        <SitecoreContextReactContext.Provider value={testEditingContext}>
          <NextImage loader={mockLoader} {...props} />
        </SitecoreContextReactContext.Provider>
      );
      const img = rendered.container.querySelector('img')!;
      expect(img.getAttribute('data-unoptimized')).to.equal('true');
    });

    it('should render respect original unoptimized value in normal mode', () => {
      const modifiedProps = {
        ...props,
        unoptimized: true,
      };
      const rendered = render(
        <SitecoreContextReactContext.Provider value={testContextProps}>
          <NextImage loader={mockLoader} {...modifiedProps} />
        </SitecoreContextReactContext.Provider>
      ).container.querySelector('img');
      expect(rendered?.getAttribute('data-unoptimized')).to.equal('true');
    });
  });
});

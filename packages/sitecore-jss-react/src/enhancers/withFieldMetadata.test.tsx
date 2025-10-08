/* eslint-disable no-unused-expressions */
import React, { forwardRef } from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import { withFieldMetadata } from './withFieldMetadata';

describe('withFieldMetadata', () => {
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

  type TestComponentProps = {
    field?: {
      value?: string;
      metadata?: { [key: string]: unknown };
    };
    editable?: boolean;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const TestComponent = (props: TestComponentProps) => {
    return (
      <div>
        <h1>{props.field?.value}</h1>
        <h2>foo</h2>
        <p>bar</p>
      </div>
    );
  };

  // eslint-disable-next-line react/display-name
  const TestComponentWithRef = forwardRef(
    (props: TestComponentProps, ref: React.ForwardedRef<HTMLDivElement>) => {
      return (
        <div>
          <h1>{props.field?.value}</h1>
          <h2 ref={ref}>foo</h2>
          <p>bar</p>
        </div>
      );
    }
  );

  it('should return component if field is empty', () => {
    const props = {
      editable: true,
    };

    const WrappedComponent = withFieldMetadata<TestComponentProps>(TestComponent);

    const rendered = render(<WrappedComponent {...props} />, { container: document.body });

    expect(rendered.container.innerHTML).to.equal('<div><h1></h1><h2>foo</h2><p>bar</p></div>');
  });

  it('should render unwrapped component if metadata field is not provided', () => {
    const props = {
      field: {
        value: 'test',
      },
      editable: true,
    };

    const WrappedComponent = withFieldMetadata<TestComponentProps>(TestComponent);

    const rendered = render(<WrappedComponent {...props} />, { container: document.body });

    expect(rendered.container.innerHTML).to.equal('<div><h1>test</h1><h2>foo</h2><p>bar</p></div>');
  });

  it('should render unwrapped component if metadata is provided but field is not editable', () => {
    const props = {
      field: {
        value: 'test',
        metadata: testMetadata,
      },
      editable: false,
    };

    const WrappedComponent = withFieldMetadata<TestComponentProps>(TestComponent);

    const rendered = render(<WrappedComponent {...props} />, { container: document.body });

    expect(rendered.container.innerHTML).to.equal('<div><h1>test</h1><h2>foo</h2><p>bar</p></div>');
  });

  it('should wrap field with provided metadata', () => {
    const props = {
      field: {
        value: 'car',
        metadata: testMetadata,
      },
      editable: true,
    };

    const WrappedComponent = withFieldMetadata<TestComponentProps>(TestComponent);

    const rendered = render(<WrappedComponent {...props} />, { container: document.body });

    expect(rendered.container.innerHTML).to.equal(
      [
        `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
          testMetadata
        )}</code>`,
        '<div>',
        '<h1>car</h1>',
        '<h2>foo</h2>',
        '<p>bar</p>',
        '</div>',
        '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
      ].join('')
    );
  });

  describe('with forwardRef', () => {
    it('should return component if field is empty', () => {
      const props = {
        editable: true,
      };

      const ref = React.createRef<HTMLDivElement>();

      const WrappedComponent = withFieldMetadata<TestComponentProps>(TestComponentWithRef, true);

      const rendered = render(<WrappedComponent {...props} ref={ref} />, {
        container: document.body,
      });

      expect(ref.current?.outerHTML).to.equal('<h2>foo</h2>');

      expect(rendered.container.innerHTML).to.equal('<div><h1></h1><h2>foo</h2><p>bar</p></div>');
    });

    it('should render unwrapped component if metadata field is not provided', () => {
      const props = {
        field: {
          value: 'test',
        },
        editable: true,
      };

      const ref = React.createRef<HTMLDivElement>();

      const WrappedComponent = withFieldMetadata<TestComponentProps>(TestComponentWithRef, true);

      const rendered = render(<WrappedComponent {...props} ref={ref} />, {
        container: document.body,
      });

      expect(ref.current?.outerHTML).to.equal('<h2>foo</h2>');

      expect(rendered.container.innerHTML).to.equal(
        '<div><h1>test</h1><h2>foo</h2><p>bar</p></div>'
      );
    });

    it('should render unwrapped component if metadata is provided but field is not editable', () => {
      const props = {
        field: {
          value: 'test',
          metadata: testMetadata,
        },
        editable: false,
      };

      const ref = React.createRef<HTMLDivElement>();

      const WrappedComponent = withFieldMetadata<TestComponentProps>(TestComponentWithRef, true);

      const rendered = render(<WrappedComponent {...props} ref={ref} />, {
        container: document.body,
      });

      expect(ref.current?.outerHTML).to.equal('<h2>foo</h2>');

      expect(rendered.container.innerHTML).to.equal(
        '<div><h1>test</h1><h2>foo</h2><p>bar</p></div>'
      );
    });

    it('should wrap field with provided metadata', () => {
      const props = {
        field: {
          value: 'car',
          metadata: testMetadata,
        },
        editable: true,
      };

      const ref = React.createRef<HTMLDivElement>();

      const WrappedComponent = withFieldMetadata<TestComponentProps>(TestComponentWithRef, true);

      const rendered = render(<WrappedComponent {...props} ref={ref} />, {
        container: document.body,
      });

      expect(ref.current?.outerHTML).to.equal('<h2>foo</h2>');

      expect(rendered.container.innerHTML).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          '<div>',
          '<h1>car</h1>',
          '<h2>foo</h2>',
          '<p>bar</p>',
          '</div>',
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });
  });
});

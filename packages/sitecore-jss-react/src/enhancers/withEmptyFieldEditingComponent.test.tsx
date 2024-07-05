/* eslint-disable no-unused-expressions */
import React, { forwardRef } from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { withEmptyFieldEditingComponent } from './withEmptyFieldEditingComponent';
import { DefaultEmptyFieldEditingComponentText } from '../components/DefaultEmptyFieldEditingComponents';

describe('withEmptyFieldEditingComponent', () => {
  describe('Metadata', () => {
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

    it('Should render provided default empty value component component if field value is empty', () => {
      const props = {
        field: {
          value: '',
          metadata: testMetadata,
        },
      };

      const WrappedComponent = withEmptyFieldEditingComponent<TestComponentProps>(TestComponent, {
        defaultEmptyFieldEditingComponent: DefaultEmptyFieldEditingComponentText,
      });

      const rendered = mount(<WrappedComponent {...props} />);
      const expected = mount(<DefaultEmptyFieldEditingComponentText />);

      expect(rendered.html()).to.equal(expected.html());
    });

    it('Should render custom empty value component if provided via props if field value is empty', () => {
      const EmptyFieldEditingComponent: React.FC = () => (
        <span className="empty-field-value-placeholder">Custom Empty field value</span>
      );

      const props = {
        field: {
          value: '',
          metadata: testMetadata,
        },
        emptyFieldEditingComponent: EmptyFieldEditingComponent,
      };

      const WrappedComponent = withEmptyFieldEditingComponent<TestComponentProps>(TestComponent, {
        defaultEmptyFieldEditingComponent: DefaultEmptyFieldEditingComponentText,
      });

      const rendered = mount(<WrappedComponent {...props} />);
      const expected = mount(<EmptyFieldEditingComponent />);

      expect(rendered.html()).to.equal(expected.html());
    });

    it('Should render component if field value is provided', () => {
      const props = {
        field: {
          value: 'field value',
          metadata: testMetadata,
        },
      };

      const WrappedComponent = withEmptyFieldEditingComponent<TestComponentProps>(TestComponent, {
        defaultEmptyFieldEditingComponent: DefaultEmptyFieldEditingComponentText,
      });

      const rendered = mount(<WrappedComponent {...props} />);
      expect(rendered.html()).to.equal('<div><h1>field value</h1><h2>foo</h2><p>bar</p></div>');
    });

    it('Should render component if component is explicitly not editable if value is empty', () => {
      const props = {
        field: {
          value: '',
          metadata: testMetadata,
        },
        editable: false,
      };

      const WrappedComponent = withEmptyFieldEditingComponent<TestComponentProps>(TestComponent, {
        defaultEmptyFieldEditingComponent: DefaultEmptyFieldEditingComponentText,
      });

      const rendered = mount(<WrappedComponent {...props} />);
      expect(rendered.html()).to.equal('<div><h1></h1><h2>foo</h2><p>bar</p></div>');
    });

    it('Should render component if metadata is not provided', () => {
      const props = {
        field: {
          value: '',
        },
      };

      const WrappedComponent = withEmptyFieldEditingComponent<TestComponentProps>(TestComponent, {
        defaultEmptyFieldEditingComponent: DefaultEmptyFieldEditingComponentText,
      });

      const rendered = mount(<WrappedComponent {...props} />);
      expect(rendered.html()).to.equal('<div><h1></h1><h2>foo</h2><p>bar</p></div>');
    });

    it('Should render component with forward ref if field value is provided', () => {
      const props = {
        field: {
          value: 'field value',
          metadata: testMetadata,
        },
      };

      const WrappedComponent = withEmptyFieldEditingComponent<TestComponentProps>(
        TestComponentWithRef,
        {
          defaultEmptyFieldEditingComponent: DefaultEmptyFieldEditingComponentText,
          isForwardRef: true,
        }
      );
      const ref = React.createRef<HTMLDivElement>();
      const rendered = mount(<WrappedComponent {...props} ref={ref} />);

      expect(ref.current?.outerHTML).to.equal('<h2>foo</h2>');
      expect(rendered.html()).to.equal('<div><h1>field value</h1><h2>foo</h2><p>bar</p></div>');
    });

    it('Should render component if field src value is provided (case for Image component)', () => {
      const props = {
        field: {
          metadata: testMetadata,
          src: 'img src',
        },
      };

      const WrappedComponent = withEmptyFieldEditingComponent<TestComponentProps>(TestComponent, {
        defaultEmptyFieldEditingComponent: DefaultEmptyFieldEditingComponentText,
      });

      const rendered = mount(<WrappedComponent {...props} />);
      expect(rendered.html()).to.equal('<div><h1></h1><h2>foo</h2><p>bar</p></div>');
    });

    it('Should render component if field href value is provided (case for Link component)', () => {
      const props = {
        field: {
          metadata: testMetadata,
          href: 'img src',
        },
      };

      const WrappedComponent = withEmptyFieldEditingComponent<TestComponentProps>(TestComponent, {
        defaultEmptyFieldEditingComponent: DefaultEmptyFieldEditingComponentText,
      });

      const rendered = mount(<WrappedComponent {...props} />);
      expect(rendered.html()).to.equal('<div><h1></h1><h2>foo</h2><p>bar</p></div>');
    });
  });
});

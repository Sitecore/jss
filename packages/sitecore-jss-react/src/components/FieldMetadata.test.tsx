/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { FieldMetadata, withFieldMetadataWrapper } from './FieldMetadata';
import { describe } from 'node:test';

describe('withFieldMetadataWrapper', () => {
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
  const stringifiedData = JSON.stringify(testMetadata);

  const TestComponent: React.FC<FieldMetadata> = (props: any) => {
    return (
      <div {...props}>
        <h2>foo</h2>
        <p>bar</p>
      </div>
    );
  };

  it('Should return component if field is empty', () => {
    const props = {
      editable: true,
    };

    const WrappedComponent = withFieldMetadataWrapper((props) => {
      return <TestComponent {...props} />;
    });

    const rendered = mount(<WrappedComponent {...props} />);

    expect(rendered.find('code')).to.have.length(0);
    expect(rendered.find('div')).to.have.length(1);
    expect(rendered.html()).to.contain('bar');
  });

  it('Should render unwrapped component if metadata field is not provided', () => {
    const props = {
      field: {},
    };

    const WrappedComponent = withFieldMetadataWrapper((props) => {
      return <TestComponent {...props} />;
    });

    const rendered = mount(<WrappedComponent {...props} />);

    expect(rendered.find('code')).to.have.length(0);
    expect(rendered.find('div')).to.have.length(1);
    expect(rendered.html()).to.contain('bar');
  });

  it('Should render unwrapped component if metadata is provided but field is not editable', () => {
    const props = {
      field: {
        metadata: testMetadata,
      },
      editable: false,
    };

    const WrappedComponent = withFieldMetadataWrapper((props) => {
      return <TestComponent {...props} />;
    });

    const rendered = mount(<WrappedComponent {...props} />);

    expect(rendered.find('code')).to.have.length(0);
    expect(rendered.find('div')).to.have.length(1);
    expect(rendered.html()).to.contain('bar');
  });

  it('Should wrap field with provided metadata', () => {
    const props = {
      field: {
        metadata: testMetadata,
      },
      editable: true,
    };

    const WrappedComponent = withFieldMetadataWrapper((props) => {
      return <TestComponent {...props} />;
    });

    const rendered = mount(<WrappedComponent {...props} />);

    expect(rendered.find('code')).to.have.length(2);
    expect(rendered.find('div')).to.have.length(1);
    expect(rendered.html()).to.contain('bar');
    expect(rendered.html()).to.contain(stringifiedData);
  });
});

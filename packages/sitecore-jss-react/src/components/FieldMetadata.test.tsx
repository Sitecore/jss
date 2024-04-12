/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { mount, render } from 'enzyme';

import { FieldMetadataComponent, FieldMetadataComponentProps } from './FieldMetadata';
import { describe } from 'node:test';

describe('<FieldMetadataComponent />', () => {
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

  it('Should render provided metadata', () => {
    const props: FieldMetadataComponentProps = {
      data: stringifiedData,
    };

    const rendered = mount(<FieldMetadataComponent {...props} />);

    expect(rendered.find('code')).to.have.length(2);
    expect(rendered.html()).to.contain('kind="open"');
    expect(rendered.html()).to.contain('kind="close"');
    expect(rendered.html()).to.include(stringifiedData);
  });

  it('Should render with provided children', () => {
    const props: FieldMetadataComponentProps = {
      data: stringifiedData,
    };

    const rendered = mount(
      <FieldMetadataComponent {...props}>
        <div>nested</div>
      </FieldMetadataComponent>
    );

    expect(rendered.find('code')).to.have.length(2);
    expect(rendered.find('div')).to.have.length(1);
    expect(rendered.html()).to.include('nested');
  });

  it('Should render with default attributes', () => {
    const props: FieldMetadataComponentProps = {
      data: stringifiedData,
    };

    const rendered = mount(<FieldMetadataComponent {...props} />);

    expect(rendered.html()).to.contain('kind="open"');
    expect(rendered.html()).to.contain('kind="close"');
    expect(rendered.html()).to.contain('type="text/sitecore"');
    expect(rendered.html()).to.contain('chrometype="field"');
    expect(rendered.html()).to.contain('class="scpm"');
  });

  it('Should render with provided attributes', () => {
    const props: FieldMetadataComponentProps = {
      data: stringifiedData,
      htmlAttributes: {
        chrometype: 'foo',
        type: 'bar',
        className: 'far',
      },
    };

    const rendered = mount(<FieldMetadataComponent {...props} />);

    expect(rendered.html()).to.contain('kind="open"');
    expect(rendered.html()).to.contain('kind="close"');
    expect(rendered.html()).to.contain('type="bar"');
    expect(rendered.html()).to.contain('chrometype="foo"');
    expect(rendered.html()).to.contain('class="far"');
  });
});

import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { File, FileField } from './File';

describe('<File />', () => {
  it('should render nothing with missing field', () => {
    const field = null as FileField;
    const rendered = mount(<File field={field} />);
    expect(rendered.html()).to.equal('');
  });

  it('should render nothing with missing value', () => {
    const field = {
      editable: 'lorem',
    };
    const rendered = mount(<File field={field} />);
    expect(rendered.html()).to.equal('');
  });

  it('should render with src directly on provided field', () => {
    const field = {
      src: '/lorem',
      title: 'ipsum',
    };
    const rendered = mount(<File field={field} />).find('a');
    expect(rendered.html()).to.contain(field.src);
    expect(rendered.html()).to.contain(field.title);
  });

  it('should render display name if no title', () => {
    const field = {
      value: {
        src: '/lorem',
        displayName: 'ipsum',
      },
    };
    const rendered = mount(<File field={field} />).find('a');
    expect(rendered.html()).to.contain(field.value.displayName);
  });

  it('should render other attributes with other props provided', () => {
    const field = {
      value: {
        src: '/lorem',
        title: 'ipsum',
      },
    };
    const rendered = mount(<File field={field} id="my-file" className="my-css" />).find('a');
    expect(rendered.html()).to.contain('id="my-file"');
    expect(rendered.html()).to.contain('class="my-css"');
  });

  it('should render field metadata when metadata property is present', () => {
    const testMetadata = {
      contextItem: {
        id: '{09A07660-6834-476C-B93B-584248D3003B}',
        language: 'en',
        revision: 'a0b36ce0a7db49418edf90eb9621e145',
        version: 1,
      },
      fieldId: '{414061F4-FBB1-4591-BC37-BFFA67F745EB}',
      fieldType: 'file',
      rawValue: 'Test1',
    };

    const field = {
      src: '/lorem',
      title: 'ipsum',
      metadata: testMetadata,
    };

    const rendered = mount(<File field={field} editable={true} />);
    console.log(rendered.html());
    // expect(rendered.find('code')).to.have.length(2);
    expect(rendered.html()).to.contain('kind="open"');
    expect(rendered.html()).to.contain('kind="close"');
    expect(rendered.html()).to.contain(JSON.stringify(testMetadata));
  });
});

import React from 'react';
import { FieldMetadata } from './FieldMetadata';
import { mount } from 'enzyme';
import { expect } from 'chai';

describe('<FieldMetadata />', () => {
  it('should render field metadata', () => {
    const props = {
      metadata: {
        contextItem: {
          id: '{09A07660-6834-476C-B93B-584248D3003B}',
          language: 'en',
          revision: 'a0b36ce0a7db49418edf90eb9621e145',
          version: 1,
        },
        fieldId: '{414061F4-FBB1-4591-BC37-BFFA67F745EB}',
        fieldType: 'date',
        rawValue: 'Test1',
      },
    };

    const Foo = () => <h2>foo</h2>;

    const rendered = mount(
      <FieldMetadata {...props}>
        <Foo />
      </FieldMetadata>
    );

    expect(rendered.html()).to.equal(
      [
        `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
          props.metadata
        )}</code>`,
        '<h2>foo</h2>',
        '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
      ].join('')
    );
  });
});

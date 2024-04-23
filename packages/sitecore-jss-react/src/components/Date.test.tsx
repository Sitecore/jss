/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { DateField } from './Date';

describe('<DateField />', () => {
  it('should render nothing is field is missing', () => {
    const p = {
      field: {},
    };

    const c = shallow(<DateField {...p} />);
    console.log(c.type());
    expect(c.html()).to.equal('');
  });

  it('should render value', () => {
    const p = {
      field: {
        value: '23-11-2001',
      },
    };

    const c = shallow(<DateField {...p} />);

    expect(c.html()).equal('23-11-2001');
  });

  it('should render value using render prop function', () => {
    const render = (date: Date | null) => <p>{date ? date.toDateString() : ''}</p>;
    const p = {
      field: {
        value: '11-23-2001',
      },
      render,
    };

    const c = shallow(<DateField {...p} />);

    expect(c.html()).equal('<p>Fri Nov 23 2001</p>');
  });

  it('should render null value using render prop function', () => {
    const render = (date: Date | null) => <p>{date ? date.toDateString() : ''}</p>;
    const p = {
      field: {
        editable: 'xxx',
      },
      editable: false,
      render,
    };

    const c = shallow(<DateField {...p} />);

    expect(c.html()).equal('<p></p>');
  });

  it('should render value with provided tag', () => {
    const p = {
      field: {
        value: '11-23-2001',
      },
      tag: 'h3',
    };

    const c = shallow(<DateField {...p} />);

    expect(c.html()).equal('<h3>11-23-2001</h3>');
  });

  it('should render editable value', () => {
    const p = {
      field: {
        editable: '<h1 class="super">11-23-2001</h1>',
      },
      editable: true,
    };

    const c = shallow(<DateField {...p} />);

    expect(c.html()).equal('<span><h1 class="super">11-23-2001</h1></span>');
  });

  it('should render field metadata component when metadata property is present', () => {
    const testMetadata = {
      contextItem: {
        id: '{09A07660-6834-476C-B93B-584248D3003B}',
        language: 'en',
        revision: 'a0b36ce0a7db49418edf90eb9621e145',
        version: 1,
      },
      fieldId: '{414061F4-FBB1-4591-BC37-BFFA67F745EB}',
      fieldType: 'date',
      rawValue: 'Test1',
    };

    const props = {
      field: {
        value: '23-11-2001',
        metadata: testMetadata,
      },
    };

    const rendered = mount(<DateField {...props} />);

    expect(rendered.html()).to.equal(
      [
        `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
          testMetadata
        )}</code>`,
        '23-11-2001',
        '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
      ].join('')
    );
  });
});

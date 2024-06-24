/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { DateField } from './Date';
import { describe } from 'node:test';

describe('<DateField />', () => {
  it('should return null if no editable or value', () => {
    const p = {
      field: {},
    };

    const c = shallow(<DateField {...p} />);
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

  describe('editMode metadata', () => {
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

    it('should render field metadata component when metadata property is present', () => {
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

    it('should render default empty field placeholder when field value is empty in edit mode metadata', () => {
      const field = {
        value: '',
        metadata: testMetadata,
      };

      const rendered = mount(<DateField field={field} />);

      expect(rendered.html()).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          '<span>[No text in field]</span>',
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render custom empty field placeholder when provided, when field value is empty in edit mode metadata', () => {
      const field = {
        value: '',
        metadata: testMetadata,
      };

      const EmptyValueEditingPlaceholder: React.FC = () => (
        <span className="empty-field-value-placeholder">Custom Empty field value</span>
      );

      const rendered = mount(
        <DateField field={field} emptyValueEditingPlaceholder={EmptyValueEditingPlaceholder} />
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

    it('should render nothing when field value is empty, when editing is explicitly disabled in edit mode metadata ', () => {
      const field = {
        value: '',
        metadata: testMetadata,
      };

      const rendered = mount(<DateField field={field} editable={false} />);

      expect(rendered.html()).to.equal('');
    });
  });
});

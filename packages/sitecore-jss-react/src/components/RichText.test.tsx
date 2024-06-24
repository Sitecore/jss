import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { RichText, RichTextField } from './RichText';
import { richTextField as eeRichTextData } from '../test-data/ee-data';
import { describe } from 'node:test';

describe('<RichText />', () => {
  it('should render nothing with missing field', () => {
    const field: RichTextField = null;
    const rendered = mount(<RichText field={field} />).find('div');
    expect(rendered).to.have.length(0);
  });

  it('should render nothing with empty value', () => {
    const field = {
      value: '',
    };
    const rendered = mount(<RichText field={field} />).find('div');
    expect(rendered).to.have.length(0);
  });

  it('should render nothing with missing editable and value', () => {
    const field = {};
    const rendered = mount(<RichText field={field} />).find('div');
    expect(rendered).to.have.length(0);
  });

  it('should render editable with editable value', () => {
    const field = {
      value: 'value',
      editable: 'editable',
    };
    const rendered = mount(<RichText field={field} />).find('div');
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain('editable');
  });

  it('should render value with editing explicitly disabled', () => {
    const field = {
      value: 'value',
      editable: 'editable',
    };
    const rendered = mount(<RichText field={field} editable={false} />).find('div');
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain('value');
  });

  it('should render value with with just a value', () => {
    const field = {
      value: 'value',
    };
    const rendered = mount(<RichText field={field} />).find('div');
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain('value');
  });

  it('should render embedded html as-is', () => {
    const field = {
      value: '<input type="text">some crazy stuff<script code="whaaaat">uh oh</script>',
    };
    const rendered = mount(<RichText field={field} />).find('div');
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain(field.value);
  });

  it('should render ee HTML', () => {
    const field = {
      editable: eeRichTextData,
    };
    const rendered = mount(<RichText field={field} />).find('div');
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain('<input');
    expect(rendered.html()).to.contain('<span class="scChromeData">');
  });

  it('should render tag with a tag provided', () => {
    const field = {
      value: 'value',
    };
    const rendered = mount(<RichText field={field} tag="p" />).find('p');
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain('value');
  });

  it('should render other attributes with other props provided', () => {
    const field = {
      value: 'value',
    };
    const rendered = mount(
      <RichText field={field} tag="h1" className="cssClass" id="lorem" />
    ).find('h1');
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain('<h1 class="cssClass" id="lorem">');
    expect(rendered.html()).to.contain('value');
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
      fieldType: 'single-line',
      rawValue: 'Test1',
    };

    it('should render field metadata component when metadata property is present', () => {
      const field = {
        value: 'value',
        metadata: testMetadata,
      };

      const rendered = mount(<RichText field={field} />);

      expect(rendered.html()).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          '<div>value</div>',
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render default empty field placeholder when field value is empty in edit mode metadata', () => {
      const field = {
        value: '',
        metadata: testMetadata,
      };

      const rendered = mount(<RichText field={field} />);

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
        <RichText field={field} emptyValueEditingPlaceholder={EmptyValueEditingPlaceholder} />
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

      const rendered = mount(<RichText field={field} editable={false} />);

      expect(rendered.html()).to.equal('');
    });
  });
});

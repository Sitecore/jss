/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';

import { Text, TextField } from './Text';
import { textField as eeTextData } from '../test-data/ee-data';

describe('<Text />', () => {
  it('should render nothing with missing field', () => {
    const field: TextField = null;
    const rendered = render(<Text field={field} />);
    expect(rendered.container.innerHTML).to.equal('');
  });

  it('should render nothing with missing field', () => {
    const field = {
      value: '',
    };
    const rendered = render(<Text field={field} />);
    expect(rendered.container.innerHTML).to.equal('');
  });

  it('should render nothing with missing editable and value', () => {
    const field = {};
    const rendered = render(<Text field={field} />);
    expect(rendered.container.innerHTML).to.equal('');
  });

  it('should render editable with editable value', () => {
    const field = {
      value: 'value',
      editable: 'editable',
    };
    const rendered = render(<Text field={field} />).container.querySelector('span');
    expect(rendered?.innerHTML).to.contain('editable');
  });

  it('should render value with editing explicitly disabled', () => {
    const field = {
      value: 'value',
      editable: 'editable',
    };
    const rendered = render(
      <Text tag="span" field={field} editable={false} />
    ).container.querySelector('span');
    expect(rendered?.innerHTML).to.contain('value');
  });

  it('should encode values with editing explicitly disabled', () => {
    const field = {
      value: 'value < >',
    };
    const rendered = render(
      <Text tag="span" field={field} editable={false} />
    ).container.querySelector('span');
    expect(rendered?.innerHTML).to.contain('&lt; &gt;');
  });

  it('should render value with just a value', () => {
    const field = {
      value: 'value',
    };
    const rendered = render(<Text tag="span" field={field} />).container.querySelector('span');
    expect(rendered?.innerHTML).to.contain('value');
  });

  it('should render value without tag', () => {
    const field = {
      value: 'value',
    };
    const rendered = render(<Text field={field} />);
    expect(rendered.container.innerHTML).to.equal('value');
  });

  it('should render number value', () => {
    const field = {
      value: 1.23,
    };
    const rendered = render(<Text field={field} />);
    expect(rendered.container.innerHTML).to.equal('1.23');
  });

  it('should render zero number value', () => {
    const field = {
      value: 0,
    };
    const rendered = render(<Text field={field} />);
    expect(rendered.container.innerHTML).to.equal('0');
  });

  it('should render negative number value', () => {
    const field = {
      value: -1.23,
    };
    const rendered = render(<Text field={field} />);
    expect(rendered.container.innerHTML).to.equal('-1.23');
  });

  it('should render value without tag', () => {
    const field = {
      value: 'value',
    };
    const rendered = render(<Text field={field} />);
    expect(rendered.container.innerHTML).to.contain('value');
  });

  it('should render value with just a value that contains line breaks', () => {
    const field = {
      value: 'xxx\n\naa\nbbb\ndd',
    };
    const rendered = render(<Text tag="span" field={field} />).container.querySelector('span');
    expect(rendered?.innerHTML).to.contain('xxx<br><br>aa<br>bbb<br>dd');
  });

  it('should render value with just a value that contains only one line break', () => {
    const field = {
      value: '\n',
    };
    const rendered = render(<Text tag="span" field={field} />).container.querySelector('span');
    expect(rendered?.outerHTML).to.contain('<span><br></span>');
  });

  it('should render embedded html as-is when encoding is disabled', () => {
    const field = {
      value: '<input type="text">some crazy stuff<script code="whaaaat">uh oh</script>',
    };
    const rendered = render(<Text field={field} encode={false} />).container.querySelector('span');
    expect(rendered?.innerHTML).to.contain(field.value);
  });

  it('should render ee HTML', () => {
    const field = {
      editable: eeTextData,
    };
    const rendered = render(<Text field={field} />).container.querySelector('span');
    expect(rendered?.innerHTML).to.contain('<input');
    expect(rendered?.innerHTML).to.contain('<span class="scChromeData">');
  });

  it('should render ee HTML with line breaks', () => {
    const field = {
      editable: 'xxx\n\naa\nbbb\n',
    };
    const rendered = render(<Text field={field} />).container.querySelector('span');
    expect(rendered?.outerHTML).to.equal('<span>xxx\n\naa\nbbb\n</span>');
  });

  it('should render tag with a tag provided', () => {
    const field = {
      value: 'value',
    };
    const rendered = render(<Text field={field} tag="h1" />).container.querySelector('h1');
    expect(rendered?.innerHTML).to.contain('value');
  });

  it('should render other attributes with other props provided', () => {
    const field = {
      value: 'value',
    };
    const rendered = render(
      <Text field={field} tag="h1" className="cssClass" id="lorem" />
    ).container.querySelector('h1');
    expect(rendered?.outerHTML).to.contain('<h1 class="cssClass" id="lorem">');
    expect(rendered?.outerHTML).to.contain('value');
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

      const rendered = render(<Text field={field} />);

      expect(rendered.container.innerHTML).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          'value',
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render default empty field component when field value is empty in edit mode metadata', () => {
      const field = {
        value: '',
        metadata: testMetadata,
      };

      const rendered = render(<Text field={field} />);

      expect(rendered.container.innerHTML).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          '<span>[No text in field]</span>',
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render custom empty field component when provided, when field value is empty in edit mode metadata', () => {
      const field = {
        value: '',
        metadata: testMetadata,
      };

      const EmptyFieldEditingComponent: React.FC = () => (
        <span className="empty-field-value-placeholder">Custom Empty field value</span>
      );

      const rendered = render(
        <Text field={field} emptyFieldEditingComponent={EmptyFieldEditingComponent} />
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

    it('should render nothing when field value is empty, when editing is explicitly disabled in edit mode metadata ', () => {
      const field = {
        value: '',
        metadata: testMetadata,
      };

      const rendered = render(<Text field={field} editable={false} />);

      expect(rendered.container.innerHTML).to.equal('');
    });
  });
});

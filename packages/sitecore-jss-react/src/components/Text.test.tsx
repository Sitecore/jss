/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { Text, TextField } from './Text';
import { textField as eeTextData } from '../testData/ee-data';

describe('<Text />', () => {
  it('should render nothing with missing field', () => {
    const field: TextField = null;
    const rendered = mount(<Text field={field} />);
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.be.null;
  });

  it('should render nothing with empty value', () => {
    const field = {
      value: '',
    };
    const rendered = mount(<Text field={field} />);
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.be.null;
  });

  it('should render nothing with missing editable and value', () => {
    const field = {};
    const rendered = mount(<Text field={field} />);
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.be.null;
  });

  it('should render editable with editable value', () => {
    const field = {
      value: 'value',
      editable: 'editable',
    };
    const rendered = mount(<Text field={field} />).find('span');
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain('editable');
  });

  it('should render value with editing explicitly disabled', () => {
    const field = {
      value: 'value',
      editable: 'editable',
    };
    const rendered = mount(<Text tag="span" field={field} editable={false} />).find('span');
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain('value');
  });

  it('should encode values with editing explicitly disabled', () => {
    const field = {
      value: 'value < >',
    };
    const rendered = mount(<Text tag="span" field={field} editable={false} />).find('span');
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain('&lt; &gt;');
  });

  it('should render value with just a value', () => {
    const field = {
      value: 'value',
    };
    const rendered = mount(<Text tag="span" field={field} />).find('span');
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain('value');
  });

  it('should render value without tag', () => {
    const field = {
      value: 'value',
    };
    const rendered = mount(<Text field={field} />);
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.equal('value');
  });

  it('should render number value', () => {
    const field = {
      value: 1.23,
    };
    const rendered = mount(<Text field={field} />);
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.equal('1.23');
  });

  it('should render zero number value', () => {
    const field = {
      value: 0,
    };
    const rendered = mount(<Text field={field} />);
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.equal('0');
  });

  it('should render negative number value', () => {
    const field = {
      value: -1.23,
    };
    const rendered = mount(<Text field={field} />);
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.equal('-1.23');
  });

  it('should render value without tag', () => {
    const field = {
      value: 'value',
    };
    const rendered = mount(<Text field={field} />);
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain('value');
  });

  it('should render value with just a value that contains line breaks', () => {
    const field = {
      value: 'xxx\n\naa\nbbb\ndd',
    };
    const rendered = mount(<Text tag="span" field={field} />).find('span');
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain('xxx<br><br>aa<br>bbb<br>dd');
  });

  it('should render value with just a value that contains only one line break', () => {
    const field = {
      value: '\n',
    };
    const rendered = mount(<Text tag="span" field={field} />).find('span');
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain('<span><br></span>');
  });

  it('should render embedded html as-is when encoding is disabled', () => {
    const field = {
      value: '<input type="text">some crazy stuff<script code="whaaaat">uh oh</script>',
    };
    const rendered = mount(<Text field={field} encode={false} />).find('span');
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain(field.value);
  });

  it('should render ee HTML', () => {
    const field = {
      editable: eeTextData,
    };
    const rendered = mount(<Text field={field} />).find('span');
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain('<input');
    expect(rendered.html()).to.contain('<span class="scChromeData">');
  });

  it('should render ee HTML with line breaks', () => {
    const field = {
      editable: 'xxx\n\naa\nbbb\n',
    };
    const rendered = mount(<Text field={field} />).find('span');
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.equal('<span>xxx\n\naa\nbbb\n</span>');
  });

  it('should render tag with a tag provided', () => {
    const field = {
      value: 'value',
    };
    const rendered = mount(<Text field={field} tag="h1" />).find('h1');
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain('value');
  });

  it('should render other attributes with other props provided', () => {
    const field = {
      value: 'value',
    };
    const rendered = mount(<Text field={field} tag="h1" className="cssClass" id="lorem" />).find(
      'h1'
    );
    expect(rendered).to.have.length(1);
    expect(rendered.html()).to.contain('<h1 class="cssClass" id="lorem">');
    expect(rendered.html()).to.contain('value');
  });
});

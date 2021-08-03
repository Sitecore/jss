import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { RichText, RichTextField } from './RichText';
import { richTextField as eeRichTextData } from '../testData/ee-data';

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
});

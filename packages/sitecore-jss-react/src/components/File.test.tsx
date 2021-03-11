/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { File } from './File';

describe('<File />', () => {
  it('should render nothing with missing field', () => {
    const field: any = null;
    const rendered = mount(<File field={field} />).children();
    expect(rendered).to.have.length(0);
  });

  it('should render nothing with missing value', () => {
    const field = {
      editable: 'lorem',
    };
    const rendered = mount(<File field={field} />).children();
    expect(rendered).to.have.length(0);
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
});

import { expect } from 'chai';
import { render } from '@testing-library/react';
import React from 'react';
import { File, FileField } from './File';

describe('<File />', () => {
  it('should render nothing with missing field', () => {
    const field = null as FileField;
    const rendered = render(<File field={field} />).container.children;
    expect(rendered).to.have.length(0);
  });

  it('should render nothing with missing value', () => {
    const field = {
      editable: 'lorem',
    };
    const rendered = render(<File field={field} />).container.children;
    expect(rendered).to.have.length(0);
  });

  it('should render with src directly on provided field', () => {
    const field = {
      src: '/lorem',
      title: 'ipsum',
    };
    const rendered = render(<File field={field} />).container.querySelector('a');
    expect(rendered?.outerHTML).to.contain(field.src);
    expect(rendered?.outerHTML).to.contain(field.title);
  });

  it('should render display name if no title', () => {
    const field = {
      value: {
        src: '/lorem',
        displayName: 'ipsum',
      },
    };
    const rendered = render(<File field={field} />).container.querySelector('a');
    expect(rendered?.outerHTML).to.contain(field.value.displayName);
  });

  it('should render other attributes with other props provided', () => {
    const field = {
      value: {
        src: '/lorem',
        title: 'ipsum',
      },
    };
    const rendered = render(
      <File field={field} id="my-file" className="my-css" />
    ).container.querySelector('a');
    expect(rendered?.outerHTML).to.contain('id="my-file"');
    expect(rendered?.outerHTML).to.contain('class="my-css"');
  });
});

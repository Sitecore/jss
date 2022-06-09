import { expect } from 'chai';
import { render } from '@testing-library/react';
import React from 'react';
import { File, FileField } from './File';

describe('<File />', () => {
  it('should render nothing with missing field', () => {
    const field = null as FileField;
    const r = render(<File field={field} />);

    expect(r.container.innerHTML).to.equal('');
  });

  it('should render nothing with missing value', () => {
    const field = {
      editable: 'lorem',
    };
    const r = render(<File field={field} />);

    expect(r.container.innerHTML).to.equal('');
  });

  it('should render with src directly on provided field', () => {
    const field = {
      src: '/lorem',
      title: 'ipsum',
    };
    const r = render(<File field={field} />).container.querySelector('a');

    expect(r.href).to.contain(field.src);
    expect(r.innerHTML).to.contain(field.title);
  });

  it('should render display name if no title', () => {
    const field = {
      value: {
        src: '/lorem',
        displayName: 'ipsum',
      },
    };
    const r = render(<File field={field} />).getByRole('link');

    expect(r.innerHTML).to.contain(field.value.displayName);
  });

  it('should render other attributes with other props provided', () => {
    const field = {
      value: {
        src: '/lorem',
        title: 'ipsum',
      },
    };
    const r = render(
      <File field={field} id="my-file" className="my-css" />
    ).container.querySelector('a');

    expect(r.id).to.contain('my-file');
    expect(r.className).to.contain('my-css');
  });
});

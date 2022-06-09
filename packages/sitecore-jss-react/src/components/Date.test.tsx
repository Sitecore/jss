/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { render } from '@testing-library/react';
import React from 'react';
import { DateField } from './Date';

describe('<DateField />', () => {
  it('should return null if no editable or value', () => {
    const p = {
      field: {},
    };
    const r = render(<DateField {...p} />);

    expect(r.container.innerHTML).to.equal('');
  });

  it('should render value', () => {
    const p = {
      field: {
        value: '23-11-2001',
      },
    };
    const r = render(<DateField {...p} />);

    expect(r.container.innerHTML).to.equal('23-11-2001');
  });

  it('should render value using render prop function', () => {
    const renderFn = (date: Date | null) => <p>{date ? date.toDateString() : ''}</p>;
    const p = {
      field: {
        value: '11-23-2001',
      },
      render: renderFn,
    };
    const r = render(<DateField {...p} />);

    expect(r.container.innerHTML).equal('<p>Fri Nov 23 2001</p>');
  });

  it('should render null value using render prop function', () => {
    const renderFn = (date: Date | null) => <p>{date ? date.toDateString() : ''}</p>;
    const p = {
      field: {
        editable: 'xxx',
      },
      editable: false,
      render: renderFn,
    };
    const r = render(<DateField {...p} />);

    expect(r.container.innerHTML).equal('<p></p>');
  });

  it('should render value with provided tag', () => {
    const p = {
      field: {
        value: '11-23-2001',
      },
      tag: 'h3',
    };
    const r = render(<DateField {...p} />);

    expect(r.container.innerHTML).equal('<h3>11-23-2001</h3>');
  });

  it('should render editable value', () => {
    const p = {
      field: {
        editable: '<h1 class="super">11-23-2001</h1>',
      },
      editable: true,
    };
    const r = render(<DateField {...p} />);

    expect(r.container.innerHTML).equal('<span><h1 class="super">11-23-2001</h1></span>');
  });
});

import { expect } from 'chai';
import { render } from '@testing-library/react';
import React from 'react';
import { DateField } from './Date';
import { describe } from 'node:test';

describe('<DateField />', () => {
  it('should return null if no editable or value', () => {
    const p = {
      field: {},
    };

    const c = render(<DateField {...p} />, { container: document.body });
    expect(c.baseElement.innerHTML).to.equal('');
  });

  it('should render value', () => {
    const p = {
      field: {
        value: '23-11-2001',
      },
    };

    const c = render(<DateField {...p} />, { container: document.body });
    expect(c.baseElement.innerHTML).equal('23-11-2001');
  });

  it('should render value using render prop function', () => {
    const renderDate = (date: Date | null) => <p>{date ? date.toDateString() : ''}</p>;
    const p = {
      field: {
        value: '11-23-2001',
      },
      render: renderDate,
    };

    const c = render(<DateField {...p} />, { container: document.body });
    expect(c.baseElement.innerHTML).equal('<p>Fri Nov 23 2001</p>');
  });

  it('should render null value using render prop function', () => {
    const renderDate = (
      p0: React.JSX.Element,
      p1: { container: HTMLElement },
      date: Date | null
    ) => <p>{date ? date.toDateString() : ''}</p>;
    const p = {
      field: {
        editable: 'xxx',
      },
      editable: false,
      render: renderDate,
    };

    const c = render(<DateField {...p} />, { container: document.body });
    expect(c.baseElement.innerHTML).equal('<p></p>');
  });

  it('should render value with provided tag', () => {
    const p = {
      field: {
        value: '11-23-2001',
      },
      tag: 'h3',
    };

    const c = render(<DateField {...p} />, { container: document.body });
    expect(c.baseElement.innerHTML).equal('<h3>11-23-2001</h3>');
  });

  it('should render editable value', () => {
    const p = {
      field: {
        editable: '<h1 class="super">11-23-2001</h1>',
      },
      editable: true,
    };

    const c = render(<DateField {...p} />, { container: document.body });

    expect(c.baseElement.innerHTML).equal('<span><h1 class="super">11-23-2001</h1></span>');
  });
});

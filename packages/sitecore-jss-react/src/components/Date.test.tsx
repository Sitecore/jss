import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { DateField } from './Date';

describe('<DateField />', () => {
  it('should return null if no editable or value', () => {
    const p = {
      field: {}
    };

    const c = shallow(<DateField {...p} />);

    expect(c.type()).to.be.null;
  });

  it('should render value', () => {
    const p = {
      field: {
        value: '23-11-2001'
      }
    };

    const c = shallow(<DateField {...p} />);

    expect(c.html()).equal('23-11-2001');
  });

  it('should render value using render prop function', () => {
    const render = (date: Date | null) => <p>{date ? date.toDateString() : ''}</p>;
    const p = {
      field: {
        value: '11-23-2001'
      },
      render
    };

    const c = shallow(<DateField {...p} />);

    expect(c.html()).equal('<p>Fri Nov 23 2001</p>');
  });

  it('should render null value using render prop function', () => {
    const render = (date: Date | null) => <p>{date ? date.toDateString() : ''}</p>;
    const p = {
      field: {
        editable: 'xxx'
      },
      editable: false,
      render
    };

    const c = shallow(<DateField {...p} />);

    expect(c.html()).equal('<p></p>');
  })

  it('should render value with provided tag', () => {
    const p = {
      field: {
        value: '11-23-2001'
      },
      tag: 'h3'
    };

    const c = shallow(<DateField {...p} />);

    expect(c.html()).equal('<h3>11-23-2001</h3>');
  });

  it('should render editable value', () => {
    const p = {
      field: {
        editable: '<h1 class="super">11-23-2001</h1>'
      },
      editable: true
    };

    const c = shallow(<DateField {...p} />);

    expect(c.html()).equal('<span><h1 class="super">11-23-2001</h1></span>');
  });
});

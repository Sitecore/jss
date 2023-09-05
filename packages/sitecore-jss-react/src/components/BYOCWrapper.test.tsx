import React from 'react';
import { stub } from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { BYOCWrapper } from './BYOCWrapper';
import * as BYOCComponent from './BYOCComponent';

describe('<BYOCWrapper />', () => {
  let byocComponentStub;

  beforeEach(() => {
    byocComponentStub = stub(BYOCComponent, 'BYOCComponent').callsFake(() => <p>Foo</p>);
  });

  afterEach(() => {
    byocComponentStub.restore();
  });

  it('should render', () => {
    const mockProps = {
      params: {
        ComponentName: 'xxx',
        ComponentProps: JSON.stringify({ prop1: 'value1' }),
        RenderingIdentifier: 'foo-id',
        styles: 'bar car   ',
      },
    };
    const wrapper = mount(<BYOCWrapper {...mockProps} />);

    const byocComponent = wrapper.find('BYOCComponent');
    expect(byocComponent).to.have.lengthOf(1);
    const props = byocComponent.props() as BYOCComponent.BYOCComponentProps;
    expect(props.params).to.deep.equal({
      ComponentName: 'xxx',
      ComponentProps: JSON.stringify({ prop1: 'value1' }),
      RenderingIdentifier: 'foo-id',
      styles: 'bar car   ',
    });

    const root = wrapper.find('.bar');
    expect(root).to.have.lengthOf(1);
    expect(root.props().className).to.equal('bar car');
    expect(root.props().id).to.equal('foo-id');
  });
});

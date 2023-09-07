import React from 'react';
import { stub } from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { ComponentFields } from '@sitecore-jss/sitecore-jss/layout';
import { FEaaSWrapper } from './FEaaSWrapper';
import * as FEaaSComponent from './FEaaSComponent';

describe('<FEaaSWrapper />', () => {
  const params: FEaaSComponent.FEaaSComponentParams = {
    LibraryId: 'library123',
    ComponentId: 'component123',
    ComponentVersion: 'version123',
    ComponentRevision: 'staged',
    ComponentHostName: 'host123',
    RenderingIdentifier: 'foo-id',
    styles: 'foo bar   ',
  };

  const fields: ComponentFields = {
    sampleText: {
      value: 'Welcome-to-Sitecore-JSS',
    },
  };

  const fetchedData = {
    foo: 'bar',
    baz: 42,
  };

  it('should render', () => {
    const feaasComponentStub = stub(FEaaSComponent, 'FEaaSComponent').callsFake(() => <p>Foo</p>);

    const mockProps: FEaaSComponent.FEaaSComponentProps = {
      params,
      fields,
      fetchedData,
    };
    const wrapper = mount(<FEaaSWrapper {...mockProps} />);

    const feaasComponent = wrapper.find('FEaaSComponent');
    expect(feaasComponent).to.have.lengthOf(1);
    const props = feaasComponent.props() as FEaaSComponent.FEaaSComponentProps;
    expect(props.params).to.deep.equal({
      LibraryId: 'library123',
      ComponentId: 'component123',
      ComponentVersion: 'version123',
      ComponentRevision: 'staged',
      ComponentHostName: 'host123',
      RenderingIdentifier: 'foo-id',
      styles: 'foo bar   ',
    });
    expect(props.fields).to.deep.equal({
      sampleText: {
        value: 'Welcome-to-Sitecore-JSS',
      },
    });
    expect(props.fetchedData).to.deep.equal({
      foo: 'bar',
      baz: 42,
    });

    const root = wrapper.find('.bar');
    expect(root).to.have.lengthOf(1);
    expect(root.props().className).to.equal('component feaas foo bar');
    expect(root.props().id).to.equal('foo-id');

    feaasComponentStub.restore();
  });
});

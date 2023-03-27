import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { composeComponentEndpoint, FEaaSComponent, FEaaSComponentParams } from './FEaaSComponent';

describe('<FEaaSComponent />', () => {
  const requiredParams: FEaaSComponentParams = {
    LibraryId: 'library123',
    ComponentId: 'component123',
    ComponentVersion: 'version123',
    ComponentRevision: 'revision123',
    ComponentHostName: 'host123',
  };

  const endpoint = composeComponentEndpoint(requiredParams);

  it('should render', () => {

    const wrapper = shallow(<FEaaSComponent src={endpoint} template='' lastModified='' />);
    expect(wrapper).to.have.length(1);
    expect(wrapper.html()).to.contain(
      '<feaas-component library="library123" cdn="host123" component="component123" version="version123" revision="revision123" data=""></feaas-component>'
    );
  });
});

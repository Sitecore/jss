import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { ComponentFields } from '@sitecore-jss/sitecore-jss/layout';
import { FEaaSComponent, FEaaSComponentParams } from './FEaaSComponent';

describe('<FEaaSComponent />', () => {
  const requiredParams: FEaaSComponentParams = {
    LibraryId: 'library123',
    ComponentId: 'component123',
    ComponentVersion: 'version123',
    ComponentRevision: 'revision123',
    ComponentHostName: 'host123',
  };

  it('should not render if missing params', () => {
    const rendered = shallow(<FEaaSComponent />).find('feaas-component');
    expect(rendered).to.have.length(0);
  });

  it('should not render if missing required params', () => {
    const params: FEaaSComponentParams = {
      LibraryId: '',
      ComponentId: '',
      ComponentVersion: '',
      ComponentRevision: '',
      ComponentHostName: '',
      ComponentInstanceId: 'instance',
      ComponentHTMLOverride: 'html',
      ComponentDataOverride: '{}',
    };
    const rendered = shallow(<FEaaSComponent params={params} />).find('feaas-component');
    expect(rendered).to.have.length(0);
  });

  it('should render', () => {
    const params: FEaaSComponentParams = {
      ...requiredParams,
      ComponentInstanceId: 'instance123',
      ComponentHTMLOverride: 'html',
    };
    const wrapper = shallow(<FEaaSComponent params={params} />);
    expect(wrapper).to.have.length(1);
    expect(wrapper.html()).to.contain(
      '<feaas-stylesheet library="library123" cdn="host123"></feaas-stylesheet>'
    );
    expect(wrapper.html()).to.contain(
      '<feaas-component library="library123" component="component123" version="version123" revision="revision123" cdn="host123" instance="instance123" template="html" data=""></feaas-component>'
    );
  });

  describe('data', () => {
    it('should pass override data', () => {
      const params: FEaaSComponentParams = {
        ...requiredParams,
        ComponentDataOverride: '{ "foo": "bar", "baz": 1 }',
      };
      const wrapper = shallow(<FEaaSComponent params={params} />);
      expect(wrapper).to.have.length(1);
      expect(wrapper.html()).to.contain(
        `data="${params.ComponentDataOverride!.replace(/"/g, '&quot;')}"`
      );
    });

    it('should pass datasource fields', () => {
      const fields: ComponentFields = {
        sampleText: {
          value: 'Welcome to Sitecore JSS',
        },
        sampleImage: {
          value: {
            src: '/-/media/sc_logo.png',
            alt: 'Sitecore Logo',
          },
        },
        sampleNumber: {
          value: 1.21,
        },
        sampleLink: {
          value: {
            href: '/',
            id: '{54C8E9B5-0B2C-5363-8FA6-D32A3A302F51}',
            linktype: 'internal',
          },
        },
      };
      const expectedData = {
        _: {
          sampleText: 'Welcome to Sitecore JSS',
          sampleImage: {
            src: '/-/media/sc_logo.png',
            alt: 'Sitecore Logo',
          },
          sampleNumber: 1.21,
          sampleLink: {
            href: '/',
            id: '{54C8E9B5-0B2C-5363-8FA6-D32A3A302F51}',
            linktype: 'internal',
          },
        },
      };
      const wrapper = shallow(<FEaaSComponent params={requiredParams} fields={fields} />);
      expect(wrapper).to.have.length(1);
      expect(wrapper.html()).to.contain(
        `data="${JSON.stringify(expectedData).replace(/"/g, '&quot;')}"`
      );
    });

    it('should prefer override data over datasource fields', () => {
      const params: FEaaSComponentParams = {
        ...requiredParams,
        ComponentDataOverride: '{ "foo": "bar", "baz": 1 }',
      };
      const fields: ComponentFields = {
        sampleText: {
          value: 'Welcome to Sitecore JSS',
        },
      };
      const wrapper = shallow(<FEaaSComponent params={params} fields={fields} />);
      expect(wrapper).to.have.length(1);
      expect(wrapper.html()).to.contain(
        `data="${params.ComponentDataOverride!.replace(/"/g, '&quot;')}"`
      );
    });
  });
});

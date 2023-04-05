import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import sinon from 'sinon';
import {
  composeComponentEndpoint,
  FEaaSComponent,
  FEaaSComponentParams,
  FEaaSComponentProps,
  fetchFEaaSComponentProps,
} from './FEaaSComponent';
import { ComponentFields } from '@sitecore-jss/sitecore-jss/layout';

describe('<FEaaSComponent />', () => {
  const requiredParams: FEaaSComponentParams = {
    LibraryId: 'library123',
    ComponentId: 'component123',
    ComponentVersion: 'version123',
    ComponentRevision: 'staged',
    ComponentHostName: 'host123',
  };

  describe('composeComponentEndpoint', () => {
    it('should return endpoint with https when hostname from params is missing it', () => {
      const endpoint = composeComponentEndpoint(requiredParams);
      expect(endpoint.startsWith('https://')).to.equal(true);
    });
  });

  const endpoint = composeComponentEndpoint(requiredParams);

  it('should not render with props and params missing', () => {
    const wrapper = shallow(<FEaaSComponent template="" lastModified="" />);
    expect(wrapper).to.have.length(1);
    expect(wrapper.html()).to.equal(null);
  });

  it('should not render with props missing and only one param present', () => {
    const props = {
      template: '',
      lastModified: '',
      params: {
        ComponentHostName: 'host123',
      },
    };
    const wrapper = shallow(<FEaaSComponent {...props} />);
    expect(wrapper).to.have.length(1);
    expect(wrapper.html()).to.equal(null);
  });

  it('should render empty when only src is provided', () => {
    const wrapper = shallow(<FEaaSComponent src={endpoint} template="" lastModified="" />);
    expect(wrapper).to.have.length(1);
    expect(wrapper.html()).to.equal(
      '<feaas-component last-modified="" src="https://host123/components/library123/component123/version123/staged"></feaas-component>'
    );
  });

  it('should render with template and last-modified when provided', () => {
    const template = '<div>test output</div>';
    const lastModified = 'March 1 2020';
    const wrapper = shallow(<FEaaSComponent template={template} lastModified={lastModified} />);
    expect(wrapper).to.have.length(1);
    expect(wrapper.html()).to.equal(
      `<feaas-component last-modified="${lastModified}">${template}</feaas-component>`
    );
  });

  it('should render when only params are provided', () => {
    const props = {
      template: '',
      lastModified: '',
      params: requiredParams,
    };
    const wrapper = shallow(<FEaaSComponent {...props} />);
    expect(wrapper).to.have.length(1);
    expect(wrapper.html()).to.equal(
      '<feaas-component last-modified="" cdn="host123" library="library123" component="component123" revision="staged"></feaas-component>'
    );
  });

  describe('data', () => {
    it('should send override data', () => {
      const props: FEaaSComponentProps = {
        params: {
          ...requiredParams,
          ComponentDataOverride: '{ "foo": "bar", "baz": 1 }',
        },
        template: '',
        lastModified: '',
      };
      const wrapper = shallow(<FEaaSComponent {...props} />);
      expect(wrapper).to.have.length(1);
      expect(wrapper.html()).to.contain(
        `data="${props.params?.ComponentDataOverride!.replace(/"/g, '&quot;')}"`
      );
    });

    it('should send datasource fields', () => {
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
      const props: FEaaSComponentProps = {
        params: {
          ...requiredParams,
        },
        template: '',
        lastModified: '',
        fields,
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
      const wrapper = shallow(<FEaaSComponent {...props} />);
      expect(wrapper).to.have.length(1);
      expect(wrapper.html()).to.contain(
        `data="${JSON.stringify(expectedData).replace(/"/g, '&quot;')}"`
      );
    });

    it('should prefer override data over datasource fields', () => {
      const fields: ComponentFields = {
        sampleText: {
          value: 'Welcome to Sitecore JSS',
        },
      };
      const props: FEaaSComponentProps = {
        params: {
          ...requiredParams,
          ComponentDataOverride: '{ "foo": "bar", "baz": 1 }',
        },
        template: '',
        lastModified: '',
        fields,
      };

      const wrapper = shallow(<FEaaSComponent {...props} />);
      expect(wrapper).to.have.length(1);
      expect(wrapper.html()).to.contain(
        `data="${props.params?.ComponentDataOverride!.replace(/"/g, '&quot;')}"`
      );
    });
  });
});

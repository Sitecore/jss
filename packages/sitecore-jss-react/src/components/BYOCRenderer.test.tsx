/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { BYOCProps, BYOCRenderer } from './BYOCRenderer';
import { MissingComponent } from './MissingComponent';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import { afterEach } from 'node:test';
import { ComponentFields } from '@sitecore-jss/sitecore-jss/layout';

describe('<BYOCRenderer />', () => {
  const sandbox = sinon.createSandbox();

  type PropType = {
    text: string;
  };
  const ComponentWithProps = (props: PropType) => (
    <div className="byoc">I display this: {props.text || 'nothing'}</div>
  );

  afterEach(() => {
    sandbox.restore();
  });

  it('should render the registered component with provided props', () => {
    const registeredComponents = {
      RegisteredComponent: {
        name: 'RegisteredComponent',
        component: () => <div className="byoc">Registered Component</div>,
      },
    };
    sandbox.stub(FEAAS.External, 'registered').value(registeredComponents);
    const props: BYOCProps = {
      params: {
        ComponentName: 'RegisteredComponent',
      },
    };

    const wrapper = mount(<BYOCRenderer {...props} />);

    expect(wrapper.find('div.byoc').text()).to.equal('Registered Component');
  });

  it('should render missing component frame when component isnt registered', () => {
    sandbox.stub(FEAAS.External, 'registered').value({});
    const props = { params: { ComponentName: 'NonExistentComponent' } };

    const wrapper = mount(<BYOCRenderer {...props} />);

    expect(wrapper.find(MissingComponent)).to.have.lengthOf(1);
  });

  it('should use props from rendering params when present', () => {
    const registeredComponents = {
      RegisteredComponent: {
        name: 'RegisteredComponent',
        component: ComponentWithProps,
      },
    };
    sandbox.stub(FEAAS.External, 'registered').value(registeredComponents);
    const props: BYOCProps = {
      params: {
        ComponentName: 'RegisteredComponent',
        ComonentProps: JSON.stringify({ text: 'this is text' }),
      },
    };

    const wrapper = mount(<BYOCRenderer {...props} />);

    expect(wrapper.find('div.byoc').text()).to.contain('I display this');
    expect(wrapper.find('div.byoc').text()).to.contain('this is text');
  });

  it('should prioritize props from rendering params', () => {
    const registeredComponents = {
      RegisteredComponent: {
        name: 'RegisteredComponent',
        component: ComponentWithProps,
      },
    };
    const dataSourceFields: ComponentFields = {
      text: {
        value: 'this is data source text',
      },
    };
    sandbox.stub(FEAAS.External, 'registered').value(registeredComponents);
    const props: BYOCProps = {
      params: {
        ComponentName: 'RegisteredComponent',
        ComonentProps: JSON.stringify({ text: 'this is param text' }),
      },
      fields: dataSourceFields,
    };

    const wrapper = mount(<BYOCRenderer {...props} />);

    expect(wrapper.find('div.byoc').text()).to.contain('I display this');
    expect(wrapper.find('div.byoc').text()).to.contain('this is param text');
  });

  it('should use props from data source as fallback', () => {
    const registeredComponents = {
      RegisteredComponent: {
        name: 'RegisteredComponent',
        component: ComponentWithProps,
      },
    };
    const dataSourceFields: ComponentFields = {
      text: {
        value: 'this is data source text',
      },
    };
    sandbox.stub(FEAAS.External, 'registered').value(registeredComponents);
    const props: BYOCProps = {
      params: {
        ComponentName: 'RegisteredComponent',
        ComonentProps: '',
      },
      fields: dataSourceFields,
    };

    const wrapper = mount(<BYOCRenderer {...props} />);

    expect(wrapper.find('div.byoc').text()).to.contain('I display this');
    expect(wrapper.find('div.byoc').text()).to.contain('this is data source text');
  });

  it('should use props from data source if params have invalid JSON', () => {
    const registeredComponents = {
      RegisteredComponent: {
        name: 'RegisteredComponent',
        component: ComponentWithProps,
      },
    };
    const dataSourceFields: ComponentFields = {
      text: {
        value: 'this is data source text',
      },
    };
    sandbox.stub(FEAAS.External, 'registered').value(registeredComponents);
    const props: BYOCProps = {
      params: {
        ComponentName: 'RegisteredComponent',
        ComonentProps: 'this is not a JSON',
      },
      fields: dataSourceFields,
    };

    const wrapper = mount(<BYOCRenderer {...props} />);

    expect(wrapper.find('div.byoc').text()).to.contain('I display this');
    expect(wrapper.find('div.byoc').text()).to.contain('this is data source text');
  });
  it('should fallback to empty props when other sources fail', () => {
    const registeredComponents = {
      RegisteredComponent: {
        name: 'RegisteredComponent',
        component: ComponentWithProps,
      },
    };
    sandbox.stub(FEAAS.External, 'registered').value(registeredComponents);
    const props: BYOCProps = {
      params: {
        ComponentName: 'RegisteredComponent',
        ComonentProps: '',
      },
      fields: {},
    };

    const wrapper = mount(<BYOCRenderer {...props} />);

    expect(wrapper.find('div.byoc').text()).to.equal('I display this: nothing');
  });
});

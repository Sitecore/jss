/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { BYOCProps, BYOCRenderer } from './BYOCRenderer';
import { MissingComponent } from './MissingComponent';
import * as FEAAS from '@sitecore-feaas/clientside/react';

describe('<BYOCRenderer />', () => {
  // const ExternalComponent = () => {
  //   <div className="byoc">I was rendered, woo!</div>;
  // };

  // type TestProps = {
  //   message: string;
  // };

  // const ExternalWithPropsComponent = (props: TestProps) => {
  //   <div className="byoc">My message to you is {props.message}</div>;
  // };

  // const sandbox = sinon.createSandbox();

  // afterEach(() => {
  //   sandbox.restore();
  // });

  // it('should render component', () => {
  //   const components: Record<string, unknown> = {};
  //   components['ExternalComponent'] = { name: 'ExternalComponent', component: ExternalComponent };
  //   sandbox.stub(FEAAS.External, 'registered').value(components);
  //   const props: BYOCProps = {
  //     params: {
  //       ComponentName: 'ExternalComponent',
  //     },
  //   };
  //   const rendered = mount(<BYOCRenderer {...props} />);
  //   // const wrapper = shallow(<BYOCRenderer {...props} />);
  //   expect(rendered).to.have.length(1);
  //   expect(rendered.text()).to.contain('I was rendered, woo!');
  // });

  it('should render the registered component with provided props', () => {
    const registeredComponents = {
      RegisteredComponent: {
        name: 'RegisteredComponent',
        component: () => <div>Registered Component</div>,
      },
    };

    // Mocking the FEAAS.External.registered
    const registeredStub = sinon.stub(FEAAS.External, 'registered').value(registeredComponents);

    const props: BYOCProps = {
      params: {
        ComponentName: 'RegisteredComponent',
        ComonentProps: JSON.stringify({ text: 'Hello, World!' }),
      },
    };

    const wrapper = mount(<BYOCRenderer {...props} />);
    expect(wrapper.find('div').text()).to.equal('Registered Component');

    registeredStub.restore();
  });

  it('should render missing component frame when component isnt registered', () => {
    const registeredStub = sinon.stub(FEAAS.External, 'registered').value({});

    const props = { params: { ComponentName: 'NonExistentComponent' } };

    const wrapper = mount(<BYOCRenderer {...props} />);
    expect(wrapper.find(MissingComponent)).to.have.lengthOf(1);

    registeredStub.restore();
  });

  xit('should use props from rendering params when present', () => {});
  xit('should use props from data source as fallback', () => {});
  xit('should use props from data source if params have invalid JSON', () => {});
  xit('should fallback to empty props when other sources fail', () => {});
});

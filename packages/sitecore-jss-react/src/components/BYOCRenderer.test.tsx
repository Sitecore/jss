/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { BYOCProps, BYOCRenderer } from './BYOCRenderer';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import { afterEach } from 'node:test';

describe('<BYOCRenderer />', () => {
  const ExternalComponent = () => {
    <div className="byoc">I was rendered, woo!</div>;
  };

  type TestProps = {
    message: string;
  };

  const ExternalWithPropsComponent = (props: TestProps) => {
    <div className="byoc">My message to you is {props.message}</div>;
  };

  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it('should render component', () => {
    const components: Record<string, unknown> = {};
    components['ExternalComponent'] = { name: 'ExternalComponent', component: ExternalComponent };
    sandbox.stub(FEAAS.External, 'registered').value(components);
    const props: BYOCProps = {
      params: {
        ComponentName: 'ExternalComponent',
      },
    };
    const rendered = mount(<BYOCRenderer {...props} />);
    // const wrapper = shallow(<BYOCRenderer {...props} />);
    expect(rendered).to.have.length(1);
    expect(rendered.text()).to.contain('I was rendered, woo!');
  });

  xit('should render missing component frame when component isnt registered', () => {});
  xit('should use props from rendering params when present', () => {});
  xit('should use props from data source as fallback', () => {});
  xit('should use props from data source if params have invalid JSON', () => {});
  xit('should fallback to empty props when other sources fail', () => {});
});

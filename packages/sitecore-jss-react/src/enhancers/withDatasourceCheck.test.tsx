/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import { mount } from 'enzyme';

import {
  withDatasourceCheck,
  WithDatasourceCheckProps,
  DefaultEditingError,
} from '../enhancers/withDatasourceCheck';
import { SitecoreContextReactContext } from '../components/SitecoreContext';

use(spies);

const mockContext = (editing: boolean) => {
  return {
    context: { pageEditing: editing },
    setContext: spy(),
  };
};

describe('withDatasourceCheck', () => {
  const TestComponent: React.FC<WithDatasourceCheckProps> = (props: WithDatasourceCheckProps) => {
    return (
      <div>
        <h2>{props.rendering.componentName}</h2>
        <p>{props.rendering.dataSource}</p>
      </div>
    );
  };

  it('should return null if datasource missing in normal mode', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: undefined,
      },
    };

    const wrapper = mount(
      <SitecoreContextReactContext.Provider value={mockContext(false)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper).to.have.length(1);
    expect(wrapper.html()).to.be.null;
  });

  it('should return null if rendering missing in normal mode', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {} as any;

    const wrapper = mount(
      <SitecoreContextReactContext.Provider value={mockContext(false)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper).to.have.length(1);
    expect(wrapper.html()).to.be.null;
  });

  it('should return default error component if datasource missing in editing mode', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: undefined,
      },
    };

    const wrapper = mount(
      <SitecoreContextReactContext.Provider value={mockContext(true)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.find(DefaultEditingError)).to.have.length(1);
  });

  it('should return custom error component if specified', () => {
    const CustomEditingError = () => <div>Better than yours</div>;
    const TestComponentWithDatasourceCheck = withDatasourceCheck({
      editingErrorComponent: CustomEditingError,
    })(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: undefined,
      },
    };

    const wrapper = mount(
      <SitecoreContextReactContext.Provider value={mockContext(true)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.find(CustomEditingError)).to.have.length(1);
    expect(wrapper.html()).to.contain('Better than yours');
  });

  it('should return wrapped component if datasource present in normal mode', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: '{CACDB205-2386-4271-9F05-AE20AAC2A39E}',
      },
    };

    const wrapper = mount(
      <SitecoreContextReactContext.Provider value={mockContext(false)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.find(TestComponent)).to.have.length(1);
    expect(wrapper.html()).to.contain(props.rendering.componentName);
    expect(wrapper.html()).to.contain(props.rendering.dataSource);
  });

  it('should return wrapped component if datasource present in editing mode', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: '{CACDB205-2386-4271-9F05-AE20AAC2A39E}',
      },
    };

    const wrapper = mount(
      <SitecoreContextReactContext.Provider value={mockContext(true)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.find(TestComponent)).to.have.length(1);
    expect(wrapper.html()).to.contain(props.rendering.componentName);
    expect(wrapper.html()).to.contain(props.rendering.dataSource);
  });

  it('should return wrapped component if not within SitecoreContext', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: '{CACDB205-2386-4271-9F05-AE20AAC2A39E}',
      },
    };

    const wrapper = mount(<TestComponentWithDatasourceCheck {...props} />);

    expect(wrapper.find(TestComponent)).to.have.length(1);
    expect(wrapper.html()).to.contain(props.rendering.componentName);
    expect(wrapper.html()).to.contain(props.rendering.dataSource);
  });
});

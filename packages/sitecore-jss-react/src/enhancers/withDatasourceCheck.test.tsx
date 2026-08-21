/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import { spy } from 'sinon';

import { withDatasourceCheck, WithDatasourceCheckProps } from '../enhancers/withDatasourceCheck';
import { SitecoreContextReactContext } from '../components/SitecoreContext';

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
        dataSource: '',
      },
    };

    const wrapper = render(
      <SitecoreContextReactContext.Provider value={mockContext(false)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.container.innerHTML).to.be.empty;
  });

  it('should return null if rendering missing in normal mode', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {} as WithDatasourceCheckProps;

    const wrapper = render(
      <SitecoreContextReactContext.Provider value={mockContext(false)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.container.innerHTML).to.be.empty;
  });

  it('should return default error component if datasource missing in editing mode', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: '',
      },
    };

    const wrapper = render(
      <SitecoreContextReactContext.Provider value={mockContext(true)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.container.querySelectorAll('div.sc-jss-editing-error')).to.have.length(1);
  });

  it('should return custom error component if specified', () => {
    const CustomEditingError = () => <div>Better than yours</div>;
    const TestComponentWithDatasourceCheck = withDatasourceCheck({
      editingErrorComponent: CustomEditingError,
    })(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: '',
      },
    };

    const wrapper = render(
      <SitecoreContextReactContext.Provider value={mockContext(true)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.container.innerHTML).to.contain('Better than yours');
  });

  it('should return wrapped component if datasource present in normal mode', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: '{CACDB205-2386-4271-9F05-AE20AAC2A39E}',
      },
    };

    const wrapper = render(
      <SitecoreContextReactContext.Provider value={mockContext(false)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.container.innerHTML).to.contain(props.rendering.componentName);
    expect(wrapper.container.innerHTML).to.contain(props.rendering.dataSource);
  });

  it('should return wrapped component if datasource present in editing mode', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: '{CACDB205-2386-4271-9F05-AE20AAC2A39E}',
      },
    };

    const wrapper = render(
      <SitecoreContextReactContext.Provider value={mockContext(true)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.container.innerHTML).to.contain(props.rendering.componentName);
    expect(wrapper.container.innerHTML).to.contain(props.rendering.dataSource);
  });

  it('should return wrapped component if not within SitecoreContext', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: '{CACDB205-2386-4271-9F05-AE20AAC2A39E}',
      },
    };

    const wrapper = render(<TestComponentWithDatasourceCheck {...props} />);

    expect(wrapper.container.innerHTML).to.contain(props.rendering.componentName);
    expect(wrapper.container.innerHTML).to.contain(props.rendering.dataSource);
  });

  it('should return null if no datasource is configured on the rendering', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
      },
    };

    const wrapper = render(
      <SitecoreContextReactContext.Provider value={mockContext(false)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.container.innerHTML).to.be.empty;
  });

  it('should return wrapped component when isContentResolved is true', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: '{CACDB205-2386-4271-9F05-AE20AAC2A39E}',
        isContentResolved: true,
      },
    };

    const wrapper = render(
      <SitecoreContextReactContext.Provider value={mockContext(false)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.container.innerHTML).to.contain(props.rendering.componentName);
    expect(wrapper.container.innerHTML).to.contain(props.rendering.dataSource);
  });

  it('should return wrapped component when isContentResolved is true in editing mode', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: '{CACDB205-2386-4271-9F05-AE20AAC2A39E}',
        isContentResolved: true,
      },
    };

    const wrapper = render(
      <SitecoreContextReactContext.Provider value={mockContext(true)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.container.innerHTML).to.contain(props.rendering.componentName);
    expect(wrapper.container.innerHTML).to.contain(props.rendering.dataSource);
  });

  it('should return null when isContentResolved is false in normal mode', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: '{CACDB205-2386-4271-9F05-AE20AAC2A39E}',
        isContentResolved: false,
      },
    };

    const wrapper = render(
      <SitecoreContextReactContext.Provider value={mockContext(false)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.container.innerHTML).to.be.empty;
  });

  it('should return default error component when isContentResolved is false in editing mode', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: '{CACDB205-2386-4271-9F05-AE20AAC2A39E}',
        isContentResolved: false,
      },
    };

    const wrapper = render(
      <SitecoreContextReactContext.Provider value={mockContext(true)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.container.querySelectorAll('div.sc-jss-editing-error')).to.have.length(1);
  });

  it('should not render when the datasource item was deleted and isContentResolved is false', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: '{DELETED-DATASOURCE-ID}',
        isContentResolved: false,
      },
    };

    const wrapper = render(
      <SitecoreContextReactContext.Provider value={mockContext(false)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.container.innerHTML).to.be.empty;
  });

  it('should not render when the datasource item was archived and isContentResolved is false', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: '{ARCHIVED-DATASOURCE-ID}',
        isContentResolved: false,
      },
    };

    const wrapper = render(
      <SitecoreContextReactContext.Provider value={mockContext(false)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.container.innerHTML).to.be.empty;
  });

  it('should preserve existing missing-datasource behavior when isContentResolved is true', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const props = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: '',
        isContentResolved: true,
      },
    };

    const wrapper = render(
      <SitecoreContextReactContext.Provider value={mockContext(false)}>
        <TestComponentWithDatasourceCheck {...props} />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.container.innerHTML).to.be.empty;
  });

  it('should preserve existing behavior when isContentResolved is absent', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const propsWithDatasource = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: '{CACDB205-2386-4271-9F05-AE20AAC2A39E}',
      },
    };
    const propsWithoutDatasource = {
      rendering: {
        componentName: 'TestComponent',
        dataSource: '',
      },
    };

    const rendered = render(
      <SitecoreContextReactContext.Provider value={mockContext(false)}>
        <TestComponentWithDatasourceCheck {...propsWithDatasource} />
      </SitecoreContextReactContext.Provider>
    );
    const hidden = render(
      <SitecoreContextReactContext.Provider value={mockContext(false)}>
        <TestComponentWithDatasourceCheck {...propsWithoutDatasource} />
      </SitecoreContextReactContext.Provider>
    );

    expect(rendered.container.innerHTML).to.contain(propsWithDatasource.rendering.componentName);
    expect(hidden.container.innerHTML).to.be.empty;
  });

  it('should evaluate nested placeholder renderings independently', () => {
    const TestComponentWithDatasourceCheck = withDatasourceCheck()(TestComponent);
    const nestedChild = {
      componentName: 'ChildComponent',
      dataSource: '{CHILD-DATASOURCE-ID}',
      isContentResolved: false,
    };
    const parentRendering = {
      componentName: 'ParentComponent',
      dataSource: '{PARENT-DATASOURCE-ID}',
      isContentResolved: true,
      placeholders: {
        nested: [nestedChild],
      },
    };

    const parentWrapper = render(
      <SitecoreContextReactContext.Provider value={mockContext(false)}>
        <TestComponentWithDatasourceCheck rendering={parentRendering} />
      </SitecoreContextReactContext.Provider>
    );
    const childWrapper = render(
      <SitecoreContextReactContext.Provider value={mockContext(false)}>
        <TestComponentWithDatasourceCheck rendering={nestedChild} />
      </SitecoreContextReactContext.Provider>
    );

    expect(parentWrapper.container.innerHTML).to.contain(parentRendering.componentName);
    expect(childWrapper.container.innerHTML).to.be.empty;
  });
});

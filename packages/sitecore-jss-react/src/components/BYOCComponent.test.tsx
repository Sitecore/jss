import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import { BYOCComponent } from './BYOCComponent';
import { MissingComponent, MissingComponentProps } from './MissingComponent';

describe('BYOCComponent', () => {
  it('should render with props when ComponentProps is provided', () => {
    const mockProps = {
      params: {
        ComponentName: 'Foo',
        ComponentProps: JSON.stringify({ prop1: 'value1' }),
      },
      fetchedData: {},
    };
    const Foo = () => <p id="foo-content">Test</p>;
    FEAAS.External.registerComponent(Foo, {
      name: 'Foo',
      properties: {
        prop1: {
          type: 'string',
        },
      },
    });
    const wrapper = mount(<BYOCComponent {...mockProps} />);
    const fooComponent = wrapper.find('feaas-external');
    expect(fooComponent).to.have.lengthOf(1);
    expect(fooComponent.prop('prop1')).to.equal('value1');
    expect(fooComponent.prop('data-external-id')).to.equal('Foo');
    expect(fooComponent.find('#foo-content')).to.have.length(1);
  });

  it('should use datasource fields when provided', () => {
    const fields = {
      prop1: {
        value: 'value2',
      },
    };
    const mockProps = {
      params: {
        ComponentName: 'Foo',
      },
      fetchedData: {},
      fields,
    };
    const Foo = () => <p id="foo-content">Test</p>;
    FEAAS.External.registerComponent(Foo, {
      name: 'Foo',
      properties: {
        prop1: {
          type: 'string',
        },
      },
    });
    const wrapper = mount(<BYOCComponent {...mockProps} />);
    const fooComponent = wrapper.find('feaas-external');
    expect(fooComponent).to.have.lengthOf(1);
    expect(fooComponent.prop('prop1')).to.equal('value2');
    expect(fooComponent.prop('data-external-id')).to.equal('Foo');
    expect(fooComponent.find('#foo-content')).to.have.length(1);
  });

  it('should prefer ComponentProps over datasource fields', () => {
    const fields = {
      prop1: {
        value: 'value2',
      },
    };
    const mockProps = {
      params: {
        ComponentName: 'Foo',
        ComponentProps: JSON.stringify({ prop1: 'value1' }),
      },
      fetchedData: {},
      fields,
    };
    const Foo = () => <p id="foo-content">Test</p>;
    FEAAS.External.registerComponent(Foo, {
      name: 'Foo',
      properties: {
        prop1: {
          type: 'string',
        },
      },
    });
    const wrapper = mount(<BYOCComponent {...mockProps} />);
    const fooComponent = wrapper.find('feaas-external');
    expect(fooComponent).to.have.lengthOf(1);
    expect(fooComponent.prop('prop1')).to.equal('value1');
    expect(fooComponent.prop('data-external-id')).to.equal('Foo');
    expect(fooComponent.find('#foo-content')).to.have.length(1);
  });

  it('should combine ComponentProps and datasource fields', () => {
    const fields = {
      prop2: {
        value: 'value2',
      },
    };
    const mockProps = {
      params: {
        ComponentName: 'Foo',
        ComponentProps: JSON.stringify({ prop1: 'value1' }),
      },
      fetchedData: {},
      fields,
    };
    const Foo = () => <p id="foo-content">Test</p>;
    FEAAS.External.registerComponent(Foo, {
      name: 'Foo',
      properties: {
        prop1: {
          type: 'string',
        },
      },
    });
    const wrapper = mount(<BYOCComponent {...mockProps} />);
    const fooComponent = wrapper.find('feaas-external');
    expect(fooComponent).to.have.lengthOf(1);
    expect(fooComponent.prop('prop1')).to.equal('value1');
    expect(fooComponent.prop('prop2')).to.equal('value2');
    expect(fooComponent.prop('data-external-id')).to.equal('Foo');
    expect(fooComponent.find('#foo-content')).to.have.length(1);
  });

  it('should render with static and fetched props when props are prefetched', () => {
    const fetchedData = {
      prop2: 'prefetched_value1',
    };
    const mockProps = {
      params: {
        ComponentName: 'Foo',
        ComponentProps: JSON.stringify({ prop1: 'value1' }),
      },
      fetchedData,
    };
    const Foo = () => <p id="foo-content">Test</p>;
    FEAAS.External.registerComponent(Foo, {
      name: 'Foo',
      properties: {
        prop1: {
          type: 'string',
        },
        prop2: {
          type: 'string',
        },
      },
    });
    const wrapper = mount(<BYOCComponent {...mockProps} />);
    const fooComponent = wrapper.find('feaas-external');
    expect(fooComponent).to.have.lengthOf(1);
    expect(fooComponent.prop('prop1')).to.equal('value1');
    expect(fooComponent.prop('datasources')).to.equal('{"prop2":"prefetched_value1","_":{}}');
    expect(fooComponent.prop('data-external-id')).to.equal('Foo');
    expect(fooComponent.find('#foo-content')).to.have.length(1);
  });

  it('should render with props when ComponentProps are provided but fetchedData is not present', () => {
    const mockProps = {
      params: {
        ComponentName: 'Foo',
        ComponentProps: JSON.stringify({ prop1: 'value1' }),
      },
    };
    const Foo = () => <p id="foo-content">Test</p>;
    FEAAS.External.registerComponent(Foo, {
      name: 'Foo',
      properties: {
        prop1: {
          type: 'string',
        },
      },
    });
    const wrapper = mount(<BYOCComponent {...mockProps} />);
    const fooComponent = wrapper.find('feaas-external');
    expect(fooComponent).to.have.lengthOf(1);
    expect(fooComponent.prop('prop1')).to.equal('value1');
    expect(fooComponent.prop('data-external-id')).to.equal('Foo');
    expect(fooComponent.find('#foo-content')).to.have.length(1);
  });
});

describe('Error handling', () => {
  it('should render DefaultErrorComponent when invalid JSON', () => {
    const props = {
      params: {
        ComponentName: 'ExampleComponent',
        ComponentProps: 'invalid-json',
      },
      fetchedData: {},
    };
    const wrapper = mount(<BYOCComponent {...props} />);
    const errorComponent = wrapper.find('DefaultErrorComponent');
    expect(errorComponent).to.have.lengthOf(1);
  });

  it('should render custom error component when provided, when underlying component throws', () => {
    const customErrorComponent = (props) => <div>custom error: {props?.error?.message}</div>;
    const props = {
      errorComponent: customErrorComponent,
      params: {
        ComponentName: 'ExampleComponent',
        ComponentProps: 'invalid-json',
      },
      fetchedData: {},
    };

    const wrapper = mount(<BYOCComponent {...props} />);

    expect(wrapper.find('div').text()).to.contain('custom error:');
  });

  it('renders MissingComponent when no ComponentName is provided', () => {
    const props = {
      params: {
        ComponentName: '',
        ComponentDataOverride: JSON.stringify({ text: 'this is a BYOC component' }),
      },
    };
    const wrapper = mount(<BYOCComponent {...props} />);
    const missingComponent = wrapper.find('MissingComponent');

    expect(missingComponent).to.have.lengthOf(1);
    expect(wrapper.find('p').text()).to.contain(
      'BYOC: The ComponentName for this rendering is missing'
    );
  });

  it('should render custom missing component when provided, when component name is not provided', () => {
    const missingComponent = (props: MissingComponentProps) => (
      <div>
        Custom missive for {props.rendering?.componentName}: {props.errorOverride}
      </div>
    );

    const props = {
      missingComponentComponent: missingComponent,
      params: { ComponentName: '' },
    };

    const wrapper = mount(<BYOCComponent {...props} />);

    expect(wrapper.find('div').text()).to.contain('Custom missive');
    expect(wrapper.find('div').text()).to.contain(
      'The ComponentName for this rendering is missing'
    );
  });

  // Disabling these two tests until we have AppRouter and can switch back from clientFallback to fallback
  // Components does some workarounds to support client BYOC and client fallback without error frame flickering during component load
  // This results in fallback frame being rendered post-hydration, and not being findable in test context.
  xit('should render missing component frame when component is not registered', () => {
    const props = {
      params: { ComponentName: 'NonExistentComponent' },
      components: {},
      fetchedData: {},
    };

    const wrapper = mount(<BYOCComponent {...props} />);

    expect(wrapper.find(MissingComponent)).to.have.lengthOf(1);
    expect(wrapper.find('div p').text()).to.contain('This component was not registered');
  });

  xit('should render custom missing component when provided, when component is not registered', () => {
    const missingComponent = (props: MissingComponentProps) => (
      <div>
        Custom missive for {props.rendering?.componentName}: {props.errorOverride}
      </div>
    );

    const props = {
      missingComponentComponent: missingComponent,
      params: { ComponentName: 'NonExistentComponent' },
      components: {},
      fetchedData: {},
    };
    const wrapper = mount(<BYOCComponent {...props} />);

    expect(wrapper.find('div').text()).to.contain('Custom missive for NonExistentComponent');
    expect(wrapper.find('div').text()).to.contain('This component was not registered');
  });
});

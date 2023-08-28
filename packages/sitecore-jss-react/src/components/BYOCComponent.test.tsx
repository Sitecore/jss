import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { BYOCComponent } from './BYOCComponent';
import { MissingComponent, MissingComponentProps } from './MissingComponent';

describe('BYOCComponent', () => {
  it('should render ExternalComponent with props when ComponentProps is provided', () => {
    const mockProps = {
      params: {
        ComponentName: 'ExternalComponent',
        ComponentProps: JSON.stringify({ prop1: 'value1' }),
      },
    };
    const wrapper = mount(<BYOCComponent {...mockProps} />);
    const externalComponent = wrapper.find('Se');
    expect(externalComponent).to.have.lengthOf(1);
    expect(externalComponent.prop('componentName')).to.equal('ExternalComponent');
    expect(externalComponent.prop('prop1')).to.equal('value1');
  });
});

describe('Error handling', () => {
  it('should render DefaultErrorComponent when invalid JSON', () => {
    const props = {
      params: {
        ComponentName: 'ExampleComponent',
        ComponentProps: 'invalid-json',
      },
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
    };

    const wrapper = mount(<BYOCComponent {...props} />);

    expect(wrapper.find('div').text()).to.contain('custom error:');
  });

  it('renders MissingComponent when no ComponentName is provided', () => {
    const props = {
      params: {
        ComponentName: '',
        ComponentProps: JSON.stringify({ text: 'this is a BYOC component' }),
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

  it('should render missing component frame when component is not registered', () => {
    const props = { params: { ComponentName: 'NonExistentComponent' }, components: {} };

    const wrapper = mount(<BYOCComponent {...props} />);

    expect(wrapper.find(MissingComponent)).to.have.lengthOf(1);
    expect(wrapper.find('div p').text()).to.contain('This component was not registered');
  });

  it('should render custom missing component when provided, when component is not registered', () => {
    const missingComponent = (props: MissingComponentProps) => (
      <div>
        Custom missive for {props.rendering?.componentName}: {props.errorOverride}
      </div>
    );

    const props = {
      missingComponentComponent: missingComponent,
      params: { ComponentName: 'NonExistentComponent' },
      components: {},
    };
    const wrapper = mount(<BYOCComponent {...props} />);

    expect(wrapper.find('div').text()).to.contain('Custom missive for NonExistentComponent');
    expect(wrapper.find('div').text()).to.contain('This component was not registered');
  });
});

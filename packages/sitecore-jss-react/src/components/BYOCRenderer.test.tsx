import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { BYOCRenderer } from './BYOCRenderer';
import { MissingComponent, MissingComponentProps } from './MissingComponent';
import { ComponentFields } from '@sitecore-jss/sitecore-jss/layout';

describe('<BYOCRenderer />', () => {
  type PropType = {
    text: string;
  };

  const ComponentWithProps = (props: PropType) => (
    <div className="byoc">I display this: {props.text || 'nothing'}</div>
  );

  const ThrowingComponent = () => {
    throw Error('error thrown');
  };

  const getBaseByocProps = (
    registeredComponent: React.ComponentType<any>,
    componentProps?: string,
    fields?: ComponentFields
  ) => {
    const registeredComponents = {
      RegisteredComponent: {
        name: 'RegisteredComponent',
        component: registeredComponent,
      },
      ThrowingComponent: {
        name: 'ThrowingComponent',
        component: ThrowingComponent,
      },
    };

    return {
      params: {
        ComponentName: 'RegisteredComponent',
        ComponentProps: componentProps,
      },
      fields: fields,
      components: registeredComponents,
    };
  };

  it('should render the registered component with provided props', () => {
    const noPropComponent = () => <div className="byoc">Registered Component</div>;
    const props = getBaseByocProps(noPropComponent);

    const wrapper = mount(<BYOCRenderer {...props} />);

    expect(wrapper.find('div.byoc').text()).to.equal('Registered Component');
  });

  it('should use props from rendering params when present', () => {
    const props = getBaseByocProps(ComponentWithProps, JSON.stringify({ text: 'this is text' }));

    const wrapper = mount(<BYOCRenderer {...props} />);

    expect(wrapper.find('div.byoc').text()).to.contain('I display this');
    expect(wrapper.find('div.byoc').text()).to.contain('this is text');
  });

  it('should prioritize props from rendering params', () => {
    const dataSourceFields: ComponentFields = {
      text: {
        value: 'this is data source text',
      },
    };

    const props = getBaseByocProps(
      ComponentWithProps,
      JSON.stringify({ text: 'this is param text' }),
      dataSourceFields
    );

    const wrapper = mount(<BYOCRenderer {...props} />);

    expect(wrapper.find('div.byoc').text()).to.contain('I display this');
    expect(wrapper.find('div.byoc').text()).to.contain('this is param text');
  });

  it('should use props from data source as fallback', () => {
    const dataSourceFields: ComponentFields = {
      text: {
        value: 'this is data source text',
      },
    };
    const props = getBaseByocProps(ComponentWithProps, '', dataSourceFields);

    const wrapper = mount(<BYOCRenderer {...props} />);

    expect(wrapper.find('div.byoc').text()).to.contain('I display this');
    expect(wrapper.find('div.byoc').text()).to.contain('this is data source text');
  });

  it('should fallback to empty props when other sources fail', () => {
    const props = getBaseByocProps(ComponentWithProps, '', {});

    const wrapper = mount(<BYOCRenderer {...props} />);

    expect(wrapper.find('div.byoc').text()).to.equal('I display this: nothing');
  });

  describe('error handling', () => {
    it('should render error if params have invalid JSON', () => {
      const dataSourceFields: ComponentFields = {
        text: {
          value: 'this is data source text',
        },
      };
      const props = getBaseByocProps(ComponentWithProps, 'this is not a JSON', dataSourceFields);

      const wrapper = mount(<BYOCRenderer {...props} />);

      expect(wrapper.find('div').text()).to.contain('A rendering error occurred:');
      expect(wrapper.find('div').text()).to.contain('Unexpected token');
    });

    it('should render custom error component when provided, when params have invalid JSON', () => {
      const dataSourceFields: ComponentFields = {
        text: {
          value: 'this is data source text',
        },
      };
      const customErrorComponent = () => <div>custom error</div>;
      const props = {
        errorComponent: customErrorComponent,
        ...getBaseByocProps(ComponentWithProps, 'this is not a JSON', dataSourceFields),
      };

      const wrapper = mount(<BYOCRenderer {...props} />);

      expect(wrapper.find('div').text()).to.contain('custom error');
    });

    it('should render error if underlying component throws', () => {
      const props = {
        ...getBaseByocProps(ComponentWithProps),
        params: {
          ComponentName: 'ThrowingComponent',
        },
      };

      const wrapper = mount(<BYOCRenderer {...props} />);

      expect(wrapper.find('div').text()).to.contain('A rendering error occurred: error thrown');
    });

    it('should render custom error component when provided, when underlying component throws', () => {
      const customErrorComponent = (props) => <div>custom error: {props?.error?.message}</div>;
      const props = {
        ...getBaseByocProps(ComponentWithProps),
        errorComponent: customErrorComponent,
        params: {
          ComponentName: 'ThrowingComponent',
        },
      };

      const wrapper = mount(<BYOCRenderer {...props} />);

      expect(wrapper.find('div').text()).to.contain('custom error: error thrown');
    });

    it('should render missing component frame when component isnt registered', () => {
      const props = { params: { ComponentName: 'NonExistentComponent' }, components: {} };

      const wrapper = mount(<BYOCRenderer {...props} />);

      expect(wrapper.find(MissingComponent)).to.have.lengthOf(1);
      expect(wrapper.find('div p').text()).to.contain('This component was not registered');
    });

    it('should render custom missing component when provided, when component isnt registered', () => {
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
      const wrapper = mount(<BYOCRenderer {...props} />);

      expect(wrapper.find('div').text()).to.contain('Custom missive for NonExistentComponent');
      expect(wrapper.find('div').text()).to.contain('This component was not registered');
    });

    it('should render missing component frame when component name is not provided', () => {
      const props = { params: { ComponentName: '' }, components: {} };

      const wrapper = mount(<BYOCRenderer {...props} />);

      expect(wrapper.find(MissingComponent)).to.have.lengthOf(1);
      expect(wrapper.find('div p').text()).to.contain(
        'The ComponentName for this rendering is missing'
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
        components: {},
      };

      const wrapper = mount(<BYOCRenderer {...props} />);

      expect(wrapper.find('div').text()).to.contain('Custom missive');
      expect(wrapper.find('div').text()).to.contain(
        'The ComponentName for this rendering is missing'
      );
    });
  });
});

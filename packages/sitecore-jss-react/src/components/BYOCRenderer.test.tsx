import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { BYOCRenderer } from './BYOCRenderer';
import { MissingComponent } from './MissingComponent';
import { ComponentFields } from '@sitecore-jss/sitecore-jss/layout';

describe('<BYOCRenderer />', () => {
  type PropType = {
    text: string;
  };

  const ComponentWithProps = (props: PropType) => (
    <div className="byoc">I display this: {props.text || 'nothing'}</div>
  );

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

  it('should render missing component frame when component isnt registered', () => {
    const props = { params: { ComponentName: 'NonExistentComponent' }, components: {} };

    const wrapper = mount(<BYOCRenderer {...props} />);

    expect(wrapper.find(MissingComponent)).to.have.lengthOf(1);
    expect(wrapper.find('div p').text()).to.contain('This component was not registered');
  });

  it('should render missing component frame when component name is not provided', () => {
    const props = { params: { ComponentName: '' }, components: {} };

    const wrapper = mount(<BYOCRenderer {...props} />);

    expect(wrapper.find(MissingComponent)).to.have.lengthOf(1);
    expect(wrapper.find('div p').text()).to.contain(
      'The ComponentName for this rendering is missing'
    );
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

  it('should use props from data source if params have invalid JSON', () => {
    const dataSourceFields: ComponentFields = {
      text: {
        value: 'this is data source text',
      },
    };
    const props = getBaseByocProps(ComponentWithProps, 'this is not a JSON', dataSourceFields);

    const wrapper = mount(<BYOCRenderer {...props} />);

    expect(wrapper.find('div.byoc').text()).to.contain('I display this');
    expect(wrapper.find('div.byoc').text()).to.contain('this is data source text');
  });

  it('should fallback to empty props when other sources fail', () => {
    const props = getBaseByocProps(ComponentWithProps, '', {});

    const wrapper = mount(<BYOCRenderer {...props} />);

    expect(wrapper.find('div.byoc').text()).to.equal('I display this: nothing');
  });
});

import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import { BYOCComponent } from './BYOCComponent';
import { MissingComponentProps } from './MissingComponent';

describe('BYOCComponent', () => {
  it('should render with props when ComponentProps is provided', () => {
    const mockProps = {
      rendering: {
        uid: '1111-2222-3333-4444',
        componentName: 'BYOCWrapper',
      },
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
    const { container } = render(<BYOCComponent {...mockProps} />);
    const fooComponent = container.querySelectorAll('feaas-external');
    expect(fooComponent).to.not.be.null;
    expect(container.querySelectorAll('feaas-external')).to.have.lengthOf(1);
    expect(fooComponent[0]?.getAttribute('prop1')).to.equal('value1');
    expect(fooComponent[0]?.getAttribute('data-external-id')).to.equal('Foo');
    expect(fooComponent[0]?.querySelectorAll('#foo-content')).to.have.length(1);
    expect(fooComponent[0]?.getAttribute('uid')).to.equal('1111-2222-3333-4444');
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
    const { container } = render(<BYOCComponent {...mockProps} />);
    const fooComponent = container.querySelectorAll('feaas-external');
    expect(container.querySelectorAll('feaas-external')).to.have.lengthOf(1);
    expect(fooComponent[0].getAttribute('prop1')).to.equal('value2');
    expect(fooComponent[0].getAttribute('data-external-id')).to.equal('Foo');
    expect(fooComponent[0].querySelectorAll('#foo-content')).to.have.length(1);
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
    const { container } = render(<BYOCComponent {...mockProps} />);
    expect(container.querySelectorAll('feaas-external')).to.have.lengthOf(1);
    const fooComponent = container.querySelector('feaas-external');
    expect(fooComponent?.getAttribute('prop1')).to.equal('value1');
    expect(fooComponent?.getAttribute('data-external-id')).to.equal('Foo');
    expect(fooComponent?.querySelectorAll('#foo-content')).to.have.length(1);
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
    const { container } = render(<BYOCComponent {...mockProps} />);
    const fooComponent = container.querySelector('feaas-external');
    expect(container.querySelectorAll('feaas-external')).to.have.lengthOf(1);
    expect(fooComponent?.getAttribute('prop1')).to.equal('value1');
    expect(fooComponent?.getAttribute('prop2')).to.equal('value2');
    expect(fooComponent?.getAttribute('data-external-id')).to.equal('Foo');
    expect(fooComponent?.querySelectorAll('#foo-content')).to.have.length(1);
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
    const { container } = render(<BYOCComponent {...mockProps} />);
    const fooComponent = container.querySelector('feaas-external');
    expect(container.querySelectorAll('feaas-external')).to.have.lengthOf(1);
    expect(fooComponent?.getAttribute('prop1')).to.equal('value1');
    expect(fooComponent?.getAttribute('datasources')).to.equal(
      '{"prop2":"prefetched_value1","_":{}}'
    );
    expect(fooComponent?.getAttribute('data-external-id')).to.equal('Foo');
    expect(fooComponent?.querySelectorAll('#foo-content')).to.have.length(1);
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
    const { container } = render(<BYOCComponent {...mockProps} />);
    const fooComponent = container.querySelector('feaas-external');
    expect(container.querySelectorAll('feaas-external')).to.have.lengthOf(1);
    expect(fooComponent?.getAttribute('prop1')).to.equal('value1');
    expect(fooComponent?.getAttribute('data-external-id')).to.equal('Foo');
    expect(fooComponent?.querySelectorAll('#foo-content')).to.have.length(1);
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
    const wrapper = render(<BYOCComponent {...props} />, { container: document.body });

    expect(wrapper.baseElement.innerHTML).to.equal(
      '<div>A rendering error occurred: Unexpected token \'i\', "invalid-json" is not valid JSON.</div>'
    );
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

    const wrapper = render(<BYOCComponent {...props} />);
    expect(wrapper.queryAllByText('custom error:', { exact: false }).length).to.equal(1);
  });

  it('renders MissingComponent when no ComponentName is provided', () => {
    const props = {
      params: {
        ComponentName: '',
        ComponentDataOverride: JSON.stringify({ text: 'this is a BYOC component' }),
      },
    };
    const wrapper = render(<BYOCComponent {...props} />, { container: document.body });
    const text = wrapper.baseElement.textContent;

    expect(text).to.contain('Unnamed Component');
    expect(text).to.contain('BYOC: The ComponentName for this rendering is missing');
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

    const wrapper = render(<BYOCComponent {...props} />, { container: document.body });
    expect(wrapper.baseElement.innerHTML).to.equal(
      '<div>Custom missive for : BYOC: The ComponentName for this rendering is missing</div>'
    );
  });

  // Disabling these two tests until we have AppRouter and can switch back from clientFallback to fallback
  // Components does some workarounds to support client BYOC and client fallback without error frame flickering during component load
  // This results in fallback frame being rendered post-hydration, and not being findable in test context.
  xit('should render missing component frame when component is not registered', async () => {
    const props = {
      params: { ComponentName: 'NonExistentComponent' },
      components: {},
      fetchedData: {},
    };

    const wrapper = render(<BYOCComponent {...props} />);

    expect(wrapper.queryAllByText('This component was not registered').length).to.equal(1);
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
    const wrapper = render(<BYOCComponent {...props} />);
    const text = wrapper.container.querySelector('div')?.innerText;

    expect(text).to.contain('Custom missive for NonExistentComponent');
    expect(text).to.contain('This component was not registered');
  });
});

import React from 'react';
import { ComponentFactory } from './sharedTypes';
import { expect } from 'chai';
import { SitecoreContext, SitecoreContextFactory, SitecoreContextReactContext } from './SitecoreContext';
import { withSitecoreContext } from '../enhancers/withSitecoreContext';
import { create } from 'react-test-renderer';

describe('SitecoreContext', () => {

  const arrayOfComponents: React.Component[] = [];
  const mockComponentFactory: ComponentFactory = (name: string) => arrayOfComponents[name as any];
  const singleton = new SitecoreContextFactory();

  it('should support hooks API', () => {
    const TestNestedComponent: React.FC<any> = (props: any) => {
      const sitecoreContext = React.useContext(SitecoreContextReactContext);

      return <div>
        <span id="prop">{props.customProp}</span>
        <span id="context">{sitecoreContext.text}</span>
      </div>
    };

    singleton.context = { text: 'value2' };

    const wrappedComponent = create(
      <SitecoreContext componentFactory={mockComponentFactory} contextFactory={singleton}>
        <TestNestedComponent customProp="value1" />
      </SitecoreContext>
    ).root;

    expect(wrappedComponent.findByProps({id: 'prop'}).children).to.eqls(['value1']);
    expect(wrappedComponent.findByProps({id: 'context'}).children).to.eqls(['value2']);
  });

  it('should support HOC API', () => {
    const TestNestedComponent: React.FC<any> = (props: any) => (
      <div>
        <span id="prop">{props.customProp}</span>
        <span id="context">{props.sitecoreContext.text}</span>
      </div>
    );
    const TestNestedComponentWithContext: React.FC<any> = withSitecoreContext()(TestNestedComponent);

    singleton.context = { text: 'value2' };

    const wrappedComponent = create(
      <SitecoreContext componentFactory={mockComponentFactory} contextFactory={singleton}>
        <TestNestedComponentWithContext customProp="value1" />
      </SitecoreContext>
    ).root;

    expect(wrappedComponent.findByProps({id: 'prop'}).children).to.eqls(['value1']);
    expect(wrappedComponent.findByProps({id: 'context'}).children).to.eqls(['value2']);
  });

  it('should support .contextType API', () => {
    class TestNestedComponent extends React.Component<{customProp: any}, {}> {
      static contextType = SitecoreContextReactContext;
      context!: React.ContextType<typeof SitecoreContextReactContext>;
      render() {
        return <div>
          <span id="prop">{this.props.customProp}</span>
          <span id="context">{this.context.text}</span>
        </div>
      }
    }

    singleton.context = { text: 'value2' };

    const wrappedComponent = create(
      <SitecoreContext componentFactory={mockComponentFactory} contextFactory={singleton}>
        <TestNestedComponent customProp="value1" />
      </SitecoreContext>
    ).root;

    expect(wrappedComponent.findByProps({id: 'prop'}).children).to.eqls(['value1']);
    expect(wrappedComponent.findByProps({id: 'context'}).children).to.eqls(['value2']);
  });

  it('should use pure object as context value to support React Provider Object.is comparison', () => {
    const singleton = new SitecoreContextFactory();
    singleton.context = { value: 1 };

    let originContext = singleton.getSitecoreContext();

    singleton.context.value = 2;
    let updatedContext = singleton.getSitecoreContext();

    // React Context Provider api expects full context object update and not just property.
    expect(Object.is(originContext, updatedContext)).to.be.true;

    // Manual context object reassign should trigger Provider update as well.
    originContext = singleton.getSitecoreContext();
    singleton.context = { value: 3 };
    updatedContext = singleton.getSitecoreContext();
    expect(Object.is(originContext, updatedContext)).to.be.false;

    // Official API method setSitecoreContext should trigger Provider update.
    originContext = singleton.getSitecoreContext();
    singleton.setSitecoreContext({ value: 4 });
    updatedContext = singleton.getSitecoreContext();
    expect(Object.is(originContext, updatedContext)).to.be.false;
  });
});

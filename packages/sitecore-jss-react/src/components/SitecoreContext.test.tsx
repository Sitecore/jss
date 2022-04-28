import React, { FC } from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { SitecoreContext } from './SitecoreContext';
import { ComponentFactory } from './sharedTypes';
import { withSitecoreContext, ComponentConsumerProps } from '../enhancers/withSitecoreContext';
import { LayoutServiceData } from '../index';

interface NestedComponentProps extends ComponentConsumerProps {
  anotherProperty?: string;
}
const NestedComponent: FC<NestedComponentProps> = (props: NestedComponentProps) => (
  <div>{props.sitecoreContext && 'test'}</div>
);
const NestedComponentWithContext = withSitecoreContext()(NestedComponent);

const components = new Map();
const mockComponentFactory: ComponentFactory = (name) => components.get(name);

const mockLayoutData: LayoutServiceData = {
  sitecore: {
    context: {
      pageEditing: false,
      site: {
        name: 'JssTestWeb',
      },
      language: 'en',
    },
    route: {
      name: 'styleguide',
      placeholders: {
        'JssTestWeb-jss-main': [],
      },
      itemId: 'testitemid',
    },
  },
};

describe('SitecoreContext', () => {
  it('should update context', () => {
    const component = shallow<SitecoreContext>(
      <SitecoreContext componentFactory={mockComponentFactory} layoutData={mockLayoutData}>
        <NestedComponentWithContext />
      </SitecoreContext>
    );

    expect(component.state().context).deep.equal({
      pageEditing: false,
      itemId: 'testitemid',
      language: 'en',
      route: {
        itemId: 'testitemid',
        name: 'styleguide',
        placeholders: {
          'JssTestWeb-jss-main': [],
        },
      },
      site: {
        name: 'JssTestWeb',
      },
    });

    // provide LayoutServiceData type
    component.instance().setContext({
      sitecore: {
        context: {
          pageEditing: false,
          site: {
            name: 'JssTestWeb',
          },
          language: 'en',
        },
        route: {
          name: 'home',
          placeholders: {
            'JssTestWeb-jss-main': [],
          },
          itemId: 'homeid',
        },
      },
    });

    expect(component.state().context).deep.equal({
      pageEditing: false,
      itemId: 'homeid',
      language: 'en',
      route: {
        itemId: 'homeid',
        name: 'home',
        placeholders: {
          'JssTestWeb-jss-main': [],
        },
      },
      site: {
        name: 'JssTestWeb',
      },
    });

    // Provide SitecoreContextValue type
    component.instance().setContext({
      pageEditing: false,
      itemId: 'graphqlid',
      language: 'en',
      route: {
        itemId: 'graphqlid',
        name: 'graphql',
        placeholders: {
          'JssTestWeb-jss-main-graphql': [],
        },
      },
      site: {
        name: 'JssTestWeb',
      },
    });

    expect(component.state().context).deep.equal({
      pageEditing: false,
      itemId: 'graphqlid',
      language: 'en',
      route: {
        itemId: 'graphqlid',
        name: 'graphql',
        placeholders: {
          'JssTestWeb-jss-main-graphql': [],
        },
      },
      site: {
        name: 'JssTestWeb',
      },
    });
  });

  it('should set default context', () => {
    const component = shallow<SitecoreContext>(
      <SitecoreContext componentFactory={mockComponentFactory}>
        <NestedComponentWithContext />
      </SitecoreContext>
    );

    expect(component.state().context).deep.equal({
      pageEditing: false,
    });
  });

  it('should update state when new context as prop received', () => {
    const component = shallow<SitecoreContext>(
      <SitecoreContext componentFactory={mockComponentFactory}>
        <NestedComponentWithContext />
      </SitecoreContext>
    );

    expect(component.state().context).deep.equal({
      pageEditing: false,
    });

    component.setProps({
      layoutData: mockLayoutData,
    });

    expect(component.state().context).to.deep.equal({
      pageEditing: false,
      itemId: 'testitemid',
      language: 'en',
      route: {
        itemId: 'testitemid',
        name: 'styleguide',
        placeholders: {
          'JssTestWeb-jss-main': [],
        },
      },
      site: {
        name: 'JssTestWeb',
      },
    });
  });
});

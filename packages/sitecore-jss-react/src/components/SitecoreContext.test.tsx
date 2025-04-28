import React, { FC } from 'react';
import { expect } from 'chai';
import { constants } from '@sitecore-jss/sitecore-jss';
import { SitecoreContext } from './SitecoreContext';
import { ComponentFactory } from './sharedTypes';
import { WithSitecoreContextProps, withSitecoreContext } from '../enhancers/withSitecoreContext';
import { LayoutServiceData } from '../index';
import { render } from '@testing-library/react';
import { useSitecoreContext } from '../enhancers/withSitecoreContext';

describe('SitecoreContext', () => {
  let nestedContext = {};

  interface NestedComponentProps extends WithSitecoreContextProps {
    anotherProperty?: string;
  }

  const NestedComponent: FC<NestedComponentProps> = (props: NestedComponentProps) => {
    const { sitecoreContext } = useSitecoreContext();

    nestedContext = sitecoreContext;

    <div>{props.sitecoreContext && 'test'}</div>;
  };

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

  const api = {
    edge: {
      contextId: 'id',
      edgeUrl: 'url',
    },
  };

  it('should update context', () => {
    const component = render(
      <SitecoreContext
        componentFactory={mockComponentFactory}
        layoutData={mockLayoutData}
        api={api}
      >
        <NestedComponentWithContext />
      </SitecoreContext>
    );

    expect(component.state().api).to.deep.equal({
      edge: {
        contextId: 'id',
        edgeUrl: 'url',
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
    const component = render(
      <SitecoreContext componentFactory={mockComponentFactory}>
        <NestedComponentWithContext />
      </SitecoreContext>
    );

    expect(nestedContext).deep.equal({
      pageEditing: false,
    });
    expect(component.state().api).to.be.undefined;
  });

  it('should set default edge url', () => {
    const component = render(
      <SitecoreContext componentFactory={mockComponentFactory} api={{ edge: { contextId: 'id' } }}>
        <NestedComponentWithContext />
      </SitecoreContext>
    );

    expect(component.state().api).to.deep.equal({
      edge: {
        contextId: 'id',
        edgeUrl: constants.SITECORE_EDGE_URL_DEFAULT,
      },
    });
  });

  it('should update state when new context as prop received', () => {
    const component = render(
      <SitecoreContext componentFactory={mockComponentFactory}>
        <NestedComponentWithContext />
      </SitecoreContext>
    );

    expect(nestedContext).deep.equal({
      pageEditing: false,
    });

    component.rerender(
      <SitecoreContext componentFactory={mockComponentFactory} layoutData={mockLayoutData}>
        <NestedComponentWithContext />
      </SitecoreContext>
    );

    expect(nestedContext).to.deep.equal({
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

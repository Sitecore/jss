import React, { FC } from 'react';
import { expect } from 'chai';
import { constants } from '@sitecore-jss/sitecore-jss';
import { SitecoreContext } from './SitecoreContext';
import { ComponentFactory } from './sharedTypes';
import { WithSitecoreContextProps, withSitecoreContext } from '../enhancers/withSitecoreContext';
import { LayoutServiceData, SitecoreContextValue } from '../index';
import { render } from '@testing-library/react';
import { useSitecoreContext } from '../enhancers/withSitecoreContext';

describe('SitecoreContext', () => {
  let nestedContext = {};
  let contextApi: object | undefined = {};

  interface NestedComponentProps extends WithSitecoreContextProps {
    anotherProperty?: string;
  }

  const NestedComponent: FC<NestedComponentProps> = (props: NestedComponentProps) => {
    const { sitecoreContext, api } = useSitecoreContext();

    nestedContext = sitecoreContext;
    contextApi = api ?? undefined;

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

    expect(contextApi).to.deep.equal({
      edge: {
        contextId: 'id',
        edgeUrl: 'url',
      },
    });

    // provide LayoutServiceData type
    const newLayoutData: LayoutServiceData = {
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
    };

    component.rerender(
      <SitecoreContext componentFactory={mockComponentFactory} layoutData={newLayoutData}>
        <NestedComponentWithContext />
      </SitecoreContext>
    );

    expect(nestedContext).deep.equal({
      pageEditing: newLayoutData.sitecore.context.pageEditing,
      itemId: newLayoutData.sitecore.route?.itemId,
      language: newLayoutData.sitecore.context.language,
      route: newLayoutData.sitecore.route,
      site: newLayoutData.sitecore.context.site,
    });

    // Provide SitecoreContextValue type
    const newContextValue: SitecoreContextValue = {
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
    };

    component.rerender(
      <SitecoreContext componentFactory={mockComponentFactory} layoutData={newContextValue}>
        <NestedComponentWithContext />
      </SitecoreContext>
    );

    expect(nestedContext).deep.equal({
      pageEditing: newContextValue.pageEditing,
      itemId: newContextValue.itemId,
      language: newContextValue.language,
      route: newContextValue.route,
      site: newContextValue.site,
    });
  });

  it('should set default context', () => {
    render(
      <SitecoreContext componentFactory={mockComponentFactory}>
        <NestedComponentWithContext />
      </SitecoreContext>
    );

    expect(nestedContext).deep.equal({
      pageEditing: false,
    });
    expect(contextApi).to.be.undefined;
  });

  it('should set default edge url', () => {
    render(
      <SitecoreContext componentFactory={mockComponentFactory} api={{ edge: { contextId: 'id' } }}>
        <NestedComponentWithContext />
      </SitecoreContext>
    );

    expect(contextApi).to.deep.equal({
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

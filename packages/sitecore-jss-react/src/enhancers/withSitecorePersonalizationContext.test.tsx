/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsdoc/require-param-type */
/* eslint-disable jsdoc/check-param-names */

import React from 'react';
import { expect, spy, use } from 'chai';
import spies from 'chai-spies';
import { render, shallow } from 'enzyme';
import {
  LayoutPersonalizationService,
  RouteData,
  SitecorePersonalizationContextState,
} from '@sitecore-jss/sitecore-jss';
import {
  SitecorePersonalizationContextProps,
  withSitecorePersonalizationContext,
} from './withSitecorePersonalizationContext';
import { createStubInstance, SinonStubbedInstance } from 'sinon';

use(spies);

interface Global {
  window: Window | undefined;
}
declare const global: Global;

describe('withSitecorePersonalizationContext', () => {
  let route: RouteData;
  const TestComponent = (props: SitecorePersonalizationContextProps) => (
    <div>tracked={props.tracked.toString()}</div>
  );
  let testComponentProps: SitecorePersonalizationContextProps;
  let layoutPersonalizationService: SinonStubbedInstance<LayoutPersonalizationService> &
    LayoutPersonalizationService;
  let TestComponentWithContext: React.FC<SitecorePersonalizationContextProps>;

  beforeEach(() => {
    global.window = {
      document: {},
    } as Window;

    route = {
      layoutId: '',
      name: '',
      placeholders: {},
      deviceId: '',
    };
    layoutPersonalizationService = createStubInstance(
      LayoutPersonalizationService
    ) as SinonStubbedInstance<LayoutPersonalizationService> & LayoutPersonalizationService;
    const personalizationContextState: SitecorePersonalizationContextState = {
      isTracked: true,
      ensurePersonalizedComponentLoaded: () => Promise.resolve(null),
      getPersonalizedComponent: () => null,
      isLoading: () => false,
    };
    layoutPersonalizationService.startPersonalization.returns(personalizationContextState);
    spy.on(layoutPersonalizationService, 'startPersonalization');

    testComponentProps = {
      layoutData: {
        sitecore: {
          route: route,
          context: {},
        },
      },
      isPreview: false,
      isPersonalizationSuppressed: false,
      tracked: false,
    };
  });

  afterEach(() => {
    spy.restore(layoutPersonalizationService);
  });

  it('should start personalization', () => {
    TestComponentWithContext = withSitecorePersonalizationContext({ layoutPersonalizationService })(
      TestComponent
    );

    shallow(<TestComponentWithContext {...testComponentProps} />);

    expect(layoutPersonalizationService.startPersonalization).to.have.been.called.with(
      {
        language: testComponentProps.layoutData?.sitecore.context.language as string,
        routePath: testComponentProps.layoutData?.sitecore.context.itemPath as string,
        layoutDeviceId: testComponentProps.layoutData?.sitecore.route?.deviceId as string,
      },
      route
    );
  });

  it('should not start personalization if personalization is suppressed', () => {
    testComponentProps.isPersonalizationSuppressed = true;
    TestComponentWithContext = withSitecorePersonalizationContext({ layoutPersonalizationService })(
      TestComponent
    );

    shallow(<TestComponentWithContext {...testComponentProps} />);

    expect(layoutPersonalizationService.startPersonalization).to.not.have.been.called.once;
  });

  it('should not start personalization if route is missed', () => {
    testComponentProps!.layoutData!.sitecore!.route = null;
    TestComponentWithContext = withSitecorePersonalizationContext({ layoutPersonalizationService })(
      TestComponent
    );

    shallow(<TestComponentWithContext {...testComponentProps} />);

    expect(layoutPersonalizationService.startPersonalization).to.not.have.been.called.once;
  });

  it('should not start personalization in preview mode', () => {
    testComponentProps.isPreview = true;
    TestComponentWithContext = withSitecorePersonalizationContext({ layoutPersonalizationService })(
      TestComponent
    );

    shallow(<TestComponentWithContext {...testComponentProps} />);

    expect(layoutPersonalizationService.startPersonalization).to.not.have.been.called.once;
  });

  it('should not start personalization on server', () => {
    global.window = undefined;
    TestComponentWithContext = withSitecorePersonalizationContext({ layoutPersonalizationService })(
      TestComponent
    );

    shallow(<TestComponentWithContext {...testComponentProps} />);

    expect(layoutPersonalizationService.startPersonalization).to.not.have.been.called.once;
  });

  it('should not start personalization in disconnected mode', () => {
    route.layoutId = 'available-in-connected-mode';
    TestComponentWithContext = withSitecorePersonalizationContext({ layoutPersonalizationService })(
      TestComponent
    );

    shallow(<TestComponentWithContext {...testComponentProps} />);

    expect(layoutPersonalizationService.startPersonalization).to.not.have.been.called.once;
  });

  it('should not change tracked if personalization was not started', () => {
    const layoutPersonalizationService = createStubInstance(
      LayoutPersonalizationService
    ) as SinonStubbedInstance<LayoutPersonalizationService> & LayoutPersonalizationService;
    layoutPersonalizationService.startPersonalization.returns(undefined);
    TestComponentWithContext = withSitecorePersonalizationContext({ layoutPersonalizationService })(
      TestComponent
    );

    const wrapper = render(<TestComponentWithContext {...testComponentProps} />);

    expect(wrapper.text()).to.contain('tracked=false');
  });

  it('should change tracked if personalization was started', () => {
    TestComponentWithContext = withSitecorePersonalizationContext({ layoutPersonalizationService })(
      TestComponent
    );

    const wrapper = render(<TestComponentWithContext {...testComponentProps} />);

    expect(wrapper.text()).to.contain('tracked=true');
  });
});

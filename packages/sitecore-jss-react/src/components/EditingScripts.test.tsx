/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { render } from '@testing-library/react';
import {
  EditMode,
  LayoutServiceData,
  LayoutServicePageState,
  RenderingType,
} from '@sitecore-jss/sitecore-jss/layout';
import { getDesignLibraryScriptLink } from '@sitecore-jss/sitecore-jss/editing';
import { EditingScripts } from './EditingScripts';
import { SitecoreContext } from './SitecoreContext';
import { ComponentFactory } from './sharedTypes';
import { getJssPagesClientData } from '@sitecore-jss/sitecore-jss/editing';

describe('<EditingScripts />', () => {
  const mockComponentFactory: ComponentFactory = () => null;

  const getLayoutData = ({
    editMode,
    pageState,
    pageEditing,
    clientData,
    clientScripts,
    renderingType,
  }: {
    editMode?: EditMode;
    pageState: LayoutServicePageState;
    pageEditing: boolean;
    clientData?: Record<string, Record<string, unknown>>;
    clientScripts?: string[];
    renderingType?: RenderingType;
  }): LayoutServiceData => ({
    sitecore: {
      context: {
        editMode,
        pageState,
        pageEditing,
        renderingType,
        site: {
          name: 'JssTestWeb',
        },
        language: 'en',
        clientData: clientData || {
          foo: {
            x: 1,
            y: '1',
            z: true,
          },
          bar: {
            a: 2,
            b: '2',
            c: false,
          },
        },
        clientScripts: clientScripts || [
          'http://test.foo/script1.js',
          'http://test.foo/script2.js',
        ],
      },
      route: null,
    },
  });

  it('should render nothing when not in editing and not in component library', () => {
    const layoutData = getLayoutData({
      pageState: LayoutServicePageState.Normal,
      pageEditing: false,
    });

    const component = render(
      <SitecoreContext componentFactory={mockComponentFactory} layoutData={layoutData}>
        <EditingScripts />
      </SitecoreContext>,
      { container: document.body }
    );

    expect(component.baseElement.innerHTML).to.be.empty;
    expect(component.container.querySelectorAll('script')).to.have.length(0);
  });

  ['Edit', 'Preview'].forEach((pageState) => {
    it(`should render nothing when in ${pageState} pageState and Chromes editmode`, () => {
      const layoutData = getLayoutData({
        editMode: EditMode.Chromes,
        pageState: LayoutServicePageState.Preview,
        pageEditing: true,
      });

      const component = render(
        <SitecoreContext componentFactory={mockComponentFactory} layoutData={layoutData}>
          <EditingScripts />
        </SitecoreContext>,
        { container: document.body }
      );

      expect(component.baseElement.innerHTML).to.equal('');
      expect(component.container.querySelectorAll('script')).to.have.length(0);
    });
  });

  describe('should render Pages scripts when in Metadata mode', () => {
    it('should render scripts', () => {
      const layoutData = getLayoutData({
        editMode: EditMode.Metadata,
        pageState: LayoutServicePageState.Edit,
        pageEditing: true,
      });

      const component = render(
        <SitecoreContext componentFactory={mockComponentFactory} layoutData={layoutData}>
          <EditingScripts />
        </SitecoreContext>,
        { container: document.body }
      );

      const scripts = component.baseElement;
      const jssScriptsLength = Object.keys(getJssPagesClientData()).length;

      expect(scripts?.querySelectorAll('script')).to.have.length(4 + jssScriptsLength);

      const script1 = scripts?.querySelectorAll('script')[0];
      expect(script1?.getAttribute('src')).to.equal('http://test.foo/script1.js');

      const script2 = scripts?.querySelectorAll('script')[1];
      expect(script2?.getAttribute('src')).to.equal('http://test.foo/script2.js');

      const script3 = scripts?.querySelectorAll('script')[2];
      expect(script3?.getAttribute('id')).to.equal('foo');
      expect(script3?.getAttribute('type')).to.equal('application/json');
      expect(script3?.outerHTML).to.equal(
        '<script id="foo" type="application/json">{"x":1,"y":"1","z":true}</script>'
      );

      const script4 = scripts?.querySelectorAll('script')[3];
      expect(script4?.getAttribute('id')).to.equal('bar');
      expect(script4?.getAttribute('type')).to.equal('application/json');
      expect(script4?.outerHTML).to.equal(
        '<script id="bar" type="application/json">{"a":2,"b":"2","c":false}</script>'
      );
    });

    it('should render jss pages script elements when data is not provided', () => {
      const layoutData = getLayoutData({
        editMode: EditMode.Metadata,
        pageState: LayoutServicePageState.Edit,
        pageEditing: true,
        clientData: {},
        clientScripts: [],
      });

      const component = render(
        <SitecoreContext componentFactory={mockComponentFactory} layoutData={layoutData}>
          <EditingScripts />
        </SitecoreContext>
      );

      const scripts = component.baseElement;
      const ids = Object.keys(getJssPagesClientData());
      ids.forEach((id) => {
        expect(component.container.querySelector(`#${id}`)).to.not.be.null;
      });
      expect(scripts.querySelectorAll('script')).to.have.length(ids.length);
    });
  });

  describe('Design Library scripts', () => {
    it('should render Design Library script when rendering type is component', () => {
      const layoutData = getLayoutData({
        editMode: EditMode.Chromes,
        pageEditing: false,
        pageState: LayoutServicePageState.Normal,
        renderingType: RenderingType.Component,
        clientData: {},
        clientScripts: [],
      });

      const component = render(
        <SitecoreContext componentFactory={mockComponentFactory} layoutData={layoutData}>
          <EditingScripts />
        </SitecoreContext>
      );

      const scripts = component.container.querySelectorAll('script');
      expect(scripts).to.have.length(1);
      expect(scripts[0].getAttribute('src')).to.contain(`${getDesignLibraryScriptLink()}?cb=`);
    });

    it('should render Design Library script with custom design library url when rendering type is component', () => {
      const layoutData = getLayoutData({
        editMode: EditMode.Chromes,
        pageEditing: false,
        pageState: LayoutServicePageState.Normal,
        renderingType: RenderingType.Component,
        clientData: {},
        clientScripts: [],
      });

      const stagingEdgeUrl = 'http://edge-staging';

      const component = render(
        <SitecoreContext
          componentFactory={mockComponentFactory}
          layoutData={layoutData}
          api={{ edge: { edgeUrl: stagingEdgeUrl, contextId: 'id' } }}
        >
          <EditingScripts />
        </SitecoreContext>
      );

      const scripts = component.container.querySelectorAll('script');
      expect(scripts).to.have.length(1);
      expect(scripts[0].getAttribute('src')).to.contain(
        `${getDesignLibraryScriptLink(stagingEdgeUrl)}?cb=`
      );
    });

    it('should append UTC cache-buster in HH-DD-MM-YYYY format (zero-padded) across edge cases', () => {
      // Use sinon fake timers instead of overriding Date directly

      const cases = [
        { date: '2024-01-02T03:04:05.000Z', expected: '03-02-01-2024' }, // single-digit month/day/hour
        { date: '2024-11-12T13:00:00.000Z', expected: '13-12-11-2024' }, // double-digit month/day/hour
        { date: '2024-12-31T23:59:59.000Z', expected: '23-31-12-2024' }, // end of year
        { date: '2025-01-01T00:00:00.000Z', expected: '00-01-01-2025' }, // start of year, hour 00
        { date: '2024-03-09T09:00:00.000Z', expected: '09-09-03-2024' }, // leading zero hour/day/month
      ];

      cases.forEach(({ date, expected }) => {
        // Freeze time to the specific UTC instant
        const clock = sinon.useFakeTimers(new Date(date).getTime());
        try {
          const layoutData = getLayoutData({
            editMode: EditMode.Chromes,
            pageEditing: false,
            pageState: LayoutServicePageState.Normal,
            renderingType: RenderingType.Component,
            clientData: {},
            clientScripts: [],
          });

          const { container } = render(
            <SitecoreContext componentFactory={mockComponentFactory} layoutData={layoutData}>
              <EditingScripts />
            </SitecoreContext>
          );

          const script = container.querySelectorAll('script')[0];
          const src = script?.getAttribute('src') || '';
          // Extract timestamp using URLSearchParams to avoid string parsing pitfalls
          const cbValue = new URL(src).searchParams.get('cb');
          expect(cbValue).to.equal(expected);
        } finally {
          // Always restore after each case to avoid leaking fake timers
          clock.restore();
        }
      });
    });
  });
});

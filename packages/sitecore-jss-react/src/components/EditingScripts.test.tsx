/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import {
  EditMode,
  LayoutServiceData,
  LayoutServicePageState,
} from '@sitecore-jss/sitecore-jss/layout';
import { EditingScripts } from './EditingScripts';
import { SitecoreContext } from './SitecoreContext';
import { ComponentFactory } from './sharedTypes';

describe('<EditingScripts />', () => {
  const mockComponentFactory: ComponentFactory = () => null;

  const getLayoutData = ({
    editMode,
    pageState,
    pageEditing,
    clientData,
    clientScripts,
  }: {
    editMode?: EditMode;
    pageState: LayoutServicePageState;
    pageEditing: boolean;
    clientData?: Record<string, Record<string, unknown>>;
    clientScripts?: string[];
  }): LayoutServiceData => ({
    sitecore: {
      context: {
        editMode,
        pageState,
        pageEditing,
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

  it('should render nothing when not in editing', () => {
    const layoutData = getLayoutData({
      pageState: LayoutServicePageState.Normal,
      pageEditing: false,
    });

    const component = mount(
      <SitecoreContext componentFactory={mockComponentFactory} layoutData={layoutData}>
        <EditingScripts />
      </SitecoreContext>
    );

    const scripts = component.find('EditingScripts');

    expect(scripts.html()).to.be.null;
    expect(scripts.find('script')).to.have.length(0);
  });

  ['Preview', 'Edit'].forEach((pageState) => {
    it(`should render nothing when ${pageState} and edit mode is Chromes`, () => {
      const layoutData = getLayoutData({
        editMode: EditMode.Chromes,
        pageState: LayoutServicePageState[pageState],
        pageEditing: true,
      });

      const component = mount(
        <SitecoreContext componentFactory={mockComponentFactory} layoutData={layoutData}>
          <EditingScripts />
        </SitecoreContext>
      );

      const scripts = component.find('EditingScripts');

      expect(scripts.html()).to.be.null;
      expect(scripts.find('script')).to.have.length(0);
    });

    describe(`should render scripts when ${pageState} and edit mode is Metadata`, () => {
      it('should render scripts', () => {
        const layoutData = getLayoutData({
          editMode: EditMode.Metadata,
          pageState: LayoutServicePageState[pageState],
          pageEditing: true,
        });

        const component = mount(
          <SitecoreContext componentFactory={mockComponentFactory} layoutData={layoutData}>
            <EditingScripts />
          </SitecoreContext>
        );

        const scripts = component.find('EditingScripts');

        expect(scripts.find('script')).to.have.length(4);

        const script1 = scripts.find('script').at(0);
        expect(script1.prop('src')).to.equal('http://test.foo/script1.js');

        const script2 = scripts.find('script').at(1);
        expect(script2.prop('src')).to.equal('http://test.foo/script2.js');

        const script3 = scripts.find('script').at(2);
        expect(script3.prop('id')).to.equal('foo');
        expect(script3.prop('type')).to.equal('application/json');
        expect(script3.prop('dangerouslySetInnerHTML')).to.deep.equal({
          __html: '{"x":1,"y":"1","z":true}',
        });
        expect(script3.html()).to.equal(
          '<script id="foo" type="application/json">{"x":1,"y":"1","z":true}</script>'
        );

        const script4 = scripts.find('script').at(3);
        expect(script4.prop('id')).to.equal('bar');
        expect(script4.prop('type')).to.equal('application/json');
        expect(script4.prop('dangerouslySetInnerHTML')).to.deep.equal({
          __html: '{"a":2,"b":"2","c":false}',
        });
        expect(script4.html()).to.equal(
          '<script id="bar" type="application/json">{"a":2,"b":"2","c":false}</script>'
        );
      });

      it('should render nothing when data is not provided', () => {
        const layoutData = getLayoutData({
          editMode: EditMode.Metadata,
          pageState: LayoutServicePageState[pageState],
          pageEditing: true,
          clientData: {},
          clientScripts: [],
        });

        const component = mount(
          <SitecoreContext componentFactory={mockComponentFactory} layoutData={layoutData}>
            <EditingScripts />
          </SitecoreContext>
        );

        const scripts = component.find('EditingScripts');

        expect(scripts.html()).to.equal('');
        expect(scripts.find('script')).to.have.length(0);
      });
    });
  });
});

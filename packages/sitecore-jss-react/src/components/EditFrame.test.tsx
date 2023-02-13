import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { EditFrame } from './EditFrame';
import { ComponentFactory } from './sharedTypes';
import { SitecoreContext } from './SitecoreContext';
import { LayoutServiceData } from '../index';
import { DefaultEditFrameButton, EditButtonTypes } from '@sitecore-jss/sitecore-jss/utils';

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

const mockEditingLayoutData: LayoutServiceData = {
  sitecore: {
    context: {
      pageEditing: true,
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

describe('<EditFrame />', () => {
  it('should render nothing when not in pageEditing mode', () => {
    const rendered = mount(
      <SitecoreContext componentFactory={mockComponentFactory} layoutData={mockLayoutData}>
        <EditFrame>
          <span>Test</span>
        </EditFrame>
      </SitecoreContext>
    )
      .childAt(0)
      .html();
    expect(rendered).to.be.equal('<span>Test</span>');
  });

  it('should render a frame when in pageEditing mode', () => {
    const rendered = mount(
      <SitecoreContext componentFactory={mockComponentFactory} layoutData={mockEditingLayoutData}>
        <EditFrame>
          <span>Test</span>
        </EditFrame>
      </SitecoreContext>
    )
      .childAt(0)
      .html();
    expect(rendered).to.be.equal(
      '<div class="scLooseFrameZone"><span class="scChromeData">{}</span><span>Test</span></div>'
    );
  });

  it('should render the title and tooltip', () => {
    const rendered = mount(
      <SitecoreContext componentFactory={mockComponentFactory} layoutData={mockEditingLayoutData}>
        <EditFrame title="Test Title" tooltip="Test Tooltip">
          <span>Test</span>
        </EditFrame>
      </SitecoreContext>
    )
      .childAt(0)
      .html();
    expect(rendered).to.be.equal(
      '<div class="scLooseFrameZone"><span class="scChromeData">{"displayName":"Test Title","expandedDisplayName":"Test Tooltip"}</span><span>Test</span></div>'
    );
  });

  it('should render the added class', () => {
    const rendered = mount(
      <SitecoreContext componentFactory={mockComponentFactory} layoutData={mockEditingLayoutData}>
        <EditFrame cssClass="TestClass">
          <span>Test</span>
        </EditFrame>
      </SitecoreContext>
    )
      .childAt(0)
      .html();
    expect(rendered).to.be.equal(
      '<div class="scLooseFrameZone TestClass"><span class="scChromeData">{}</span><span>Test</span></div>'
    );
  });

  it('should render the datasource', () => {
    const mockDatasource = {
      itemId: 'testItemId',
      databaseName: 'master',
      language: 'en',
    };
    const rendered = mount(
      <SitecoreContext componentFactory={mockComponentFactory} layoutData={mockEditingLayoutData}>
        <EditFrame dataSource={mockDatasource}>
          <span>Test</span>
        </EditFrame>
      </SitecoreContext>
    )
      .childAt(0)
      .html();
    expect(rendered).to.be.equal(
      '<div class="scLooseFrameZone" sc_item="sitecore://master/testItemId?lang=en"><span class="scChromeData">{"contextItemUri":"sitecore://master/testItemId?lang=en"}</span><span>Test</span></div>'
    );
  });

  it('should render the buttons', () => {
    const mockDatasource = {
      itemId: 'testItemId',
      databaseName: 'master',
      language: 'en',
    };
    const mockButtons: EditButtonTypes[] = [
      DefaultEditFrameButton.insert,
      '|',
      DefaultEditFrameButton.edit,
    ];
    const rendered = mount(
      <SitecoreContext componentFactory={mockComponentFactory} layoutData={mockEditingLayoutData}>
        <EditFrame dataSource={mockDatasource} buttons={mockButtons}>
          <span>Test</span>
        </EditFrame>
      </SitecoreContext>
    )
      .childAt(0)
      .html();
    expect(rendered).to.be.equal(
      `<div class="scLooseFrameZone" sc_item="sitecore://master/testItemId?lang=en">
          <span class="scChromeData">
            {"contextItemUri":"sitecore://master/testItemId?lang=en","commands":[{"isDivider":false,"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:new(id=testItemId)\',null,false)","header":"Insert New","icon":"/~/icon/Office/16x16/insert_from_template.png","tooltip":"Insert a new item","type":null},{"click":"chrome:dummy","header":"Separator","icon":"","isDivider":true,"tooltip":null,"type":"separator"},{"isDivider":false,"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:fieldeditor(command={70C4EED5-D4CD-4D7D-9763-80C42504F5E7}, fields=Title|Text, id=testItemId)\',null,false)","header":"Edit Item","icon":"/~/icon/people/16x16/cubes_blue.png","tooltip":"Edit the item fields.","type":null}]}
          </span>
          <span>Test</span>
        </div>
      `.replace(/(\r\n|\n|\r|[\s]{2,})/gm, "")
    );
  });
});

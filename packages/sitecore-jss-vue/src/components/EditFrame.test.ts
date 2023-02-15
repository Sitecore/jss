import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import { EditFrame } from './EditFrame';
import { DefaultEditFrameButton, EditButtonTypes } from '@sitecore-jss/sitecore-jss/utils';

const normalContext = {
  pageEditing: false,
};

const editingContext = {
  pageEditing: true,
};

const EditFrameWithText = defineComponent({
  props: {
    context: {
      type: Object,
      default: normalContext,
    },
  },
  render() {
    return h(EditFrame, { context: this.$props.context }, () => 'Test text');
  },
});

describe('<EditFrame />', () => {
  it('should render nothing when not in pageEditing mode', () => {
    const rendered = mount(EditFrame, {
      props: {
        context: normalContext,
      },
    });
    expect(rendered.html()).toBe('');
  });

  it('should render a frame when in pageEditing mode', () => {
    const rendered = mount(EditFrame, {
      props: {
        context: editingContext,
      },
    });
    expect(rendered.html()).toBe(
      '<div class="scLooseFrameZone"><span class="scChromeData">{}</span></div>'
    );
  });

  it('should render child content within a frame when in pageEditing mode', () => {
    const rendered = mount(EditFrameWithText, {
      props: {
        context: editingContext,
      },
    });
    expect(rendered.find('div.scLooseFrameZone').text()).toContain('Test text');
  });
});

it('should render the title and tooltip', () => {
  const rendered = mount(EditFrame, {
    props: {
      context: editingContext,
      title: 'Test Title',
      tooltip: 'Test Tooltip',
    },
  });
  const editSpan = rendered.find('.scLooseFrameZone > span.scChromeData');
  expect(editSpan.text()).toBe('{"displayName":"Test Title","expandedDisplayName":"Test Tooltip"}');
});

it('should render the added class', () => {
  const rendered = mount(EditFrame, {
    props: {
      context: editingContext,
      cssClass: 'topClass',
    },
  });
  const editDiv = rendered.find('div.scLooseFrameZone');
  expect(editDiv.element.classList.contains('topClass')).toBe(true);
});

it('should render the datasource', () => {
  const mockDatasource = {
    itemId: 'testItemId',
    databaseName: 'master',
    language: 'en',
  };
  const rendered = mount(EditFrame, {
    props: {
      context: editingContext,
      dataSource: mockDatasource,
    },
  });
  const editDiv = rendered.find('div.scLooseFrameZone');
  const editSpan = rendered.find('.scLooseFrameZone > span.scChromeData');
  expect(editDiv.attributes('sc_item')).toBe('sitecore://master/testItemId?lang=en');
  expect(editSpan.text().includes('"contextItemUri":"sitecore://master/testItemId?lang=en"')).toBe(
    true
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
  const rendered = mount(EditFrame, {
    props: {
      context: editingContext,
      dataSource: mockDatasource,
      buttons: mockButtons,
    },
  });
  const editSpan = rendered.find('.scLooseFrameZone > span.scChromeData');

  expect(
    editSpan.text().includes(
      `
    "commands":
      [{"isDivider":false,
      "click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:new(id=testItemId)\',null,false)",
      "header":"Insert New",
      "icon":"/~/icon/Office/16x16/insert_from_template.png",
      "tooltip":"Insert a new item",
      "type":null},
      {"click":"chrome:dummy",
      "header":"Separator",
      "icon":"",
      "isDivider":true,
      "tooltip":null,
      "type":"separator"},
      {"isDivider":false,
      "click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:fieldeditor(command={70C4EED5-D4CD-4D7D-9763-80C42504F5E7}, fields=Title|Text, id=testItemId)\',null,false)",
      "header":"Edit Item",
      "icon":"/~/icon/people/16x16/cubes_blue.png",
      "tooltip":"Edit the item fields.",
      "type":null}
    ]`.replace(/(\r\n|\n|\r|[\s]{2,})/gm, '')
    )
  ).toBe(true);
});

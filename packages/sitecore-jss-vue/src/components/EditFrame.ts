import { h, defineComponent, PropType, getCurrentInstance } from 'vue';
import {
  EditFrameDataSource,
  FieldEditButton,
  WebEditButton,
  EditFrameButton,
  DefaultEditFrameButtonIds,
  isWebEditButton,
  commandBuilder
} from '@sitecore-jss/sitecore-jss/utils';

export const RichText = defineComponent({
  props: {
    dataSource: { type: Object as PropType<EditFrameDataSource> },
    buttons: { type: Object as PropType<(FieldEditButton | WebEditButton | '|')[]> },
    title: { type: String },
    tooltip: { type: String },
    cssClass: { type: String },
    parameters: { type: Object as PropType<Record<string, string | number | boolean | undefined | null>> },
  },
  methods: {},
  render() {
    const instance = getCurrentInstance();
    const sitecoreContext = instance.appContext.config.globalProperties.$jss.sitecoreContext();
    if (!sitecoreContext.pageEditing) {
      return null;
    }

    const commandData: Record<string, unknown> = {
      displayName: this.$props.title,
      expandedDisplayName: this.$props.tooltip,
    };

    const frameProps: Record<string, unknown> = {};
    frameProps.class = 'scLooseFrameZone';
    if (this.$props.cssClass) {
      frameProps.class = `${frameProps.class} ${this.$props.cssClass}`;
    }

    // item uri for edit frame target
    if (this.$props.dataSource) {
      const route = instance.appContext.config.globalProperties.$jss.route();
      const databaseName = this.$props.dataSource.databaseName || route?.databaseName;
      const language = this.$props.dataSource.language || sitecoreContext.language;
      frameProps.sc_item = `sitecore://${databaseName}/${this.$props.dataSource.itemId}?lang=${language}`;
      commandData.contextItemUri = frameProps.sc_item;
    }

    commandData.commands = this.$props.buttons?.map(
      (value): EditFrameButton => {
        if (value === '|') {
          return {
            click: 'chrome:dummy',
            header: 'Separator',
            icon: '',
            isDivider: false,
            tooltip: null,
            type: 'separator',
          };
        } else if (isWebEditButton(value)) {
          return commandBuilder(value, this.$props.dataSource?.itemId, this.$props.parameters);
        } else {
          const fieldsString = value.fields.join('|');
          const editButton: WebEditButton = {
            click: `webedit:fieldeditor(command=${DefaultEditFrameButtonIds.edit},fields=${fieldsString})`,
            ...value,
          };

          return commandBuilder(editButton, this.$props.dataSource?.itemId, this.$props.parameters);
        }
      }
    );

    const children = this.$slots.default;
    if (children) {
      const childElements = h(null, { }, children());
      const chromeData = h('span', { class: 'scChromeData' }, JSON.stringify(commandData));

      return h('div', { class: 'scLooseFrameZone', ...frameProps }, [chromeData, childElements]);
    } else {
      const chromeData = h('span', { class: 'scChromeData' }, JSON.stringify(commandData));

      return h('div', { class: 'scLooseFrameZone', ...frameProps }, [chromeData]);
    }
  }
});
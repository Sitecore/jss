import { h, defineComponent, PropType, getCurrentInstance } from 'vue';
import {
  EditFrameDataSource,
  ChromeCommand,
  EditButtonTypes,
  mapButtonToCommand
} from '../edit-frame';
import { RouteData } from '@sitecore-jss/sitecore-jss/layout';

export const EditFrame = defineComponent({
  props: {
    dataSource: { type: Object as PropType<EditFrameDataSource>, default: undefined },
    buttons: {
      type: Object as PropType<EditButtonTypes[]>,
      default: undefined,
    },
    title: { type: String, default: undefined },
    tooltip: { type: String, default: undefined },
    cssClass: { type: String, default: undefined },
    parameters: {
      type: Object as PropType<Record<string, string | number | boolean | undefined | null>>,
      default: undefined,
    },
    context: {
      type: Object,
      default: undefined,
    },
    routeData: {
      type: Object as () => RouteData,
      default: undefined,
    },
  },
  render() {
    const instance = getCurrentInstance();
    const children = this.$slots.default;
    // similar to placeholder implementation, try reading context locally first before retrieving it from global
    const sitecoreContext =
      this.$props.context || instance.appContext.config.globalProperties.$jss?.sitecoreContext();
    if (!sitecoreContext.pageEditing) {
      if (children) {
        return children();
      }
      return '';
    }

    const chromeData: Record<string, unknown> = {
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
      const route =
        this.$props.routeData || instance.appContext.config.globalProperties.$jss?.routeData();
      const databaseName = this.$props.dataSource.databaseName || route?.databaseName;
      const language = this.$props.dataSource.language || sitecoreContext.language;
      frameProps.sc_item = `sitecore://${databaseName}/${this.$props.dataSource.itemId}?lang=${language}`;
      chromeData.contextItemUri = frameProps.sc_item;
    }

    chromeData.commands = this.$props.buttons?.map(
      (value): ChromeCommand => {
        return mapButtonToCommand(value, this.$props.dataSource?.itemId, this.$props.parameters);
      }
    );

    if (children) {
      const childElements = h('div', null, children());
      const chromeSpan = h('span', {
        class: 'scChromeData',
        innerHTML: JSON.stringify(chromeData),
      });

      return h('div', frameProps, [chromeSpan, childElements]);
    } else {
      const chromeSpan = h('span', {
        class: 'scChromeData',
        innerHTML: JSON.stringify(chromeData),
      });

      return h('div', frameProps, [chromeSpan]);
    }
  },
});

<template>
  <div>
    <h4>Styleguide-EditFrame Component</h4>
    <sc-text :field="fields.heading" />
    <sc-edit-frame v-bind="editFrameProps"> 123 </sc-edit-frame>
  </div>
</template>

<script>
import { Text, EditFrame } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'Styleguide-EditFrame',
  data() {
    return {
      editFrameProps: {
        dataSource: this.rendering.dataSource
          ? {
              itemId: this.rendering.dataSource,
              // databaseName: 'web',
              // language: 'en', // optional params you can also set for datasource
            }
          : undefined, // datasource will set the item to be edited by edit frame
        buttons: [
          // add custom editing functionality or edit field sets with buttons
          {
            header: 'WebEditButton',
            icon: '/~/icon/Office/16x16/document_selection.png',
            click: 'javascript:alert("An edit frame button was just clicked!")',
            tooltip: 'Doesnt do much, just a web edit button example',
          }, // use javascript:, webedit: or chrome: commands for webedit buttons
          {
            header: 'FieldEditButton',
            icon: '/~/icon/Office/16x16/pencil.png',
            fields: ['heading'],
            tooltip: 'Allows you to open field editor for specified fields',
          }, // or use field edit buttons to open Field Editor
        ],
        title: 'JSS edit frame',
        tooltip: 'Perform editing anywhere while not tied to a rendering, placeholder or field',
        cssClass: 'jss-edit-frame', // customize edit frame appearance through CSS
        parameters: {}, // set additional parameters when needed
      },
    };
  },
  components: {
    ScText: Text,
    ScEditFrame: EditFrame,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    rendering: {
      type: Object,
    },
  },
};
</script>

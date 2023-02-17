<!--
 * A sample component to describe Edit Frame usage with JSS.
 * Edit Frame would simply output child content in normal mode.
 * In editing mode it will output markup for Edit Frame that will wrap the child content.
 * Edit buttons, custom CSS and datasource can be applied.
-->
<template>
  <styleguide-specimen v-bind="$props" data-e2e-id="styleguide-edit-frame">
    <sc-edit-frame v-bind="editFrameProps">
      Who framed Roger Rabbit? Hard to say. <br />
      But JSS now allows to edit frame any piece of content on a page in editing mode. <br />
      You can add web edit or field edit buttons, modify edit frame style through CSS class and put the frame wherever you need it.
    </sc-edit-frame>
  </styleguide-specimen>
</template>

<script>
import { EditFrame } from '@sitecore-jss/sitecore-jss-vue';
import StyleguideSpecimen from './Styleguide-Specimen';

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
    StyleguideSpecimen,
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

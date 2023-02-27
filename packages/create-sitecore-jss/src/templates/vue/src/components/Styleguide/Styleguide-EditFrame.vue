<!--
 * A sample component to describe Edit Frame usage with JSS.
 * Edit Frame would simply output child content in normal mode.
 * In editing mode it will output markup for Edit Frame that will wrap the child content.
 * Edit buttons, custom CSS and datasource can be applied.
-->
<template>
  <styleguide-specimen v-bind="$props" data-e2e-id="styleguide-edit-frame">
    <sc-edit-frame v-bind="editFrameProps">
      This is the content that will be wrapped by edit frame in Experience Editor.<br/>
      Try out the custom webedit buttons for a variety of tasks like executing javascript, or webedit commands. <br/>
      Or use field edit buttons to author fields that are not usually editable in Experience Editor.<br/>
      <br/>
      <p v-bind:style="textStyle">This text will change color. Use the field edit button to change its appearance</p>
      This list can be changed via field editor:
      <ul>
        <li v-for="(item, index) in $props.fields.sampleList" v-bind:key="index">
          {{ item.name }}
        </li>
      </ul>
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
            click: 'javascript:alert("An edit frame button was just clicked! You can also use chrome: and webedit: commands with it!")',
            tooltip: 'Doesnt do much, just a web edit button example',
          }, // use javascript:, webedit: or chrome: commands for webedit buttons
          {
            header: 'FieldEditButton',
            icon: '/~/icon/Office/16x16/pencil.png',
            fields: ['applyRedToText', 'sampleList'],
            tooltip: 'Allows you to open field editor for specified fields',
          }, // or use field edit buttons to open Field Editor
        ],
        title: 'jssEditFrame',
        tooltip: 'Perform editing anywhere while not tied to a rendering, placeholder or field',
        cssClass: 'jss-edit-frame', // customize edit frame appearance through CSS
        parameters: {}, // set additional parameters when needed
      },
      textStyle: this.rendering.fields.applyRedToText ? {color: 'red'}: {color: 'blue'},
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

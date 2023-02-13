import React from 'react';
import { Text, EditFrame } from '@sitecore-jss/sitecore-jss-react';

const StyleguideEditFrame = (props) => (
  <div>
    <h4>{props.fields.heading}</h4>
    <EditFrame {...getEditFrameProps(props.rendering.dataSource)}>
      Who framed Roger Rabbit? Can't say. <br />
      But JSS now allows to edit frame any piece of content on a page in editing mode. <br />
      You can add web edit or field edit buttons, modify edit frame's style through CSS class and
      put the frame wherever you need it.
      {props.children}
    </EditFrame>
  </div>
);

const getEditFrameProps = (dataSource) => {
  return {
    dataSource: dataSource
      ? {
          itemId: dataSource,
          // databaseName: 'web',
          // language: 'en', // optional params you can also set for datasource
        }
      : undefined, // datasource will set the item to be edited by edit frame
    buttons: editFrameButtons, // add custom editing functionality or edit field sets with buttons
    title: 'JSS edit frame',
    tooltip: 'Perform editing anywhere while not tied to a rendering, placeholder or field',
    cssClass: 'jss-edit-frame', // customize edit frame appearance through CSS
    parameters: {}, // set additional parameters when needed
  };
};

const editFrameButtons = [
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
];

export default StyleguideEditFrame;

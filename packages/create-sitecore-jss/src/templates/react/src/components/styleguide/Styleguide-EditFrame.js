import React from 'react';
import { EditFrame } from '@sitecore-jss/sitecore-jss-react';
import StyleguideSpecimen from '../styleguide/Styleguide-Specimen';

/**
 * A sample component to describe Edit Frame usage with JSS.
 * Edit Frame would simply output child content in normal mode.
 * In editing mode it will output markup for Edit Frame that will wrap the child content.
 * Edit buttons, custom CSS and datasource can be applied.
 */
const StyleguideEditFrame = (props) => {
  const applyRed = props.rendering.fields.applyRedToText?.value;
  return (
    <StyleguideSpecimen {...props} e2eId="styleguide-edit-frame">
      <EditFrame {...getEditFrameProps(props.rendering.dataSource)}>
        This is the content that will be wrapped by edit frame in Experience Editor.<br/>
        Try out the custom webedit buttons for a variety of tasks like executing javascript, or webedit commands. <br/>
        Or use field edit buttons to author fields that are not usually editable in Experience Editor.<br/>
        <br/>
        <p style={{color: applyRed? 'red': 'blue'}}>This text will change color. Use the field edit button to change its appearance</p>
        This list can be changed via field editor:
        <ul>
          {props.rendering.fields.sampleList.map((item, idx) => (
            <li key={idx}>{item.fields.title?.value}</li>
          ))}
        </ul>
        {props.children}
      </EditFrame>
    </StyleguideSpecimen>
  );
};

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
    title: 'jssEditFrame',
    tooltip: 'Perform editing anywhere while not tied to a rendering, placeholder or field',
    cssClass: 'jss-edit-frame', // customize edit frame appearance through CSS
    parameters: {}, // set additional parameters when needed
  };
};

const editFrameButtons = [
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
];

export default StyleguideEditFrame;

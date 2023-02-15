import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { EditFrame } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from './Styleguide-Specimen';

type StyleguideEditFrameProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
  children: React.ReactNode;
};

const StyleguideEditFrame = (props: StyleguideEditFrameProps): JSX.Element => (
  <StyleguideSpecimen {...props} e2eId="styleguide-editframe">
    <EditFrame {...getEditFrameProps(props.rendering.dataSource)}>
      Who framed Roger Rabbit? Hard to say. <br />
      But JSS now allows to edit frame any piece of content on a page in editing mode. <br />
      You can add web edit or field edit buttons, modify edit frames style through CSS class and put the frame wherever you need it.
      {props.children}
    </EditFrame>
  </StyleguideSpecimen>
);

const getEditFrameProps = (dataSource?: string) => {
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
  },
  {
    header: 'FieldEditButton',
    icon: '/~/icon/Office/16x16/pencil.png',
    fields: ['heading'],
    tooltip: 'Allows you to open field editor for specified fields',
  },
];

export default withDatasourceCheck()<StyleguideEditFrameProps>(StyleguideEditFrame);

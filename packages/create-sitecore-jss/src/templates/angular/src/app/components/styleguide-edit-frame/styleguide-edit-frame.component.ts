import { Component, OnInit, Input } from '@angular/core';
import {
  ComponentRendering,
  EditFrameDataSource,
  FieldEditButton,
  getFieldValue,
  LayoutServiceContextData,
  RouteData,
  WebEditButton
} from '@sitecore-jss/sitecore-jss-angular';
import { JssContextService } from '../../jss-context.service';

interface EditFrameProps {
  dataSource: EditFrameDataSource;
  buttons: (FieldEditButton | WebEditButton | '|')[];
  title: string;
  tooltip: string;
  cssClass: string;
  parameters: object;
}

/**
 * A sample component to describe Edit Frame usage with JSS.
 * Edit Frame would simply output child content in normal mode.
 * In editing mode it will output markup for Edit Frame that will wrap the child content.
 * Edit buttons, custom CSS and datasource can be applied.
 */
@Component({
  selector: 'app-styleguide-edit-frame',
  templateUrl: './styleguide-edit-frame.component.html',
})
export class StyleguideEditFrameComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  context:  LayoutServiceContextData & {
    route: RouteData<unknown> | null;
  };

  editFrameProps: EditFrameProps;

  applyRed: boolean;
  
  editFrameButtons = [
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

  constructor(private jssContext: JssContextService) { }

  ngOnInit() {
    this.jssContext.state.subscribe((state) => {
      this.context = state.sitecore;
    });
    this.applyRed = getFieldValue<number>(this.rendering, 'applyRedToText') ? true: false;
    this.editFrameProps = this.getEditFrameProps(this.rendering.dataSource);
  }

  getEditFrameProps(dataSource?: string) {
    return {
      dataSource: dataSource
        ? {
            itemId: dataSource,
            // databaseName: 'web',
            // language: 'en', // optional params you can also set for datasource
          }
        : undefined, // datasource will set the item to be edited by edit frame
      buttons: this.editFrameButtons, // add custom editing functionality or edit field sets with buttons
      title: 'jssEditFrame',
      tooltip: 'Perform editing anywhere while not tied to a rendering, placeholder or field',
      cssClass: 'jss-edit-frame', // customize edit frame appearance through CSS
      parameters: {}, // set additional parameters when needed
      sitecore: this.context,
    };
  };
}

import { Component, Input, OnChanges } from '@angular/core';
import {
  EditFrameDataSource,
  FieldEditButton,
  WebEditButton,
  EditFrameButton,
  DefaultEditFrameButtonIds,
  isWebEditButton,
  commandBuilder,
} from '@sitecore-jss/sitecore-jss/utils';
import { LayoutServiceContextData, RouteData } from '@sitecore-jss/sitecore-jss/layout';

@Component({
  selector: 'sc-edit-frame,[sc-edit-frame]',
  template:
    '<div *ngIf="isEditing; else elseBlock" {{...frameProps}}><span class="scChromeData">{{chromeData}}</span><ng-content></ng-content></div><ng-template #elseBlock><ng-content></ng-content></ng-template>',
})
export class EditFrameComponent implements OnChanges {
  @Input() dataSource: EditFrameDataSource;

  @Input() buttons: (FieldEditButton | WebEditButton | '|')[];

  @Input() title: string;

  @Input() tooltip: string;

  @Input() cssClass: string;

  @Input() parameters: Record<string, string | number | boolean | undefined | null>;

  @Input() sitecore: LayoutServiceContextData & {
    route: RouteData | null;
  };

  isEditing = false;
  frameProps: Record<string, unknown> = {};
  chromeData = '';

  ngOnChanges() {
    this.isEditing = this.sitecore.context.pageEditing || false;
    if (!this.isEditing) {
      return;
    }

    const commandData: Record<string, unknown> = {
      displayName: this.title,
      expandedDisplayName: this.tooltip,
    };

    this.frameProps.class = 'scLooseFrameZone';
    if (this.cssClass) {
      this.frameProps.class = `${this.frameProps.class} ${this.cssClass}`;
    }

    // item uri for edit frame target
    if (this.dataSource) {
      const route = this.sitecore.route;
      const databaseName = this.dataSource.databaseName || route?.databaseName;
      const language = this.dataSource.language || this.sitecore.context.language;
      this.frameProps.sc_item = `sitecore://${databaseName}/${this.dataSource.itemId}?lang=${language}`;
      commandData.contextItemUri = this.frameProps.sc_item;
    }

    commandData.commands = this.buttons?.map(
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
          return commandBuilder(value, this.dataSource?.itemId, this.parameters);
        } else {
          const fieldsString = value.fields.join('|');
          const editButton: WebEditButton = {
            click: `webedit:fieldeditor(command=${DefaultEditFrameButtonIds.edit},fields=${fieldsString})`,
            ...value,
          };

          return commandBuilder(editButton, this.dataSource?.itemId, this.parameters);
        }
      }
    );

    this.chromeData = JSON.stringify(commandData);
  }
}

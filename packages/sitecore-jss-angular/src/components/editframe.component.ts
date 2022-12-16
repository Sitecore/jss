import { Component, Input, OnChanges } from '@angular/core';
import {
  EditFrameDataSource,
  ChromeCommand,
  EditButtonTypes,
  mapButtonToCommand,
} from '@sitecore-jss/sitecore-jss/utils';
import { LayoutServiceContextData, RouteData } from '@sitecore-jss/sitecore-jss/layout';

@Component({
  selector: 'sc-edit-frame,[sc-edit-frame]',
  template:
    '<div *ngIf="isEditing; else elseBlock" {{...frameProps}}><span class="scChromeData">{{chromeData}}</span><ng-content></ng-content></div><ng-template #elseBlock><ng-content></ng-content></ng-template>',
})
export class EditFrameComponent implements OnChanges {
  @Input() dataSource: EditFrameDataSource;

  @Input() buttons: EditButtonTypes[];

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

    const chromeData: Record<string, unknown> = {
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
      chromeData.contextItemUri = this.frameProps.sc_item;
    }

    chromeData.commands = this.buttons?.map(
      (value): ChromeCommand => {
        return mapButtonToCommand(value, this.dataSource?.itemId, this.parameters);
      }
    );

    this.chromeData = JSON.stringify(chromeData);
  }
}

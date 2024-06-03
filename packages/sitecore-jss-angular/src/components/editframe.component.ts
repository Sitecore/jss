import { Component, Input, OnChanges } from '@angular/core';
import {
  EditFrameDataSource,
  ChromeCommand,
  EditButtonTypes,
  mapButtonToCommand,
} from '@sitecore-jss/sitecore-jss/editing';
import { LayoutServiceContextData, RouteData } from '@sitecore-jss/sitecore-jss/layout';

@Component({
  selector: 'sc-edit-frame,[sc-edit-frame]',
  template: `
    <ng-template #childContent>
      <ng-content></ng-content>
    </ng-template>
    <div
      *ngIf="isEditing; else elseBlock"
      [class]="frameProps.class"
      [attr.sc_item]="frameProps.sc_item"
    >
      <span class="scChromeData">{{ chromeData }}</span>
      <ng-container *ngTemplateOutlet="childContent"></ng-container>
    </div>
    <ng-template #elseBlock>
      <ng-container *ngTemplateOutlet="childContent"></ng-container>
    </ng-template>
  `,
})
export class EditFrameComponent implements OnChanges {
  @Input() dataSource: EditFrameDataSource;

  @Input() buttons: EditButtonTypes[];

  @Input() title: string;

  @Input() tooltip: string;

  @Input() cssClass: string;

  @Input() parameters: Record<string, string | number | boolean | undefined | null>;

  @Input() sitecore: LayoutServiceContextData & {
    route: RouteData<unknown> | null;
  };

  isEditing = false;
  frameProps: Record<string, unknown> = {};
  chromeData = '';

  ngOnChanges() {
    this.isEditing = this.sitecore.context.pageEditing || false;
    if (!this.isEditing) {
      return;
    }

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
    }

    this.chromeData = this.buildChromeData();
  }

  buildChromeData() {
    const chromeData: Record<string, unknown> = {
      displayName: this.title,
      expandedDisplayName: this.tooltip,
    };

    if (this.dataSource) {
      chromeData.contextItemUri = this.frameProps.sc_item;
    }

    chromeData.commands = this.buttons?.map(
      (value): ChromeCommand => {
        return mapButtonToCommand(value, this.dataSource?.itemId, this.parameters);
      }
    );

    return JSON.stringify(chromeData);
  }
}

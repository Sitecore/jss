import { Component, Input } from '@angular/core';
import { JssService } from '../../jss.service';
import { LayoutService } from '../../layout.service';
import { MatDialog } from '@angular/material';
import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
  /* tslint:disable-next-line */
  selector: 'div [app-download-callout]',
  templateUrl: './download-callout.component.html',
  styleUrls: ['./download-callout.component.css']
})
export class DownloadCalloutComponent {
  @Input() rendering: any;

  constructor(
    private jssService: JssService,
    private layoutService: LayoutService,
    private dialog: MatDialog,
  ) { }

  openDownloadDialog() {
    const jssState = this.jssService.state.getValue();
    this.layoutService.getItemData('/content/forms/download', jssState.language).subscribe((itemData) => {
      this.dialog.open(ModalContentComponent, {
        data: itemData
      });
    });
  }

}

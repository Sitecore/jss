import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { CloudSdkInitComponent } from './cloud-sdk-init.component';
import { CdpPageViewComponent } from './cdp-page-view.component';

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  imports: [CommonModule, JssModule, CloudSdkInitComponent, CdpPageViewComponent]
})
export class ScriptsComponent {}


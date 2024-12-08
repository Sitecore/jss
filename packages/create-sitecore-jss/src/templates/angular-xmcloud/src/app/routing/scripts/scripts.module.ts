import { NgModule } from '@angular/core';
import { ScriptsComponent } from './scripts.component';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { CloudSdkInitComponent } from './cloud-sdk-init.component';
import { CdpPageViewComponent } from './cdp-page-view.component';

@NgModule({
  exports: [ScriptsComponent],
  imports: [JssModule],
  declarations: [ScriptsComponent, CloudSdkInitComponent, CdpPageViewComponent],
})
export class ScriptsModule {}

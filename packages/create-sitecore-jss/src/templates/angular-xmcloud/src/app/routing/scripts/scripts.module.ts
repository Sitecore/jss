import { NgModule } from '@angular/core';
import { ScriptsComponent } from './scripts.component';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';

@NgModule({
  exports: [ScriptsComponent],
  imports: [JssModule],
  declarations: [ScriptsComponent],
})
export class ScriptsModule {}

import { NgModule } from '@angular/core';
import { ScriptsComponent } from './scripts.component';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';

@NgModule({
  imports: [JssModule, ScriptsComponent],
  exports: [ScriptsComponent],
})
export class ScriptsModule {}

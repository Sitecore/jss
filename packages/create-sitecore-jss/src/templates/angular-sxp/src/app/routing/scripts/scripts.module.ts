import { NgModule } from '@angular/core';
import { ScriptsComponent } from './scripts.component';
import { VisitorIdentificationComponent } from './visitor-identification/visitor-identification.component';

@NgModule({
  exports: [ScriptsComponent],
  declarations: [ScriptsComponent, VisitorIdentificationComponent],
})
export class ScriptsModule {}

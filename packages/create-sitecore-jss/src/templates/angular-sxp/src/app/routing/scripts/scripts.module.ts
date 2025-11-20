import { NgModule } from '@angular/core';
import { ScriptsComponent } from './scripts.component';
import { VisitorIdentificationComponent } from './visitor-identification/visitor-identification.component';

@NgModule({
  imports: [ScriptsComponent, VisitorIdentificationComponent],
  exports: [ScriptsComponent],
})
export class ScriptsModule {}

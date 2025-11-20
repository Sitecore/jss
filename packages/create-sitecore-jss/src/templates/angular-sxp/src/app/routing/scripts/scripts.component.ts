import { Component } from '@angular/core';
import { VisitorIdentificationComponent } from './visitor-identification/visitor-identification.component';

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  imports: [VisitorIdentificationComponent]
})
export class ScriptsComponent {}


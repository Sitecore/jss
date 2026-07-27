import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  imports: [CommonModule, JssModule]
})
export class ScriptsComponent {}


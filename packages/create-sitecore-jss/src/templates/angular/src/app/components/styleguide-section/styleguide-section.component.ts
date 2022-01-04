import { Component, Input, OnInit } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

/**
 * Represents a category of styleguide specimens within the Styleguide-Layout.
 * Usage examples are added to the `styleguide-section` placeholder that this
 * exposes.
 */
@Component({
  selector: 'app-styleguide-section',
  templateUrl: './styleguide-section.component.html',
})
export class StyleguideSectionComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  id: string;

  ngOnInit() {
    this.id = `i${this.rendering.uid.replace(/[{}]/g, '')}`;
  }
}

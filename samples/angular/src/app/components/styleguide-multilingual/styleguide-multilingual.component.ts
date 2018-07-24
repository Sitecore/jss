import { Component, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Demonstrates using the dictionary functionality and defining route data in
 * multiple languages.
 */
@Component({
  selector: 'app-styleguide-multilingual',
  templateUrl: './styleguide-multilingual.component.html',
})
export class StyleguideMultilingualComponent {
  @Input() rendering: ComponentRendering;

  // inject ngx-translate service to get translation state
  // (in this example, the current language)
  constructor(public translate: TranslateService) { }
}

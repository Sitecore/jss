import { Component, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { TranslateService } from '@ngx-translate/core';
import { JssContextService } from '../../jss-context.service';

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

  LANG_REGEXP = /^\/([a-zA-Z]{2}(-[a-zA-Z]{2})?)/;
  // inject ngx-translate service to get translation state
  // (in this example, the current language)
  constructor(public translate: TranslateService, private jssService: JssContextService) { }

  switchLanguage(ev: Event) {
    const href = (ev.target as HTMLAnchorElement).getAttribute('href');
    const language = href.match(this.LANG_REGEXP)[1];
    this.jssService.changeLanguage(language);
  }
}

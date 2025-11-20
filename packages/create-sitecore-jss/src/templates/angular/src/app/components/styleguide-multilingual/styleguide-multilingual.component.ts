import { Component, Input, inject } from '@angular/core';
import { ComponentRendering, JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { JssContextService } from '../../jss-context.service';
import { StyleguideSpecimenComponent } from '../shared/styleguide-specimen/styleguide-specimen.component';

/**
 * Demonstrates using the dictionary functionality and defining route data in
 * multiple languages.
 */
@Component({
  selector: 'app-styleguide-multilingual',
  templateUrl: './styleguide-multilingual.component.html',
  imports: [JssModule, TranslateModule, StyleguideSpecimenComponent]
})
export class StyleguideMultilingualComponent {
  @Input() rendering: ComponentRendering;

  LANG_REGEXP = /^\/([a-zA-Z]{2}(-[a-zA-Z]{2})?)/;
  // inject ngx-translate service to get translation state
  // (in this example, the current language)
  public translate = inject(TranslateService);
  private jssService = inject(JssContextService);

  switchLanguage(ev: Event) {
    const href = (ev.target as HTMLAnchorElement).getAttribute('href');
    const language = href.match(this.LANG_REGEXP)[1];
    this.jssService.changeLanguage(language);
  }
}

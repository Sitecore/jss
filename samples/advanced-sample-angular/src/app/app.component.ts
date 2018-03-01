import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JssService } from './jss.service';
import { environment as env } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  year = new Date().getFullYear();

  constructor(
    translate: TranslateService,
    jssService: JssService,
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(env.defaultLanguage);

    // the lang to use. if the lang isn't available, it will use the current loader to get them
    translate.use(env.defaultLanguage);

    jssService.state.subscribe(jssState => {
      // listen for language changes
      if (jssState.language) {
        translate.use(jssState.language);
      }
    });
  }
}

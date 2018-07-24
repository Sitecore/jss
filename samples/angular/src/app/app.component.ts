import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JssContextService } from './jss-context.service';
import { environment as env } from '../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  private contextSubscription: Subscription;

  constructor(
    translate: TranslateService,
    jssContextService: JssContextService,
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(env.defaultLanguage);

    // the lang to use. if the lang isn't available, it will use the current loader to get them
    translate.use(env.defaultLanguage);

    this.contextSubscription = jssContextService.state.subscribe(jssState => {
      // listen for language changes
      if (jssState.language) {
        translate.use(jssState.language);
      }
    });
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }
}

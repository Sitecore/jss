import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JssContextService } from './jss-context.service';
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

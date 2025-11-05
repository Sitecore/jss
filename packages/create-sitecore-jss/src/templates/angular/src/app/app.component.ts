import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { JssContextService } from './jss-context.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterModule]
})
export class AppComponent implements OnInit, OnDestroy {
  private contextSubscription: Subscription;
  private translate = inject(TranslateService);
  private jssContextService = inject(JssContextService);

  ngOnInit() {
    this.contextSubscription = this.jssContextService.state.subscribe((jssState: { language: string }) => {
      // listen for language changes
      if (jssState.language) {
        this.translate.use(jssState.language);
      }
    });
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }
}

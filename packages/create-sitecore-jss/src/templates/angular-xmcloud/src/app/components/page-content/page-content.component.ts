import { Component, OnDestroy, OnInit } from '@angular/core';
import { RichTextField } from '@sitecore-jss/sitecore-jss-angular';
import { JssContextService } from '../../jss-context.service';
import { SxaComponent } from './../sxa.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
})
export class PageContentComponent extends SxaComponent implements OnInit, OnDestroy {
  content?: RichTextField;
  contextContent?: RichTextField;
  private contextSubscription: Subscription;

  constructor(private jssContext: JssContextService) {
    super();
  }
  ngOnInit() {
    super.ngOnInit();

    this.content = this.rendering.fields?.Content as RichTextField;
    this.contextSubscription = this.jssContext.state.subscribe((newState) => {
      this.contextContent =
        newState.sitecore && (newState.sitecore.route.fields.Content as RichTextField);
    });
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }
}

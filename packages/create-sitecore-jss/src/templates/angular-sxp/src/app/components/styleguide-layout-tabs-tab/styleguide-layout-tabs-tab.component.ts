import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { JssContextService } from '../../jss-context.service';
import { Subscription } from 'rxjs';

/**
 * This is a single tab within the tabs sample component. These are added to the tabs placeholder.
 * This component demonstrates conditionally altering rendering when in the Sitecore Experience Editor to improve
 * author experience.
 */
@Component({
  selector: 'app-styleguide-layout-tabs-tab',
  templateUrl: './styleguide-layout-tabs-tab.component.html',
})
export class StyleguideLayoutTabsTabComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  isEditing = false;
  private contextSubscription: Subscription;

  constructor(private jssContext: JssContextService) { }

  ngOnInit() {
    // to get access to route-level data from Sitecore such as route item fields or
    // whether the page is in edit or preview display modes, you can subscribe
    // to the JSS context service. See styleguide-sitecore-context for more details.
    // Don't forget to unsubscribe in ngOnDestroy() when using the subscription to avoid resource issues.
    this.contextSubscription = this.jssContext.state.subscribe((newState) => {
      this.isEditing = newState.sitecore && newState.sitecore.context.pageEditing;
    });
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }
}

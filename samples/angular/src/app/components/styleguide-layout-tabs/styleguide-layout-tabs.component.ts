import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ComponentRendering, getChildPlaceholder } from '@sitecore-jss/sitecore-jss-angular';
import { JssContextService } from '../../jss-context.service';
import { Subscription } from 'rxjs';

/**
 * Demonstrates advanced component techniques in JSS.
 * This example implements a simple-looking tabs component.
 * Each tab is itself a child component added to a placeholder defined on the tabs component.
 * The tab component introspects its child components to render the tab headings
 * (i.e. the tab children render partial content in two places).
 * When this component is edited in Sitecore Experience Editor, the tabbing behavior is turned off and each tab stacks on top of each other
 * for easy inline editing.
 */
@Component({
  selector: 'app-styleguide-layout-tabs',
  templateUrl: './styleguide-layout-tabs.component.html',
})
export class StyleguideLayoutTabsComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  tabs: ComponentRendering[];
  activeTab: ComponentRendering;
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

    this.update();
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }

  update() {
    this.tabs = getChildPlaceholder(this.rendering, 'JssAngularWeb-jss-tabs').filter((tab: ComponentRendering) => tab.fields) as ComponentRendering[];

    if (!this.activeTab && this.tabs.length > 0) {
      this.activeTab = this.tabs[0];
    }
  }
}

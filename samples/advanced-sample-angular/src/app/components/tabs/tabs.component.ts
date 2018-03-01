import { Component, Input, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { JssService } from '../../jss.service';

@Component({
  /* tslint:disable-next-line */
  selector: 'div [app-tabs]',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent implements OnInit {
  @Input() public rendering: any;

  public tabs: any[];
  public activeIndex = 0;
  public pageEditing: boolean;

  // sc-placeholder allows us to bind to Input and Output
  // properties on the components it renders
  public tabInputs: {
    activeTab: any
  };
  public tabOutputs = {
    onNext: (nextEvent) => this.nextTab()
  };

  @HostBinding('class.tabs') tabsCss = true;

  constructor(
    private jssService: JssService,
  ) {
    this.jssService.state.subscribe(jssState => {
      this.pageEditing = jssState.sitecore.context.pageEditing;
    });
  }

  ngOnInit() {
    if (this.rendering && this.rendering.placeholders && this.rendering.placeholders.tabs) {
      // demonstrates that you can use the layout data programmatically
      this.tabs = this.rendering.placeholders.tabs;
      this.tabInputs = {
        activeTab: this.tabs[this.activeIndex]
      };
    }
  }

  activateTab(tab: any, index: number) {
    this.tabInputs.activeTab = tab;
    this.activeIndex = index;
  }

  nextTab() {
    if (this.activeIndex === this.tabs.length - 1) {
      this.activeIndex = 0;
    } else {
      this.activeIndex++;
    }
    this.tabInputs.activeTab = this.tabs[this.activeIndex];
  }
}

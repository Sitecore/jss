import { Component, Input, Output, EventEmitter } from '@angular/core';
import { JssService } from '../../jss.service';

@Component({
  /* tslint:disable-next-line */
  selector: 'div [app-tab]',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {
  private get tabName(): string {
    return this.rendering.fields.title.value;
  }

  @Input() rendering: any;
  @Input() activeTab: any;
  @Output() onNext = new EventEmitter();
  pageEditing: boolean;

  constructor(
    private jssService: JssService,
  ) {
    this.jssService.state.subscribe(jssState => {
      this.pageEditing = jssState.sitecore.context.pageEditing;
    });
  }

  isActive() {
    return this.pageEditing || this.activeTab.fields.title.value === this.tabName;
  }

  next() {
    this.onNext.emit();
  }
}

import { Component, Input, HostBinding } from '@angular/core';
import { JssService } from '../../jss.service';

@Component({
  /* tslint:disable-next-line */
  selector: 'section [app-page-with-header]',
  templateUrl: './page-with-header.component.html',
  styleUrls: ['./page-with-header.component.css']
})
export class PageWithHeaderComponent {
  @Input() rendering: any;

  @HostBinding('id') domId = 'page';
  @HostBinding('class.page-container') pageContainerCss = true;

  constructor(
    private jssService: JssService,
  ) {
    this.jssService.state.subscribe(jssState => {
      if (jssState.sitecore && jssState.sitecore.route) {
        this.domId = `page-${jssState.sitecore.route.name}`;
      }
    });
  }
}

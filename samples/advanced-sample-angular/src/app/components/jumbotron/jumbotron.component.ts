import { Component, Input } from '@angular/core';
import { JssService } from '../../jss.service';

@Component({
  /* tslint:disable-next-line */
  selector: 'div [app-jumbotron]',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css'],
})
export class JumbotronComponent {
  @Input() rendering: any;
  routeFields: {
    titleText: any,
    body: any
  };

  constructor(
    private jssService: JssService,
  ) {
    // utilize JssService to retrieve current layout service state
    this.jssService.state.subscribe(jssState => {
      if (jssState.sitecore) {
        this.routeFields = jssState.sitecore.route.fields;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { JssState } from '../../jss.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jss-route',
  templateUrl: './jss-route.component.html',
})
export class JssRouteComponent implements OnInit {
  route: any;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // route data is populated by the JssRouteResolver
    this.activatedRoute.data.subscribe((data: { jssState: JssState }) => {
      if (!data.jssState) {
        return;
      }
      this.route = data.jssState.sitecore.route;
      console.log('JSS route loaded', JSON.stringify(data.jssState, null, 2));
    });
  }
}

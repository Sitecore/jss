import { Component, OnInit } from '@angular/core';
import { JssState } from '../../jss.service';
import { ActivatedRoute } from '@angular/router';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-jss-route',
  templateUrl: './jss-route.component.html',
})
export class JssRouteComponent implements OnInit {
  route: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly meta: MetaService
  ) { }

  ngOnInit() {
    // route data is populated by the JssRouteResolver
    this.activatedRoute.data.subscribe((data: { jssState: JssState }) => {
      if (!data.jssState) {
        return;
      }
      this.route = data.jssState.sitecore.route;
      this.setMetadata(this.route.fields);
      console.log(JSON.stringify(data.jssState, null, 2));
    });
  }

  setMetadata(routeFields: { metaTitle: any }) {
    if (routeFields && routeFields.metaTitle) {
      this.meta.setTitle(routeFields.metaTitle.value);
    }
  }

}

import { Component, Input } from '@angular/core';
import { JssNavItem } from '../../jss.service';
import { JssRouteBuilderService, JssRoute } from '../../jss-route-builder.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav-item',
  templateUrl: './main-nav-item.component.html',
})
export class MainNavItemComponent {
  @Input() navItem: JssNavItem;
  @Input() language: string;
  @Input() single = false;

  constructor(
    private router: Router,
    private urlBuilder: JssRouteBuilderService,
  ) { }

  changeRoute(navItem: JssNavItem) {
    const jssRoute = new JssRoute();
    jssRoute.language = this.language;
    jssRoute.serverRoute = navItem.path;
    this.router.navigateByUrl(this.urlBuilder.buildRouteUrl(jssRoute));
  }
}

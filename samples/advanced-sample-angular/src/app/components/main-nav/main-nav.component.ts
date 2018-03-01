import { Component, OnInit } from '@angular/core';
import { JssService, JssNavItem } from '../../jss.service';
import { SitecoreAuthService } from '../../sitecore-auth.service';
import { JssRouteBuilderService, JssRoute } from '../../jss-route-builder.service';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  homeItem: JssNavItem;
  navItems: JssNavItem[];
  language: string;
  serverRoute: string;
  pageEditing: boolean;
  currentUser: any;

  constructor(
    private jssService: JssService,
    private sitecoreAuthService: SitecoreAuthService,
    private router: Router,
    private urlBuilder: JssRouteBuilderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.jssService.state.subscribe(jssState => {
      this.language = jssState.language;
      this.serverRoute = jssState.serverRoute;
      if (jssState.sitecore) {
        this.pageEditing = jssState.sitecore.context.pageEditing;
        this.currentUser = jssState.sitecore.context.user;
        const navigation = jssState.sitecore.context.navigation;
        this.homeItem = navigation && navigation[0];
        // skip root/home item in nav
        this.navItems = navigation && navigation[0] && navigation[0].children;
      }
    });
  }

  changeLanguage(language: string) {
    const jssRoute = new JssRoute();
    jssRoute.language = language;
    jssRoute.serverRoute = this.serverRoute;
    this.router.navigateByUrl(this.urlBuilder.buildRouteUrl(jssRoute));
  }

  openLogin() {
    this.dialog.open(LoginModalComponent);
  }

  logout() {
    this.sitecoreAuthService.logout().subscribe(() => {
      const logoutUser = this.currentUser.name;
      // reload current route
      this.router.navigateByUrl(this.router.url);
      // display success message
      this.translate.get('LogoutSuccess', { user: logoutUser }).subscribe((message) => {
        this.snackBar.open(message, null, {
          duration: 2000
        });
      });
    });
  }
}

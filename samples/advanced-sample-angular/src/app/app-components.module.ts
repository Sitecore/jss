import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { AppUxModule } from './app-ux.module';
import { AppJssInfrastructureModule } from './app-jss-infrastructure.module';

import { JssRouteComponent } from './components/jss-route/jss-route.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { PageWithHeaderComponent } from './components/page-with-header/page-with-header.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { DownloadCalloutComponent } from './components/download-callout/download-callout.component';
import { ModalContentComponent } from './components/modal-content/modal-content.component';
import { HeadingComponent } from './components/heading/heading.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MainNavItemComponent } from './components/main-nav/main-nav-item.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tab/tab.component';
import { RichTextComponent } from './components/rich-text/rich-text.component';
import { LinkButtonComponent } from './components/link-button/link-button.component';
import { FileLinkComponent } from './components/file-link/file-link.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';

@NgModule({
  imports: [
    FormsModule,
    AppUxModule,
    AppJssInfrastructureModule,
    JssModule.withComponents([
      { name: 'PageWithHeader', type: PageWithHeaderComponent },
      { name: 'Jumbotron', type: JumbotronComponent },
      { name: 'DownloadCallout', type: DownloadCalloutComponent },
      { name: 'Carousel', type: CarouselComponent },
      { name: 'ServiceList', type: ServiceListComponent },
      { name: 'Tabs', type: TabsComponent },
      { name: 'Tab', type: TabComponent },
      { name: 'Heading', type: HeadingComponent },
      { name: 'RichText', type: RichTextComponent },
      { name: 'LinkButton', type: LinkButtonComponent },
      { name: 'FileLink', type: FileLinkComponent },
    ]),
  ],
  exports: [
    AppUxModule,
    JssModule,
    MainNavComponent,
  ],
  declarations: [
    JssRouteComponent,
    NotFoundComponent,
    ServerErrorComponent,
    PageWithHeaderComponent,
    JumbotronComponent,
    DownloadCalloutComponent,
    ModalContentComponent,
    HeadingComponent,
    MainNavComponent,
    MainNavItemComponent,
    CarouselComponent,
    ServiceListComponent,
    TabsComponent,
    TabComponent,
    RichTextComponent,
    LinkButtonComponent,
    FileLinkComponent,
    LoginModalComponent,
  ],
  entryComponents: [
    ModalContentComponent,
    LoginModalComponent,
  ],
})
export class AppComponentsModule { }

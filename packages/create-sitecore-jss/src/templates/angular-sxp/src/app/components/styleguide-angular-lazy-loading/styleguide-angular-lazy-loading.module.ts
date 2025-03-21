import { NgModule } from '@angular/core';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { StyleguideAngularLazyLoadingComponent } from './styleguide-angular-lazy-loading.component';
import { AppComponentsSharedModule } from '../app-components.shared.module';

// By default, the presence of a module in a component folder like this one makes JSS
// lazy-load the component. This module works a lot like angular route-based lazy loading.

@NgModule({
  imports: [
    // this call signals to JSS that this component is the one being lazy loaded by this module
    JssModule.forChild(StyleguideAngularLazyLoadingComponent),
    AppComponentsSharedModule
  ],
  declarations: [
    StyleguideAngularLazyLoadingComponent,
  ],
})
export class StyleguideAngularLazyLoadingModule { }

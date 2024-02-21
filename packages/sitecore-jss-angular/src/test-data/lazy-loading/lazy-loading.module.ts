import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JssModule } from '../../lib.module';
import { MockService } from './mock.service';
import { LazyComponent } from './lazy-component.component';

/**
 * This module is used to test Lazy loading of components:
 * - default
 * - with resolve
 * - with canActivate
 * - with canActivate returning UrlTree
 * - with canActivate returning url string
 * - with canActivate returning unknown
 */
@NgModule({
  imports: [
    CommonModule,
    JssModule.forChild({
      LazyComponent: LazyComponent,
      Jumbotron: LazyComponent,
      JumbotronResolve: LazyComponent,
      JumbotronCanActivate: LazyComponent,
      JumbotronCanActivateUrlTree: LazyComponent,
      JumbotronCanActivateUrlString: LazyComponent,
      JumbotronCanActivateUnknown: LazyComponent,
    }),
  ],
  providers: [MockService],
})
export class TestLazyLoadingModule {}

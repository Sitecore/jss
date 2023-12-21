import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideLazyLoad } from '../services/lazy-load';
import { TestJumbotronComponent } from './test-jumbotron.component';

@NgModule({
  imports: [
    CommonModule,
    provideLazyLoad({
      Jumbotron: TestJumbotronComponent,
      JumbotronResolve: TestJumbotronComponent,
      JumbotronCanActivate: TestJumbotronComponent,
      JumbotronCanActivateUrlTree: TestJumbotronComponent,
      JumbotronCanActivateUrlString: TestJumbotronComponent,
      JumbotronCanActivateUnknown: TestJumbotronComponent,
    }),
  ],
})
export class TestJumbotronLazyModule {}

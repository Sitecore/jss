import { NgModule } from '@angular/core';
import { MockService } from './mock.service';
import { LazyComponent } from './lazy-component.component';
import { JssModule } from '../lib.module';

@NgModule({
  imports: [JssModule.forChild(LazyComponent)],
  declarations: [LazyComponent],
  providers: [MockService],
})
export class AngularLazyLoadingModule {}

import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JssService } from './jss.service';
import { LayoutService } from './layout.service';

@NgModule({
  providers: [
    JssService,
    {
      provide: LayoutService,
      useFactory: (httpClient: HttpClient) => {
        return new LayoutService();
      },
      deps: [HttpClient]
    }
  ],
})
export class AppJssInfrastructureModule { }

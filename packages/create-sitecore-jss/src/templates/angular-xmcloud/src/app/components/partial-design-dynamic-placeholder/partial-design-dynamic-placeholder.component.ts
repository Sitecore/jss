import { Component, OnInit } from '@angular/core';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { SxaComponent } from '../sxa.component';

@Component({
  selector: 'app-partial-design-dynamic-placeholder',
  templateUrl: './partial-design-dynamic-placeholder.component.html',
  imports: [JssModule]
})
export class PartialDesignDynamicPlaceholderComponent extends SxaComponent implements OnInit {
  sig: string;
  ngOnInit() {
    super.ngOnInit();

    this.sig = this.rendering.params?.sig || '';
  }
}

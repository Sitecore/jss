import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { StyleguideSpecimenComponent } from '../shared/styleguide-specimen/styleguide-specimen.component';

@Component({
  selector: 'app-styleguide-component-params',
  templateUrl: './styleguide-component-params.component.html',
  imports: [StyleguideSpecimenComponent]
})
export class StyleguideComponentParamsComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  cssClass: string;
  useCta: string;
  useCtaType: string;
  columns: number;
  columnsArray: number[];

  ngOnInit() {
    this.cssClass = this.rendering.params.cssClass;
    this.useCta = this.rendering.params.useCallToAction;
    this.useCtaType = typeof this.rendering.params.useCallToAction;
    this.columns = parseInt(this.rendering.params.columns, 10);
    this.columnsArray = Array.from(Array(this.columns), (_, index) => index);
  }
}

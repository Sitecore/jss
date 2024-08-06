import { OnInit, Input, Directive } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Directive()
export abstract class SxaComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  id?: string;
  styles?: string;

  ngOnInit() {
    this.id = this.rendering.params?.RenderingIdentifier;
    this.styles = this.rendering.params?.styles;
  }
}

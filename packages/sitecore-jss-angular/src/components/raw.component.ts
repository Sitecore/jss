import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { HtmlElementRendering } from '@sitecore-jss/sitecore-jss';

@Component({
  selector: 'sc-raw',
  template: '',
})
export class RawComponent implements OnInit {
  @Input() rendering: HtmlElementRendering;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit() {
    const el = this.renderer.createElement(this.rendering.name);
    const contents = this.renderer.createText(this.rendering.contents || '');
    const attributes = this.rendering.attributes;
    for (const attr in attributes) {
      // eslint-disable-next-line no-prototype-builtins
      if (attributes.hasOwnProperty(attr)) {
        const value = attributes[attr];
        this.renderer.setAttribute(el, attr, value || '');
      }
    }

    this.renderer.appendChild(el, contents);
    const parentNode = this.renderer.parentNode(this.elementRef.nativeElement);
    this.renderer.insertBefore(parentNode, el, this.elementRef.nativeElement);
    parentNode.removeChild(this.elementRef.nativeElement);
  }
}

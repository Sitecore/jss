import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Field } from '@sitecore-jss/sitecore-jss-angular';
import { SxaComponent } from '../sxa.component';

@Component({
  selector: 'app-richtext',
  templateUrl: './richtext.component.html',
  styles: [
    `
      :host(.footer-richtext) {
        width: 17%;
        display: inline-block;
      }

      :host(.footer-richtext) ::ng-deep > * {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      :host(.footer-richtext) ::ng-deep > *:nth-child(2) {
        order: -1;
      }

      @media (max-width: 992px) {
        :host(.footer-richtext) {
          width: 100%;
        }
      }
    `,
  ],
})
export class RichTextComponent extends SxaComponent implements OnInit {
  text?: Field<string>;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.text = this.rendering.fields?.Text as Field<string>;

    let parent = this.el.nativeElement.parentElement;

    while (parent) {
      if (parent.id === 'footer') {
        this.renderer.addClass(this.el.nativeElement, 'footer-richtext');
        break;
      } else if (parent.id === 'header') {
        this.renderer.addClass(this.el.nativeElement, 'header-richtext');
        break;
      }
      parent = parent.parentElement;
    }
  }
}

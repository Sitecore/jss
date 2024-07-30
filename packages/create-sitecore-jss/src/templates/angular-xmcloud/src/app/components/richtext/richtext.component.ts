import { Component, Input, OnInit } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
})
export class RichTextComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  text: string;
  id: string;
  styles: string;

  ngOnInit() {
    this.text = this.rendering.fields.Text;
    this.id = this.rendering.params.RenderingIdentifier;
    this.styles = this.rendering.params?.styles?.trimEnd();
  }
}

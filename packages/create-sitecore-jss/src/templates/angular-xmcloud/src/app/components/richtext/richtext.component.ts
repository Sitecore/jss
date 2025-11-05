import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { Field } from '@sitecore-jss/sitecore-jss-angular';
import { SxaComponent } from '../sxa.component';

@Component({
  selector: 'app-richtext',
  templateUrl: './richtext.component.html',
  imports: [CommonModule, JssModule],
  host: {
    'class': 'component rich-text',
    '[class]': "styles",
    "[attr.id]": "id"
  },
})
export class RichTextComponent extends SxaComponent implements OnInit {
  text?: Field<string>;

  ngOnInit() {
    super.ngOnInit();
    this.text = this.rendering.fields?.Text as Field<string>;
  }
}

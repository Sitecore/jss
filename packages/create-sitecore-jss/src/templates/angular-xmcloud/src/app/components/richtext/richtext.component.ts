import { Component, OnInit } from '@angular/core';
import { Field } from '@sitecore-jss/sitecore-jss-angular';
import { BaseSxaComponent } from '../base-sxa.component';

@Component({
  selector: 'app-richtext',
  templateUrl: './richtext.component.html',
})
export class RichTextComponent extends BaseSxaComponent implements OnInit {
  text?: Field<string>;

  ngOnInit() {
    super.ngOnInit();
    this.text = this.rendering.fields?.Text as Field<string>;
  }
}

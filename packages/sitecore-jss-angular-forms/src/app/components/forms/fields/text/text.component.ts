import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField, TextViewModel } from '@sitecore-jss/sitecore-jss-forms';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html'
})
export class TextComponent implements OnInit {
  field: FormField<TextViewModel>;
  group: FormGroup;

  content: string;

  public constructor() { }

  public ngOnInit(): void { }
}

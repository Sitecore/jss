import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import {  } from '@angular-devkit/schematics';

function dasherize(str) {
  return str.replace(/[A-Z](?:(?=[^A-Z])|[A-Z]*(?=[A-Z][^A-Z]|$))/g, function (s, i) {
    return (i > 0 ? '-' : '') + s.toLowerCase();
  });
}

@Component({
  selector: 'app-styleguide-specimen',
  template: `
  <div class="pt-3" [id]="id">
    <h4 *scText="rendering.fields.heading"></h4>
    <div *scRichText="rendering.fields.description"></div>

    <p>
      <small>
        Implementation: <code>/src/app/components/{{ componentName }}/{{ componentName }}.component.ts</code>
        <br />
        Definition:
        <code>/sitecore/definitions/components/{{ componentName }}.sitecore.ts</code>
      </small>
    </p>
    <div class="border p-2"><ng-content></ng-content></div>
  </div>
  `
})
export class StyleguideSpecimenComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  id: string;
  componentName: string;

  constructor() { }

  ngOnInit() {
    this.id = `i${this.rendering.uid.replace(/[{}]/g, '')}`;
    this.componentName = dasherize(this.rendering.componentName);
  }
}

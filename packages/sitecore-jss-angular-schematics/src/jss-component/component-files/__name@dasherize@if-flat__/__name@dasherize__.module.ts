import { NgModule } from '@angular/core';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';

@NgModule({
  imports: [
    JssModule.forChild(<%= classify(name) %>Component)
  ],
  declarations: [
    <%= classify(name) %>Component
  ],
})
export class <%= classify(name) %>Module { }

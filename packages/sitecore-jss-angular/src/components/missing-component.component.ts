import { Component, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss';

@Component({
  selector: 'sc-missing-component',
  template: `
    <div
      style="background: darkorange; outline: 5px solid orange; padding: 10px; color: white; max-width: 500px;"
    >
      <h2>{{ rendering.componentName }}</h2>
      <p>JSS component is missing Angular component implementation.</p>
    </div>
  `,
})
export class MissingComponentComponent {
  @Input() rendering: ComponentRendering;
}

import { Component, HostBinding } from '@angular/core';
@Component({
  selector: 'sc-hidden-rendering',
  template: '',
})
export class HiddenRenderingComponent {
  @HostBinding('style') get style() {
    return 'display: block; height: 100px; background-image: linear-gradient(45deg, #ffffff 25%, #dcdcdc 25%, #dcdcdc 50%, #ffffff 50%, #ffffff 75%, #dcdcdc 75%, #dcdcdc 100%); background-size: 3px 3px;';
  }
}

export const HIDDEN_RENDERING_NAME = 'Hidden Rendering';

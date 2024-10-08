import { Component } from '@angular/core';

/**
 * Default component that will be rendered in pages when image field is empty.
 */
@Component({
  selector: '[sc-default-empty-image-field-editing-placeholder]',
  template: `
    <img
      alt=""
      src='data:image/svg+xml,%3Csvg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 240 240" style="enable-background:new 0 0 240 240;" xml:space="preserve"%3E%3Cstyle type="text/css"%3E .st0%7Bfill:none;%7D .st1%7Bfill:%23969696;%7D .st2%7Bfill:%23FFFFFF;%7D .st3%7Bfill:%23FFFFFF;stroke:%23FFFFFF;stroke-width:0.75;stroke-miterlimit:10;%7D%0A%3C/style%3E%3Cg%3E%3Crect class="st0" width="240" height="240"/%3E%3Cg%3E%3Cg%3E%3Crect x="20" y="20" class="st1" width="200" height="200"/%3E%3C/g%3E%3Cg%3E%3Ccircle class="st2" cx="174" cy="67" r="14"/%3E%3Cpath class="st2" d="M174,54c7.17,0,13,5.83,13,13s-5.83,13-13,13s-13-5.83-13-13S166.83,54,174,54 M174,52 c-8.28,0-15,6.72-15,15s6.72,15,15,15s15-6.72,15-15S182.28,52,174,52L174,52z"/%3E%3C/g%3E%3Cpolyline class="st3" points="29.5,179.25 81.32,122.25 95.41,137.75 137.23,91.75 209.5,179.75 "/%3E%3C/g%3E%3C/g%3E%3C/svg%3E'
      class="scEmptyImage"
    />
  `,
  styles: [
    `
      :host {
        min-width: 48px;
        min-height: 48px;
        max-width: 400px;
        max-height: 400px;
        cursor: pointer;
      }
    `,
  ],
})
export class DefaultEmptyImageFieldEditingComponent {}

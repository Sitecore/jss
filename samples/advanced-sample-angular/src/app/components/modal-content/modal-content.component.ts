import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
})
export class ModalContentComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
}

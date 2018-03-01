import { Component, Input, HostBinding } from '@angular/core';

@Component({
  /* tslint:disable-next-line */
  selector: 'ul [app-service-list]',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent {
  @Input() rendering: any;
  @HostBinding('class.service-list') serviceList = true;
}

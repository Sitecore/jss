import { Component, Inject } from '@angular/core';
import { RENDERING_PROPERTIES } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  copyright = 'Copyright Sitecore A/S';

  constructor(
    @Inject(RENDERING_PROPERTIES) public props: any
  ) {}
}

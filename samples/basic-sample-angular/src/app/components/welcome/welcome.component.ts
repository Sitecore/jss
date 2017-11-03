import { Component, Inject } from '@angular/core';
import { PLACEHOLDER_RENDERING } from '@sitecore-jss/sitecore-jss-angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  copyright = 'Copyright Sitecore A/S';

  constructor(
    @Inject(PLACEHOLDER_RENDERING) public rendering: any,
    public sanitizer: DomSanitizer
  ) { }
}

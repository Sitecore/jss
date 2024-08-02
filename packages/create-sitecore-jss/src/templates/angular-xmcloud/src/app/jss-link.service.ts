import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HTMLLink } from '@sitecore-jss/sitecore-jss-angular';

@Injectable()
export class JssLinkService {
  document: Document;

  constructor() {
    this.document = Inject(DOCUMENT);
  }

  addHeadLinks(headLinks: HTMLLink[]) {
    if (!headLinks || !headLinks.length) {
      return;
    }

    headLinks.forEach((headLink: HTMLLink) => {
      let link: HTMLLinkElement = this.document.createElement('link');
      link.setAttribute('rel', headLink.rel);
      link.setAttribute('href', headLink.href);
      this.document.head.appendChild(link);
    });
  }
}

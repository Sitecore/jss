import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HTMLLink } from '@sitecore-jss/sitecore-jss-angular';

@Injectable()
export class JssLinkService {
  document: Document;

  constructor() {
    this.document = Inject(DOCUMENT);
  }

  /**
   * Adds link elements in the document head.
   * @param headLinks - An array of HTMLLink objects to add to the head.
   */
  addHeadLinks(headLinks: HTMLLink[]) {
    if (!headLinks || !headLinks.length) {
      return;
    }

    headLinks.forEach((headLink: HTMLLink) => {
      this.createLink(headLink);
    });
  }

  /**
   * Creates a new link element and appends it to the head.
   * @param headLink - An HTMLLink object to be added.
   */
  private createLink(headLink: HTMLLink) {
    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', headLink.rel);
    link.setAttribute('href', headLink.href);
    this.document.head.appendChild(link);
  }

  /**
   * Removes all link elements that match the specified rel attribute.
   * @param rel - The rel attribute of the links to be removed.
   */
  removeLinksByRel(rel: string) {
    const links = this.document.head.querySelectorAll(`link[rel="${rel}"]`);
    links.forEach((link) => {
      this.document.head.removeChild(link);
    });
  }
}

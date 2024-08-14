import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HTMLLink } from '@sitecore-jss/sitecore-jss-angular';

@Injectable({
  providedIn: 'root',
})
export class JssLinkService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Adds link element in the document head.
   * @param headLinks - An array of HTMLLink objects to add to the head.
   */
  addHeadLinks(headLink: HTMLLink) {
    if (!headLink) {
      return;
    }

    // Check if a link with the same rel and href already exists
    if (this.isDuplicateLink(headLink)) {
      return;
    }

    this.createLink(headLink);
  }

  /**
   * Creates a new link element and appends it to the head.
   * @param headLink - An HTMLLink object to be added.
   */
  private createLink(headLink: HTMLLink) {
    if (!headLink.rel || !headLink.href) {
      console.log('Invalid link object:', headLink);
      return;
    }

    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', headLink.rel);
    link.setAttribute('href', headLink.href);
    this.document.head.appendChild(link);
  }

  /**
   * Checks for an existing link element with the same rel and href attributes.
   * @param headLink - An HTMLLink object to be checked.
   * @returns {boolean} - True if a matching link exists, false otherwise.
   */
  private isDuplicateLink(headLink: HTMLLink): boolean {
    const existingLink = this.document.head.querySelector(
      `link[rel='${headLink.rel}'][href='${headLink.href}']`
    );
    return !!existingLink;
  }
}

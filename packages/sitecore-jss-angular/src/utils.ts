import { isEditorActive } from '@sitecore-jss/sitecore-jss';

/**
 * @description in Experience Editor with an Angular sample app, anchor tags
 * with both onclick and href attributes will use the href, blocking the onclick from firing.
 * This function makes it so the anchor tags function as intended in an Angular sample when using Experience Editor
 * 
 * The Mutation Observer API is used to observe changes to the body, then select all elements with href="#" and an onclick,
 * and replaces the # value with javascript:void(0); which prevents the anchor tag from blocking the onclick event handler.
 * 
 */
export const handleEditorAnchors = () => {
    // Angular gives the href attribute priority over the onclick attribute if both are present, so we must replace
    // the href attribute to avoid overriding the onclick in Experience Editor
    if (window && isEditorActive()) {
      // Mutation Observer API: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/MutationObserver
      const targetNode: HTMLBodyElement = document.querySelector('body')!;
      const callback = (mutationList: MutationRecord[]) => {
        mutationList.forEach((mutation: MutationRecord) => {
          const btns: NodeListOf<HTMLAnchorElement> = (document.querySelectorAll('.scChromeDropDown > a[href="#"], a[onclick]'));
          switch(mutation.type) {
            case 'childList':
              btns.forEach((link: HTMLAnchorElement) => {
                  link.href = 'javascript:void(0);';
              });
              return;
            default:
              return;
          }
        });
      };
      const observer: MutationObserver = new MutationObserver(callback);
      const observerOptions = {
        childList: true,
        subtree: true
      };

      observer.observe(targetNode, observerOptions);
    }
}
---
name: terminology
routeTemplate: ./data/component-templates/guide.yml
title: Sitecore Terminology & Concepts
---

> This guide is for front-end developers who are new to the Sitecore world.

## Content Authors
Sitecore Business Users who manage content are called `Content Authors`. Sitecore provides two different types of content authoring interfaces.

Review this [overview of the authoring interfaces](https://doc.sitecore.com/users/100/sitecore-experience-platform/en/the-editing-tools.html) to understand how Content Authors will view the components you build.

---

## Experience Editor
[`Experience Editor`](https://doc.sitecore.com/users/100/sitecore-experience-platform/en/the-experience-editor.html) is a WYSIWYG (What You See Is What You Get) editor that allows Content Authors to easily make changes to components directly on the page. This includes adding/deleting components, moving components, and editing all visible values (text, media, etc).

Review this [overview of editing in Experience Editor](https://doc.sitecore.com/users/100/sitecore-experience-platform/en/edit-a-field-in-the-experience-editor.html) to understand how Content Authors will interact with and edit the components you build.

This topic is also covered in the [JSS Developer Trial guide](/connected-demo/explore-sitecore/experience-editor).

---

## Content Editor
[`Content Editor`](https://doc.sitecore.com/users/100/sitecore-experience-platform/en/the-content-editor.html) is a more advanced editor that allows authors to edit data directly, without the GUI elements of Experience Editor. This editor is more powerful, but it requires an understanding of the application's unique information architecture as it's easy to create invalid data structures that could break the front-end.

---

## Sitecore Renderings
Exported components need to make sense from the perspective of a Content Author; this is usually defined by the Business Analyst or Product Owner. You may create as many micro components as you wish to compose to the logical author-friendly blocks - the level of granularity is up to developers. But only the components that are specifically intended to be used by Content Authors should be exported by the `Component Factory`.
![Breaking up a page into author-friendly components](/assets/img/guides/terminology-components.png)

From Sitecore Content Authoring Documentation - [An overview of how authors edit the page in Experience Editor](https://doc.sitecore.com/users/100/sitecore-experience-platform/en/edit-a-field-in-the-experience-editor.html)

---

## The importance of locale
![A page defined for the en-US locale](/assets/img/guides/terminology-page-route-language.png)

---

## Placeholders
![How placeholders appear in an authoring interface](/assets/img/guides/terminology-placeholders.png)

### Nested Placeholders
![](/assets/img/guides/terminology-nested-placeholders.png)

---

## Presentations Details
![](/assets/img/guides/terminology-presentation-details.png)

---

## Sitecore Marketing Operations
When you begin working with JSS's Tracker API, it's a good idea to see what data the Tracker API drives on the Sitecore side, and how business users interact with it.

From Sitecore Business User Documentation - [An overview of marketing operations](https://doc.sitecore.com/users/100/sitecore-experience-platform/en/marketing-operations.html).

This topic is also covered in the [JSS Developer Trial guide](/connected-demo/explore-sitecore/launch-xprofile).
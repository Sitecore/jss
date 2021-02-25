---
name: content-authoring-concepts
routeTemplate: ./data/component-templates/article.yml
title: Content Authoring Concepts
---

# Content Authoring Terminology & Concepts
This page covers Sitecore-specific terms and concepts related to content authoring.

## Content Authors
Sitecore users who manage content are called **Content Authors**. Sitecore provides special content authoring interfaces that enable these users to perform tasks such as creating pages, adding components to pages, editing content displayed by the components, and defining personalization rules.

Review the following Sitecore documentation articles to understand how Content Authors work with the components that developers build.
- [Overview of the authoring interfaces](https://doc.sitecore.com/users/101/sitecore-experience-platform/en/the-editing-tools.html)
- [Overview of how authors edit the page in Experience Editor](https://doc.sitecore.com/users/101/sitecore-experience-platform/en/edit-a-field-in-the-experience-editor.html) 

## Templates
To make content management easier for Content Authors, Sitecore developers configure company-specific Information Architecture by creating `template` items. The concept of templates in Sitecore is analogous to classes in object-oriented programming. Templates, like classes, define a set of fields applicable to a specific type of object.

Templates are the building blocks for everything Content Authors manage in Sitecore. They are used to define:
  - page types, such as Home page, landing page, product page.
  - component data, such as Image, Video, Carousel.
  - arbitrary items, such as List item, Shared Content Folder.

Developers define templates under the 'Templates' node in the Sitecore tree.
![Template Manager](/assets/img/docs/nextjs/introduction/template-manager.png)

Content Authors typically do not see these items, as their work is limited to the 'Content' part of the tree.
![Content Editor](/assets/img/docs/nextjs/introduction/content-editor.png)

Here, content items are created based on existing templates. Referring back to the programming analogy, this is like creating instances of classes.

## Layout
The differentiating factor that distinguishes page templates from all other types of templates is the presence of `layout` data. Layout data informs Sitecore on how to render the page. It consists of renderings and placeholders.

### Renderings
`Renderings` are discreet elements of the page UI. They can be as simple as a "Button" or as complex as "Site Search Results." Content Authors build pages by adding renderings to pages and populating them with content.

In the context of JSS, a rendering item informs Sitecore which JSS component to use to generate the HTML for a particular rendering and which template to use when creating a content item for the component's data. 

### Placeholders
`Placeholders` are places on the page where renderings can be inserted. Different placeholders allow different renderings. For example, there could be a "header" placeholder that allows Navigation, Logo, and Language Selector components. Since all pages, regardless of type, should have headers, this placeholder would be present on all pages. However, a placeholder that allows only product-related components would only exist on product pages. 

Sitecore developers configure rules for placeholders on the page level. They can also nest placeholders inside of components.

## Putting it all together
There is no universal formula for how to break up page types, placeholders, and renderings. 

Fewer page types and less placeholder nesting will cause more components to be available in more places, and it will be up to Content Authors to make sure they're properly grouping components. This approach is preferred when the business wants authors to have a high degree of flexibility in their editing options. For example, when each person on the content team helps manage all parts of the app.

Conversely, more page types and a lot of placeholder nesting will cause the editing workflow to be very prescriptive. This approach is preferable when the business wants to enforce authoring restrictions. For example, when the content team members have specific roles, and different roles are responsible for different parts of the app.

Sitecore developers must work together with business stakeholders to identify the best approach for each content team.

> Note: Layout data is sometimes referred to as `Presentation Details` or `Layout Details` by Sitecore developers. This comes from Sitecore's interface for editing layout data, which they can access by going to the "Presentation" tab, and clicking the "Details" button in the "Layout" section.

![Layout Details](/assets/img/docs/nextjs/introduction/layout-details.png)

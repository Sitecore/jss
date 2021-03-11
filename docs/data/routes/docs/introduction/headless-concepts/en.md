---
name: headless-concepts
routeTemplate: ./data/component-templates/article.yml
title: Sitecore Headless Concepts & Architecture
---
# Sitecore Headless Concepts & Architecture

## Overview of "Headless"
The term "headless CMS" refers to platform architecture where content management is decoupled from content delivery (i.e. presentation logic). In this scenario, the presentation layer retrieves data from the CMS using an API endpoint. This is made possible by the presentation layer being content-agnostic, so the markup it generates is "hydrated" with data from the API.

The benefit of the headless architecture is that the same content source can feed into multiple front-end apps. For example, a company can have their corporate site built in .NET, a brand site built in Next.js, and a mobile app built in React Native, and all there could use the same API for data. This makes managing content across web assets easier for Content Authors.

## Sitecore's "Hybrid Headless"
In other headless CMSs, the decoupling is limited to content only, such as Text and Images. In this case, Content Authors can update content fields, but how the different content fields are laid out on the page is specified in code. Updating layout requires code changes.

What's special about Sitecore's headless architecture is that Content Authors retain both content and layout management.

Refer to this article from sitecore.com for a more detailed overview of Sitecore Hybrid Headless concepts - [What is a headless CMS?](https://www.sitecore.com/knowledge-center/digital-marketing-resources/what-is-a-headless-cms)

## Benefits of decoupled architecture
Not only is the front-end and back-end source code physically decoupled, but the front-end and back-end don't even need to use the same technology stacks. This means that they can have separate delivery topologies and separate scaling strategies. This is helpful to companies that are globally distributed and/or have large volumes of traffic.

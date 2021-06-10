---
name: why-jss
routeTemplate: ./data/component-templates/article.yml
title: What is JSS and Why
---
# What is JSS and Why

## A bit of context on Sitecore
Sitecore is a platform for managing online content, experiences, and marketing workflows. Sitecore JavaScript SDK (JSS) is a set of npm packages that enable implementing Sitecore apps using modern JavaScript frameworks.

Companies choose Sitecore because it is highly customizable through development. Yet, the power to make decisions about content remains with the Content Authors. For example, though developers can create a custom set of shopping cart UI components, it is up to the Content Author to arrange them on pages and populate content. In Sitecore, Content Authors build pages in a WYSIWYG editor.
![Editing pages animation](/assets/img/editing-pages.gif)

After they assemble components, Content Authors can apply Sitecore-specific features, such as personalization, to individual components and preview the variations. The following illustration shows some examples of how Content Authors may configure components.
![Authoring example](/assets/img/authoring-example.png)

## What is JSS

JSS is a set of npm packages containing:
1. Core packages that abstract away the "Sitecore stuff" like talking to different Sitecore APIs.
2. Framework-specific packages with components that render data managed by the core packages. 
3. Sample applications for every supported framework. 

## Why JSS

Initially, the only choice for implementing Sitecore was to use .NET. But in the past few years, JavaScript experienced a massive spike in popularity, and companies realized the benefits of [Jamstack](https://jamstack.org/) architecture. 

<p>
  Watch the following video to understand what is and isn't Jamstack, and why it matters.
  <iframe width="672" height="378" src="https://www.youtube.com/embed/mBOPr4djFMg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

Integrating a front-end framework with an authoring interface as flexible as Sitecore's is a significant undertaking and poses some challenges. Front-end frameworks require developers to build the UI component hierarchies in code, meaning developers control the component composition. A typical front-end workflow would, therefore, sacrifice some authoring features. However, in Sitecore, we want Content Authors to keep control, which means we cannot know the component hierarchy at build-time.

Sitecore JSS solves these challenges and adds first-class support for JavaScript frameworks (and Jamstack architecture) as an implementation option for Sitecore-powered web apps.

With JSS, all the benefits of JavaScript frameworks, such as Next's image optimization and static site generation, can be utilized on top of Sitecore features.

## Developer benefits of JSS

- Frameworks like Next.js reduce development overhead and standardize development patterns.

- JSS enables workflows where front-end and back-end teams can work in parallel.

- JSS provides sample applications, which serve as an onboarding tool and living documentation.

- Abstractions for front-end developers that allow working with Sitecore declaratively.

- Utility functions and front-end components that abstract away the complexities of fetching Sitecore's dynamic data.


## JS vs JSS

The following video explains the conceptual difference between building "vanilla" front-end framework apps and JSS front-end framework apps.

### Master Sitecore on YouTube - JSS Architecture and Value Overview
- What value do front-end frameworks add to client applications?
- Why is a development kit needed to integrate front-end frameworks with Sitecore (Why is this so challenging?)
- How does JSS solve this challenge?
- An introduction to key JSS modules: `Placeholder` and `ComponentFactory`.
- An introduction to developer workflows: Disconnected vs. Connected.

<p>
  <iframe width="672" height="378" src="https://www.youtube.com/embed/NzZz2U8XAxg" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <small style="display:block">
    <a href="https://www.youtube.com/playlist?list=PL1jJVFm_lGnwZup4L4BjITS2sKr4rpMfI" target="_blank">
      View the entire Master Sitecore "Headless &amp; JSS" playlist on YouTube
    </a>
  </small>
</p>


> To learn more about Sitecore terminology and concepts, refer to the [Authoring Concepts](/docs/introduction/content-authoring-concepts).

## Who should use JSS
Any company that has chosen Sitecore as their enterprise web platform and wants to utilize the benefits of front-end JavaScript frameworks in their web app is perfectly suited for using JSS.

Remember that JSS is one of several Sitecore implementation options, so obviously, it's not the right approach for everyone. As a platform for enterprises, Sitecore is designed to be highly flexible and customizable, both in the front-end and in the authoring interface. It's best to consult with Sitecore's Customer Success department or a Sitecore partner to dig into specific business cases and figure out the best way to utilize Sitecore.

It's also important to note that using JSS does not lock the entire implementation into JavaScript. JSS apps can coexist with .NET Core or traditional MVC apps in the same Sitecore instance, so companies can implement a hybrid stack and migrate at their own pace.

---
name: js-vs-jss
routeTemplate: ./data/component-templates/guide.yml
title: JS apps vs JSS apps
---

> This page is for developers who have experience working with "standard" front-end framework apps (i.e. without JSS) who are new to the Sitecore world. The goal is to provide an overview of what JSS adds to the modern JavaScript app workflow, so you know when to rely on your existing knowledge and when to consult with the Sitecore developers on your team.


## The "JSS Vision"

The team who took JSS from POC to SDK had these goals:
- **Empower front-end developers** → they should be able to drive front-end architecture
- **Limit blockers to front-end developer workflows** → they should be able to use their favorite modules and tools
- **Avoid technical restrictions of integrating with the backend creating a need for governance of code style and solution structure** → they should just build regular JS apps, not arbitrary code blocks in some special format.

---

## Sitecore's "Hybrid Headless" Approach

TODO

Out of this vision came what we at Sitecore call the "Hybrid Headless" approach. This means that JSS brings the benefits of headless apps to the CMS world.

For more info, check out this article from the Sitecore knowledge center - [What is a headless CMS?](https://www.sitecore.com/knowledge%20center/digital%20marketing%20resources/what%20is%20a%20headless%20cms). And more specifically, [this section](https://www.sitecore.com/knowledge%20center/digital%20marketing%20resources/what%20is%20a%20headless%20cms#hybrid) covers the nuances of the "hybrid-headless" cms.

If you're coming to JSS as an experienced front-end developer from the React, Vue, or Angular worlds, then you already have framework-specific best practices and patterns (and probably a handful of personal preferences and opinions) that you're accustomed to. Your experience is a valuable asset, and JSS is built to be extremely flexible and pluggable so that you can make it support your coding style. to avoid impeding your speed.

> JSS makes Sitecore more approachable to front-end developers by enabling bootstrapping a modern JS app without too much ceremony, foreign tooling, or contextual overhead.

Other features and benefits include:
- Developer experience tooling (CLI, local server to run app without a Sitecore instance, Sitecore import)
- Clear separation of front-end and back responsibilities
- Abstractions for front-end developers tha allow working with Sitecore declaratively
- Utility functions and front-end components that abstract away the complexities of fetching Sitecore's dynamic data

What JSS does **not** do is extend the front-in frameworks and change the way they work. Aside from custom route handling, working in a JSS app is not a departure from working in a JS app. In other words, the technical concepts, patterns, and best practices that you learned from building "vanilla" front-end framework apps are still valid in the JSS world.

However, although you do not need to drastically change your coding patterns or adopt a new programming methodology, it's important to familiarize yourself with the Sitecore interfaces and learn common terms & concepts. This facilitates  collaboration with your team's back-end Sitecore developers, which ultimately plays a big role in building scalable, easy-to-maintain JSS apps.

---

## JSS is JS
JSS is a set of npm packages:

1. Core packages that abstract away the "Sitecore stuff" like talking to the different APIs,
2. Framework-specific packages with components that render data managed by the core packages, and
3. A simple starter app for every supported framework. These apps are lightweight wrappers around front-end app starters, so the file structure may even already be familiar to you. For example, the [`JSS react starter`](https://github.com/Sitecore/jss/tree/dev/samples/react) is based on [`create-react-app starter`](https://github.com/facebook/create-react-app). Additionally, the JSS starters:
    - demonstrate hows to use components from #2,
    - discuss best practices,
    - contain scripts for the custom routing mentioned earlier, and
    - contain important build scripts for different "development modes" (you will likely customize these as you get comfortable with the project).

* Are focused around the most popular starter kit for their framework (`create-react-app`, `vue-cli`, and `angular-cli` respectively). This makes maintaining your app easier.
* The content of the sample app has been refactored into a JSS-specific Styleguide, demonstrating how to work with all kinds of Sitecore data types, placeholder nesting and wrapping techniques, and other helpful JSS patterns. The samples come with instructions to remove them, for starting work on real apps from a clean slate.
* There is no longer a 'basic' and 'advanced' sample app. The single sample apps are in between the former basic and advanced app; they all support out of the box Sitecore functionalities (i18n, routing, GraphQL, set `<title>` tags) and have identical content and feature sets.
* The sample app code has been heavily documented for your learning pleasure.

But before you jump into the familiar `/src` folder and start adding components, see the next section to understand how adding an authoring interface into the mix influences the technical architecture of components.

---

## The difference between JS apps vs JSS apps
The following video explains the conceptual difference between building "vanilla" front-end framework apps and JSS front-end framework apps.

### Master Sitecore on YouTube - JSS Architecture and Value Overview
- What value to front-end frameworks add to client applications?
- Why is a development kit needed to integrate front-end frameworks with Sitecore (Why is this so challenging?)
- How does JSS solve this challenge?
- An introduction to key JSS modules: `Placeholder` and `ComponentFactory`
- An introduction to developer workflows: Disconnected vs. Connected

<p>
  <iframe width="672" height="378" src="https://www.youtube.com/embed/NzZz2U8XAxg" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <small style="display:block">
    <a href="https://www.youtube.com/playlist?list=PL1jJVFm_lGnwZup4L4BjITS2sKr4rpMfI" target="_blank">
      View the entire Master Sitecore "Headless &amp; JSS" playlist on YouTube
    </a>
  </small>
</p>


> To learn more about Sitecore terminology and concepts, refer to the [Sitecore Terminology & Concepts Guide](/guides/thinking-in-jss/terminology).

### Summary

<p>
  <div class="row">
    <div class="col-md-5"> 
      <h4 id="front-end-framework-apps">Front-End Framework Apps</h4>
      <p>
        Without a CMS in the picture, developers control the page and component composition through code. Since there's no "Content Management" interface to worry about, the different states of the (already designed)  end-user's UI determine what gets rendered. And the quantity of state variances in conjuncture with the amount of reusable elements and behaviors between states determine the granularity of components.
      </p>
      <blockquote>
        <ul>
          <li>Developers control component layout</li>
          <li>Page composition is known at development-time</li>
          <li>Component hierarchy is known at development-time</li>
        </ul>
      </blockquote>
    </div>
    <div class="col-md-7">
      <h4 id="front-end-framework-apps-with-jss">Front-End Framework Apps with JSS</h4>
      <p>
        When building a JavaScript app for a Content Management System, you build a single set of components for two distinct interfaces. The first is the interface where end-users will interact with your app, just like in  the "vanilla" case. And the second is the authoring interface, where Content Authors arrange your components on pages and manage content values.
      </p>
      <blockquote>
        <ul>
          <li>Content Authors assemble pages by selecting components in Experience Editor.</li>
          <li>Sitecore users, not the developers, are in control of layout. </li>
          <li>Once Content Authors have assembled pages with components, they can add additional dynamic behavior (ex. locale-based personalization that changes content) that will execute at render-time.</li>
          <li>Due to the dynamic experiences that Content Authors can create for various personas, the page composition that end-users will see is not known at development time.</li>
        </ul>
      </blockquote>
    </div>
  </div>
</p>

![](/assets/img/guides/jss-workflow.jpg)


---

## Rules to remember

### Avoid hard-coding layout
Building an app that's compatible with Content Author management essentially comes down to avoiding hard-coding component hierarchy and any non-code content (text, images, etc). Instead, use components from JSS packages within your components - they will hydrate your components with dynamic Content Author data.
Do not explicitly hard-code nesting of components. Instead, use the `<Placeholder>` component from the JSS libs to create "holes" in your component that allow the Content Author to nest other components inside it. 

> To validate:
> Experience editor is working as expected; renderings can be inserted, deleted, and moved by Content Authors.

### Avoid hard-coding fields
If a components has values that should be controlled by Content Authors, import the associated field components from the JSS libs (`Text`, `Image`, etc) and use these components in place of those values. Never hard-code values or inject them any other way.

> To validate:
> Experience editor is working as expected; all datasource fields can be edited inline by Content Authors.

### Inquire about authoring requirements

> Sitecore is not a "site in a box." Sitecore is a very powerful, and therefore very complex, marketing platform.

Yes, you can build a site with Sitecore, but that is just scratching the surface of Sitecore's capabilities. Once you have a site, Sitecore provides various tools and integrations to its users to analyze, nurture, and personalize the website *experience* of the end-users.

  It's important to remember that Sitecore clients (also referred to as "marketers", "Sitecore admins" or "Content Authors") know their brands and their customers better than anyone. So as developers, our job is to build apps that satisfy the business requirements of our clients, while staying compatible with Sitecore's authoring interface and avoiding introduction of technical restrictions that would limit the clients' site management capabilities.

### Treat custom route requirements with care

In Sitecore, Content Authors have the power to control the URL of each page by organizing the content tree in accordance with the desired URL structure. JSS apps are expected to fully support this feature, which is why a custom `RouteHandler` is needed. All sample apps define `RouteHandler` implementations. Refer to the [Routing Guide](/guides/code-patterns-routing) for more information.

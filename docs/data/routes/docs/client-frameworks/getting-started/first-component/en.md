---
name: first-component
routeTemplate: ./data/component-templates/article.yml
title: Your First Component
---

# Building your first JSS component

After [setting up a JSS app](/docs/client-frameworks/getting-started/quick-start), we'll want to make the app actually do something other than display sample content. To do this, we need to make a _JSS component_.

> If you're unfamiliar with how Sitecore handles layout composition, [read this guide to layout](/docs/fundamentals/understanding-layout) before continuing.

Here's some good news: JSS components are just regular components in React, Vue, or Angular. All JSS does is inject the content data from Sitecore.

## Scaffolding a JSS Component

JSS' sample apps include a script that allows you to easily scaffold new JSS components. The script is run like so:

```
jss scaffold <componentName>
```

> This script is a completely customizable boilerplate (`/scripts/scaffold-component.js`) if you don't like the default scaffolding conventions. Take it and make it yours!

### Step 1: Start the app

If you don't have the app running with `jss start`, start the app now. Scaffolding can be completed dynamically while the app is started, with live app refreshing as changes are made.

### Step 2: Scaffold the component

In a second command line:

```
jss scaffold MyFirstComponent
```

...and then follow the directions the scaffold script gives. The instructions are slightly different for React, Vue, or Angular to keep the scaffolding idiomatic in each framework. The follow-up to scaffolding a component generally involves:

1. Implementing the data schema for the component (in `/sitecore/definitions/components`) - these are the data fields and Sitecore configuration for the component
1. Implementing the component itself, deciding the markup it should emit based on the data.

> The scaffolding system will emit a working simple component with a text field by default - you can skip all implementation if you want to just try it out, and come back to play later.

### Step 3: Add the component to a route

Because Sitecore's layout is dynamic, a newly created component is quiescent until it's added to the _layout_ on a route. JSS defines routes in `/data/routes` by default.

Let's add our new component to a [_placeholder_](/docs/fundamentals/understanding-layout). All of the sample apps come with a default placeholder called `jss-main`, so for simplicity we'll use that.

* Open `/data/routes/en.yml`. This file defines the metadata and layout for the root route.
* Within this file, which is [YAML](http://yaml.org/), you can find an existing definition of some components under the `jss-main` placeholder:

```yaml
# excerpt only for brevity
placeholders:
  jss-main:
  - componentName: ContentBlock
    fields:
      heading: Welcome to Sitecore JSS
```

* Add your component to the array of components under the `jss-main` placeholder (in YAML `- ` is a prefix for an array element), like so:

```yaml
placeholders:
  jss-main:
  - componentName: MyFirstComponent
    fields:
      heading: Hello, world!
  - componentName: ContentBlock
    fields:
      heading: Welcome to Sitecore JSS
```

* If you've got a browser open to the running app's home page from step 1, it will auto-refresh and you should see `Hello, world!` at the top of the page!

> Dislike YAML? You can also author route data in JSON. [Convert the YAML](https://www.google.com/search?q=yaml+to+json) and rename the extension to `.json` and that's it. It's also possible to load routes in entirely different ways. See `/sitecore/definitions/routes.sitecore.js` to review and customize the route resolving logic.

## Learning more JSS techniques

All JSS app templates ship with a _Styleguide_ route, which demonstrates patterns that can be used to consume different kinds of data fields, advanced placeholder techniques, and other useful ways to take advantage of JSS' capabilities. Because it's all part of the sample app, it's quite easy to see the implementation details of all of the patterns for yourself and begin to take full advantage of JSS. Just click on `Styleguide` in the top navigation to get started!

## What's next?

You've added your own component to the app in _disconnected mode_ without needing Sitecore at all! The real power of JSS comes when connected with Sitecore. To connect the app to Sitecore, we need to [configure the Sitecore server to host JSS apps](./jss-server-install).
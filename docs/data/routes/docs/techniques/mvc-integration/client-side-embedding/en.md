---
name: client-side-embedding
routeTemplate: ./data/component-templates/article.yml
title: Client-Side Embedding
---

# Client-Side Embedding

This is a technique to allow a JSS app to run within a traditional Sitecore rendering. Doing this allows embedding a JSS app within an existing Sitecore MVC site, as opposed to as its own standalone site. This technique essentially embeds the JSS app's markup and app wrapper tag within a Sitecore rendering.

Compared to the [JavaScript Rendering Type](/docs/techniques/mvc-integration/javascript-rendering), client-side embedding does not render the JSS app on the server. This is an advantage in terms of simplicity (and Node.js is not required to be installed), but a disadvantage in terms of SEO compatibility and app startup time.

Client-side embedding is a good technique to use for micro-applications and tools.

Examples of such tools might be:
* Product configurators
* Financial calculators
* Signup or other multi-step forms
* E-commerce functionality (cart, checkout)

Characteristics of such apps include:
* They are embedded in an existing/larger site
* SEO is not typically crucial for the app itself
* UX is often a multi-step / sequential process
* Often have a complicated UX that benefits from modern JavaScript frameworks

# The Embedded Wizard Sample

[The Embedded Wizard sample app](https://github.com/Sitecore/jss/tree/master/samples/sitecore-embedded-jss-app) was created based on community feedback about common use cases for JSS. You may not wish to build your entire site using JSS -- rather just particular tools, wizards, calculators, etc. which have complicated UX and/or are primarily frontend-driven.

## Quick demo

<div style="position:relative; padding-bottom:58.25%; overflow:hidden;"><iframe src="https://content.jwplatform.com/players/TXj7tyzZ-L8PurT2K.html" width="100%" height="100%" frameborder="0" scrolling="auto" allowfullscreen style="position:absolute;"></iframe></div>

## Running the Sample

### Step 1. Build and deploy the app

#### Pre-requisites
1. Ensure you have already [installed the JSS server packages and configured it](/docs/getting-started/jss-server-install).
1. The [The Embedded Wizard sample app](https://github.com/Sitecore/jss/tree/master/samples/sitecore-embedded-jss-app) is downloaded locally in a directory.

#### Directions
1. Open `cmd` inside the directory with the sample app.
1. Use `npm install` to install all required packages.
1. Use `jss setup` to configure the path and URL to your Sitecore instance.
    > This app is designed to run on the out-of-the-box Sitecore `website` site and sample page, so the default host name for your Sitecore instance will work here.
1. Use `jss deploy config` to deploy the included app configuration.
    > Alternatively, you can manually copy `embedded-wizard-app.config` file from `sitecore\config` to your Sitecore instance's `Website\App_Config\Include` folder.
    
    > This will also put the `website` site into Live Mode.
1. Deploy the app to Sitecore with `jss deploy app --includeContent --includeDictionary` (or shortcut `jss deploy app -c -d`).
1. Open the Sitecore Content Editor and ensure the app has installed at `/sitecore/content/Home/EmbeddedWizard` 

    ![Embedded Wizard app deployed](/assets/img/wizard-app-deployed-items.png)

1. Browse to *http://[sitecorehost]/EmbeddedWizard/Wizard* and ensure the app runs independently in Integrated Mode:

    ![Embedded Wizard app integrated](/assets/img/wizard_success.png)

### Step 2. Configure wizard placement

#### Option 1: Install a package

Fastest option. This package contains the rendering items, Sublayout and modified Home item.

> Recommended if you are installing on a vanilla Sitecore instance. If you would like to learn how the item configuration is put together, use Option 2 below.

1. Download the [Sample package](https://jss.sitecore.com/assets/downloads/EmbeddedWizard-items-0.1.zip).
1. Install it via Sitecore Installation Wizard.

    >  The package overwrites the existing Home item. Select **Merge/Clear** when prompted. Selecting **Overwrite** will delete the previously deployed app under `/Home`.
    
    > If you have changed the default Home item, do not overwrite and follow Option 2 below instead.

1. Proceed to the Verification step below.

#### Option 2: Configure items and hosting rendering manually.

1. Use `jss deploy-rendering` to deploy the included Sublayout that can be used to embed the app.
    > The Sublayout source file will be copied from `sitecore-embedded-jss-app/sitecore/rendering/EmbeddedWizard.ascx` to your Sitecore instance `Website\layouts` folder.
1. In Sitecore, create a new Sublayout under `/sitecore/layout/Sublayouts`:
    * Give it whatever name you like
    * Tell Sitecore to create the file under `/temp` or another location
    * After creating the Sublayout, change the `Ascx file` value to `/layouts/EmbeddedWizard.ascx`.
1. On the out-of-the-box `/sitecore/content/Home` item, open the Layout Details from the Presentation ribbon and Edit the Default layout.
1. Click on the *Sample Rendering* and then *Change*. Select the Sublayout you just created, then click *OK*.
1. Proceed to the Verification step below.

> Note: this technique works equally well with Sitecore MVC. This example uses Web Forms only for easy compatibility with the default Sitecore site.

#### Verification

1. Log out of Sitecore or open a private browser window.
1. Navigate to your Sitecore instance's home page.

    You should see the app embedded in the Sitecore sample home.

    ![Embedded Wizard app integrated](/assets/img/wizard-integrated.png)

## How it Works

### App Embedding

* The `client.js` of the app uses `react-dom` to render the app on a page element with the id `wizard-app`.
* The `EmbeddedWizard.ascx` Sublayout simply adds a `div` with that id to the page, and adds the needed scripts and styles to the page.
    * In an MVC implementation, this could easily become a View Rendering.
    * If you have a lot of apps and want to provide control to a content author, you could create your own "registry" of apps (with their DOM id's) and allow the content author to choose which app to embed.
* In your implementation, if you don't want to globally include the scripts and styles for your JSS app(s), you'll want to use some mechanism to include them dynamically based on presence of the rendering, such as the Assets module in [Sitecore Habitat](https://github.com/Sitecore/Habitat). This approach is described in the [Helix design priciples](http://helix.sitecore.net/principles/theming/scripting.html#).

### Wizard Steps

* The sample uses the [`react-stepzilla`](https://github.com/newbreedofgeek/react-stepzilla) module to provide a step-based UX.
* Each step is a separate JSS route to provide for easier management/editing via the Experience Editor.
* The `Wizard` component "creatively" uses a `StepReference` component to allow steps to be managed via the Experience Editor, but then when rendering for the front-end, uses the component data to construct the step data expected by `react-stepzilla`.
* The `Step` component loads the referenced route from the Layout Service as each step is displayed.
    * This means that each step will register in analytics as it is displayed  as well.
* `Step` uses the same placeholder name as `App`, so that step contents can be rendered directly in the `App` as well (i.e. in the Experience Editor).

## Things you can try

* Add new questions to steps via the Experience Editor.
* Insert a new step, add some questions to it, and then add step reference to the main Wizard route.
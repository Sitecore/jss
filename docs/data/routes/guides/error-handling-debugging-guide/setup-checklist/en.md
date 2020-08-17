---
name: setup-checklist
routeTemplate: ./data/component-templates/guide.yml
title: Setup Checklist
---

> ⚠️ **Content Wanted** - What issues do you see developers who are new to JSS getting stuck on repeatedly?

If you're experiencing issues with your new JSS app, going through this checklist and verifying that your project is configured correctly is a good 1st step debugging measure.

This checklist applies to apps that were created using `jss create`, and connected to Sitecore using [`jss setup`](/docs/getting-started/app-deployment#step-1-setup-connection-information).

---

## JSS API Key
- JSS API Key exists in Master database and matches the value in `scjssconfig.js`
- Each JSS app has it's own API key (do not share keys for multiple apps)

---

## `package.json` and `scjssconfig.js` checks
- All "root" placeholders exposed in `Layout.js` (i.e. `static placeholder`) should be registered in `package.json` using the `config.rootPlaceholders` property.
- Verify `package.json` and `scjssconfig.js` fields: appName, filesystem paths, and API endpoint definitions
- Verify SSL protocol of API endpoints
- If Node version and npm version is not explicitly defined in `package.json`, the server that you deploy your app to may use different versions, which can cause deployment failures.

Example
```json
{
  "name": "sitecore-jss-docs",
  "version": "13.0.0",
  "description": "Doc site for Sitecore JavaScript Services",
  "engines": {
    "node": "10.17.0",
    "npm": "6.11.3"
  },
  "config": {
    "appName": "JssDocs",
    "rootPlaceholders": [
      "jssdocs-header",
      "jssdocs-main",
      "jssdocs-footer"
    ],
    "sitecoreDistPath": "/dist",
    "sitecoreConfigPath": "/App_Config/Include/zzz",
    "buildArtifactsPath": "./dist",
    "staticOutputPublicPath": "/",
    "routeDataDir": "./data/routes",
    "language": "en"
  },
}
```

---

## JSS XML configs
- If your app is not using SXA, there should have been XML configs copied to your Sitecore instance during the ["connecting to Sitecore step"](/docs/getting-started/app-deployment#automatic-config-deployment-recommended). These configs contain the site definition for your JSS app and your app secret. If the configs are missing, you can [copy them manually](/docs/getting-started/app-deployment#manual-config-deployment).

- If you are deploying your app to an SXA-enabled JSS Site, do not deploy any JSS XML configs, as SXA manages all site configuration for you. (If you migrate a regular JSS app to an SXA-JSS Site, be sure to delete the original JSS app configs from Sitecore as they will conflict with SXA's definitions).

---

## Managing npm packages
- When running `npm install` (or `yarn install`), do not ignore warnings about peer dependencies, as this can result in run-time errors and unexpected behavior.
- When installing new packages, be mindful of whether they are installed as `dependencies` or `devDependencies`. This will keep unnecessary JavaScript bloat from your final bundle.

  > `dependencies` are packages that are needed to run your app
  >
  > `devDependencies` are packages that are needed to build your app, but are not used while running your app

- Remove unused dependencies

  For example, if you app only requires one language, the `i18n` module and all i18n-related scripts that came with the starter project should be removed.

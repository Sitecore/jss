---
name: solution-setup
routeTemplate: ./data/component-templates/guide.yml
title: Solution Setup & Configuration
---

# Solution Setup & Configuration Checks
- JSS API Key exists in Master database and matches the value in scjssconfig.js
- Create a new API Key for each new JSS app
- If using SXA: when adding a JSS Site, the site name should match the name of the JSS app that will be imported
- Review info stored in package.json file
  - App Configuration: appName, rootPlaceholders, important filesystem path and endpoint definitions
  - Engines: Node version, npm version
  - Do not ignore peer dependencies warnings as it can result in broken installs and unexpected behavior

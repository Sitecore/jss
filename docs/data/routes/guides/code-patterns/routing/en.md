---
name: routing
routeTemplate: ./data/component-templates/guide.yml
title: Routing
---

# Routing

## Using Router Links
Avoid page reloads when clicking links, make sure to you are converting Sitecore links into router links.

If using SSR, it will be used for the first rendering of your application, but by using router links it will then only require the Layout Service from there, instead of performing a SSR on every page load.

(Ref: https://blog.vitaliitylyk.com/guide-on-refactoring-your-sitecore-solution-to-sitecore-jss/)

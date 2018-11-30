# Contributing to Sitecore JavaScript Services

Want to contribute to Sitecore JavaScript Services? There are a few things you need to know.  

## Pre-requisites:

- `node.js` (8.11.3 or later) 
- `npm` (5.x or later) installed (cmd `node -v` to test).

## Setting up

- `npm install`
- `npm install -g lerna`
- `npm run reset` -> will clean all `node_modules`, re-install them with `lerna bootstrap`, and then build all JSS packages

## Run unit tests

- `npm run test-packages`

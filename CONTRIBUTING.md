# Contributing to Sitecore JavaScript Services

Want to contribute to Sitecore JavaScript Services? There are a few things you need to know. First, are you contributing a change to documentation only? If so, see the [documentation contributions section](#documentation-contribution) further below. Otherwise, read on.

## Pre-requisites:

- `node.js` (8.11.3 or later)
- `npm` (5.x or later) installed (cmd `node -v` to test).

## Setting up

- `npm install`
- `npm install -g lerna`
- `npm run reset` -> will clean all `node_modules`, re-install them with `lerna bootstrap`, and then build all JSS packages

## Run unit tests

- `npm run test-packages`

# Branching overview

* master - latest released version
* dev - latest changes for the next release
* release branches - created in order to make changes/updates to past major version releases

# Documentation contributions

If your documentation changes are related to a code feature that you are submitting to the JSS repo, you should make those changes in your code feature branch and submit them with your feature pull request.

If your documentation changes are related to features that are _already available_ in JSS, then choose one of the approaches below.

## Edit on GitHub

Every route on the documentation site (https://jss.sitecore.com) has a link at the bottom of the page titled `Edit this on GitHub`. Clicking this link will use the GitHub editing features to allow you to make changes to the page content.

When your changes are complete, use the `Create a new branch for this comment and start a pull request` option. This will create a pull request to the `master` branch. Your changes will be reviewed and merged if appropriate.

## Edit in repo

If you need to make code changes to the documentation site, follow these steps:

- Fork the JSS GitHub repo: `https://github.com/Sitecore/jss`
- Clone the forked repo to your local machine.
- From a terminal in the repo root: `cd docs`
- Create a feature branch from `master` for your changes. e.g. `git checkout -b my-feature-branch`
  > Note: although `master` is the default branch for the JSS repo, documentation changes that pertain to the current release of JSS should be branched from `master`. The `master` branch contains the published / active documentation content. Changes related to to the next release should be added to the `dev` branch.
- `npm install`
- `jss start` (to preview your changes locally)
- Make your changes
- Commit, push to your remote fork of the JSS repo, then open a pull request (PR) to the `master` branch of the JSS repo.

Your changes will be reviewed and merged if appropriate.

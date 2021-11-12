# Contributing to Sitecore JavaScript Services

Want to contribute to Sitecore JavaScript Services? There are a few things you need to know.

## Pre-requisites:

- `node.js` ([Active LTS](https://nodejs.org/en/about/releases/) version) installed (cmd `node -v` to test).
- `npm` (6.x) installed (cmd `npm -v` to test).

Install yarn globally:

```shell
npm i -g yarn
```

## Developing

See Branching overview below - We use `dev` for our current development.

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Create a new branch e.g. `git switch -c feature/my-jss-feature`
3. When you're happy with your changes, open a Pull Request targeting the `dev` branch of the `sitecore/jss` repository. You may add the JSS Dev Reviewers group as Reviewers for potentially expedited initial PR review.
4. Note: CI will run lint for all packages and samples, as well as tests for all packages. Please make sure these pass or your PR can not be merged.

## Setting up

In your fork from the root of the monorepo:

- `yarn install` - this will install Lerna at the root, packages, samples and will link them and allow the remaining scripts to be called.
- (optional) `yarn install-git-hooks` - installs a pre-push hook that will lint all samples and apps before a `git-push`. Opt out per-push with the `--no-verify` flag.
- `yarn reset` -> will clean all `node_modules`, re-install dependencies and link them, and then build all JSS packages.

In our terms `workspace` - it's a sample or package.

- `yarn workspaces focus <workspace>` -> will install dependencies, linked dependencies for specified workspace.
- `yarn workspaces foreach -ptR --from '<workspace>' run <command>` -> will run `<command>` script for specified workspace including linked dependencies.

## Linting and Code Style guidelines

The monorepo includes a top level `.eslintrc` file that each package inherits. In order to avoid linting errors and adhere to our style guidelines while developing, it is strongly recommended to install the vs code extension  [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), and use it as the document formatter. Formatting the document with this plugin will fix formatting issues and avoid linting errors.

To lint manually, the following commands are available from the root of the monorepo, you may also install the git-hook which will run these commands as a pre-push hook:

```shell
yarn lint-packages // lint everything under ./packages
yarn lint-apps // lint everything under ./samples
```

You may also lint a package by itself by running `yarn lint` while the `cwd` is the root of the package, for example:

```shell
cd ./packages/sitecore-jss
yarn lint
```

Some linting errors may be fixed automatically using the `--fix` flag. You may do this from the root, however you will need `--` twice before the flag in order to pass the argument to the inner command

```shell
yarn lint-packages -- -- --fix 
```

In addition to linting rules, there are a few coding guidelines worth mentioning here that will cause less friction when trying to get a PR merged.

- TypeScript: make sure everything has the appropriate type.

- JSDoc: new functions, interfaces, classes, etc. need to have a JSDoc style comment above their declaration. Example: https://jsdoc.app/howto-es2015-classes.html

## Run unit tests

To keep everything running smoothly, please include unit tests when applicable.
To run all tests, from the root of the monorepo:

```shell
yarn test-packages
```

In the root of a package:

```shell
yarn test
```

# Troubleshooting

Problem: Build of package or sample fails with the following error: `cannot find module ...`

Solution: If dependencies in a package change, you may need to install said dependencies.
From the root of the monorepo:

```shell
yarn install
```

`yarn install` will solve the problem in most cases, however in nuclear scenarios you may run the following to completely reset the monorepo:

```shell
yarn reset
```

# Branching overview

* `master `- latest released version
* `dev `- latest changes for the next release
* `release `branches - all major released versions


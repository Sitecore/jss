---
name: custom-create-templates
routeTemplate: ./data/component-templates/article.yml
title: Custom Create Templates
---

# Custom `jss create` templates

JSS supports customizing your own application templates that can be used with `jss create` to make new JSS apps. This allows you to shape the JSS example applications to your needs and customize them in a repeatable way.

## Creating a custom template

JSS custom templates start out as a copy of the [source of one of the example apps](https://github.com/Sitecore/jss/tree/master/samples). This template is then modified as needed, and made available for distribution via parameters to `jss create`.

### The `jss-create.js`

At the root of each JSS sample application is a file called `jss-create.js`. This is the _create script_. When `jss create` creates an app based on this template, it acquires the template files, copies them to the destination, runs `npm install`, and then invokes the `jss-create.js` file if it exists.

The create script will normally rename app elements to match the new created app's name (i.e. the package name, Sitecore config patch names, etc), but this is an extension point for template authors to add custom functionality. It also enables the template author to modify the _next steps_ shown after the template has completed, should any custom instructions need to be injected.

Here's an example:

```js
module.exports = function createJssProject(argv, nextSteps) {
  console.log(`Executing create script: ${__filename}...`);

  // if your template needs to change or add to the next steps shown
  // to the user after the create completes, you can manipulate the `nextSteps` 
  // array before returning it:
  nextSteps.push('* Reticulate the splines');
  return nextSteps;
  
  // ...or replace it entirely
  return [ 
    '* These are the only next steps shown',
    '* The defaults are ignored'
  ];
};
```

> Note: after being executed, the `jss-create.js` file is deleted in the new app.

## Testing a custom template

Once your customized app template has been implemented, creating new apps based on that template will need to be tested. `jss create` comes with tools for instantiating local templates. To test a local template:

1. Create a folder to store your template library.
1. Move or copy your app template into the library folder. For example if your library is `~/jss-templates` and the new template is called `react-custom`, the template would belong at `~/jss-templates/react-custom`.
1. Execute `jss create` against the local template library:

    ```sh
    jss create <appname> react-custom --source ~/jss-templates
    ```

Your local template will be executed, and a new app created based on it.

## Delivering a custom template

To deliver a custom template for sharing, there are two options:

* Filesystem-based deployment, the same as is used for testing. This is appropriate for private templates.
* GitHub-based deployment. `jss create` supports `--repository` (default: `Sitecore/jss`) and `--branch` (default: `master`) options for the delivery of public templates. Private repositories and non-GitHub repositories are _not supported_.
  ```sh
  jss create <appname> react-custom --repository githubusername/reponame --branch branchname

  # e.g.
  jss create Foo react --repository kamsar/jss
  ```

> NOTE: Executing a custom template will allow that template to execute code on your machine. Only execute app templates from sources you trust.
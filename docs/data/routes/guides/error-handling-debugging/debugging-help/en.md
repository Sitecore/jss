---
name: debugging-help
routeTemplate: ./data/component-templates/guide.yml
title: Debugging-help
---

> ⚠️ **Content Wanted** - What tools do you use? How do you debug?

## Debugging Node

- The [Configuring and Debugging SSR page in docs](/docs/techniques/ssr/configuring-and-debugging-ssr) has detailed instructions on how to set up Node debugging in Integrated Mode. This technique utilizes Node's `Inspector`, which can be enabled with the `--inspect` switch.

This technique is not limited to Integrated Mode. It's possible to enable [Inspector in remote scenarios](https://nodejs.org/en/docs/guides/debugging-getting-started#enabling-remote-debugging-scenarios)

> Note: If your app was created from one of the default starters, `server/server.js` is the entry point for building the SSR bundle.

### Node Logging
You may have used the global `console` object in browsers for debugging purposes. Node also has a global `console` object, but for debugging issues in production it’s more reliable to write log messages to log files on the filesystem than to the console. When in SSR mode, the `Console` class can be utilized for this.

From Node.js docs:
> The Console class can be used to create a simple logger with configurable output streams and can be accessed using either require(‘console’).Console or console.Console (or their destructured counterparts):  


Sample implementation (adapted from example @ [https://nodejs.org/api/console.html#console_new_console_stdout_stderr_ignoreerrors](https://nodejs.org/api/console.html#console_new_console_stdout_stderr_ignoreerrors))

```javascript
import fs from 'fs';
import { Console } from 'console';

const filename = (new Date).toISOString().split('T')[0];
const infoLog = filename + '-log.log';
const errorLog = filename + '-error.log';

// test if files exist, and create them if they don't
const output = fs.createWriteStream(infoLog);
const errorOutput = fs.createWriteStream(errorLog);
const logger = new Console({ stdout: output, stderr: errorOutput });

export default logger;
```

Usage

```javascript
import logger from ‘./logger’;

function foo {
  try {
    // do something
    logger.log('Victory in foo!');
  } catch (error) {
    logger.error(`Foo failed. Error: $(error)`);
  }
}
```

See [‘Console’ page in Node docs](https://nodejs.org/api/console.html) for more info.

---

## VSCode ❤️

### Helpful VSCode Extensions

- [Docker by Microsoft](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker): Makes it easy to deploy and manage JSS apps in Azure.

- ~~Debugger for Chrome~~:  Previously, to debug a URL in a browser, you had to install the `Debugger for Chrome` extension and write a `launch.json` config file to debug a page. But this feature is now natively supported in VSCode (version 1.48.1+) by using the [`Debug: Open Link` command](https://code.visualstudio.com/updates/v1_48#_debug-open-link-command).

- [GraphQL](https://marketplace.visualstudio.com/items?itemName=Prisma.vscode-graphql): Adds syntax highlighting, validation, and other GraphQL-specific features.

- [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2): A customizable extension for colorizing matching brackets and visualizing your current functional scope.
    ![](/assets/img/guides/bracket-pair-colorizer.png =50%x*)

- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost): Display import/require package size in the editor.

- [YAML ❤️ JSON](https://marketplace.visualstudio.com/items?itemName=hilleer.yaml-plus-json): Convert yaml to json and json to yaml. (Note: There are other extensions that beautify/validate your yaml; but for those of us who just can't get used to yaml and would rather debug json, there's this)

### Helpful VSCode Debugging Configurations

#### Debugging specific JS files
To start debugging from a specific JS file (for example, one of the files in `/scrips` that kicks of tasks like manifest generation, component factory generation, etc)

*.vscode/launch.json*
```json
{
  "type": "node",
  "request": "launch",
  "name": "Name of your debug task",
  "program": "${workspaceRoot}/path/to/your/script.js",
}
```

#### Debugging NPM scripts
To start debugging from a specific npm script. For example, `npm run build` would run `scripts.build` from `package.json`. In the React starter, `script.build` is defined as `"npm-run-all --serial bootstrap:connected build:client build:server"`, which is really just a call to several other scripts. But starting the debugger from the entry scripts allows you to place breakpoints in any of the files that get executed.

*.vscode/launch.json*
```json
{
  "name": "npm run script",
  "type": "node",
  "request": "launch",
  "cwd": "${workspaceRoot}/packages/sitecore-jss",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run-script", "build"],
  "port": 5858
},
```

---

## API Reference
JSS packages are built using `TypeScript`, and installing them also automatically installs their [declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).

The files, which are found in `/node_modules/@sitecore-jss`, contain the specs for all functions, models, and components that JSS packages export. And many of them contain detailed comments. You can use VSCode's `go to definition` and `preview definition` features to jump around the API.
![](/assets/img/guides/browsing-jss-types.gif)


## Community Tools

### JSS Umbrella
https://github.com/macaw-interactive/umbrella-for-sitecore-jss

### Sitecore Dianoga
https://github.com/kamsar/Dianoga
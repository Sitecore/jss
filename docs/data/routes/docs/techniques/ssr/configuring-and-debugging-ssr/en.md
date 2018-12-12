---
name: configuring-and-debugging-ssr
routeTemplate: ./data/component-templates/article.yml
title: Configuring and Debugging Server-Side Rendering
---
# Configuring and Debugging JSS Server-Side Rendering

When running in [Integrated Mode](/docs/fundamentals/application-modes#integrated-mode), Sitecore JSS applications are [server-side rendered (SSR)](/docs/techniques/ssr/integrated-mode-ssr) using a Node.js instance before being provided to the client. Via Sitecore configuration files, you can configure the Node.js instance used for server-side rendering. Configuration options include enabling Node.js debugging, allowing you to use any debugger that can attach to a Node.js instance.

## Default Configuration

The default Node.js configuration is used for all Node.js instances that don't have an [instance-specific configuration](#nodejs-instance-configuration) defined. The default configuration can also be inherited and overridden by instance-specific configurations. In most cases, especially if you have multiple JSS apps running in the same Sitecore instance, it is not generally recommended to modify the options in the default configuration. Rather, you should create an instance-specific configuration that inherits the defaults and modify options in the instance-specific configuration.

The default Node.js configuration can be found in the following file from your Sitecore instance:
`App_Config/Sitecore/JavaScriptServices/Sitecore.JavaScriptServices.ViewEngine.Node.config`

It should look similar to below. The file is commented, but you can also find information for each configuration option in the [Configuration Options](#configuration-options) section.

```xml
<javaScriptServices>
  <renderEngines>
    <renderEngine name="nodejs">
      <instance id="defaults">
        <!--
          If true, the Node.js instance will accept incoming V8 debugger connections (e.g., from node-inspector).
          The node process is invoked with the "inspect" flag.
        -->
        <LaunchWithDebugging>false</LaunchWithDebugging>
        <!--
          If "launchWithDebugging" is true, the Node.js instance will listen for V8 debugger connections on this port.
          IMPORTANT: Node instances _must_ have unique debugging ports. If you try to create multiple node instances with the same debugger port, those node processes will exit.
          Therefore, it is recommended that you create <instance /> configurations for individual JSS apps / renderings if you wish to use remote SSR debugging features.
        -->
        <DebuggingPort></DebuggingPort>
        <!-- If set, the Node.js instance should restart when any matching file on disk within your project changes. -->
        <WatchFileExtensions>.js|.json|.html</WatchFileExtensions>
        <!--
          If set, starts the Node.js instance with the specified environment variables.
        -->
        <EnvironmentVariables>
          <var name="NODE_ENV" value="production" />
        </EnvironmentVariables>
        <!-- Specifies the maximum duration, in milliseconds, that your .NET code should wait for Node.js RPC calls to return. -->
        <InvocationTimeoutMs>60000</InvocationTimeoutMs>
      </instance>
    </renderEngine>
  </renderEngines>
</javaScriptServices>
```

## Node.js Instance Configuration

Instance-specific Node.js configurations allow you to inherit default configuration options and modify them for specific JSS apps or JavaScript renderings.

For instance-specific Node.js configurations, you assign an `id` attribute to the `<instance />` element and an optional `inherits` attribute that refers to the name of an `<instance />` node to inherit options from.

#### JSS App instances

For JSS apps, the `id` attribute is the name of the JSS JSS app the Node.js instance is associated with - each JSS app will have its own Node.js instance. The name of a JSS app is defined in the Sitecore config file for the app. For instance, the sample React app - named "JssReactWeb" is registered as follows:

```xml
<javaScriptServices>
  <apps>
    <!-- note: other app attributes omitted for brevity -->
    <app name="JssReactWeb" inherits="defaults" />
  </apps>
</javaScriptServices>
```

Therefore, an instance-specific Node.js configuration could look like below. All configuration options defined within the `<instance />` element are then specific to the "JssReactWeb" app.

```xml
<javaScriptServices>
  <renderEngines>
    <renderEngine name="nodejs">
      <instance id="JssReactWeb" inherits="defaults">
        <LaunchWithDebugging>true</LaunchWithDebugging>
        <DebuggingPort>9229</DebuggingPort>
        <WatchFileExtensions inherits="true">
          <ext>.vbs</ext>
        </WatchFileExtensions>
        <EnvironmentVariables inherits="true">
          <var name="MY_VAR" value="some value" />
        </EnvironmentVariables>
      </instance>
    </renderEngine>
  </renderEngines>
</javaScriptServices>
```

#### JavaScript Rendering instances

When using Node.js to render individual JavaScript renderings, the `id` attribute assigned to an `<instance />` element will be the value specified within the rendering `Server Script Path` field, e.g. `/dist/myComponents/components.bundle.js`. This means there will be at least one Node.js instance per script path.

```xml
<instance id="/dist/myComponents/components.bundle.js" inherits="defaults">
  <LaunchWithDebugging>true</LaunchWithDebugging>
  <DebuggingPort>9230</DebuggingPort>
  <WatchFileExtensions inherits="true">
    <ext>.vbs</ext>
  </WatchFileExtensions>
  <EnvironmentVariables inherits="true">
    <var name="MY_VAR" value="some value" />
  </EnvironmentVariables>
</instance>
```

> IMPORTANT: It is easy to imagine a scenario where there are multiple JavaScript renderings per route/item, each using a separate Node.js instance. Therefore, it is HIGHLY recommended that your individual JavaScript renderings are bundled into as few files as possible to prevent the creation of an overwhelming number of node instances. [More information on Sitecore JavaScript renderings](/docs/techniques/mvc-integration/javascript-rendering)

#### Configuration Inheritance

Assigning an `inherits` attribute to the `<instance />` element will result in the instance-specific configuration inheriting configuration option values from the inherited configuration.

For the `WatchFileExtensions` and `EnvironmentVariables` configuration options, you can also specify an `inherits` attribute on the option definition itself to determine how that option inherits values.

* Setting the `inherits` attribute to `true` on the `WatchFileExtensions` or `EnvironmentVariables` elements will merge the per-instance options with any inherited options. Example:
```xml
<instance id="base">
  <WatchFileExtensions>
    <ext>.js|.json</ext>
  </WatchFileExtensions>
  <EnvironmentVariables>
    <var name="NODE_ENV" value="production" />
  </EnvironmentVariables>
</instance>

<instance id="my-jss-app" inherits="base">
  <WatchFileExtensions inherits="true">
    <ext>.html</ext>
  </WatchFileExtensions>
  <EnvironmentVariables>
    <var name="MY_VAR" value="some value" />
  </EnvironmentVariables>
</instance>

<!--

resulting `WatchFileExtensions` value for `my-jss-app` will be equivalent to:
`.js|.json|.html`

resulting `EnvironmentVariables` value for `my-jss-app` will be equivalent to:
<var name="NODE_ENV" value="production" />
<var name="MY_VAR" value="some value" />

-->
```

* Setting the `inherits` attribute to `false` on the `WatchFileExtensions` or `EnvironmentVariables` elements means the per-instance options will be the _only_ option values used. Example:
```xml
<instance id="base">
  <WatchFileExtensions>
    <ext>.js|.json</ext>
  </WatchFileExtensions>
  <EnvironmentVariables>
    <var name="NODE_ENV" value="production" />
  </EnvironmentVariables>
</instance>

<instance id="my-jss-app" inherits="base">
  <WatchFileExtensions inherits="true">
    <ext>.html</ext>
  </WatchFileExtensions>
  <EnvironmentVariables>
    <var name="MY_VAR" value="some value" />
  </EnvironmentVariables>
</instance>

<!--

resulting `WatchFileExtensions` value for `my-jss-app` will be equivalent to:
`.html`

resulting `EnvironmentVariables` value for `my-jss-app` will be equivalent to:
<var name="MY_VAR" value="some value" />

-->
```

* For `EnvironmentVariables`, if `inherits` is true and any variable names (keys) collide with inherited variables, the per-instance variable value will be used. Example:

```xml
<instance id="base">
  <EnvironmentVariables>
    <var name="NODE_ENV" value="production" />
  </EnvironmentVariables>
</instance>

<instance id="my-jss-app" inherits="base">
  <EnvironmentVariables>
    <var name="NODE_ENV" value="development" />
  </EnvironmentVariables>
</instance>

<!--

resulting `EnvironmentVariables` value for `my-jss-app` will be equivalent to:
<var name="MY_VAR" value="development" />

-->
```

## Debugging

By default, Node.js debugging is disabled. You must enable it via Node.js instance configuration options.

> IMPORTANT: Node instances _must_ have unique debugging ports. If you try to create multiple node instances with the same debugger port, those node processes will exit.

Once Node.js debugging is enabled for an instance, you can attach a debugger client, e.g. VS Code, Chrome DevTools, etc... Basic information for attaching various inspector clients can be found in the [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients). If you use VS Code, detailed information for attaching a debugger to a Node.js instance can be found in the [VS Code documentation](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

> NOTE: Node.js instances started by Sitecore JSS use the `--inspect` switch when debugging is enabled.

More detailed information on Node.js debugging can be found in the [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)

## Configuration Options

| Option name | Default value | Description |
| ----------- | ------------- | ----------- |
| LaunchWithDebugging | false | If true, the Node.js instance will accept incoming V8 debugger connections (e.g., from node-inspector). The node process is invoked with the `inspect` flag. |
| DebuggingPort | null |  If "LaunchWithDebugging" is true, the Node.js instance will listen for V8 debugger connections on this port. IMPORTANT: Node instances _must_ have unique debugging ports. |
| WatchFileExtensions | .js, .json, .html | If set, the Node.js instance should restart when any matching file on disk within your project changes. NOTE: this will not recycle the IIS process nor will it reload your app in a browser. Instead, the Node.js instance used for SSR is restarted, thereby clearing any caches or removing resource locks held by the Node.js process. |
| EnvironmentVariables | `<var name="NODE_ENV" value="production" />` | Environment variables that are passed to the Node.js instance on startup. |
| InvocationTimeoutMs | 60000 | Specifies the maximum duration, in milliseconds, that your .NET code should wait for Node.js RPC calls to return. |
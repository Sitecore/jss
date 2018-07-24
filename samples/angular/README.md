# JSS Application Demo with Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.0.

## Sitecore JavaScript Services documentation

Check [JSS documentation](https://jss.sitecore.net/) for how to install JSS Server and configure Sitecore.

## App setup

1. `npm install` or `yarn`
1. `npm install -g @sitecore-jss/sitecore-jss-cli` or `yarn global add @sitecore-jss/sitecore-jss-cli`
1. `jss setup`

> This setup is optional to get started with development, as it assumes you have Sitecore installed.
>
> If you answer "yes", you would need to provide the path to your Sitecore installation's "Website" folder.

## Development server

Run `jss start`.

The app will be built and webpack server will be started. So it's expected that the browser will open with `http://localhost:3001` and familiar default welcome content is rendered.

The app will automatically reload if you change any of the source files.

When running the development server, it automatically sets up a sitecore mock server configures a proxy that forwards all requests to `/sitecore` to that sitecore mock server. Check `proxy.conf.js` to see mock server and proxy implementation.

### Congratulations!

The app is now running in dev mode sourcing data from local files and is not connected to Sitecore in any way.

## App deployment

### Pre-requisites

1. Sitecore instance has JSS packages installed.
1. Sitecore is configured for this JSS app.

### Steps

Run `jss deploy package`.

This step will:

* Run the production bundle of your app.
* Generate the app manifest.
* Generate a package with the manifest and production bundle.
* Install the package over HTTP on your Sitecore instance.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

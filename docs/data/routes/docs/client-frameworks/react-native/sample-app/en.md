---
name: sample-app
routeTemplate: ./data/component-templates/article.yml
title: React-Native Sample App
---

# The JSS React-Native Sample App
JSS React-Native sample app is a practical sample that demonstrates patterns of how to use JSS with React-Native. React Native is marked as _experimental_ because React Native cannot render in the browser (RN apps are intended to be rendered on iOS/Android devices or emulators), so there is no Experience Editor support. This makes RN difficult to setup and difficult to work with. It is strongly recommended that you have prior experience working with JSS, React-Native, the toolchain that React-Native requires, and have some exposure to native app development.

## Prerequisites

The basic sample for React Native is based on a project created via the React Native CLI, e.g. `react-native init`
Your first step will be to follow the instructions on this page: https://reactnative.dev/docs/environment-setup

Choose the `React Native CLI Quickstart` tab, then choose your Development OS and app Target OS. We have tested the basic sample app on the following configurations:

* Windows / Android
  * In this configuration, testing was done using a physical device connected via USB to the development machine, not the Android emulator.
* macOS / iOS
  * In this configuration, testing was done using the Xcode simulator.

The installation process for all the necessary Android/iOS dependencies and tools can take a significant amount of time - plan accordingly.

## Getting Started

1. Ensure you have completed the Prerequisites section and have confirmed you're able to run the `AwesomeProject` sample that the instructions direct you to create.

1. At this point, you can follow steps 1 and 2 from the [JSS Quick Start guide](/docs/client-frameworks/getting-started/quick-start), or the following abbreviated version:

1. In a new folder, clone or download the basic sample app repo: https://github.com/Sitecore/jss/tree/master/samples/react-native

1. If you don't have Sitecore installed or aren't planning to immediately develop against a Sitecore instance, skip to the next step.

   * Otherwise, if you have Sitecore installed: from a terminal, run `jss setup`

1. Choose your target platform:

   * Android: run `jss start-android`

   * iOS: run `jss start-ios`

At this point, the React Native build process should start, opening 1 or 2 separate terminal window(s)/tab(s) containing the output from the React Native `Metro` bundler and the output from the React Native platform-specific compiler (e.g. Xcode, Android SDK).

Once the build process completes, you should see the basic sample app in the simulator or physical device (whichever you're choosing to use). _Note: the initial build can take several minutes. Subsequent builds are typically much faster. This is not something specific to JSS, but rather normal behavior for React Native._

The app will be running in `disconnected` application mode. This means data and assets are embedded statically within the app.

## Build customizations

Although the build process is largely the same as "normal" React Native, we've customized the invocation of the process a bit. In particular:

* We've added a custom `babel` preset that encapsulates other `babel` plugins that allow us to swap module dependencies at build-time based on the application mode in which you're developing. The basic sample currently uses `disconnected` and `connected` modes along with a new, native-specific, `disconnected-tunnel` mode. More info on that further on in this document.

  * Read more about [JSS application modes](/docs/fundamentals/application-modes)

* One other customization to build invocation is the addition of the `--reset-cache` argument to the metro bundler `start` script. This argument instructs the bundler to ignore its dependency cache during the build process, which ensures that the `babel` customizations mentioned earlier are invoked and allows you to easily switch between application modes at build time.

## Connecting to Sitecore

When you're ready to connect to Sitecore for data, you have two application mode options: `connected` and `connected-tunnel`.

### Connected Mode

Connected mode essentially means that all route data and network images for your app are retrieved from a remote Sitecore instance. Each target app OS has a npm script for starting connected mode:

`start-android:connected`

`start-ios:connected`

For more information on Connected mode, please refer to the official Sitecore JSS documentation: https://jss.sitecore.net/#/application-modes?id=connected-developer-mode

### Connected Tunnel Mode

Connected tunnel mode is similar to connected mode in that you are connecting to a Sitecore instance for route data and network images, but the Sitecore instance is on your local machine or otherwise unavailable via public DNS.

For example:
You have a Sitecore instance installed on your dev machine and a Sitecore site that is configured to use `jssbasicapp` for a hostname, and you have host bindings set to `jssbasicapp` for an IIS site, and `jssbasicapp` is configured in your hosts file. This a very common scenario for local Sitecore development.

Now imagine testing a native app in either a simulator or on a physical device. The app may try to make requests to `http://jssbasicapp`, but that host can't be resolved because the simulator/device does not use your local machine for DNS resolution.

This is where Connected Tunnel mode will provide benefit. When you use Connected Tunnel mode, we use an instance of [`ngrok`](https://ngrok.com/) to create a tunnel between your simulator / device and your local dev machine. We then modify Layout Service and media requests from your app to use the ngrok tunnel, which will tunnel response data from Sitecore back to your app. This means you don't have to change any host bindings on your dev machine.

Each target app OS has a npm script for starting connected tunnel mode:

`start-android:connected-tunnel`

`start-ios:connected-tunnel`

## Routing + State Management
The sample app uses dynamic routing based on the Layout Service (or local route data files in disconnected mode), and uses route/navigation changes to trigger app state changes. Thus tracing the primary execution flow should begin with the route configuration.

## Client-side routing
Every route is defined in App.js using [`react-navigation`](https://reactnavigation.org/).

```jsx
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const Navigator = createStackNavigator({
  Home: { screen: Home },
  Styleguide: { screen: Styleguide }
}, {
  initialRouteName: 'Home'
})

const AppNavigator = createAppContainer(Navigator)

export default AppNavigator
```

Route includes `<Route>` that renders components using `render` function that is coming from props.

```jsx
const Home = ({ navigation }) => (
  <Route 
    path='/'
    render={({ data }) =>
      <Placeholder name='jss-main' rendering={data} navigation={navigation} />
    }
  />
);
```

In `Route.js`, Layout Service data is acquired for the current route, and the route and language state of the app are maintained.
The remaining structure of the route is defined by the route data, that defines which components - and their content data - live in each placeholder.

## Disconnected Mode Support
The JSS disconnected mode enables development of JSS apps using a local mock version of the Sitecore JSS services - Layout Service. This is accomplished in `dataService.disconnected.js` where `getRouteData` function imports route data in json format

## UI Components
UI components are the most important part of the JSS app. Thankfully, they are no different from any other React-Native component - except that they are dynamically added inside a Placeholder component, which provides them with an ambient `fields` prop.

```jsx
import React from 'react';
import { View } from 'react-native';
import { Text } from '@sitecore-jss/sitecore-jss-react-native';

const Welcome = ({ fields }) => (
  <View>
    <Text field={fields.title} />
  </View>
);

export default Welcome;
```

> While the `Welcome` component is written as a _stateless functional_
> component because there is no internal component state or need for
> lifecycle methods, you can also use the ES6 class syntax and extend
> from React.Component. Generally speaking, JSS does not place any
> limitations on the usage of normal React-Native conventions.

## Handling Sitecore Field Types

You probably noticed the `<Text />` component being used above. It is a special component that comes with JSS and as a helper for rendering the field value properly for editing inside Content Editor. There are a number of helpers for different field types, such as images, dates, and rich text fields. Consult the Styleguide page in the sample app for working live examples of all these field types.

## Assets

Your app may have two types of assets: `static` and `network`. Static assets are those that are embedded as resources in your app. Network assets are those that are retrieved from a remote URL.

When developing in disconnected mode, it may be desirable to treat "future" network assets as static assets. For instance, if you're following a code-first approach, you'll likely have assets in your code base that will eventually be imported into Sitecore. At that point, the asset becomes a network asset. Prior to that, however, you may want to test your app with all assets handled as static.

In React Native, static assets must be referenced in your code with a `require()` statement so that the React Native packager can resolve references to assets at build time and include them in your app bundle. Unfortunately, the asset path must be static as well, meaning we can't use dynamic values for `require()` paths.

To help illustrate the issue, let's look at our disconnected data (in `/data/routes/en.json`). You'll notice it contains an image field referencing `/data/media/img/sc_logo.png`. When our React native Image component needs to reference that image statically, we need to `require` it, e.g. `require('/data/media/img/sc_logo.png')`, but that require can't happen at runtime.

In order to work around this limitation, we map our static assets in disconnected mode and then swap out references to those assets at runtime. For example, look at the `/assets/images.disconnected.js` file. You can see it exports an object with keys corresponding to an image location and the corresponding static `require()` statement.

Then, in the `/src/dataService/dataService.disconnected.js` file, when the disconnected route data is being retrieved, we process the data and replace any static image paths we encounter with the corresponding value from the image object map mentioned earlier.

When working in `connected` or `connected-tunnel` mode, we can use the `/assets/images.connected.js` map, which removes references to images that are retrieved via http.

## Known limitations

* For MacOS, `ttab` dependency doesn't work in VS Code Powershell terminal.

* For MacOS, the `glob` pattern used by all other demo apps does not work for finding `.sitecore.js` files for Sitecore manifest generation: `./sitecore/**/*.sitecore.js`

* For MacOS, Sitecore.Ship may throw an error on manifest package deployment.
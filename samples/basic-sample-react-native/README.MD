# Note

Sitecore JSS for React Native is considered highly experimental. It is strongly recommended that you have prior experience working with React Native, the toolchain that it requires, and have some exposure to native app development.

# Prerequisites

The basic sample for React Native is based on a project created via the React Native CLI, e.g. `react-native init`
Your first step will be to follow the instructions on this page: https://facebook.github.io/react-native/docs/getting-started.html

Choose the `Building Projects with Native Code` tab, then choose your Development OS and app Target OS. We have tested the basic sample app on the following configurations:

* Windows / Android
  * In this configuration, testing was done using a physical device connected via USB to the development machine, not the Android emulator.
* macOS / iOS
  * In this configuration, testing was done using the Xcode simulator.

The installation process for all the necessary Android/iOS dependencies and tools can take a significant amount of time - plan accordingly.

# Getting Started

1. Ensure you have completed the Prerequisites section and have confirmed you're able to run the `AwesomeProject` sample that the instructions direct you to create.

1. At this point, you can follow steps 1 and 2 from the JSS Quick Start guide: https://jss.sitecore.net/#/setup/quick-start-dev, or the following abbreviated version:

1. In a new folder, clone or download the basic sample app repo: https://github.com/Sitecore/jss/tree/master/samples/basic-sample-react-native

1. If you don't have Sitecore installed or aren't planning to immediately develop against a Sitecore instance, skip to the next step.

   * Otherwise, if you have Sitecore installed: from a terminal, run `npm run setup` or `yarn setup`

1. Choose your target platform:

   * Android: run `npm run start-android`

   * iOS: run `npm run start-ios`

At this point, the React Native build process should start, opening 1 or 2 separate terminal window(s)/tab(s) containing the output from the React Native `Metro` bundler and the output from the React Native platform-specific compiler (e.g. Xcode, Android SDK).

Once the build process completes, you should see the basic sample app in the simulator or physical device (whichever you're choosing to use). _Note: the initial build can take several minutes. Subsequent builds are typically much faster. This is not something specific to JSS, but rather normal behavior for React Native._

The app will be running in `disconnected` application mode. This means data and assets are embedded statically within the app.

# Build customizations

Although the build process is largely the same as "normal" React Native, we've customized the invocation of the process a bit. In particular:

* We've added a custom `babel` preset that encapsulates other `babel` plugins that allow us to swap module dependencies at build-time based on the application mode in which you're developing. The basic sample currently uses `disconnected` and `connected` modes along with a new, native-specific, `disconnected-tunnel` mode. More info on that further on in this document.

  * For more information about JSS application modes, please refer to the official Sitecore JSS documentation: https://jss.sitecore.net/#/application-modes?id=jss-application-modes

* One other customization to build invocation is the addition of the `--reset-cache` argument to the metro bundler `start` script. This argument instructs the bundler to ignore its dependency cache during the build process, which ensures that the `babel` customizations mentioned earlier are invoked and allows you to easily switch between application modes at build time.

# Connecting to Sitecore

When you're ready to connect to Sitecore for data, you have two application mode options: `connected` and `connected-tunnel`.

## Connected Mode

Connected mode essentially means that all route data and network images for your app are retrieved from a remote Sitecore instance. Each target app OS has a npm script for starting connected mode:

`start-android:connected`

`start-ios:connected`

For more information on Connected mode, please refer to the official Sitecore JSS documentation: https://jss.sitecore.net/#/application-modes?id=connected-developer-mode

## Connected Tunnel Mode

Connected tunnel mode is similar to connected mode in that you are connecting to a Sitecore instance for route data and network images, but the Sitecore instance is on your local machine or otherwise unavailable via public DNS.

For example:
You have a Sitecore instance installed on your dev machine and a Sitecore site that is configured to use `jssbasicapp` for a hostname, and you have host bindings set to `jssbasicapp` for an IIS site, and `jssbasicapp` is configured in your hosts file. This a very common scenario for local Sitecore development.

Now imagine testing a native app in either a simulator or on a physical device. The app may try to make requests to `http://jssbasicapp`, but that host can't be resolved because the simulator/device does not use your local machine for DNS resolution.

This is where Connected Tunnel mode will provide benefit. When you use Connected Tunnel mode, we use an instance of [`ngrok`](https://ngrok.com/) to create a tunnel between your simulator / device and your local dev machine. We then modify Layout Service and media requests from your app to use the ngrok tunnel, which will tunnel response data from Sitecore back to your app. This means you don't have to change any host bindings on your dev machine.

Each target app OS has a npm script for starting connected tunnel mode:

`start-android:connected-tunnel`

`start-ios:connected-tunnel`

# Assets

Your app may have two types of assets: `static` and `network`. Static assets are those that are embedded as resources in your app. Network assets are those that are retrieved from a remote URL.

When developing in disconnected mode, it may be desirable to treat "future" network assets as static assets. For instance, if you're following a code-first approach, you'll likely have assets in your code base that will eventually be imported into Sitecore. At that point, the asset becomes a network asset. Prior to that, however, you may want to test your app with all assets handled as static.

In React Native, static assets must be referenced in your code with a `require()` statement so that the React Native packager can resolve references to assets at build time and include them in your app bundle. Unfortunately, the asset path must be static as well, meaning we can't use dynamic values for `require()` paths.

To help illustrate the issue, let's look at our disconnected data (in `/data/routes/en.json`). You'll notice it contains an image field referencing `/data/media/img/sc_logo.png`. When our React native Image component needs to reference that image statically, we need to `require` it, e.g. `require('/data/media/img/sc_logo.png')`, but that require can't happen at runtime.

In order to work around this limitation, we map our static assets in disconnected mode and then swap out references to those assets at runtime. For example, look at the `/assets/images.disconnected.js` file. You can see it exports an object with keys corresponding to an image location and the corresponding static `require()` statement.

Then, in the `/src/dataService/dataService.disconnected.js` file, when the disconnected route data is being retrieved, we process the data and replace any static image paths we encounter with the corresponding value from the image object map mentioned earlier.

When working in `connected` or `connected-tunnel` mode, we can use the `/assets/images.connected.js` map, which removes references to images that are retrieved via http.

# Known limitations

* For MacOS, `ttab` dependency doesn't work in VS Code Powershell terminal.

* For MacOS, the `glob` pattern used by all other demo apps does not work for finding `.sitecore.js` files for Sitecore manifest generation: `./sitecore/**/*.sitecore.j`

* For MacOS, Sitecore.Ship may throw an error on manifest package deployment.

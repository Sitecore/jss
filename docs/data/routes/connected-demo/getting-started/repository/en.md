---
name: repository
routeTemplate: ./data/routes/connected-demo/en.yml
title: Cloning repository
---

# Cloning and setting up the demo source code

## Installing the Habitat Fitness Demo App

### Step 1: Clone or Download the Habitat Fitness Repo 
You can find the Habitat Fitness demo project here:
[https://github.com/Sitecore/Sitecore.HabitatHome.Omni](https://github.com/Sitecore/Sitecore.HabitatHome.Omni)

You can either download and unzip the project to a location of your choosing, or you can open a terminal/command line to that location and clone it with the following command:

```text
git clone https://github.com/Sitecore/Sitecore.HabitatHome.Omni.git
```

### Step 2 (optional): Create .env file with Google Maps and Firebase API Keys
There are parts of the application that depend on 3rd party services, so a Google API key and a Firebase API key are needed for these features to work. These features are not relevant to this guide, so you can skip the API key setup. Just be aware that you may encounter warnings about missing API keys, so this is ok and you can ignore the warnings.

However, if you wish to set up the API keys to see the app fully-functional, the `Connecting 3rd party API services` section of the repository 
[README](https://github.com/Sitecore/Sitecore.HabitatHome.Omni/blob/master/fitness/app/README.md#connecting-3rd-party-api-services) has detailed instructions.

### Step 3: Install the JSS CLI
Note: If you've been working in disconnected mode, you probably already have the JSS CLI installed.
Open a terminal/console window and execute the following command to install the JSS CLI:
```text
npm install -g @sitecore-jss/sitecore-jss-cli
```
### Step 4:	Install Required NPM Modules
Open a terminal/console window in the `<repo root>\fitness\app` folder where package.json resides, and run the following command:

```text
npm install
```

This will install all the NPM Modules required by the project.

Next: [Connecting to Sitecore](/connected-demo/getting-started/connecting)

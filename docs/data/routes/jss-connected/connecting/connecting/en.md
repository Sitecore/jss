---
name: connecting
routeTemplate: ./data/routes/jss-connected/en.yml
title: Connecting
---

#Connecting to Habitat Fitness Sitecore JSS Website

## Node.js
Developing JSS apps requires Node.js. It is recommended you use the latest available release.

- To check which version you have, run  `node -v`  in a terminal/console window
- To download and install Node.js, go to https://nodejs.org 

## Installing the Habitat Fitness Demo App Project

### Step 1: Clone or Download the Habitat Fitness Repo 
You can find the Habitat Fitness demo project here:
https://github.com/Sitecore/Sitecore.HabitatHome.Omni

You can either download and unzip the project to a location of your choosing, or you can open a terminal/command line to that location and clone it with the following command:

```text
git clone https://github.com/Sitecore/Sitecore.HabitatHome.Omni.git
```

### Step 2 (optional): Create .env file with Google Maps and Firebase API Keys 
If you are using Google Maps or Firebase, you will likely need to store your various keys. In your app folder (in this case, /fitness/app), create a new file named .env as a sibling of package.json, and add the following to its contents:

```text
REACT_APP_GOOGLE_API_KEY=<insert-yours-here>
REACT_APP_FIREBASE_MESSAGING_PUSH_KEY=<insert-yours-here>
REACT_APP_FIREBASE_SENDER_ID=<insert-yours-here>
```

### Step 3: Install the JSS CLI
Open a terminal/console window and execute the following command to install the JSS CLI:
```text
npm install -g @sitecore-jss/sitecore-jss-cli
```
### Step 4:	Install Required NPM Modules
Open a terminal/console window in the app folder where package.json resides, and run the following command:

```text
npm install
```

This will install all the NPM Modules required by the project. 

## Connecting the Local App to the Sitecore Instance
Open terminal/console window in the app folder of your project. Run the following command:

```text
jss start:connected
```

The first time you run this command, you will see the following prompts. Respond as indicated below:

```text
This command requires a Sitecore connection. Would you like to configure the connection? [y/n]: 
y

Is your Sitecore instance on this machine or accessible via network share? [y/n]: 
n

Sitecore hostname (e.g. http://myapp.local.siteco.re; see /sitecore/config; ensure added to hosts): 
https://<your instance id here>.trial.sitecore.com 

Sitecore import service URL [https://mahsw1jlvgcy.trial.sitecore.com/sitecore/api/jss/import]:
(Leave Blank – Just hit enter)

Sitecore API Key (ID of API key item):
{EBF6D5C1-EB80-4B15-91AB-DD3845797774}

Please enter your deployment secret (32+ random chars; or press enter to generate one):
(Leave Blank – Just hit enter)

Is the config deployed? [y/n]: 
y
```

  <div class="row">
    <div class="col-md-6"> 
      <p>
      <img src="/assets/img/ConnectingToFitness.jpg" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>When you have completed the series of prompts, the information provided will be stored in a scjssconfig.json in the root of your app. </p>
      <p>A browser window should launch pointed to the local application, which is now connected to your remote Sitecore Instance!</p>
    </div>    
  </div>




---
name: repository
routeTemplate: ./data/routes/connected-demo/en.yml
title: Cloning repository
---

# Cloning and setting up the demo source code

## Step 1: Clone or download the Lighthouse Fitness repo

You can find the Lighthouse Fitness demo repository here: [https://github.com/Sitecore/Sitecore.Demo.Headless](https://github.com/Sitecore/Sitecore.Demo.Headless). Use the `jss-trial-10.0.1` tag to use the same codebase that's been deployed to your trial instance.

### If you are not used to Git version control

1. Download the source code of the `jss-trial-10.0.1` tag: [https://github.com/Sitecore/Sitecore.Demo.Headless/archive/jss-trial-10.0.1.zip](https://github.com/Sitecore/Sitecore.Demo.Headless/archive/jss-trial-10.0.1.zip)
2. Unzip the file on your computer (e.g.: in `C:\projects\Sitecore.Demo.Headless-jss-trial-10.0.1\`).

### If you know how to use Git

1. Open a terminal/command line to a project folder (e.g.: `C:\projects\`).
2. Clone the repository with the following command:

    ```text
    git clone -b jss-trial-10.0.1 --single-branch https://github.com/Sitecore/Sitecore.Demo.Headless.git
    ```

3. Since you'll be making code changes to the app later in this guide, now is a good time to create a new branch for your work. Run these commands:

    ```text
    cd Sitecore.Demo.Headless
    git checkout -b <new-branch-name>
    ```

## Step 2: Install the JSS CLI

Note: If you've been working in disconnected mode on another project, you probably already have the JSS CLI installed.

Open a terminal/console window and execute the following command to install the JSS CLI:

```text
npm install -g @sitecore-jss/sitecore-jss-cli
```

## Step 3: Install required NPM modules

Open a terminal/console window in the `<repo root>\fitness\app` folder where package.json resides, and run the following command:

```text
npm install
```

This will install all the NPM Modules required by the project.

Next: [Connecting to Sitecore](/connected-demo/getting-started/connecting)

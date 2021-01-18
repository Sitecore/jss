---
name: prerequisites
routeTemplate: ./data/routes/connected-demo/en.yml
title: Prerequisites
---

# Pre-requisites

The JSS Connected Demo is a set of tutorials to help guide you as you explore connected mode between a JSS app and a Sitecore instance.

These guided tutorials are great for developers participating in the [JSS Developer Trial](https://www.sitecore.com/trial), which grants you limited-time access to a pre-configured Sitecore environment. But if you're not participating in the trial, and you have access to your own Sitecore instance, then of course you will also benefit from these tutorials.

## To get started

1. Ensure you have access to a Sitecore instance with the Lighthouse Fitness Demo installed. If you are participating in the JSS Developer Trial, use the link provided in your confirmation email to interact with and view the reference website. Please note that your changes will only be available on your local instance.

2. Developing JSS apps requires Node.js. It is recommended you use the latest LTS release.
    - To check which version you have, run `node -v` in a terminal/console window.
    - To download and install Node.js, go to [https://nodejs.org](https://nodejs.org)

3. Optionally, you can use Git in this tutorial. It is recommended you use the latest release.
    - To check which version you have, run `git --version` in a terminal/console window.
    - To download and install Git, go to [https://git-scm.com/downloads](https://git-scm.com/downloads)

4. Follow the instructions to [clone the Lighthouse Fitness Demo source code](/connected-demo/getting-started/repository).

5. Follow the instructions to [connect your local repository to the Sitecore instance](/connected-demo/getting-started/connecting).

   Once your local JSS app is connected to Sitecore, you can view the app in a local browser with data populated from the remote Sitecore instance. You can make code changes to the React components, and view them in the browser with real Sitecore data. You can interact with the app in your local browser, and review the analytics that your visit triggered in Sitecore's interface.

6. Follow our [step-by-step tutorial](/connected-demo/explore-sitecore/experience-editor) to get familiar with connected mode.

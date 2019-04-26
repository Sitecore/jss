---
name: connecting
routeTemplate: ./data/routes/connected-demo/en.yml
title: Connecting
---

# Connecting to Habitat Fitness

## Connecting the Local Repository to the Remote Sitecore Instance
Open terminal/console window in the `<repo root>\fitness\app` folder of your project. Run the following command:

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




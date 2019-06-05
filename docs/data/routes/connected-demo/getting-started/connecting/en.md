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

## Browse the front-end of the connected app 
If it does not launch automatically, go to [http://localhost:3000/](http://localhost:3000/)

The app lists different types of events.
![](/assets/img/connecting1.png)

You can use the menu at the top to personalize what your preferred types of events are. After you go through the personalization dialogs, you will only see the events that match your preferences.
![](/assets/img/connecting2.png)

You can also you the header menu to view events that you've favorites and register for events (More on this later on in the tutorial).

Open a new incognito browser window, and this time access the app with a promo code [http://localhost:3000/?sc_camp=C0D46075D0B249AD866092B5E525D639](http://localhost:3000/?sc_camp=C0D46075D0B249AD866092B5E525D639).
This causes a special promotional event, the Power River Marathon, to be featured at the top of the list. Note: if the promo code did not work for you, please make sure it is a new incognito window and this is your first visit in incognito.
![](/assets/img/connecting3.png)

## Summary
So the cool thing about all this is that the app that you're browsing locally is being hydrated with data from a remote Sitecore instance. And this data is being dynamically personalized, and appended with extra promotional content based on rules that Sitecore content administrators have configured.

Use the menu in the left nav to continue exploring Connected Mode and learn more about how all this works.
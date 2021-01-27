---
name: xprofile
routeTemplate: ./data/routes/connected-demo/en.yml
title: Data Generation for xProfile
---
# Data Generation for xProfile

## Interact with the app to generate data for xProfile

1. From the front-end on your local connected app ([http://localhost:3000/](http://localhost:3000/)), select the "Personalize" item from the upper right corner drop-down menu.

   ![Lighthouse Fitness menu to personalize the experience](/assets/img/DataGen1.png)

   _NOTE_: if you see any errors when opening your connected app, it may be because the cookies from the Sitecore instance are interfering. If you are logged into Sitecore in the same browser, then it's best to open the local app in an incognito instance._

2. Select "Basketball".

   ![Sports screen selecting basketball](/assets/img/DataGen2.png)

3. Move the Skill Level slider to "Expert" and click the "Continue" button.

   ![Sports screen selecting expert level](/assets/img/DataGen3.png)

4. In the "Demographics" screen, enter whatever you'd like and click the "Continue" button.

   ![Demographics screen](/assets/img/DataGen4.png)

5. In the "Personal" screen, enter a sample email and name and click the "Continue" button.

   ![Personal screen](/assets/img/DataGen5.png)

   _NOTE: This does not have to be a real email address, it only needs to be something you can remember so that you can locate it in the Experience Profile later on._

6. In the "Finish" screen, click the "Home" button. It will provide you with an experience personalized to your stated interest in basketball.

   ![Finish screen](/assets/img/DataGen6.png)

7. Favorite a few of the events by clicking into the event and then clicking on the heart button in the upper right corner. Be sure to favorite and then unfavorite at least one.

   ![Favoriting an event](/assets/img/DataGen7.png)

   _NOTE: These are Sitecore Goals being triggered behind the scenes._

   _NOTE: The Google Maps will not work on the local application because the Google Maps API keys are not set._

8. Register for an event by clicking on the "Sign Up" button.

9. Confirm the registration by clicking on the checkmark button.

   ![Confirming registration to an event](/assets/img/DataGen8.png)

10. Once you have signed up, click on the bell button to register for notifications.

    ![Registering for event notifications](/assets/img/DataGen9.png)

    _NOTE: These are Sitecore Goals being triggered behind the scenes._

11. The browser will ask you to show notifications. Click the "Allow" button.

    ![Browser prompt for allowing notifications](/assets/img/DataGen10.png)

    _NOTE: The notifications will not work on the local application because the Firebase API keys are not set._

12. Feel free to explore the app. Once you are done with your independent exploring, go back to the home page.

13. Use the upper right drop-down menu and click on the "End Current Session" item.

    ![Lighthouse Fitness menu to end the current session](/assets/img/DataGen11.png)

    _NOTE: This sends all the data you have generated into xDB so that you can view said data in Sitecore._

Next: [Launch Experience Profile](/connected-demo/explore-sitecore/launch-xprofile)

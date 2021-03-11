---
name: personalization-in-experience-editor
routeTemplate: ./data/routes/connected-demo/en.yml
title: Personalization in Experience Editor
---

# Personalization in the Experience Editor

1. Click on the featured event (specifically the image) to open the toolbar.

   ![Featured event selected in the Experience Editor](/assets/img/Personalization1.png)

2. Click on the Personalization icon to view the personalization rules that are currently configured on this component.

   ![List of personalizations on the featured event](/assets/img/Personalization2.png)

3. Shift between the variations to see the differences in content.

You can edit the content, including text and images, directly in Experience Editor.

## How the Rule is Built

1. At the bottom of the list or on the personalization button in the floating toolbar, click on the "Edit Conditions" link.

   ![Buttons to click to open the personalization dialog](/assets/img/Personalization3.png)

2. This will open a dialog to personalize the component. Click Edit Rule to see how the specific condition is configured.

   ![Personalization dialog](/assets/img/Personalization4.png)

The first personalization rule relates to a specific campaign, which can only be accessed via a specific campaign code (Boston Marathon Campaign Code: sc_camp=C0D46075D0B249AD866092B5E525D639). The second is triggered when a contact's skill level in Basketball is greater than 6 – this is the personalization rule that is triggered by moving the Basketball slider to "Expert."

Each version contains a mini-A/B test, one that will show you the Visits and Effect of each personalized version. **"Visits"** equals what percentage of people were shown the personalized version. **"Effect"** shows the increase/decrease in Engagement Value stemming from the personalized version.

Note that the personalization rules here only demonstrate a tiny portion of Sitecore's broad range of personalization options. The platform's mature rules engine can drive personalization based on business goals, IP information, profiling taxonomy, and other data.

Next: [Data Generation for xProfile](/connected-demo/explore-sitecore/xprofile)

---
name: updating-component
routeTemplate: ./data/routes/connected-demo/en.yml
title: Updating a Component
---

# Updating a Component

We can make changes to a component in our local application, then see those changes refreshed in the browser immediately.

In your preferred editor, open the file EventListItem component, located in the following location:

```text
\fitness\app\src\components\EventListItem\index.js
```

Find the `<NavLink>` tag that wraps the `<Text>` field for our event items name. (should be somewhere around line 60).

![Habitat Fitness](/assets/img/Changes1.png)

<br><br>

Change the order of the `<NavLink>` and `<DateField>` tags so that `<DateField>` appears first.

![Habitat Fitness](/assets/img/Changes2.png)

<br><br>

Save your changes and refresh your browser.

![Habitat Fitness](/assets/img/Changes3.png)

<br>

Once you are done working locally, in a typical environment you could then deploy your changes.

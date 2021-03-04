---
name: updating-component
routeTemplate: ./data/routes/connected-demo/en.yml
title: Updating a Component
---

# Updating a Component

We can make changes to a component in our local application, then see those changes refreshed in the browser immediately.

1. In your preferred editor, open the EventListItem component file, located in the following location:

   ```text
   \fitness\app\src\components\EventListItem\index.js
   ```

2. Find the `<NavLink>` tag that wraps the `<Text>` field for our event items name. (should be somewhere around line 60).

   ![Lighthouse Fitness](/assets/img/Changes1.png)

3. Change the order of the `<NavLink>` and `<DateField>` tags so that `<DateField>` appears first.

   ![Lighthouse Fitness](/assets/img/Changes2.png)

4. Save your changes. Since hot reloading is enabled, the browser will automatically refresh to reflect the changes.

   ![Lighthouse Fitness](/assets/img/Changes3.png)

## Developer Trial Limitations

If this were a normal development workflow, once you completed testing your code locally, the next step would be to deploy your changes to the server that hosts the remote Sitecore instance. This step is not supported for the Developer Trial. Because of this limitation, you can edit existing components freely in Connected Mode, but you are unable to create new components and add them to the page.

Next: [GraphQL](/connected-demo/explore-code/graphql)

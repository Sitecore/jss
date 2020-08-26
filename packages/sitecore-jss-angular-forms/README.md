# Sitecore JSS Forms + Angular
Angular implementation for Sitecore JSS forms

NOTE: This module is intended to be copied from and extended as needed - it is not meant to be a heavyweight forms implementation.

Consult the [Sitecore JSS documentation](https://jss.sitecore.com/docs/techniques/forms) for further details.

Check out my blog post on details for the implementation: [Implementation Details](https://www.xcentium.com/blog/2020/06/29/sitecore-jss-forms-angular)

# How to use
1. Clone the repository
2. Add the forms folder to a component location in your JSS application
3. Update the `form.component.ts` to point to a location that contains references for the following values 
-- `sitecoreApiHost`
-- `sitecoreApiKey`
4. Register the form component in your app
5. Create a Form rendering in Sitecore
6. Profit!
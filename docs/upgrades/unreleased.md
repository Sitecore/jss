## Unreleased

### nextjs-xmcloud

* **Update** 

    * package.json

        remove:
        ```
        ~"@sitecore-cloudsdk/events": "^0.2.4",~
        ```
        add:
        ```
        "@sitecore-cloudsdk/events": "^0.3.0",
        ```

### nextjs-multisite

* **Update** 

    * packages\create-sitecore-jss\src\templates\nextjs-multisite\scripts\config\plugins\multisite.ts

        ```
        //Remove
        useSiteQuery: true,
        ```

**Note for SXP users**

JSS now uses `site` query to retrieve site info.
 When multisite addon is installed, `site` query retrieves both the SXA Headless and the configuration sites. JSS will filter out "website", but any other MVC or non-nextjs sites defined in configuration will be considered for resolution by the JSS app.
 In case your setup is like this and you wish to avoid that, and just use the headless sites for your setup, you can add a filter in `\scripts\config\plugins\multisite.ts` file. For example:

 ```
    sites = sites.filter((site) => !['not-headless', 'headful', 'mvc'].includes(site.name));
 ```


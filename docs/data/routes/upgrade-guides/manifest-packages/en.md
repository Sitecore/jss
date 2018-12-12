---
name: manifest-packages
routeTemplate: ./data/component-templates/full-page.yml
title: Upgrading to JSS 9.0 Manifest Packages
---

# Upgrading a JSS Server to JSS 9.0

> JSS 9.0 Server requires a new Sitecore license compared to all previous releases. Prior to upgrading, ensure that you have a Sitecore license file that contains `Sitecore.JSS` in its text - and if not, contact your sales rep (or generate a new license on SPN for partners) to be able to run JSS 9.

First, install the latest server components package from `dev.sitecore.net` (find a download link in the upper right).

Then, you can remove the artifacts left over from the Sitecore.Ship-based deployment that JSS 8 and earlier used:

* Delete `App_Config/Sitecore/JavaScriptServices/ship.config`
* Delete `App_Config/Sitecore/JavaScriptServices/Sitecore.JavaScriptServices.Ship.config`
* Delete `/ship`
* Delete `/bin/Sitecore.Ship*.dll`
* Delete `/bin/Sitecore.JavaScriptServices.Ship.dll`

# Upgrading a JSS Application to JSS 9.0

* Upgrade your global installation of `sitecore-jss-cli` to the latest version.

* Open `/scjssconfig.json`. Change `shipUrl` to `deployUrl` and change URL's path to `/sitecore/api/jss/import`.

> If you don't have a `scjssconfig.json` file, there are no upgrade steps to be performed.

* Add a `deploySecret` property to the `sitecore` object, e.g.

```json
  {
    "sitecore": {
      "deploySecret": "randomly-generated-32+-character-secret string",
    }
  }
```

* Open `/sitecore/config`. Create a new file called `MyApp'sName.deploysecret.config`, with contents like so:

```xml
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
  <sitecore>
    <javaScriptServices>
      <apps>
        <app name="MyApp'sNameFromAppName.config"
             deploymentSecret="randomly-generated-32+-character-secret string"
             debugSecurity="false"
        />
      </apps>
    </javaScriptServices>
  </sitecore>
</configuration>
```

> Note: This config patch file should be ignored by source control. Do not commit secrets to the repository, and use unique secrets for each environment.

* Open `package.json` and add a declaration for your app's root placeholder name(s) under the `config` object:

```json
{
  "config": {
    "rootPlaceholders": ["jss-main"],
  }
}
```
* Borrow the `/sitecore/definitions/config.js` file from the TP4 sample app of your chosen JS library [from GitHub](https://github.com/Sitecore/jss/tree/master/samples) and copy it to your app
* Migrate placeholder names if necessary. JSS 9 disallows certain placeholder names, including `main` used by previous JSS TPs, by default due to conflicts with SXA. You can choose to:
    * Rename the placeholders, ideally to something app-specific like `myapp-main`, on the route data, placeholder definitions, and component definitions (exposed placeholders). Note that you can set a display name on the placeholder definition in `/sitecore/definitions/placeholders.sitecore.js` to give authors a nice looking name that does not need to be unique.
    * Pass `--allowConflictingPlaceholderNames` (or `-a` for short) when deploying to bypass the placeholder name blacklist
* Run `jss deploy config` to deploy your shared secret to your Sitecore instance
* Run `jss deploy items` to test your connection and run an item import. `jss deploy items` works exactly like `jss deploy package --noFiles` would have in JSS 8 and earlier.
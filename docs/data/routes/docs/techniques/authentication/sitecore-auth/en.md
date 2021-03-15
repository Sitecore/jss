---
name: sitecore-auth
routeTemplate: ./data/component-templates/article.yml
title: Sitecore Authentication
---

# Sitecore Authentication and Security

Sitecore's security model allows you to restrict content access by users and roles, personalize on user profile, and more. It is built on top of ASP.NET Membership and by default utilizes the `.ASPXAUTH` cookie by default.

As the [Layout Service](/docs/fundamentals/services/layout-service) will respect any logged in users and Sitecore Security, you are fully able to utilize security and authentication with JSS.

## The SSC Authentication Service

Sitecore Services Client includes an Authentication Service which can be utilized to RESTfully log into Sitecore and set the `.ASPXAUTH` cookie. You may invoke this service within your JSS application in order to utilize Sitecore authentication and authorization.

For more information on this service, see the [SSC API Documentation](https://doc.sitecore.net/sitecore_experience_platform/developing/developing_with_sitecore/sitecoreservicesclient/the_restful_api_for_the_itemservice).

> The SSC Auth services require an SSL/TLS connection, so for local development you will need to set up a certificate and SSL bindings for your Sitecore site. SSL configuration is beyond the scope of this documentation. `https://my.sitecore.hostname` should work, even if with a security warning, before attempting to use SSC auth from a JSS app.

## Creating a User and Page for Testing Authentication

To test/explore authentication and security with a sample app, you'll need to create a user and a protected route from within Sitecore.

> Take these steps *after* importing the app.

### Create an Extranet User
1. Log into Sitecore and access the Launchpad
1. Select *User Manager* under Access Management
1. Select *New* in the ribbon
1. Fill in the user information:
    * *User name* - whatever you wish
    * *Domain* - **must** be *extranet*
    * *Email* - a valid email address
    * *Password* - whatever you wish
1. Click *Next* then *Close*

### Create a Protected Route
1. Log into Sitecore and access the Launchpad
1. Select *Content Editor* under Content Editing
1. In the Content Tree, navigate to the *Home* item of the app, typically (e.g. for React, `/sitecore/content/JssReactWeb/home`).
1. Right-click on *Home* add Insert > Extended Route.
1. Give the route whatever name you like.
1. With the new route still selected, open the *Security* ribbon and under Presets, select *Require login*.
1. Click OK.
1. Add some content to the route using the Experience Editor if you like, but this is not required.

## SSC Auth 

It is possible to build a simple login/logout using the [SSC Authentication services](https://doc.sitecore.net/sitecore_experience_platform/developing/developing_with_sitecore/sitecoreservicesclient/the_restful_api_for_the_itemservice).

### Integrated Mode

* In integrated mode, the calls to the SSC Auth services occur against the same host name (as they do with Layout Service).
* For Login to function properly in integrated mode, ensure you are accessing the Sitecore host over SSL, e.g. `https://JssReactWeb`.
* If you followed the instructions above to set up a test user and page, upon logging in the protected page should be added to the navigation.

### Headless Mode

* The proxy system utilized by Headless mode is able to proxy requests to the SSC Auth services, and proxy the `.ASPXAUTH` cookie.
* Because the requests are proxied, CORS headers should not be an issue.
* For login functionality to work however, the `apiHost` in `config.js` of the sample headless server needs to be updated to SSL, e.g. `https://JssReactWeb`.
* If proxying to a development Sitecore instance using a privately signed certificate, ensure you've [configured Sitecore CA certificates for Node.js](/docs/fundamentals/troubleshooting/node-certificates).
* Alternatively, you can disable SSL validation entirely by setting `secure` to `false` in the proxy options, e.g. in `config.js`

```
  proxyOptions: {
    // NEVER EVER do this in production. It will make your SSL completely insecure.
    secure: false
  }
```

### Connected Mode

* When running in connected mode, the app will be served from a local server, render in-browser, but SSC Auth service requests will be made to a remote Sitecore instance (as are Layout Service requests).
* To utilize Login functionality in Connected mode, the remote Sitecore host URL in `scjssconfig.json` needs to be updated to utilize SSL, e.g. `https://JssReactWeb`.
* In addition, you will need to configure the `Access-Control-Allow-Headers` and `Access-Control-Allow-Credentials` headers:

    ```xml
    <add name="Access-Control-Allow-Headers" value="Content-Type, Accept, X-Requested-With, Session" />
    <add name="Access-Control-Allow-Credentials" value="true" />
    ```

* As the SSC Auth service does not support an `OPTIONS` preflight CORS request out of the box (resulting in a `404` response), you will also need to ensure you send your requests to the login service using a URL-encoded body, and **not JSON**.

    ```js
    // an example of sending a URL-encoded body using the fetch API (JavaScript)

    import queryString from 'query-string';

    const payload = {
      domain: 'extranet',
      username: 'test',
      password: 'b'
    }

    fetch('https://site.core.local/sitecore/api/ssc/auth/login?sc_apikey={DCE1069B-36E8-4A66-946E-C1B07071C38C}', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include',
      method: 'POST',
      body: queryString.stringify(payload),
    }).then((response) => {
      console.log(response);
    });
    ```

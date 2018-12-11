---
name: federated-auth
routeTemplate: ./data/component-templates/article.yml
title: Federated Authentication
---

# Federated Authentication

## Sitecore-integrated Federated Authentication

When running exclusively in Integrated Mode, it is possible to simply utilize Sitecore's builtin Owin support to delegate authentication and map users into Sitecore's security model.

> This approach will not work in Headless or Connected modes, as it depends on browser requests directly to Sitecore. It may be possible to mock in Disconnected mode.

Reference [Sitecore 9 Documentation](https://doc.sitecore.net/sitecore_experience_platform/developing/developing_with_sitecore/federated_authentication/using_federated_authentication_with_sitecore) and/or [Sitecore community guides](http://blog.baslijten.com/enable-federated-authentication-and-configure-auth0-as-an-identity-provider-in-sitecore-9-0/) for information on how to enable federated authentication and integrate with your provider of choice.

Once integrated, you can [extend the Layout Service context](/docs/techniques/extending-layout-service/layoutservice-extending-context) to add Sitecore-generated login URLs to Layout Service output, which you can utilize to add Login links to your app. From there, the use case is very similar to using [builtin Sitecore authentication and security](/docs/techniques/authentication/sitecore-auth).

### Example Code

```csharp
using System.Linq;
using Sitecore.Abstractions;
using Sitecore.LayoutService.ItemRendering.Pipelines.GetLayoutServiceContext;
using Sitecore.Pipelines.GetSignInUrlInfo;

public class AddLoginLinks : Sitecore.JavaScriptServices.ViewEngine.LayoutService.Pipelines.GetLayoutServiceContext.JssGetLayoutServiceContextProcessor
{
    protected readonly BaseCorePipelineManager CorePipelineManager;
    protected readonly BaseLinkManager LinkManager;

    public AddLoginLinks(Sitecore.JavaScriptServices.Configuration.IConfigurationResolver configurationResolver, BaseCorePipelineManager corePipelineManager, BaseLinkManager linkManager) : base(configurationResolver)
    {
        CorePipelineManager = corePipelineManager;
        LinkManager = linkManager;
    }

    protected override void DoProcess(GetLayoutServiceContextArgs args, Sitecore.JavaScriptServices.Configuration.AppConfiguration application)
    {
        var returnUrl = LinkManager.GetItemUrl(args.RenderedItem);
        var loginUrlArgs = new GetSignInUrlInfoArgs(site: "JssReactWeb", returnUrl: returnUrl);
        GetSignInUrlInfoPipeline.Run(CorePipelineManager, loginUrlArgs);
        if (loginUrlArgs.Result.Any())
        {
            args.ContextData.Add("loginUrls", loginUrlArgs.Result);
        }
    }
}
```

### Result

```json
loginUrls: [
    {
        identityProvider: "Auth0",
        caption: "Log in with Auth0",
        icon: "/sitecore/shell/themes/standard/Images/24x24/helloworld",
        href: "/identity/externallogin?authenticationType=Auth0&ReturnUrl=%2fidentity%2fexternallogincallback%3fReturnUrl%3d%252fservices%26sc_site%3djssreactweb%26authenticationSource%3dDefault&sc_site=JssReactWeb"
    }
]
```
---
name: vercel
routeTemplate: ./data/component-templates/article.yml
title: Deploying to Vercel
---
# Walkthrough: Deploying to Vercel

Using Vercel you can easily deploy sample app to production environment. Vercel is an all-in-one platform with Global CDN supporting static & Jamstack deployment.
Vercel has first-class support for Next.js.

Assuming that you have setupped Next.js sample which targets to Sitecore instance.
Let's go throw steps in order to deploy Next.js sample app

1. Execute steps provided in Next.js [Getting Started](https://nextjs.org/docs/deployment#getting-started).
1. in `.env` setup:
	* `PUBLIC_URL` - your Vercel deployment URL.
	* `SITECORE_API_KEY` - your Sitecore API key is needed to build the app.
	* `SITECORE_API_HOST` - your Sitecore API hostname.
	* `JSS_EDITING_SECRET` - optional, your secret token, in case if you want to use Experience Editor with your Next.js Vercel deployment.
1. Push changes to your Git provider.

## Publish:end webhook invocation

Using webhook you can automatically trigger static site generation, cache clearing, and other automated activities which support webhooks.

In order to enable webhook you should do next steps: 

1. Follow [article](https://vercel.com/docs/more/deploy-hooks#creating-a-deploy-hook) to create deploy hook in Vercel.
1. Edit `/App_Config/Sitecore/JavaScriptServices/Sitecore.JavaScriptServices.AppServices.PublishingWebHook.config.example`:
	* `url` - Required. The URL of the webhook which should be invoked.
	* `method` - Optional. The HTTP method that should be used when invoking webhook. Default is POST, only other accepted option should be GET.
	* `site` - Optional. The sites which should trigger the webhook, when published. If the site parameter is provided, the webhook will be invoked if the published item root is an ancestor, descendant, or equal to the configured site's root item.
1. Remove `.example` extension of `Sitecore.JavaScriptServices.AppServices.PublishingWebHook.config.example` file.
1. Publish items.
1. Check that new Vercel deployment is triggered.

---
name: nextjs-static-export
routeTemplate: ./data/component-templates/article.yml
title: Next.js static export
---

# Next.js Static HTML Export

Using JSS Next.js sample app you can run `jss export` that allows you to export your app to static HTML, which can be run standalone without the need of a Node.js server. Read more about Next.js [Static HTML Export](https://nextjs.org/docs/advanced-features/static-html-export).

> Currently, these are the limitations of the Next.js sample app for usage of Static HTML Export:
> 1. i18n not supported, so multilingual apps can't be exported.
> 1. Visitor Identification not available.
> 1. Request rewrites not supported.

These instructions you should apply in order to run `next export`:
1. Remove `i18n`:
	1. Delete i18n configuration in `next.config.js`.
	1. Define language in `package.json` using `config.language` which will be used during export.
2. Remove `rewrites` in `next.config.js`.
3. Since `rewrites` are removed it's required to include Sitecore server URL as part of media requests. You should remove configuration patch from `JssNextWeb.config`:
```xml
<layoutService>
	<configurations>
		<config name="jss">
			<rendering>
				<renderingContentsResolver>
					<IncludeServerUrlInMediaUrls>false</IncludeServerUrlInMediaUrls>
				</renderingContentsResolver>
			</rendering>
		</config>
	</configurations>
</layoutService>
```
or setup `<IncludeServerUrlInMediaUrls>true</IncludeServerUrlInMediaUrls>`. Don't forget to run `jss deploy config`.
4. Remove usage of `<VisitorIdentification />` component in `src/components/Layout.tsx`, since Visitor Identification not available.
5. Define `PUBLIC_URL` in `.env`.
6. Add scripts in `package.json`:
	* `"next:export": "next export"`.
	* For disconnected mode: 
		* `"export": "cross-env-shell JSS_MODE=disconnected PORT=3042 EXPORT_MODE=true \"npm-run-all --serial bootstrap next:build next:export\""`,
		where `PORT` - it's port of your disconnected server.
		* Run `jss start:disconnected-proxy` before `jss export`. During the build stage nextjs will fetch required data (layout, dictionary, sitemap) from your disconnected server.
	* For connected mode: `"export:connected": "cross-env-shell EXPORT_MODE=true \"npm-run-all --serial bootstrap next:build next:export\""`.

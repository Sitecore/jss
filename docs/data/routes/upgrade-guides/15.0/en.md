---
name: "15.0"
routeTemplate: ./data/component-templates/full-page.yml
title: Upgrading to JSS 15.0
---

### Upgrading from JSS 14.0 to JSS 15.0

1. Update peer dependencies version.
1. Update all @sitecore-jss/* packages to the latest 15.x version.
1. React sample:
	* Remove SitecoreContextFactory usages
	* Look at [PR#456](https://github.com/Sitecore/jss/pull/456) in order to use latest SitecoreContext:
		* Remove usage of global variable `ssrInitialState`.
		* Pass `__JSS_STATE__` into `<AppRoot />` component
		* Use `export default withSitecoreContext({ updatable: true })(RouteHandler)` in order to get `props.updateSitecoreContext` and update context correctly
1. Angular sample:
	* Look at [PR#440](https://github.com/Sitecore/jss/pull/440) in order to upgrade from Angular 8 to Angular 10, major tips (more points described in `Angular update guide`):
		* Update [angular.json](https://github.com/Sitecore/jss/pull/440/files#diff-5eafa5ceceb0af4b3cc7e1cb840bdbe89f24ffa1ee5713e53476e93f7a3cbd28)
		* Update [package.json](https://github.com/Sitecore/jss/pull/440/files#diff-6c0ee02a3e37b1691e3ce3c2991cf362f4ad186d1d3669929df78bc4f82f6a4a) packages and commands
		* Update [server.bundle.ts](https://github.com/Sitecore/jss/pull/440/files#diff-d937bb461fd37c3cc56491627193701ee3b979aa448d54508c9d0694dd0d95a6):
			* Use `renderModule` instead of `renderModuleFactory`
			* Remove usage of `LAZY_MODULE_MAP`
			* Use `AppServerModule` instad of `AppServerModuleNgFactory`
		* In every file `sitecore/definitions/components/*.ts` define function name like [here](https://github.com/Sitecore/jss/pull/440/files#diff-9eca35f4d3535085271595529f6f9d10b7ddc175a8d2666893a8a10b791b0360) where it's similar as `name` property in `manifest.addComponent({ name: 'StyleguideFieldUsageText', ... })`. These changes were applied in order to resolve [issue#326](https://github.com/Sitecore/jss/issues/326)
		* Remove [usage](https://github.com/Sitecore/jss/pull/440/files#diff-becb86468705186fb8fcdb15a970d16360b821a0b1af374af2514a03fd9e09d1) of ModuleMapLoaderModule
		* Add separate [tsconfig.webpack-server.json](https://github.com/Sitecore/jss/pull/440/files#diff-c79c20cdd43426191e26a53011a5382854595edfa032c0935c2fd2459e7ae7d5) to use `commonjs` module in order to run scripts and build server
	* Use [Angular update guide](https://update.angular.io/)
1. sitecore-embedded-jss-app:
	* Look at [PR#466](https://github.com/Sitecore/jss/pull/466) in order to remove usage of `SitecoreContextFactory` and use latest `SitecoreContext`
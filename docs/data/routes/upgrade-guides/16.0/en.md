---
name: "16.0"
routeTemplate: ./data/component-templates/full-page.yml
title: Upgrading to JSS 16.0
---

### Upgrading from JSS 15.0 to JSS 16.0

1. Check usages of `any` type (and fix any build/lint errors) as we start to migrate from `any` to `unknown` or more specific types
1. If you are using `resolveScJssConfig` from `@sitecore-jss/sitecore-jss-dev-tools`, you should update calling signature to use
```
resolveScJssConfig({
	configPath,
	configName,
	assert
})
```
instead of old signature.
1. If you are using `ComponentFactory` from `@sitecore-jss/sitecore-jss-react`, check/fix types related to `ComponentFactory`, currently it returns  `ComponentType | null` (component definition) instead of `Component` (instantiated component).

---
name: "14.0"
routeTemplate: ./data/component-templates/full-page.yml
title: Upgrading to JSS 14.0
---

# Upgrading from JSS 13.0 to JSS 14.0 (alpha)

1. Update all @sitecore-jss/* packages to the latest 14.x version.
1. React application:
*	Check all usages of `withSitecoreContext`:
	-	All components that wrapped by `withSitecoreContext` can have set of props that extend `ComponentConsumerProps` interface, not implement only `ComponentConsumerProps` as it was.
* Check all usages of `Placeholder` component:
	- You can return `ReactElement` in functions: `render`, `renderEach`, `renderEmpty`
	- Reimplement `renderEach` function using declaration `(component: React.ReactNode, index: number): React.ComponentClass<any> | React.SFC<any> | React.ReactNode` 

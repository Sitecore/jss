---
name: "13.0"
routeTemplate: ./data/component-templates/full-page.yml
title: Upgrading to JSS 13.0
---

# Upgrading from JSS 12.0 to JSS 13.0

1. Update peer dependencies version. 
1. Update all @sitecore-jss/* packages to the latest 13.x version.
* React application: can upgrade react to latest version without migration
* Angular application:
	1. lazy registrations: replace old `loadChildren` value by new `() => Promise` type:
			
			lazyRegistrations.push(`{ path: '${componentName}', loadChildren: () => import('./${componentFolder}/${componentFolder}.module').then(m => m.${componentName}Module) },`);
			
	1. `tsconfig.app` set: "module": "commonjs".
	
	You can upgrade @angular/* packages to version 8, in this case you should perform next steps:
	1. Upgrade zone.js to latest version
	1. Upgrade typescript to version: "3.5.0"
	1. Fix type errors, typescript 3.5 has breaking changes: https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#typescript-35
    
	Angular official migration guide: https://update.angular.io/#7.0:8.0
* Vue application:
	* Install vue-apollo with version - 3.0.0-beta.27
* React-Native application:
	* Upgrading guide - https://react-native-community.github.io/upgrade-helper/?from=0.55.4&to=0.61.0

# Refactoring JSS base packages

1. Create submodules in base package
2. Move all tightly couples packages together.
3. Remove circular Dependency.

## API changes in `sitecore-jss/*` packages

The JSS base packages have been refactored to make the API reference generation better. As a result, some reorganizing was done in the base packages, which causes breaking changes for how some services, classes and functions are exported.

If you are importing any of these into your project, the imports need to be updated per the table below.

|Package Name|Submodule Added  | change description
|---|------|---
|**Sitecore-jss**|||
||`graphql` |  No change
||`i18` | No change
|| `layout` | No change
||`media` | New
||`testData` | No change
||`tracking` | Moved as a submodule from being a separate package
|**Sitecore-jss-angular**||*No Change*
|**Sitecore-jss-angular-schematics**||*No Change*
|**Sitecore-jss-cli**||*No Change*
|**Sitecore-jss-dev-tools**|||
||`bin` | No change
||`disconnected-server` | No change
||`manifest` | Moved as a submodule from being a separate package
||`pipelines` | Moved as a submodule from being a separate package
||`setup` | No change
||`templating` | No change
||`testData` | No change
||`update` | Moved as a submodule from being a separate package
|**Sitecore-jss-tracking**||Moved to Sitecore-jss
|**Sitecore-jss-manifest**||Moved to Sitecore-jss-dev-tools
|**Sitecore-jss-pipelines**||Moved to Sitecore-jss-dev-tools
|**Sitecore-jss-update**||Moved to Sitecore-jss-dev-tools
|**Sitecore-jss-forms**||*No Change*
|**Sitecore-jss-nextjs**||*No Change*
|**Sitecore-jss-proxy**||*No Change*
|**Sitecore-jss-react**||*No Change*
|**Sitecore-jss-react-forms**||*No Change*
|**Sitecore-jss-react-native**||*No Change*
|**Sitecore-jss-rendering-host**||*No Change*
|**Sitecore-jss-vue**||*No Change*

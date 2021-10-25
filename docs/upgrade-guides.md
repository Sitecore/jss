# Refactoring JSS base packages

1. Create submodules in base package
2. Move all tightly couples packages together.
3. Remove circular Dependency.

## API changes in `sitecore-jss/*` packages

The JSS base packages have been refactored to make the API reference generation better. As a result, some reorganizing was done in the base packages, which causes breaking changes for how some services, classes and functions are exported.

If you are importing any of these into your project, the imports need to be updated per the table below.

|Package Name|Submodule Added  | change description
|---|------|---
|**Sitecore-jss**||Broken into submodules so now all function, classes and interfaces within this package gets imported directly into all other packages and sample apps from individual submodules.|
||`graphql` |   E.g. 'import { GraphQLClient } from @sitecore-jss/sitecore-jss/graphql'
||`i18` | E.g. 'import { RestDictionaryService } from @sitecore-jss/sitecore-jss/i18n'
|| `layout` | E.g. 'import { LayoutServiceData } from @sitecore-jss/sitecore-jss/layout'
||`media` | E.g. 'import { mediaApi } from @sitecore-jss/sitecore-jss/media'
||`utils` | E.g. 'import { isServer } from @sitecore-jss/sitecore-jss/utils'
||`tracking` | Moved as a submodule from being a separate package. E.g. 'import { trackingApi } from @sitecore-jss/sitecore-jss/tracking'
|**Sitecore-jss-angular**||*No Change*
|**Sitecore-jss-angular-schematics**||*No Change*
|**Sitecore-jss-cli**||*No Change*
|**Sitecore-jss-dev-tools**|| Now manifest, pipelines and update package are part of this package.|
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

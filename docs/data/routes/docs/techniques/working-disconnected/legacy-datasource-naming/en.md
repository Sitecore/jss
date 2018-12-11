---
name: legacy-datasource-naming
routeTemplate: ./data/component-templates/article.yml
title: Legacy Datasource Naming
---

# Enabling Legacy Datasource Naming

If upgrading a JSS 7.0 app to JSS 8.0, existing datasource items that have already been imported to Sitecore will be re-imported under new names with JSS 8.0.

Should you wish to preserve legacy datasource naming, you can do that using manifest pipeline patching. To do this, you need to:

* Create the `/sitecore/pipelines` folder in your JSS app if it does not already exist
* Add a file called `legacyDatasourceNamer.patch.js` in the pipelines folder
* Place the following contents in the patch:

```js
const legacyDatasourceNamer = ({ item, placeholder, rendering, index }) =>
  `${item.name}-${placeholder.phName}-${rendering.componentName}-${index + 1}`;

export const config = (pipelines) => {
  const pipeline = pipelines.getPipeline('generateRouteItem');

  const processor = pipeline.getProcessor('processRenderings');

  if (!processor) {
    return;
  }

  processor.args.datasourceNamer = legacyDatasourceNamer;

  pipeline.updateProcessor(processor);
};
```

* Deploy your JSS app with content, for example `jss deploy items -c`

> Note: This workaround is not supported by Sitecore.
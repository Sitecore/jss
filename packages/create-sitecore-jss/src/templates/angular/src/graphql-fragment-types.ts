/* eslint-disable */
export default {
  "__schema": {
    "types": [
      {
        "kind": "INTERFACE",
        "name": "ItemField",
        "possibleTypes": [
          {
            "name": "RichTextField"
          },
          {
            "name": "NumberField"
          },
          {
            "name": "MultilistField"
          },
          {
            "name": "LookupField"
          },
          {
            "name": "LinkField"
          },
          {
            "name": "TextField"
          },
          {
            "name": "IntegerField"
          },
          {
            "name": "ImageField"
          },
          {
            "name": "DateField"
          },
          {
            "name": "CheckboxField"
          },
          {
            "name": "NameValueListField"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Item",
        "possibleTypes": [
          {
            "name": "UnknownItem"
          },
          {
            "name": "StyleguideComponentParamsRenderingParameters"
          },
          {
            "name": "C__StandardTemplate"
          },
          {
            "name": "C__Route"
          },
          {
            "name": "RenderEngineType"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideTracking"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideSitecoreContext"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideSection"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideRouteFields"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideMultilingual"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideLayoutTabsTab"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideLayoutTabs"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideLayoutReuse"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideItemLinkItemTemplate"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideFieldUsageText"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideFieldUsageRichText"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideFieldUsageNumber"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideFieldUsageLink"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideFieldUsageItemLink"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideFieldUsageImage"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideFieldUsageFile"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideFieldUsageDate"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideFieldUsageCustom"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideFieldUsageContentList"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideFieldUsageCheckbox"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideExplanatoryComponent"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideContentListItemTemplate"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideComponentParams"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideAngularLazyLoading"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>GraphQLIntegratedDemo"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>GraphQLConnectedDemo"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>ExampleCustomRouteType"
          },
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>ContentBlock"
          },
          {
            "name": "C__<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>AppRoute"
          },
          {
            "name": "JsonRendering"
          },
          {
            "name": "JavaScriptRendering"
          },
          {
            "name": "JSSLayout"
          },
          {
            "name": "App"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "RenderingOptions",
        "possibleTypes": [
          {
            "name": "JsonRendering"
          },
          {
            "name": "JavaScriptRendering"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Layout",
        "possibleTypes": [
          {
            "name": "JSSLayout"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>AppRoute",
        "possibleTypes": [
          {
            "name": "<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>ExampleCustomRouteType"
          },
          {
            "name": "C__<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>AppRoute"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Caching",
        "possibleTypes": [
          {
            "name": "JsonRendering"
          },
          {
            "name": "JavaScriptRendering"
          }
        ]
      }
    ]
  }
}

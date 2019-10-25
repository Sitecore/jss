---
name: extending-layout-service-overview
routeTemplate: ./data/component-templates/article.yml
title: Extending Layout Service
---

# Layout Service Extensibility

You have a number of options for customizing the output of the Layout Service.

> Looking for [Layout Service basics](/docs/fundamentals/services/layout-service)?

## Anatomy of a Layout Service Request

When Layout Service receives a request, this is what happens on the server:

1. When the `/sitecore/api/layout/render/jss?item=/about` service is invoked, an MVC controller responds and parses the `?item=/about` parameter.

   > The `jss` portion of this route refers to a particular _named configuration_ of the Layout Service. These can be used to create app-specific layout service extensions by registering your own.

2. An item lookup is performed based on the `item` parameter which takes the context site's start item into account. The logic should match standard Sitecore URL handling. Item GUIDs are also allowed.

3. After the item is resolved, the Layout Service utilizes placeholder data in Layout and Rendering definition items to render the item to an object structure, making use of the `mvc.renderPlaceholder` pipeline. By using Sitecore MVC pipelines, the Layout Service output will account for any personalization rules and/or content testing in the item's layout definition.

4. Instead of rendering MVC views, a custom JS serializer will take component's data source item(s) and will serialize them into a JS object.

   > A rendering's serialized output can be customized by creating an implementation of `Sitecore.LayoutService.ItemRendering.IRenderingContentsResolver` and specifying the type in the rendering's `Rendering Contents Resolver` field.

5. The output then assembled and returned as JSON.

## Layout Service Context

The `getLayoutServiceContext` pipeline allows you to add _context data_ which is returned with particular Layout Service configurations and/or JSS apps. Context data appears under the `context` object in the LS output.

See the [Extending Route Context Data Recipe](/docs/techniques/extending-layout-service/layoutservice-extending-context) for more information.

## Rendering Contents

JSS and the Layout Service provide several options for customizing the serialized data provided with a rendering, if you need something other than the serialized datasource item.

See the [Customizing Layout Service Rendering Output Recipe](/docs/techniques/extending-layout-service/layoutservice-rendering-contents) for more information.

## Field Serializers

Out of the box, the Layout Service can serialize the following types of Sitecore fields:

- Rich Text
- Image
- General Link
- Date / Datetime
- Checkbox
- Links (Droplink, Droptree, Grouped Droplink)
- Multi-links (Multlist, Checklist, Treelist and their variants)
- Number
- File
- Plain text (Single-line text, Multi-line text)

All other field types are treated as plain text as well, and are output with their raw value. If you wish to customize the serialization of a particular field type, the basic steps are:

1. Create an implementation of `Sitecore.LayoutService.Serialization.FieldSerializers.BaseFieldSerializer`.
1. Override the `WriteValue` method and utilize the `JsonTextWriter` to create your custom JSON structure for the `Field`.
1. Create an implementation of `Sitecore.LayoutService.Serialization.Pipelines.GetFieldSerializer.BaseGetFieldSerializer`.
1. Override `SetResult` and set `rgs.Result` to an instance of your `BaseFieldSerializer` implementation.
1. Patch the `getFieldSerializer` pipeline within the `layoutService` pipeline group with your `BaseFieldSerializer` implementation. Be sure to `patch:before` the `GetDefaultFieldSerializer` processor, and populate the `FieldTypes` list with the desired Sitecore field type(s).

## Layout Service Configuration

The Layout Service JSON rendering process is highly configurable, and allows you to customize specific aspects of the Layout Service. Configurations are found in the Sitecore configuration at the path `/sitecore/layoutService/configurations`. The `name` attribute of the `config` node corresponds to the `config` parameter in the Layout Service URL.

### JSS Layout Service Configuration

```xml
<config name="jss">
    <!--
        An implementation of `Sitecore.LayoutService.Configuration.IRenderingConfiguration`.
        Allows the addition of filtering logic to output renderings and placeholders.
    -->
    <rendering type="Sitecore.LayoutService.Configuration.DefaultRenderingConfiguration, Sitecore.LayoutService">

        <!--
            An implementation of `Sitecore.LayoutService.Placeholders.IPlaceholdersResolver`.
            Extracts the exposed placeholders of a rendering. Also available is
            `Sitecore.LayoutService.Placeholders.SimplePlaceholdersResolver`.
        -->
        <placeholdersResolver type="Sitecore.LayoutService.Placeholders.DynamicPlaceholdersResolver, Sitecore.LayoutService"/>

        <!--
            An implementation of `Sitecore.LayoutService.Serialization.ItemSerializers.IItemSerializer`.
            Determines what fields of an item should be serialized, and writes them out as JSON. The default
            implementation filters standard fields. Also available is
            `Sitecore.LayoutService.Serialization.ItemSerializers.AllFieldsItemSerializer`.
        -->
        <itemSerializer type="Sitecore.LayoutService.Serialization.ItemSerializers.DefaultItemSerializer, Sitecore.LayoutService" resolve="true"/>

        <!--
            An implementation of `Sitecore.LayoutService.ItemRendering.ContentsResolvers.IRenderingContentsResolver`.
            This is the default contents resolver -- it can be overridden on a per-rendering basis, as described above.
        -->
        <renderingContentsResolver type="Sitecore.LayoutService.ItemRendering.ContentsResolvers.RenderingContentsResolver, Sitecore.LayoutService">
            <IncludeServerUrlInMediaUrls>true</IncludeServerUrlInMediaUrls>
        </renderingContentsResolver>
    </rendering>

    <!--
        An implementation of Sitecore.LayoutService.Configuration.ISerializationConfiguration.
        Controls the `JsonSerializerSettings` used by the Layout Service, and any transformation of the resulting JSON.
        The JSS `SerializationConfiguration` customizes JSON serialization to preserve the case of dictionary keys.
    -->
    <serialization type="Sitecore.JavaScriptServices.ViewEngine.LayoutService.SerializationConfiguration, Sitecore.JavaScriptServices.ViewEngine">

        <!--
            An implementation of `Sitecore.LayoutService.Serialization.ILayoutTransformer`.
            Provides full control over the shape of the output JSON, to optimize it for the use of specific client needs.
            JSS optimizes the output for JavaScript consumption.
        -->
        <transformer type="Sitecore.JavaScriptServices.ViewEngine.LayoutService.Serialization.LayoutTransformer, Sitecore.JavaScriptServices.ViewEngine"/>
    </serialization>
</config>
```
> In terms of modifying serialization configuration, keep in mind that you can change the whole JSON beside field names. Field names can be changed in Sitecore, if you need to e.g.: have them camel-cased, you need do it in Sitecore. So basically serialization configuration is responsible for changing JSON on which user don't have influence.

### Using a custom Layout Service configuration with JSS

> Changing the Layout Service configuration used by JSS should be done with care. Changes to object shape, serialization, placeholder processing, etc. may break the JSS SDKs and/or may conflict with assumptions made by the JSS import process.

If you wish to customize any elements of the `jss` Layout Service configuration, we recommend using the `ref` attribute
to "copy" in the existing configuration, and then customize within that element. This will help reduce needed
changes to your configuration, should the `jss` configuration change during an upgrade.

After defining your custom configuration, you may also want / need to add the configuration name to the list of `<AllowedConfigurations>` for the `renderJsonRendering` pipeline. Doing so will ensure that the `PlaceholderTransformer` code that executes for the default `jss` configuration will execute for your custom configuration as well.

> Note: This is only relevant if your custom configuration will be delivering output that is similar in shape to the default JSS configuration. If your custom configuration is not related to JSS or doesn't depend on anything from the default `jss` configuration, this step is not necessary.

A Sitecore config patch for a custom layout service named config that is based on the default `jss` named config is below:

```xml
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
  <sitecore>
    <layoutService>
      <configurations>
        <!-- Define your custom named config, using the `ref` attribute to "copy" the existing `jss` configuration -->
        <config name="my-jss-config">
          <rendering ref="/sitecore/layoutService/configurations/config[@name='jss']/rendering">
            <!-- Override placeholdersResolver -->
            <placeholdersResolver type="My.Resolver, My.Assembly">
          </rendering>
          <serialization ref="/sitecore/layoutService/configurations/config[@name='jss']/serialization" />
        </config>
      </configurations>
  </layoutService>
    <pipelines>
        <group groupName="layoutService">
          <pipelines>
            <renderJsonRendering>
              <processor type="Sitecore.JavaScriptServices.ViewEngine.LayoutService.Pipelines.RenderJsonRendering.AddComponentName, Sitecore.JavaScriptServices.ViewEngine" resolve="true">
                <AllowedConfigurations hint="list">
                  <!-- Custom named config is added to this list -->
                  <config id="2">my-jss-config</config>
                </AllowedConfigurations>
              </processor>
            </renderJsonRendering>
          </pipelines>
        </group>
    </pipelines>
  </sitecore>
</configuration>
```

After patching in your custom configuration, you can utilize it in your JSS App via the `layoutServiceConfiguration` attribute.

```xml
<javaScriptServices>
  <apps>
    <app name="MyApp"
        sitecorePath="/sitecore/content/MyApp"
        layoutServiceConfiguration="my-jss-config"
        inherits="defaults"
    />
  </apps>
</javaScriptServices>
```

You'll need to ensure that you provide this configuration name in your client code as well when invoking Layout Service via the `dataApi` (see examples above).

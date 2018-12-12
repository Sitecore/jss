---
name: graphql-overview
routeTemplate: ./data/component-templates/article.yml
title: Sitecore GraphQL API
---
# The Sitecore GraphQL API

The Sitecore GraphQL API is an implementation of a GraphQL server on top of Sitecore. It is designed to be a generic GraphQL service platform - meaning it's designed to host your API and present it via GraphQL queries. The API also supports real-time data using GraphQL subscriptions.

## What is GraphQL?

[GraphQL](http://graphql.org/) is a query language for your API. Think of it in SQL terms as "the world's best `SELECT` statement." GraphQL is...

* _Frontend-driven_. The GraphQL protocol is oriented around the needs of frontends - whether a web app, PWA, or mobile app.
* _Efficient_. GraphQL returns only the requested data from a query, eliminating data over-fetching, saving bandwidth, and improving performance. Advanced features like _query batching_ and _automatic persisted queries_ reduce bandwidth needs even further.
* _Strongly-typed_ and _schema-driven_. Built-in schema introspection drives amazing GUI query authoring tools, self-documentation, static analysis, and API mocking capabilities.
* _A graph_. GraphQL queries are graph traversal, which enables incredibly expressive queries that would take many requests if done with a REST API.
* _An amazing ecosystem_. The GraphQL community is large and vibrant, with a whole galaxy of useful tools already made.

There are very good [tutorials](http://graphql.org/learn/) out there on how to use and learn GraphQL, including [Apollo Launchpad](https://launchpad.graphql.com/) that lets you create a GraphQL server and query it right in a browser.

## When to use GraphQL?

GraphQL is appropriate when you need a production-grade API to power a frontend. Compared to traditional REST APIs, GraphQL is significantly more maintainable, far more easily discoverable and queryable (thanks to built-in GUI tools), much more bandwidth-efficient, and much more powerful.

Building a GraphQL API is an excellent investment for any site that will make heavy use of its API from its frontend(s), or expose its API to external consumers.

## Sitecore GraphQL Concepts

The Sitecore GraphQL API implements the GraphQL standard, but has some Sitecore-specific details. You define _endpoints_ which have a specific absolute URL. These host a GraphQL _schema_ (a strongly typed graph definition). This schema is comprised of one or more _schema providers_ (e.g. `ContentSchemaProvider` or `CustomersCrmSchemaProvider`). These endpoints speak the GraphQL language. Unlike REST APIs, there is a formal request format and response format. Due to this commonality, GraphQL endpoints are all serviced by a single `Controller` and no code is required to define a new endpoint. It also enables things like _request batching_ (multiple queries in a single HTTP request) to reduce network traffic.

Extensibility is paramount. Each endpoint has its own isolated configuration, so endpoints can be isolated from any other endpoints' config to increase reliability. It's also possible to extend the whole schema with _Extenders_, which can modify and add to the GraphQL schema for an endpoint after it has been created by schema providers. This enables enhancer scenarios such as allowing a standard `Item` graph type to have new analytics properties added to it by an analytics extender. Or to integrate data from a CRM or other REST service provider into an item field. Which is possible with an extender.

Security is an important goal as well. Authentication (via standard auth cookies) is supported, as well as attribution and impersonation using SSC API keys. Custom authorization routines are also supported. Content endpoints can also disable specific operations so for example a mutation-free read-only content endpoint is possible.

Performance is important in any API, and Sitecore GraphQL is optimized for speed. There are also performance metrics that can be used to analyse performance problems on a per-field basis when enabled.

Usability is also very important. The [GraphiQL](https://github.com/graphql/graphiql) query editor is built in to Sitecore GraphQL endpoints for easy code-completion-powered authoring of queries and review of API documentation. Sitecore templates are also baked into the GraphQL type system, so you can do strongly typed, validatable queries against real fields. It's like an ORM for your frontend, and it updates in real-time with template changes! Template fields are also mapped to GraphQL types, so you get strong typed access to say the `src` and `width` on an image field in addition to its value.

## Quick Start

Sitecore GraphQL currently ships as a component of JavaScript Services.

### Setting up Sitecore GraphQL

* Set `<compilation debug="true">` in the web.config if it isn't already. This will enable the GraphQL GUI with the default security settings. For security, the GUI is disabled for production scenarios by default.

* If using GraphQL Subscriptions or WebSocket transport, ensure that the WebSockets feature is enabled on IIS (if it's not, you'll get 'unexpected response HTTP 200' when a socket comes up; do an `iisreset` after install if you need it)

> WebSockets are not supported on Windows Server 2008 R2 and earlier. Subscriptions cannot be used when hosted on these OSes. Subscriptions are intended to be used for CM server customizations used by authors. Sitecore does not support subscriptions for use in scaled public environments.

* If using CORS or wanting to use impersonation, you'll want to set up a [SSC API key](https://doc.sitecore.net/sitecore_experience_platform/developing/developing_with_sitecore/sitecoreservicesclient/api_keys_for_the_odata_item_service) in the `/sitecore/system/Settings/Services/API Keys` folder. API keys work with GraphQL just like with SSC. For Sitecore 9.0, API keys are stored in the `core` database; for 9.1 and later, the `master` database.

### Configuring a GraphQL Endpoint

Sitecore GraphQL does not ship with any GraphQL endpoints defined. To use the GraphQL API you must define at least one endpoint. The following is an example of defining an authentication-required content API endpoint for the `master` database (belongs as a Sitecore config patch in `App_Config/Include`)

```xml
<?xml version="1.0" encoding="utf-8" ?>

<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/" xmlns:role="http://www.sitecore.net/xmlconfig/role/">
    <sitecore>
        <api>
            <GraphQL>
                <endpoints>
                    <!-- Define an endpoint. The XML element name ('master') should be unique. The 'url' is what you'll use to access the endpoint. -->
                    <master url="/sitecore/api/graph/items/master" type="Sitecore.Services.GraphQL.Hosting.GraphQLEndpoint, Sitecore.Services.GraphQL.NetFxHost" resolve="true">
                        <url>$(url)</url>

                        <enabled role:require="!ContentDelivery">true</enabled>
                        <enabled role:require="ContentDelivery">false</enabled>

                        <gui role:require="!ContentDelivery">DebugOnly (follow web.config compilation setting)</gui>
                        <gui role:require="ContentDelivery">false</gui>

                        <schema hint="list:AddSchemaProvider">
                            <!--
                              Defaults are defined in Sitecore.Services.GraphQL.Content.config 
                              Note: to customize, copy the default here and replace the node,
                              e.g. <content type="Sitecore.Services.GraphQL.Content.ContentSchemaProvider, Sitecore.Services.GraphQL.Content">...</content>

                              It is a best practice to only add relevant templates and operations to your content schemas.
                            -->
                            <content ref="/sitecore/api/GraphQL/defaults/content/schemaProviders/systemContent" param1="master" />
                        </schema>

                        <!-- 
                          Determines the security of the service. Defaults are defined in Sitecore.Services.GraphQL.config. 'publicService' allows anonymous access, but requires passing an SSC API key. 
                          'systemService' requires Sitecore authentication cookies to be passed.
                        -->
                        <security ref="/sitecore/api/GraphQL/defaults/security/systemService" />

                        <!-- 
                          Determines how performance is logged for the service. Defaults are defined in Sitecore.Services.GraphQL.config
                        -->
                        <performance ref="/sitecore/api/GraphQL/defaults/performance/standard" />

                        <!--
                            Cache improves the query performance by caching parsed queries.
                            It is also possible to implement query whitelisting by implementing an authoritative query cache;
                            WhitelistingGraphQLQueryCache is an example of this, capturing queries to files in open mode and allowing only captured queries in whitelist mode.
                        -->
                        <cache type="Sitecore.Services.GraphQL.Hosting.QueryTransformation.Caching.GraphQLQueryCache, Sitecore.Services.GraphQL.NetFxHost">
                            <param desc="name">$(url)</param>
                            <param desc="maxSize">10MB</param>
                        </cache>
                        
                        <!-- 
                            Extenders allow modifying schema types after they are created by a schema provider but before they are added to the final schema.
                            This is useful when you want to _extend_ a generated schema, for example to add external API
                            data onto the item API, or to add in custom internal data (e.g. custom layout data to power an app)
                            without having to directly modify a schema provider.
                        
                            Extenders must derive from SchemaExtender.

                            Extender example: <myExtender type="My.Class, My.Assembly" resolve="true" />
                        -->
                        <extenders hint="list:AddExtender">
                        </extenders>
                    </master>
                </endpoints>
            </GraphQL>
        </api>
    </sitecore>
</configuration>
```

> NOTE: The Sitecore GraphQL default configuration files are all heavily commented and are a good resource to understand the full depth of the configuration options that are available, especially the default presets that are referred to with `ref` in the endpoint configuration. Look in `/App_Config/Sitecore/Services.GraphQL` to find the default configuration files.

### Using the GraphQL Endpoint

With a GraphQL endpoint defined, it can be accessed using the `url` it is defined with. Using the example above, the API would be queried using its URL: `http://my.sitecore.domain/sitecore/api/graph/items/master`.

However for query composition it's much easier to use the GraphiQL GUI, which is accessed by adding `/ui` on to the endpoint URL: `http://my.sitecore.domain/sitecore/api/graph/items/master/ui`. The GraphiQL tool will allow composing GraphQL queries using schema-powered auto completion, testing queries, and reviewing the schema's documentation.

With the configuration sample above installed, you should be able to use the GraphiQL web application to create queries.

1. Log in to Sitecore (the sample endpoint requires authentication)
1. Visit `/sitecore/api/graph/items/master/ui`; this UI will let you query items and templates in the `master` database.
1. Click the `Docs` link in the upper right to browse the type schema. Note that the schema has helpful descriptions, and that you can hover over query elements in the editor to browse them in the docs.
1. Write a GraphQL query using GraphiQL's code completion functionality (ctrl-space triggers it manually). GraphQL is designed to be easily self-discoverable for consumers, and it's really easy to use. For example this query demonstrates the power of GraphQL by reteieving an item, its children, and its template definition in a single query:

```
{
  item(path: "/sitecore/templates") {
    id
    path
    children {
      name
    }
    template {
       fields {
        name
      }
    }
  }
}
```

The result (clipped for brevity) will look something like this:

```
{
  "data": {
    "item": {
      "id": "{3C1715FE-6A13-4FCF-845F-DE308BA9741D}",
      "path": "/sitecore/templates",
      "children": [
        {
          "name": "Branches"
        },
        {
          "name": "Sample"
        },
        ...
      ],
      "template": {
        "fields": [
          {
            "name": "__Help link"
          },
          ...
        ]
      }
    }
  }
}
```

> Note: if the endpoint requires authentication, so does the GUI. If the endpoint requires an SSC API key (`?sc_apikey=api-key-guid`), the GUI also requires the API key to be passed.

#### Querying the API

Authoring queries in a GUI is fun, but to be useful the queries need to be executed from a frontend. There's nothing special about querying the Sitecore GraphQL API compared to any other GraphQL endpoint. Client libraries such as Apollo are generally recommended; refer to the client's documentation to learn how to use them.

Sitecore GraphQL endpoints support all types of GraphQL request:

* HTTP POST with `application/json` content type and query in standard JSON payload format (most common format)
* HTTP POST with `application/json` content type and JSON _array_ of standard payloads (used by batching)
* HTTP POST with `application/json` using [Automatic Persisted Queries](https://dev-blog.apollodata.com/improve-graphql-performance-with-automatic-persisted-queries-c31d27b8e6ea) protocol to reduce the size of the queries over the wire
* HTTP POST with `application/graphql` content type and raw GraphQL query in body
* HTTP GET with query string parameters (`query`, `operationName`, `variables`)
* WebSocket with [graphql-ws](https://github.com/apollographql/subscriptions-transport-ws/blob/master/PROTOCOL.md) protocol (subscriptions or queries)

All types of GraphQL operations are supported by the API framework (a schema may or may not implement all of these kinds of operation): [queries](http://graphql.org/learn/queries/) (reading data), [mutations](http://graphql.org/learn/queries/#mutations) (altering data), and [subscriptions](https://dev-blog.apollodata.com/graphql-subscriptions-in-apollo-client-9a2457f015fb) (subscribing to real-time updates of data). Subscriptions are implemented using the Apollo [subscriptions-transport-ws](https://github.com/apollographql/subscriptions-transport-ws) protocol which uses WebSockets. Socket connections are automatically allowed to GraphQL endpoint URLs. Note that WebSockets require Windows Server 2012 or later and the IIS WebSocket feature enabled. It is possible to use Sitecore.Services.GraphQL without WebSockets, but subscriptions will be unavailable.

#### Extra Endpoint Features

In addition to the GraphiQL `/ui`, each GraphQL endpoint also supports some additional extra pieces:

* `$url/schema` - dumps the GraphQL schema in Schema Definition Language (SDL) format. SDL format is very useful for static analysis (i.e. `eslint-plugin-graphql`) and schema mocking tools (`graphql-tools`).
* `$url/stats` - shows basic statistics about the endpoint schema and its performance
* `$url/cache` - shows details about the GraphQL query cache on the endpoint

> Note: each of these extra endpoint features can be disabled if desired.

# Creating GraphQL Schemas

_Schema Providers_ are designed to provide self-contained pieces of the schema. For example if you want to add a new root query and your type system does not depend on any other schema provider's types, you should select a schema provider. A good example of a schema provider might be a third party CRM system.

Implementing a Schema Provider is a two-step process: first, you need to create a C# class that implements `SchemaProviderBase`. This class defines the structure of the GraphQL schema, including the root fields that can be queried (i.e. `item` is a root query field in the content schema provider). Generally there will be other supporting classes that define _Graph Types_ that are the node types in the schema. Second, the Schema Provider must be registered on a GraphQL endpoint. This is a type registration in the endpoint's config patch.

Here is a complete schema provider implementation that allows querying on the current Sitecore user.

```
using System;
using System.Collections.Generic;
using System.Web;
using GraphQL.Resolvers;
using GraphQL.Types;
using Sitecore.Security.Accounts;
using Sitecore.Services.GraphQL.Schemas;

namespace Sitecore.Services.GraphQL.Examples
{
    /// <summary>
    /// Sample of making your own schema provider
    /// This sample enables you to query on the current context user
    /// </summary>
    public class WhoAmISchemaProvider : SchemaProviderBase
    {
        public override IEnumerable<FieldType> CreateRootQueries()
        {
            yield return new WhoAmIQuery();
        }

        /// <summary>
        /// Teaches GraphQL how to resolve the `whoAmI` root field.
        ///
        /// RootFieldType<UserGraphType, User> means this root field maps a `User` domain object into the `UserGraphType` graph type object.
        /// </summary>
        protected class WhoAmIQuery : RootFieldType<UserGraphType, User>
        {
            public WhoAmIQuery() : base(name: "whoAmI", description: "Gets the current user")
            {
            }

            protected override User Resolve(ResolveFieldContext context)
            {
                // this is the object the resolver maps onto the graph type
                // (see UserGraphType below). This is your own domain object, not GraphQL-specific.
                return Context.User;
            }
        }

        // because this graph type is referred to by the return type in the FieldType above, it is automatically
        // registered with the schema. For implied types (e.g. interface implementations) you need to override CreateGraphTypes() and
        // manually tell the schema they exist (because no graph type directly refers to those types)
        protected class UserGraphType : ObjectGraphType<User>
        {
            public UserGraphType()
            {
                // graph type names must be unique within a schema, so if defining a multiple-schema-provider
                // endpoint, ensure that you don't have name collisions between schema providers.
                Name = "SitecorePrincipal";

                Field<NonNullGraphType<StringGraphType>>("name", resolve: context => context.Source.Name);
                Field<NonNullGraphType<StringGraphType>>("fullName", resolve: context => string.IsNullOrWhiteSpace(context.Source.Profile.FullName) ? context.Source.Name : context.Source.Profile.FullName);
                Field<NonNullGraphType<StringGraphType>>("icon", resolve: context => $"{HttpContext.Current?.Request.Url.GetLeftPart(UriPartial.Authority)}/-/icon/{context.Source.Profile.Portrait}");
                Field<NonNullGraphType<BooleanGraphType>>("isAuthenticated", resolve: context => context.Source.IsAuthenticated);
                Field<NonNullGraphType<BooleanGraphType>>("isAdministrator", resolve: context => context.Source.IsAdministrator);

                // note that graph types can resolve other graph types; for example
                // it would be possible to add a `lockedItems` field here that would
                // resolve to an `Item[]` and map it onto `ListGraphType<ItemInterfaceGraphType>`
            }
        }
    }
}
```

> NOTE: this example is using nested classes because it's a very very small schema. A real schema of any size should split the `RootFieldType`s and `GraphType`s into separate files.

To register the schema provider with an endpoint, use a Sitecore Config Patch something like this:

```
<?xml version="1.0" encoding="utf-8" ?>

<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/" xmlns:role="http://www.sitecore.net/xmlconfig/role/">
    <sitecore>
        <api>
            <GraphQL>
                <endpoints>
                    <master type="Sitecore.Services.GraphQL.Hosting.GraphQLEndpoint, Sitecore.Services.GraphQL">
                        <schema hint="list:AddSchemaProvider">
                            <whoDat type="Sitecore.Services.GraphQL.Examples.WhoAmISchemaProvider, Sitecore.Services.GraphQL.Examples.NetFxHost" />
                        </schema>
                    </master>
                </endpoints>
            </GraphQL>
        </api>
    </sitecore>
</configuration>
```

## Schema Design Best Practices

GraphQL schema design is an art, and a [full discussion](https://www.apollographql.com/docs/guides/schema-design.html) is outside the scope of this documentation. It is highly recommended to familiarize yourself with general schema design best practices before designing a GraphQL schema. Here are some tips to help with Sitecore GraphQL-specific schema designs.

See also the `Sitecore GraphQL Best Practices` section below for additional discussion of schema design.

# Extending GraphQL Schemas

_Extenders_ are designed to extend an existing schema. They come after schema providers and are allowed to modify or add types to the completed schema, meaning that they can modify or add to the schema from more than one schema provider. If you want to add a field to an existing type provided by a schema provider, hook an external API onto an existing type, or otherwise modify the schema provided by a schema provider, you should use an extender. A good example of an extender might be wanting to hang API data from an item which contained a third party API ID - like, if you had a YouTube video ID you could use the YouTube API to retrieve the description of the video and expose it via GraphQL alongside the Video item type.

Similar to a schema provider, creating a schema extender requires a class that extends `SchemaExtender` and a registration with the GraphQL endpoint in configuration.

```
using GraphQL.Resolvers;
using GraphQL.Types;
using Sitecore.Data.Fields;
using Sitecore.Services.GraphQL.Schemas;
using FieldType = GraphQL.Types.FieldType;

namespace Sitecore.Services.GraphQL.Examples
{
    /// <summary>
    /// Demonstrates some of the power of using schema extenders
    /// </summary>
    public class SimpleExtender : SchemaExtender
    {
        /// <summary>
        /// This is a simple example of the capabilities of an extender. It's designed to show the right way to do some common needs.
        /// </summary>
        public SimpleExtender()
        {
            // Extend the 'Appearance' graph type
            ExtendType("Appearance", type =>
            {
                type.Description = "Modified by extender!";
            });

            // Extend the 'Appearance' graph type, assuming that it is also a derivative of IComplexGraphType
            // useful because IComplexGraphType is the first type that brings Fields into the type (e.g. not a scalar)
            ExtendType<IComplexGraphType>("Appearance", type =>
            {
                // Extend every string field on the type and hack its description
                ExtendField<StringGraphType>(type, field =>
                {
                    field.Description = "I got hacked by an extender!";
                });

                // Extend a field by name and tweak its description
                ExtendField(type, "contextMenu", field =>
                {
                    field.Description = "Yoink! Gotcher description!";
                });
            });

            // extends any type which defines a mapping for the Field backend type
            // (e.g. all things that represent template fields)
            ExtendTypes<ObjectGraphType<Field>>(type =>
            {
                // add a new field to the field object type
                // note the resolve method's Source property is the Field so you can get at its data
                type.Field<StringGraphType>("bar",
                    description: "Field added to all fields by an extender",
                    resolve: context => "I'm adding this string to the display name: " + context.Source.DisplayName);
            });

            // Extends three named types and adds a 'foo' field to them
            ExtendTypes<IComplexGraphType>(new[] { "ItemLanguage", "ItemWorkflow", "ItemWorkflowState" }, type =>
            {
                // add a "foo" field that returns "foo, bar, bas" to every complex type in the schema
                // note: using a more specific generic than IComplexGraphType (e.g. ObjectGraphType<T>) may provide
                // superior options when adding fields like the Field<T> method
                type.AddField(new FieldType
                {
                    Name = "foo",
                    Description = "A field passed in from an extender",
                    Resolver = new FuncFieldResolver<string>(context => "foo, bar, bas"),
                    Type = typeof(StringGraphType)
                });
            });

            ExtendTypes(type =>
            {
                // this will be called for _every_ type in the whole schema
            });

            // You can also add graph types, for example to add complex data as a new field.
            // This type is simply added, as opposed to being used. It will appear in the schema
            // but cannot be queried because it's not attached to any other node in the graph
            // (e.g. as a root query, or as a property on another graph type)
            AddType(() => new FooGraphType());
        }

        protected class FooGraphType : InterfaceGraphType
        {
            public FooGraphType()
            {
                Name = "Foo";
                Field<StringGraphType>("bar");
            }
        }
    }
}
```

And a sample of registering an extender on a GraphQL endpoint:

```
<?xml version="1.0" encoding="utf-8" ?>

<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/" xmlns:role="http://www.sitecore.net/xmlconfig/role/">
    <sitecore>
        <api>
            <GraphQL>
                <endpoints>
                    <master>
                        <extenders hint="list:AddExtender">
                            <simpleExtender type="Sitecore.Services.GraphQL.Examples.SimpleExtender, Sitecore.Services.GraphQL.Examples" />
                        </extenders>
                    </master>
                </endpoints>
            </GraphQL>
        </api>
    </sitecore>
</configuration>
```

# Security

## Query Complexity

GraphQL APIs have some specific security concerns that need to be considered. Because of their very powerful and expressive query capabilities, it can be possible to construct malicious queries that are very expensive for the GraphQL server to execute, thus causing a denial of service attack. There are two mitigations to this issue:

* Query complexity analysis rejects queries that ask for too much data
* Query depth analysis rejects deeply nested queries

These mitigations are good for public APIs that arbitrary queries can be run against. For APIs that are supporting only queries that you control, _whitelisting_ (described below) is a total mitigation to this issue.

> Note: the complexity config defaults are defined in `/App_Config/Sitecore/Services.GraphQL/Sitecore.Services.GraphQL.config`

## Caching and Whitelisting

The GraphQL API is performance-optimized and adds very little overhead. Part of how it does this is using a Sitecore cache instance to store incoming queries that have been pre-parsed and validated. Once validated, a query no longer needs to be validated again and is retrieved from cache. The default cache size is 10MB, and it can be altered on a per-endpoint basis.

The default caching mechanism also enables support for the [Automatic Persisted Queries](https://dev-blog.apollodata.com/improve-graphql-performance-with-automatic-persisted-queries-c31d27b8e6ea) protocol developed by Apollo. APQ clients send the hash of a query they wish to execute; if the query is cached it is executed via its hash as opposed to sending the complete query contents. If the query is _not_ in cache, a specific error reply is sent and the client re-issues the request with the query text so the server can cache it for future reuse. This technique can significantly reduce incoming bandwidth with very little effort.

The cache mechanism also enables a way to use a _query whitelist_ for the security-conscious. Whitelisting can provide both protection against API denial-of-service attacks, as well as reduced bandwidth usage (exactly like APQ) because an entire query need not be sent, only a pointer/hash to the query. The GraphQL API supports the concept of an _authoritative_ cache, where the only allowed queries are those in the cache. The `WhitelistingGraphQLQueryCache` class provides a default whitelist implementation that:

* Stores allowed queries as files in a folder on disk (easy to review for source control commits)
* Because the files are stored in a folder, as long as you are using `.graphql` files to store queries in your app, and you're storing one GQL operation per file, you can simply _copy_ the files into the whitelist folder and be done
* Supports a 'learning mode' where queries received are added to whitelist files (good if you have e2e tests that run every query in the application at build time); in production learning mode is simply disabled
* Uses APQ-compatible hashes for stored queries, so an APQ client can connect and get all the APQ goodness without the automatic part (executed queries must be on the whitelist)
* Changes to whitelist query files are watched in real-time and the whitelist reloaded when changed

The cache configuration is registered on the _endpoint_ in the config file. Custom cache implementations must inherit from `IGraphQLQueryCacheFactory`. For example, here's how to register the whitelist cache:

```
<cache type="Sitecore.Services.GraphQL.Hosting.QueryTransformation.Caching.WhitelistingGraphQLQueryCache, Sitecore.Services.GraphQL">
    <!-- path can be virtual (/... or ~/...) or physical (c:\...) -->
    <param desc="path">~/App_Data/GraphQL/myendpoint-whitelist</param>
    <!-- learning allows the whitelist to add incoming queries; then disable this in production -->
    <learningEnabled>true</learningEnabled>
</cache>
```

## Authorization

Generally speaking GraphQL authorization should be performed at the business logic/schema level. (i.e. each resolver function should check authorization as it needs for that particular graph node) For example the Content Schema respects Sitecore's normal item ACLs. Should the API as a whole need custom authorization, the `<security>` section under each endpoint supports registering an `IAuthorizationFilter`-based class to authorize each API request:

```
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/" xmlns:role="http://www.sitecore.net/xmlconfig/role/">
    <sitecore>
        <api>
            <GraphQL>
                <endpoints>
                    <master>
                        <security>
                          <authorization type="My.Type.Derived.From.IAuthorizationFilter, My.Assembly" />
                        </security>
                    </master>
                </endpoints>
            </GraphQL>
        </api>
    </sitecore>
</configuration>
```

# Performance & Diagnostics

Sitecore GraphQL includes built-in diagnostics features that can help diagnose API performance issues, from capturing query timings to logging every query received with per-resolver function timing data.

The default performance settings keep aggregate query statistics (average and worst execution time) for each endpoint, which feed `$endpoint/stats`. GraphQL ships with three performance presets, defined in `/App_Config/Sitecore/Services.GraphQL/Sitecore.Services.GraphQL.config`, with varying levels of detail. They are documented in that file. To swap a performance preset, change the `ref` on the `<performance>` element under your GraphQL endpoint configuration, for example:

```
<performance ref="/sitecore/api/GraphQL/defaults/performance/debug" />
```

# The GraphQL Content Schema

Sitecore GraphQL comes with a standard schema provider that allows querying Sitecore content items. This provider has strongly-typed template access, field type metadata support, and other advanced features that make it an ideal access layer for most Sitecore frontend projects that need content data.

## Strongly-typed Items

GraphQL has the concept of types and iterfaces, and we leverage that by injecting the template definition into its schema. You can get template fields in a strongly typed manner by using _inline fragments_ which select fields from specific types. Here's an example of getting the default home item's fields like this:

```
{
  item(path: "/sitecore/content/home") {
    id
    ...on SampleItem {
      text {
        editable
      }
      title {
        editable
      }
    }
  }
}
```

This query will result in a result like this:

```
{
  "data": {
    "item": {
      "id": "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}",
      "text": {
        "editable": "<p style=\"line-height: 22px;\">From a single connected platform that also integrates with other customer-facing platforms, to a single view of the customer in a big data marketing repository, to completely eliminating much of the complexity that has previously held marketers back, the latest version of Sitecore makes customer experience highly achievable. Learn how the latest version of Sitecore gives marketers the complete data, integrated tools, and automation capabilities to engage customers throughout an iterative lifecycle &ndash; the technology foundation absolutely necessary to win customers for life.</p>\n<p>For further information, please go to the <a rel=\"noopener noreferrer\" href=\"https://doc.sitecore.net/\" target=\"_blank\" title=\"Sitecore Documentation site\">Sitecore Documentation site</a></p>"
      },
      "title": {
        "editable": "Sitecore Experience Platform"
      }
    }
  }
}
```

Template inheritance is also represented in the GraphQL type system, so this is completely valid on a Sample Item item to get the items its Insert Options point to:

```
{
  item(path: "/sitecore/content/home") {
    # Treat the home item as the system 'Insert Options' template type, and this works
    ...on InsertOptions {
      masters {
        targetItems {
          displayName
          uri
        }
      }
    }
  }
}
```

## Typed field access

Along with strongly typed items also comes typed access to field values, such as link fields and multilists. Here are some samples run on an extended `Sample Item` template:

```
{
  item(path: "/sitecore/content/home") {
    __typename
    # Sample multilist and link (additional fields also available)
    ...on SampleItem {
      myMultilist {
        targetItems {
          id
          path
          ...on Home {
            navigationTitle {
              editable
            }
          }
        }
      }
      myLinkField {
        url
        text
        editable
      }
    }
    
    # Typing in named-field API
    myLinkFieldByName: field(name: "My Link Field") {
      name
      editable
    	...on LinkField {
        url
        text
      }
    }
  }
}
```

The result will look something like this:

```
{
  "data": {
    "item": {
      "__typename": "SampleItem",
      "myMultilist": {
        "targetItems": [
          {
            "id": "{C7C95984-E060-42D9-BBC6-B45C18768905}",
            "path": "/sitecore/content/Habitat/Settings"
          },
          {
            "id": "{DAC24EDD-44FB-42EF-9ECD-1E8DAF706386}",
            "path": "/sitecore/content/Habitat/Home",
            "navigationTitle": {
              "editable": "Navigation Title"
            }
          }
        ]
      },
      "myLinkField": {
        "url": "https://sitecore.net",
        "text": "Awesome Link",
        "editable": "<a href=\"https://sitecore.net\">Awesome Link</a>"
      },
      "myLinkFieldByName": {
        "name": "My Link Field",
        "editable": "<a href=\"https://sitecore.net\">Awesome Link</a>",
        "url": "https://sitecore.net",
        "text": "Awesome Link"
      }
    }
  }
}
```

## Template Access

There is an API to access Sitecore Templates as well, for example:

```
{
  templates(path: "/sitecore/templates/sample/Sample Item") {
    name
    baseTemplates {
      name
    }
    ownFields {
      name
      id
      unversioned
      shared
    }
  }
}
```

Note that because of the GraphQL type system, the type returned by the `ownFields` is an array of the same type returned by `definition` on an item field - with the same implementation. This makes it extremely easy to expose rich APIs, for example suppose you wanted to expose the results of a special filtering of items. You'd just return `ItemInterfaceGraphType` from your GraphQL field, and pass it your `Item` as a source. Then the full power of querying the `ItemInterfaceGraphType` is at your consumers' disposal, down to getting template field definitions. A good example of this is in the Search API.

## Content Search API

There is a basic Content Search API, designed to fulfill the needs of keyword searching mostly as search queries can quickly grow in complexity beyond what a generic API could provide. This exposes an important note about GraphQL: while nodes can accept very complex arguments including JSON objects, there is no built in generic query/filter language. It's the world's best `SELECT` statement, but it's not a generic `WHERE` clause.

```
{
  search(keyword: "sample" first: 3 facetOn: ["_template"]) {
    results {
      # Result info using the Connection pagination pattern
      # (the standard way to do paging in GraphQL)
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        # these values are from the index
      	score
        path
        # but this resolves the actual item - and because it's an Item type
        # we can do anything we can do to an item - type it, query it
        # anything. It's lazy, so unless we query the item property, the item
        # is not looked up.
        item {
          icon
          ...on Template { 
            masters {
              displayName
            }
          }
        }
      }
    }
    # and we can do faceting, too
    facets {
      name
      values(hideEmpty: true) {
        count
        # just like the search results, for facets that are IDs,
        # we can choose to resolve their Item from the database
        # and query it with full capabilities
        item {
          displayName
          icon
        }
      }
    }
  }
}
```

And the result, shortened for brevity:

```
{
  "data": {
    "search": {
      "results": {
        "totalCount": 12,
        "pageInfo": {
          "hasNextPage": true,
          "hasPreviousPage": false
        },
        "items": [
          {
            "score": 2.16668963432312,
            "path": "/sitecore/system/settings/rules/insert options/rules/analytics campaigns",
            "item": {
              "icon": "http://habitat.dev.local/-/icon/Software/32x32/shape_ellipse.png"
            }
          },
          ...
        ]
      },
      "facets": [
        {
          "name": "_template",
          "values": [
            {
              "count": 3,
              "item": {
                "displayName": "Sublayout",
                "icon": "http://habitat.dev.local/-/icon/Software/16x16/element_selection.png"
              }
            },
            {
              "count": 2,
              "item": {
                "displayName": "Folder",
                "icon": "http://habitat.dev.local/-/icon/Applications/16x16/folder.png"
              }
            },
            ...
          ]
        }
      ]
    }
  }
}
```

## Subscriptions

Subscriptions are a simple abstraction over real-time data updates. If you're familiar with [SignalR](https://www.asp.net/signalr), subscriptions are a similar idea but for specific types of GraphQL queries. You make the query, but don't get any results immediately - the query remains open until you ask it to stop, and may return multiple real-time results. 

> IMPORTANT: Subscriptions are intended to be used for CM server customizations used by authors. Sitecore does not support subscriptions for use in scaled public environments.

A good example of use case for this is the `itemSaved` subscription:

```
subscription {
  itemSaved {
    item {
      id
      ...on SampleItem {
        title {
          rendered
        }
      }
    }
    changes {
      fieldChanges {
        fieldName
        newValue
      }
    }
  }
}
```

Once this subscription is started, whenever an item is saved in the content endpoint's database, you'll get a new query result like this:

```
{
  "itemSaved": {
    "item": {
      "id": "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}",
      "title": {
        "rendered": "subscriptions rock"
      }
    },
    "changes": {
      "fieldChanges": [
        {
          "fieldName": "__Updated",
          "newValue": "20171222T153248Z"
        },
        ...
      ]
    }
  }
}
```

Subscriptions run using the WebSocket protocol to enable their real-time nature. They enable all sorts of real-time elements in your UI. Subscriptions map up very well to the `Observable` pattern from [Reactive Extensions](https://github.com/Reactive-Extensions/Rx.NET) on the server and [RxJS](https://github.com/Reactive-Extensions/RxJS) on the client. For those unfamiliar, you can think of an observable as an asynchronous stream of events, or maybe a JS `promise` that can resolve _multiple times_.

## Strong Typing Novelisation

It's worth noting that among the strongly typed templates there is a need for _novelisation_ (making names unique). This is because in the Sitecore system templates, there are multiple templates of the same name (e.g. `File`) and templates with fields whose names conflict with core fields on the item graph type (e.g. `Icon`). In GraphQL, names of types and fields must be unique. When a naming collision occurs, the item or field item with the _newest creation date_ has `_{guid}` appended to the name. Creation date is used because the ordering should be stable, which means no graph type name should ever change once it's referenced. This means that if a careless implementer goes and creates a template with the same name as a system template, the system template's graph type name will not change because it is older.

To reduce novelisation challenges, you can also choose to strongly-type only a subset of the templates defined in Sitecore. This is a best practice for customer-created API endpoints, as they only need to serve templates defined in their projects.

## Automatic Schema Updates

The strongly typed GraphQL schema is dynamically updated after any template has been touched, so it's always up to date. Change a template, refresh GraphiQL, and there you go.

# Sitecore GraphQL Best Practices

* When using the GraphQL API for a frontend site or application, always define your own endpoint for that site. This gives you fine-grained control over the attack surface, authentication, and URLs of your API. Expose as small of an API as possible. Do reuse schema providers if they already exist (e.g. `ContentSchemaProvider`).
* For public sites, you should use a _database context-aware_ endpoint, so that the correct content database is respected (master/web/etc). This will make your API return appropriate item data when in authenticated modes like preview or Experience Editor. To make an endpoint context-aware...
    * Ensure the endpoint is defined as type `Sitecore.Services.GraphQL.Hosting.DatabaseAwareGraphQLEndpoint, Sitecore.Services.GraphQL.NetFxHost`
    * When configuring the `ContentSchemaProvider`'s `database` setting, set it to `context` instead of an actual database name. This will make it follow `Sitecore.Context.Database`.
    * Note that a context-aware endpoint _serves a different schema per database_ so queries that validate against `master` may not validate against `web` if the templates that back them are not published. This is a feature.
    * If an endpoint is not serving any database-specific content, say an endpoint that is just to connect to a CRM or push analytics data, there is no point in using a context-aware endpoint.
* Do not use GraphQL subscriptions on public websites. Subscriptions are intended to be used for CM server customizations used by authors. Sitecore does not support subscriptions for use in scaled public environments.

## Implementing Your Own Graph Types

There are many options for how to define fields on your own `IGraphType` implementations.

Generally speaking the most performant and flexible option is to use the _Field_ method, specifying a graph type explicitly, and to use a _named_ resolver function. It's not the least verbose, but it's fast and you get good stack traces when errors occur. Here's an example of doing that:

```
// the <ItemState> determines the data object type this graph type maps to
// (in a resolver, context.Source is of this type)
public class ItemWorkflowGraphType : ObjectGraphType<ItemState>
{
    public ItemWorkflowGraphType()
    {
        // ALWAYS set the name. Note that the name must be unique within a schema so be descriptive.
        Name = "ItemWorkflow"; 

        // define your field (note: wrap type in NonNullGraphType<T> if it should never be null)
        Field<ItemWorkflowStateGraphType>("workflowState", resolve: ResolveWorkflowState);

        // this would automatically map to a property on the ItemState called WorkflowState
        // DO NOT use this format, because it causes reflection during queries = slow
        Field<ItemWorkflowStateGraphType>("workflowState");

        // Expression-based resolver. Reasonable performance, non-verbose, but cannot specify
        // the graph type (or its nullablilty), and you do not get nice stack traces on error
        // useful for very simple scalar type resolution (e.g. strings, ints)
        Field("workflowState", state => GetWorkflowState());

        // Sometimes you might not have access to the Field() method, in which case 
        // you can use manual field-adding syntax. This example is equivalent to the first recommended one.
        // Note: DO NOT set the ResolvedType property by accident. This will mess things up.
        AddField(new FieldType
        {
            Name = "workflowState",
            Type = typeof(ItemWorkflowStateGraphType),
            Resolver = new FuncFieldResolver<ItemState, WorkflowState>(ResolveWorkflowState)
        });
    }

    // explicit named resolver function means that you will see a reasonable stack trace if a resolve error occurs
    // (as oppposed to an anonymous function in the constructor)
    private WorkflowState ResolveWorkflowState(ResolveFieldContext<ItemState> context)
    {
        return context.Source.GetWorkflowState();
    }
}
```

### Dealing with arbitrary hierarchies

Some kinds of data, especially arbitrarily nested hierarchies, do not lend themselves well to GraphQL. For example, imagine wanting to get all descendants of an item, where the number of levels of children are unknown. GraphQL doesn't have that capability, because you must specify the part of the graph you need. Consider also a scenario where a set of fields is always needed together, or not needed at all (e.g. a block of arbitrary JSON used by a rendering toolkit, where you don't want to force your users to memorize GraphQL fragments)

Well, in that case you can use the `JsonGraphType`. This type allows you to return arbitrary JSON as a GraphQL field. This is a last resort option when a graph does not make a good representation of your data. A resolver for `JsonGraphType` can return any object (which will be serialized) or a `JToken` (which will be used as is).

The `JsonGraphType` can also be used as an input graph type, in which case you must pass the value as an escaped string. This differs from as an output type, where actual JSON is returned without escaping.

## Consuming the GraphQL API from the frontend

* Favor separating your queries into `.graphql` files; do not comingle them with your code. 
    * This provides good separation of concerns, and with a tool like [graphql-tag/loader](https://github.com/apollographql/graphql-tag#webpack-preprocessing) you can import the file as if it were Javascript
    * Statically analyzable queries make things easier when you want to validate all your queries at build time, run a security whitelist, and other common operations
    * When this is not possible (e.g. currently with Angular, you cannot customize the build to add the graphql loader), separate your queries into `.js` or `.ts` files that contain only queries, for example `mycomponent.graphql.ts` for Angular components
* Never use dynamic string-concatenated queries (with non-GraphQL variables in the query text). Query variables should always be [GraphQL query variables](http://graphql.org/learn/queries/#variables).
    * This defeats whitelisting, static analysis, performance analysis, and is generally [just a bad idea](https://dev-blog.apollodata.com/5-benefits-of-static-graphql-queries-b7fa90b0b69a)
* Take advantage of [query batching](https://www.apollographql.com/docs/link/links/batch-http.html)
    * One of the major advantages of GraphQL over REST is that because it's a protocol, it becomes possible to do things REST can't
    * Query batching makes it possible to combine multiple queries (made within a short time-span) into a single HTTP request - automatically
* Use tools to ensure your GraphQL queries are valid against the GraphQL schema, such as [eslint-plugin-graphql](https://github.com/apollographql/eslint-plugin-graphql)
    * This provides build-time safety that your query expressions are valid and will not break when run

## Using Sitecore GraphQL with GraphQL tooling

Many kinds of GraphQL tools (such as [eslint-plugin-graphql](https://github.com/apollographql/eslint-plugin-graphql) to validate queries at build time, or [graphql-tools](https://www.apollographql.com/docs/graphql-tools/mocking.html) to create a disconnected mock GraphQL API, or [ts-graphql-plugin](https://github.com/Quramy/ts-graphql-plugin) to provide code completion of GraphQL in TypeScript) require a copy of your GraphQL Schema to execute correctly. In some cases, this can be downloaded directly from a Sitecore instance to have a live schema. However, in some cases there is no live Sitecore instance (e.g. CI) so a static copy of the schema is required.

There are two main types of schema input that you might need:

* A JSON-formatted schema. This is the result of an _introspection query_ against the GraphQL API. This is what GraphiQL uses to give documentation in the browser, for example.
* A schema-definition language schema. This is a text format that defines the schema in a readable format. You may download this by visiting `$endpointUrl/schema` to get the content, then save it as `choose-a-filename.graphql`.

Keep in mind that alterations to the Sitecore setup (like changing or adding templates) also result in the GraphQL schema changing, so when using a static schema file ensure that it stays up to date to avoid false validations.

# Known Issues

## Testing Multiple WebSocket Connections on Windows Desktop

IIS on Windows Desktop OSes (e.g. Windows 10, Windows 8.1) has a hard limit of 10 active connections. WebSocket connections count towards this and are persistent, so having many open tabs with a socket connection to a desktop OS can result in _all_ requests to that IIS server hanging until a socket connection is closed, usually by closing the browser tab, to free up an available connection slot for a HTTP (or socket) connection to use. There is no workaround for this other than to avoid opening excessive numbers of sockets during testing.

## Executing Queries over WebSocket Transport

Executing GraphQL queries (as opposed to subscriptions) over a WebSocket transport is supported, however issues may arise if using this technique when also depending on the Sitecore Context. WebSocket queries (and subscriptions) both execute on background threads and thus do not have access to `Sitecore.Context.Database` or `Sitecore.Context.Site`. This means that:

* Context-aware GraphQL endpoints will be unable to resolve the context database
* Item URLs resolved over a WebSocket connection will be malformed due to the lack of a context site

It is suggested to execute queries over a HTTP connection and leave the WebSocket for subscriptions only. This maximises compatibility (vs firewalls that block sockets for example), as well as debuggability (socket debug tools are far less mature than HTTP tools).
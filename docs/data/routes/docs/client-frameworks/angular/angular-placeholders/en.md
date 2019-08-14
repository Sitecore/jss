---
name: angular-placeholders
routeTemplate: ./data/component-templates/article.yml
title: Angular Sample App Walkthrough
---

## Placeholder

Let's take a look inside the `src/routing/layout/layout.component.html`. This is where the app's _root placeholder_ is defined.

```html
<sc-placeholder name="jss-main" [rendering]="route"></sc-placeholder>
```

Here we can see the `sc-placeholder` Angular component placed inside with the `name="jss-main"`. The `sc-placeholder` component is imported from `@sitecorelabs/sitecore-jss-angular` library.

> The `sc-placeholder` component can be applied to an existing DOM element as an attribute as well.

As the name indicates, `sc-placeholder` is responsible for defining the place to render one or more real components.

How are the components for a given placeholder defined? They are exposed in data that is fed into the ScPlaceholder component via the rendering input:

```ts
[rendering]="route"
```

If we trace where route data comes from, we will see in the `src/routing/layout/layout.component.ts` we get a service injected, which fetches the data for us:

```ts
export class AppComponent implements OnInit {
  route: any;

  constructor(
    private jssService: JssService
  ) { }

  ngOnInit() {
    const jssState = this.jssService.getRouteData('/');
    this.route = jssState.sitecore.route;
  }
}
```

Lets open up the `src/jss.service.ts` to trace the origin of the placeholder data.

Here we can see that `JssService` gets injected a few tokens into the constructor:

```ts
constructor(
  private transferState: TransferState,
  @Inject(PLATFORM_ID) private platformId: Object,
  @Inject('JSS_SERVER_TO_SSR') @Optional() private serverToSsrState: JssState
) { }
```

The `JssService` gets all its data from `@Inject('JSS_SERVER_TO_SSR') @Optional() private serverToSsrState: JssState`. Notice that the injection is `@Optional()`, this is because the data is only provided when application is running on the server, and not when it is running in the browser.

So how does the application when run in the browser get the data? It does so through the `TransferState`. `TransferState` can transfer the data from the application run at serverside to the application run in the browser by adding the data in rendered HTML output.

But it still remains a question where the provider for `@Inject('JSS_SERVER_TO_SSR')` is set up and where this data comes from.

> ### Application bundles
>
> By default an Angular-CLI project will build one bundle for an application. But to support universal rendering Angular-CLI has to be configured to create an additional bundle. [Read more about Angular-CLI and universal rendering](https://github.com/angular/angular-cli/wiki/stories-universal-rendering). Lets call these two bundles the _universal bundle_ and the _client bundle_ respectively.
>
> Both the universal bundle and client bundle cannot run on their own, they need to be served. To be able to serve these bundles a server is needed. Sitecore JavaScript Services (JSS) comes with a JavaScript view engine for Node that can run our universal bundle. The JSS JavaScript view engine expects a Node bundle that exports a `renderView` function, and to deliver this a third bundle is created that we will name _server bundle_. The server bundle is not built using Angular-CLI but is instead a custom webpack project.
>
> _Summary_: The BasicAppAngular application builds three bundles into the `dist` folder:
>
> * Client bundle - located in `dist/client/`
> * Universal bundle - located in `dist/server/`
> * Server bundle - located at `dist/server.bundle.js`

To understand where the data comes from find `server.bundle.ts`. The data is served from the Sitecore JavaScript Services JavaScript view engine via the `renderView` function which is located in the `server.bundle.ts`.

```ts
function renderView (callback, path, data, viewBag) {
  ...
}
```

After normalizing the provided data, we provide the data to the universal bundle when running `renderModuleFactory` via the `extraProviders`:

```ts
  renderModuleFactory(AppServerModuleNgFactory, {
    ...
    extraProviders: [
      ...
      { provide: 'JSS_SERVER_TO_SSR', useValue: state }
    ]
  })
```

And this is how the `JssService` is able to get the data injected from the server with the `@Inject('JSS_SERVER_TO_SSR')` when running in production mode.

For a disconnected developer mode we include some local data from `src/app/data.ts` imported into the `src/environments/environment.ts`. This is done to ensure it is not included in the application bundle in production. This is referenced directly in `JssService` if running in the client and no provided data was found.

Here is the object that will come back from the `JssService` when `getRouteData` is called, like it's done in `src/app.component.ts` and assigned to the `route` property:

```js
{
  name: 'home',
  displayName: 'Home',
  placeholders: {
    jss-main: [
      {
        componentName: 'Welcome',
        fields: {
          title: {
            value: 'Sitecore Experience Platform + JSS',
          },
          text: {
            value: '<p>...</p>',
          },
          logoImage: {
            value: {
              src: '/sitecore/assets/sc_logo.png',
              alt: 'Logo'
            },
          },
        }
      }
    ]
  }
}
```

> This is what we will refer to as __Component Placement Rules__

Having access to the `placeholders` object within the `route` property, the `sc-placeholder` component will do the rest, i.e. will find the matching placeholder by name (`main`) and will render the array of components within it. In this case it will render the `WelcomeComponent`, which is just an Angular component, dynamically and will provide the title, text and logoImage fields via a dependency injection token.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  rendering: any;
  copyright = 'Copyright Sitecore A/S';
}
```

The `rendering` property includes all information regarding the WelcomeComponent coming from the data:

```ts
{
  componentName: 'Welcome',
  fields: {
    title: {
      value: 'Sitecore Experience Platform + JSS',
    },
    text: {
      value: '<p>...</p>',
    },
    logoImage: {
      value: {
        src: '/sitecore/assets/sc_logo.png',
        alt: 'Logo'
      },
    },
  }
}
```

That's basically how the magic happens. We not only went through the most foreign entity in JSS (`sc-placeholder`), but also now see how the data is managed here both on the client and on the server.

## Thing to remember about the Placeholder

1. You can use any number of `sc-placeholder` components inside the template of any Angular component, as long as the value of the name prop is unique within the component.
1. Every `sc-placeholder` component must have the both the `name` and `rendering` input set:

    ```html
    <sc-placeholder name="myapp-main" [rendering]="rendering"></sc-placeholder>
    ```

    * `name`: This is used as a key to assign real components to this placeholder.
    * `rendering`: An object with data about the current component and its placeholders, i.e. the __Component placement rules__ for the current component and its children. The `sc-placeholder` sets the related data to all child components via the `rendering` property after the component is created.

## Nesting placeholders and components

Since components can contain their own `sc-placeholder` components, you can define their contents with `placeholders` in the __Component placement rules__.

Hypothetically, the `WelcomeComponent` component could contain:

```ts
@Component({
  selector: 'app-welcome',
  template: `
    <sc-placeholder name="welcome" [rendering]="rendering"></sc-placeholder>
  `
})
export class WelcomeComponent {
  rendering: any;
}
```

In which case it could then define its child components in its __Component placement rules__:

```ts
{
  componentName: 'Welcome',
    fields: {
      title: {
        value: 'Sitecore Experience Platform + JSS',
      },
      text: {
        value: '<p>...</p>',
      },
      logoImage: {
        value: {
          src: '/assets/img/sc_logo.png',
          alt: 'Logo'
        },
      },
    },
    placeholders: {
      welcome: [
        {
          componentName: 'AnotherComponent',
          fields: {
            /* etc */
          }
        }
      ]
    }
}
```

If you are familiar with Sitecore placeholders already, you know that certain nested placeholder structures require use of dynamic placeholder keys. If you're curious you can read more about [Sitecore JSS and dynamic placeholder keys](#/appendix?id=dynamic-placeholders).

## Input and Output Binding

It is possible to bind custom properties on components using the `[inputs]` and `[outputs]` binding properties on `sc-placeholder`. These properties allow input and output binding to properties on all components within the placeholder.

This allows for orchestration / interaction with child components, even though they are created dynamically by `sc-placeholder`, and can be particularly useful in complex user flows which you still wish to manage / optimize through Sitecore XP.

A simplified example of using `[inputs]` and `[outputs]`:

```ts
@Component({
  selector: 'my-container-component',
  template: `<sc-placeholder
                name="placeholder"
                [rendering]="rendering"
                [inputs]="inputs"
                [outputs]="outputs"
                ></sc-placeholder>`
})
class MyContainerComponent {
  @Input() public rendering: any;

  inputs = {
    hello: 'world',
    something: () => 'can be really complex'
  };
  outputs = {
    onSomething: (type) => alert(type)
  }
}

@Component({selector: 'my-rendering')
class MyRendering {
  // standard on any placeholder-managed component
  @Input() public rendering: any;

  // additional properties for input/output binding
  @Input() hello: string;
  @Input() something: Function;
  @Output() onSomething = new EventEmitter<string>();
}
```

## Lazy loading placeholder

When lazy-loading a sitecore component, the placeholder will appear empty by default. A temporary body during loading of the component can be added to the placeholder by adding a body. When the component finished loading, the temporary body is replaced with the actual content. A simplified example is:

``` html
  <sc-placeholder [rendering]="rendering">
    <img *scPlaceholderLoading src="loading.gif">
  </sc-placeholder>
```

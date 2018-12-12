---
name: angular-tips
routeTemplate: ./data/component-templates/article.yml
title: Angular Tips
---

# JSS Angular Tips / Best Practices

## Do not use the `<base>` tag!

Most Angular applications make use of the `<base>` tag in their HTML template to set a base href for routing. JSS Angular apps _cannot use this technique_, as it is incompatible with Sitecore's Experience Editor capabilities. Instead JSS Angular apps should use the [`APP_BASE_HREF`](https://angular.io/api/common/APP_BASE_HREF) token to provide their base href via dependency injection, thus avoiding the other semantics that come with a `<base>` tag. The sample application does this, but it can become an issue integrating with any existing Angular infrastructure.

## Use lazy loaded components for infrequently used JSS components

JSS Angular supports lazy-loading components to improve initial page load times and reduce bandwidth use. This works very similarly to lazy loaded routes in Angular without JSS, in that the component gets a module that is dynamically loaded when the component is used on a route. Generally speaking, any component not used on almost every route is a good candidate to be lazy loaded.

Out of the box, you can use `jss scaffold <componentName> --lazyload` to scaffold and auto-register a lazy-loaded component.

To add lazy-loading to an existing component, you need to add an Angular module to the component folder - for a `My` component, something like:

```js
import { NgModule } from '@angular/core';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { MyComponent } from './my.component';

@NgModule({
  imports: [
    // secret sauce
    JssModule.forChild(MyComponent)
  ],
  declarations: [
    MyComponent,
  ],
})
export class MyModule { }
```

If you're using the default code-generated `app-components.module.ts` that's all there is to it, the code generator will automatically register the component as lazy loaded. For those not using code generation, there is a second parameter to `JssModule.withComponents()` for lazy-loaded components which works just like lazy-loaded routes:

```js
@NgModule({
  imports: [
    AppComponentsSharedModule,
    JssModule.withComponents([
      // non-lazy components
    ], [
      // in this case, 'path' = the component name, loadChildren = the module path to load for it
      // this is exactly like lazy loaded routes, in fact it uses the router under the hood to do it.
      // loadChildren is the relative path to the module, with the hash and then the name of the exported module class.
      { path: 'My', loadChildren: './my/my.module#MyModule'},
    ]),
  ],
  exports: [
    JssModule,
    AppComponentsSharedModule,
  ],
  declarations: [
    // non-lazy components
  ],
})
export class AppComponentsModule { }
```

You can also load multiple components from one module. This will improve code splitting of your application and will reduce the calls which need to be made for loading application resources. 

For lazy-loading with multiple components you need to register two or more components with `JssModule.forChild()` method into lazy-loading module. You need to provide component name and component type.

```js
import { NgModule } from '@angular/core';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { FirstComponent } from './first.component';
import { SecondComponent } from './second.component';

@NgModule({
  imports: [
    // secret sauce
    JssModule.forChild([
      { name: 'FirstComponent', type: FirstComponent },
      { name: 'SecondComponent', type: SecondComponent }
    ])
  ],
  declarations: [
    MyComponent,
  ],
})
export class MyModule { }
```

There aren't changes in your component module. If you use multiple components lazy-loading, you need to have same value for `loadChildren` if the components are from same module and also the path value need to be same with component name from lazy-loading module initialization.    

```js
@NgModule({
  imports: [
    AppComponentsSharedModule,
    JssModule.withComponents([
      // non-lazy components
    ], [
      { path: 'FirstComponent', loadChildren: './my/my.module#MyModule'},
      { path: 'SecondComponent', loadChildren: './my/my.module#MyModule'},
    ]),
  ],
  exports: [
    JssModule,
    AppComponentsSharedModule,
  ],
  declarations: [
    // non-lazy components
  ],
})
export class AppComponentsModule { }
```

## Ensure components are `display: block`

When writing UI components in Angular, the default style for `display` for all new components is `inline`. For components to work as expected in the Experience Editor, set the display style to `display: block;` for all components root elements. I.e:

```css
:host {
  display: block;
}
```

Another way of working around this is to change the selector of the component to use an existing DOM element like `div` to get a `display: block;`. This approach is discouraged by the [Angular Style Guide](https://angular.io/guide/styleguide#components-as-elements) but is an effective way none the less. For example:

```ts
@Component({
  selector: 'div [app-hello-world]',
  templateUrl: `
    Hello world
  `,
})
export class HelloWorldComponent {
  rendering: any;
}
```

## Use `sc-placeholder` as an attribute

Your application DOM will be cleaner if you utilize `sc-placeholder` as an attribute, rather than a custom element, for example instead of `<sc-placeholder>` use `<div sc-placeholder>`.

## Use `ng-container` if necessary with structural directives

Because JSS makes use of structural directives for its field helpers, other structural directives such as `ngIf`, `ngFor`, and `ngSwitchCase` may need to be applied on a wrapper such as `<ng-container />`. Angular does not allow multiple structural directives on a single element. For example:

```
<ng-container *ngIf="condition">
  <span *scText="myField"></span>
</ng-container>
```



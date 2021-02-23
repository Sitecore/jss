---
name: new-component
routeTemplate: ./data/component-templates/article.yml
title: Walkthrough: Creating a new component
---
# Walkthrough: Creating a New Component

This walkthrough demonstrates how to create a new component, based on the chosen develpment workflow: 

* [Using the Sitecore-first development workflow](#using-the-sitecore-first-development-workflow).
* [Using the code-first development workflow](#using-the-code-first-development-workflow).

## Using the Sitecore-first development workflow

This walkthrough describes how to:

- [Create the JSON rendering in Sitecore](#create-a-json-rendering-in-sitecore)
- [Create a model for the view](https://sitecore.paligoapp.com/usr/sitecore/tmp/516750-Walkthrough:_Creating_a_simple_rendering_with_a_data_source-html5/out/en/index-en.html#section-idm231953375222828)
- [Create the view](https://sitecore.paligoapp.com/usr/sitecore/tmp/516750-Walkthrough:_Creating_a_simple_rendering_with_a_data_source-html5/out/en/index-en.html#section-idm231953375506701)
- [Register the model-bound view](https://sitecore.paligoapp.com/usr/sitecore/tmp/516750-Walkthrough:_Creating_a_simple_rendering_with_a_data_source-html5/out/en/index-en.html#section-idm231953375956612)
- [Fill in values in the Experience Editor](https://sitecore.paligoapp.com/usr/sitecore/tmp/516750-Walkthrough:_Creating_a_simple_rendering_with_a_data_source-html5/out/en/index-en.html#section-idm231953376439836)

This process is done using the [model-bound view](https://sitecore.paligoapp.com/document/preview/516214#UUID-2d7890a1-b3c3-88a0-7215-5e2619858e13) view type.

>  This walkthrough assumes you are using the [Getting Started](/docs/nextjs/getting-started/walkthrough-dotnetnew) template with a project called `MyProject`.

In this example, the rendering host displays a few different field types, including text, rich text, a link, a date, and an image.

### Create the JSON rendering in Sitecore

To create the JSON rendering in Sitecore:

1. In the Content Editor, create a new template called `DataSourceExample` under `/sitecore/templates/Project/MyProject`.

2. Create a new template section (the name is unimportant) and add the following fields:

   - `Title`: Single-line Text
   - `BodyText`: Rich Text
   - `FeaturedImage`: Image
   - `PromoLink`: General Link
   - `ExampleDate`: Date

3. On the **Builder Options** tab, click **Standard Values** and in the **Title**, **BodyText**, **PromoLink**, and **ExampleDate** fields enter default values.

4. Create a JSON rendering called `DataSourceExample` in `/sitecore/layout/Renderings/Project/MyProject`. Enter the following values:

   - **Datasource Location**: ./
   - **Datasource Template**: Select `sitecore/Templates/Project/My Project/DataSourceExample`

5. Add the `DataSourceExample` rendering to the **Allowed Controls** in the `/sitecore/layout/Placeholder Settings/Project/MyProject/MyProject-main` placeholder and click **Save**.

6. Open `/sitecore/content/MyProject/Home` in the Experience Editor and add your new rendering, including creating a data source item for it.

   > Your rendering host page outputs `Unknown component` or a similar message, because you have not yet mapped a component to this JSON rendering in your rendering host.

7. Publish all your item changes:

   - In Content Editor, on the **Publish** ribbon, click the small black arrow next to the **Publish** icon and click **Publish site**.
   - In the **Publish Site** window, to publish your items from the Master database to the Web database, select the **Smart publish** radio button and click **Publish**.

8. You can now test the output of your new rendering:

   - In your rendering host, open the site home page.

   - Type the following into a PowerShell terminal to get the rendering host logs: `docker-compose logs -f rendering`

   - In the rendering host logs, view the debug output with the Layout Service response, including the component you just added:

     ```
     {
         "uid": "8654d7f9-6df3-4d32-835a-92d4d65e6efc",
         "componentName": "DataSourceExample",
         "dataSource": "{3BC54537-E31D-4C9B-A230-088F92F3A0EF}",
         "params": {},
         "fields": {
             "BodyText": {
                 "value": "Default"
             },
             "FeaturedImage": {
                 "value": {}
             },
             "Title": {
                 "value": "Default"
             },
             "PromoLink": {
                 "value": {
                     "href": "/en/",
                     "text": "",
                     "anchor": "",
                     "linktype": "internal",
                     "class": "",
                     "title": "",
                     "querystring": "",
                     "id": "{453C1C1A-7E24-4F2F-8069-84165C6130A3}"
                 }
             },
             "ExampleDate": {
                 "value": "2020-08-07T04:00:00Z"
             }
         }
     }
         
     ```

### Create a model for the view

To create a model for the view:

- In the `Models` folder of your rendering host, create a new class called `DataSourceExampleModel`:

  ```c#
  using Sitecore.LayoutService.Client.Response.Model.Fields;
  
  namespace MyProject.Models
  {
      public class DataSourceExampleModel
      {
          public TextField Title { get; set; }
          public RichTextField BodyText { get; set; }
          public ImageField FeaturedImage { get; set; }
          public HyperLinkField PromoLink { get; set; }
          public DateField ExampleDate { get; set; }
      }
  }
  ```

  > This class contains five properties that are automatically data bound due to their types inheriting from `IField`.

### Create the view

To create the view:

- Create a new `DataSourceExample.cshtml` Razor view in your rendering host project under `Views\Shared\Components\SitecoreComponent`.

  > This is the default search path for Model-bound views using the built-in Sitecore View Component. To simplify the registration of the view with the Rendering Engine, we recommend you name the view the same as the name of the Layout Service component (JSON rendering).

  ```
@model MyProject.Models.DataSourceExampleModel
  
  <h2>Simple Rendering Example</h2>
  <h3 asp-for="Title"></h3>
  <sc-text asp-for="BodyText"></sc-text>
  <div>
      <sc-img asp-for="FeaturedImage"/>
  </div>
  <p>
      <a asp-for="PromoLink">My Link</a>
  </p>
  <p asp-for="ExampleDate" date-format="D"></p>
  ```

### Register the model-bound view

To register the model-bound view:

1. In your rendering host project's `Startup.cs` class, find your `AddSitecoreRenderingEngine` call in `ConfigureServices` method, and register your model-bound view:

   ```
   services.AddSitecoreRenderingEngine(options =>
       {
           //Register your components here
           options
               .AddModelBoundView<ContentBlockModel>("ContentBlock")
               // Add our DataSourceExample model-bound view:
               .AddModelBoundView<DataSourceExampleModel>("DataSourceExample")
               .AddDefaultPartialView("_ComponentNotFound");
       })
   ```

   > The extension method used here to register the model-bound view assumes the provided Layout Service component name matches the name of the Razor view file.

2. If you are using the Getting Started template, the [dotnet watch process](https://docs.microsoft.com/en-us/aspnet/core/tutorials/dotnet-watch?view=aspnetcore-3.1) automatically compiles your changes, and you can refresh the Home page of your rendering host site to see your component output. The component header is now displayed, as well as your default content values.

   > You must check your rendering host logs for any compilation errors.

### Fill in values in the Experience Editor

To fill in the values:

1. In the Experience Editor, open `/sitecore/content/MyProject/Home` .
2. Fill in values for all fields.
3. Click **Save** and **Publish**.
4. Refresh the Home page and see the headers you populated.

> Be aware of the following when you use the solution:
>
> * A publish of the `Platform` project updates the running `cm` service.
> * The running rendering service uses `dotnet watch` and re-compiles automatically for any changes you make. You can also run the `rendering` project directly from Visual Studio.

## Using the code-first development workflow

This walkthrough demonstrates how to create a new component using the code-first development workflow for your project.

> This walkthrough assumes you have set up your project using the [`dotnet new`](/docs/nextjs/getting-started/walkthrough-dotnetnew) template with a project called `MyProject` or [`jss create`](/docs/nextjs/getting-started/walkthrough-jsscreate).
>
> You need to be aware of the following paths: 
>
> * the root of the **project**: 
>   * `dotnet new` : `<path to your solutions directory>\MyProject\`.
>   * `jss create`: `<path to your projects directory>/my-first-jss-app/`.
> * the root of the **Next.js-based application**: 
>   * `dotnet new` : `<path to your solutions directory>\MyProject\src\rendering\`.
>   * `jss create`: the same as the root of the project.

To create a component in a Next.js-based JSS application:

1. In a terminal, in the root directory of your project run: 

   * For a `dotnet new` project: 

     * In the root of the project: `docker-compose up -d`.
     * In the Next.js application root: `jss start`

   * For either type of project, in the root of the Next.js-based application, run:

     ```
     jss start
     ```

   > You can create new components while the application is running. The application will refresh when you make changes.
   >
   > Regardless of how you set up the project, to see you live code changes, open: `http://localhost:3000/`.

2. Open a new terminal tab/window. In your application's root directory, run: 

   ```
   jss scaffold MyComponent
   ```

   > The scaffolding system will emit a simple working component. You can modify the scaffolding conventions in `src/scripts/scaffold-component.js`.
   >
   > The newly created component is inactive until added to a layout on a route. See step 5.

3. In the application's root directory, in `sitecore/definitions/components/MyComponent.sitecore.ts`, define the component's data. For example: 

   ```typescript
   import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';
   
   export default function (manifest: Manifest): void {
     manifest.addComponent({
       name: 'MyComponent',
       icon: SitecoreIcon.DocumentTag,
       fields: [
         { name: 'heading', type: CommonFieldTypes.SingleLineText },
         { name: 'body', type: CommonFieldTypes.RichText }],
     });
   }
   ```

4. In `src/components/MyComponent.tsx`, implement the React component. For example: 

   ```typescript
   import { Text, Field, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
   import { StyleguideComponentProps } from 'lib/component-props';
   
   type MyComponentProps = StyleguideComponentProps & {
     fields: {
       heading: Field<string>;
     };
   }
   
   const MyComponent = (props: MyComponentProps): JSX.Element => (
     <div>
       <Text field={props.fields.heading} />
       <RichText field={props.fields.body} />
     </div>
   );
   
   export default MyComponent;
   
   ```

5. Add the component to a route layout. In this example, we add the component to the root route to the default placeholder `jss-main`.

   * In `/data/routes/en.yml`. Add your component to the array of components under the `jss-main` placeholder:

   ```yaml
   placeholders:
     jss-main:
     - componentName: MyComponent
       fields:
         heading: Hello, Next.js!
         body: |
             <p>Let's code!</p>
     - componentName: ContentBlock
       fields:
         heading: Welcome to Sitecore JSS
   ```

   - If your browser is open to `http:localhost:3000` from step 1, it will auto-refresh and you should see the new component at the top of the page!

     


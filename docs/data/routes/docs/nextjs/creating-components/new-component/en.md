---
name: new-component
routeTemplate: ./data/component-templates/article.yml
title: Creating a new component
---
# Walkthrough: Creating a New Component

This walkthrough demonstrates how to create a new component based on the chosen development workflow: 

* [Using the Sitecore-first development workflow](#using-the-sitecore-first-development-workflow).
* [Using the code-first development workflow](#using-the-code-first-development-workflow).

## Using the Sitecore-first development workflow

This walkthrough describes how to:
<!-- no toc -->
- [Create the JSON rendering in Sitecore](#create-the-json-rendering-in-sitecore)
- [Create the component in the Next.js app](#create-the-component-in-the-nextjs-app)
- [Fill in values in the Experience Editor](#fill-in-values-in-the-experience-editor)

> This walkthrough assumes you have set up your project using the [`dotnet new`](/docs/nextjs/getting-started/walkthrough-dotnetnew) template with a project called `MyProject`.

### Create the JSON rendering in Sitecore

To create the JSON rendering in Sitecore:

1. In the Content Editor, create a new template called `MyComponent` under `/sitecore/templates/Project/myproject`.

2. Create a new template section (the name is unimportant) and add the following fields:

   - `heading`: Single-line Text
   - `body`: Rich Text
   
  > You can use the [Title standard field](https://doc.sitecore.com/developers/101/sitecore-experience-manager/en/the-template-field-template.html#UUID-d9185cce-8e53-df90-715e-e941e17cc79a_UUID-31b3c8a3-5a9c-ed7d-bc68-483a20f9a2ec_body) on template fields to provide a user-friendly name.

3. With the **Builder** tab open, in the **Builder Options** menu, click **Standard Values** and in the **heading** and **body** fields enter default values.

4. Create a JSON rendering called `MyComponent` in `/sitecore/layout/Renderings/Project/myproject`. Enter the following values:

   - **Datasource Location**: ./
   - **Datasource Template**: Select `sitecore/Templates/Project/myproject/DataSourceExample`

5. Add the `DataSourceExample` rendering to the **Allowed Controls** in the `/sitecore/layout/Placeholder Settings/Project/myproject/Main` placeholder and click **Save**.

6. Open `/sitecore/content/MyProject/Home` in the Experience Editor and add your new rendering, including creating a data source item for it.

   > Your rendering host page outputs `JSS component is missing React implementation` or a similar message because you have not yet mapped a component to this JSON rendering in your rendering host.

7. Publish all your item changes:

   - In Content Editor, on the **Publish** ribbon, click the small black arrow next to the **Publish** icon and click **Publish site**.
   - In the **Publish Site** window, to publish your items from the Master database to the Web database, select the **Smart publish** radio button and click **Publish**.

8. You can now test the output of your new rendering:

   - Find the `scjssconfig.json` from your Next.js application root, and copy the `apiKey` value within it.

   - View the Layout Service output for the site home page:
    `https://cm.myproject.localhost/sitecore/api/layout/render/jss?item=/&sc_apikey=<YOUR API KEY HERE>&sc_site=myproject&sc_mode=normal`

   - The output should include your new component.

     ```json
     {
         "uid": "ba5d4f2d-b6f1-428a-81e8-6b7c25844c08",
         "componentName": "MyComponent",
         "dataSource": "{A2A3F4C0-B13B-4651-B342-320E56FDC43A}",
         "params": {},
         "fields": {
             "heading": {
                 "value": "Default"
             },
             "body": {
                 "value": "Default"
             }
         }
     }
         
     ```

### Create the component in the Next.js app

In the Next.js-based application, you must now create a component matching the rendering you just created.

1. Create the file `MyProject\src\rendering\src\components\MyComponent.tsx`.
2. In the newly created file, define a component with the same name as the rendering:

   ```typescript
   import { Text, Field, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
   
   type MyComponentProps = {
     fields: {
       heading: Field<string>,
       body: Field<string>  
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

### Fill in values in the Experience Editor

To fill in the values:

1. In the Experience Editor, open `/sitecore/content/MyProject/home`.
2. Fill in values for all fields.
3. Click **Save** and **Publish**.
4. Refresh `https://www.myproject.localhost` and see the changes.

## Using the code-first development workflow

This walkthrough demonstrates how to create a new component using the code-first development workflow for your project.

> This walkthrough assumes you have set up your project using the [`dotnet new`](/docs/nextjs/getting-started/walkthrough-dotnetnew) template with a project called `MyProject` or [`jss create`](/docs/nextjs/getting-started/walkthrough-jsscreate).
>
> You need to be aware of the following path: 
> * the root of the **Next.js-based application**: 
>   * `dotnet new` : `<path to your solutions directory>\MyProject\src\rendering\`.
>   * `jss create`: the same as the root of the project.

To create a component in a Next.js-based JSS application:

1. In a terminal, in the root directory of your Next.js project run: 

     ```
     jss start
     ```

   > You can create new components while the application is running. The application will refresh when you make changes.
   >
   > Regardless of how you set up the project, to see your live code changes, open: `http://localhost:3000/`.

2. Open a new terminal tab/window. In your application's root directory, run: 

   ```
   jss scaffold MyComponent
   ```

   > The scaffolding system will emit a simple working component. You can modify the scaffolding conventions in `src/scripts/scaffold-component.js`.
   >
   > The newly created component is inactive until added to a layout on a route. See step 5.

3. In the application's root directory, in `sitecore/definitions/components/MyComponent.sitecore.ts`, define the component's data. For example: 

   ```typescript
   import { CommonFieldTypes, Manifest } from '@sitecore-jss/sitecore-jss-manifest';
   
   export default function (manifest: Manifest): void {
     manifest.addComponent({
       name: 'MyComponent',
       fields: [
         { name: 'heading', type: CommonFieldTypes.SingleLineText },
         { name: 'body', type: CommonFieldTypes.RichText }],
     });
   }
   ```
   
4. In `src/components/MyComponent.tsx`, implement the React component. For example: 

   ```typescript
   import { Text, Field, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
   
   type MyComponentProps = {
     fields: {
       heading: Field<string>,
       body: Field<string>  
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

5. Add the component to a route layout. In this example, we add the component to the root route to the default placeholder `jss-main.`

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

   - If your browser is open to `http://localhost:3000` from step 1, it will auto-refresh, and you should see the new component at the top of the page!

     


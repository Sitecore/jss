---
name: graphql
routeTemplate: ./data/routes/connected-demo/en.yml
title: GraphQL
---

# GraphQL
GraphQL is a powerful way to retrieve data from Sitecore that also provides flexibility to format that data into an easily digestible format. 

In this exercise you will utilize a GraphQL query to output a list of events for a given location, the data for which is stored in the Sitecore instance.

## Explore where the data lives in Sitecore Content Editor

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL01.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>From the Sitecore desktop, click on <strong>Content Editor</strong>.</p>      
      <p>The <strong>Content Editor</strong> is an editing tool that you can use to manage and edit all the content on your website. It is designed for more experienced content authors who are familiar with Sitecore and the functionality that it contains. The Content Editors appearance and functionality vary depending on the user’s roles, the local security settings, and the customizations that have been implemented on the Sitecore installation.</p>
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL02.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>In the content tree on the left, under Sitecore &#62; content &#62; Habitat Fitness > Home, expand the Events node. </p>      
      <p>The folders are arranged by region. Keep expanding until you find a base event page node that contains the data for the query. </p>      
      <p>Click on Canada &#62; Alberta &#62; Banff &#62; Banff 3 on 3 Basketball Challenge. You can review the content details in the pane on the right.</p>      
    </div>
  </div>
<p>

Now that you know where the data lives, it’s time to create a query.

## The Graph Browser

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL03.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>In your browser, navigate to <code>/Sitecore/api/graph/items/master/ui</code> to bring up the Sitecore Experience Graph Browser.</p>
      <p>This tool gives users a place to write and test custom queries. The left pane allows for query input. The right pane will display return results.</p>
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL04.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>In the sidebar is the Documentation Explorer, where you can browse through various schemas to see what form the data takes. </p>
      <p>There are three Root Types: Query, Mutation, and Subscription.</p>
      <p>Click on <strong>Query</strong>. You can now view the assorted queries defined in the schema.</p>
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL05.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>Explore the schema for <strong>search</strong>. </p>      
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL06.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>This query returns a <strong>ContentSearchResults</strong> object. Click on that and you will see it has the following fields.</p>
      <p>You will see a results object of the type <strong>ContentSearchResultConnection</strong>.</p>      
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL07.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>Click on that to find a number of pertinent fields.</p>
      <p>The field of note is the <strong>items</strong> array. This will contain the items the search query will pull back.</p>      
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL08.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>Now that you have gathered most of the pertinent info, it’s time to put together a query.</p>
      <p>Start by calling search, passing in a <code>fieldsEqual</code> parameter. This will be an array of <em>name:value</em> pairs indicating which fields to specifically query on, and what you want those values to be. If you pass in multiple objects, the query will AND them together. </p>
      <p>For this exercise, find all the items under the Events node, so specify a <code>_fullpath</code> value that contains that full path, appended with a wildcard so as to get the node’s children. </p>
      <p>Now specify how the return results should be formatted. After looking at the schema for <strong>ContentSearchResults</strong>, you will see a results object of the type <strong>ContentSearchResultConnection</strong>. That object will in turn have an <strong>items</strong> array. Items have a <code>name</code> property, so just return that for now.</p>      
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL09.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>Execute the query. You should get the following result.</p>
      <p>This pulls back every item under the Events node. This isn’t helpful yet, though, as it’s pulling back every node. </p>
      <p>Refine the search by searching only for those Event Page nodes that contain the data you want.</p>     
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL10.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>Return to the Content Editor and view the Canada &#62; Alberta &#62; Banff &#62; Banff 3 on 3 Basketball Challenge node, and verify in “Quick Info” that its template type is event-page. </p>     
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL11.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>Return to the query, and add another object to the <code>fieldsEqual</code> array.</p>
      <p>This time, specify that you need these items to also have a <code>_templatename</code> property equal to “event-page”.</p>     
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL12.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>Execute the query and see that the result set has been refined.</p>
      <p>Now that you are getting the nodes you need, start pulling the event data for these items. </p>     
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL13.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>To find these in the schema, go back to the Documentation Explorer and drill down to Query &#62; ContentSearchResults &#62; ContentSearchResultConnection, and then click on the <strong>ContentSearchResult</strong> beside items.</p>     
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL14.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>This will show the ContentSearchResult schema.</p>      
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL15.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>Fields is the property you will need. It is an array of <em>name:value</em> pairs associated with this item. Add it to the query return to see what is available.</p>      
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL16.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>Execute the query and see that each node is pulling back a lot of useful information.</p>      
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL17.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>Too much information, actually, and not in a format that an application can easily reference without iterating through an array every time it needs to retrieve one of these values.</p>
      <p>Clean this up by adding your own properties to the result object, and using the <code>field()</code> function to retrieve the field values you want.</p>
      <p>Start by setting the items name to the event’s <code>name</code> field. (for clarity, comment out the <code>fields</code> property)</p>      
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL18.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>Execute the query and get the following.<p>
      <p>Now add a few more fields that you will need, like <code>description</code>, <code>date</code>, <code>image</code>, <code>latitude</code>, <code>longitude</code>, etc. </p>      
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL19.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>Set this array of <code>items</code> to a property named <code>events</code>.</p>     
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL20.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>Execute the query once again and get a nicely formatted result set that looks like this.</p>
      <p>Excellent! That looks like some usable data! </p>     
    </div>
  </div>
<p>

From here, you might want to add facets to the search; For instance, what if you wanted to look for only items associated with a given language? You might also want to narrow the search to a specific province. 

There is much you can do, and GraphQL provides plenty of tools with which to modify and refine queries.

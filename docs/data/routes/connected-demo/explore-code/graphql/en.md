---
name: graphql
routeTemplate: ./data/routes/connected-demo/en.yml
title: GraphQL
---

# GraphQL
GraphQL is a powerful and flexible query language that empowers developers by enabling them to requests exactly the data they need in exactly the format they want.

In this exercise you will build a GraphQL query to fetch data from the remote Sitecore intance and output a list of events for a given location.

## Explore where the data lives in Sitecore Content Editor

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL01.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>From the Sitecore desktop, click on <strong>Content Editor</strong>.</p>
      <p>The <strong>Content Editor</strong> is an editing tool that you can use to manage and edit all the content on your website. It is designed for more experienced content authors who are familiar with Sitecore and the functionality that it contains. The Content Editor's appearance and functionality vary depending on the user’s roles, the local security settings, and the customizations that have been implemented on the Sitecore installation.</p>
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL02.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>In the content tree on the left, under <em>content &#62; Habitat Fitness > Home</em>, expand the Events node. </p>
      <p>The folders are arranged by region. Keep expanding until you find a base event page node that contains the data for the query. </p>
      <p>Click on <em>Canada &#62; Alberta &#62; Banff &#62; Banff 3 on 3 Basketball Challenge</em>. You can review the content details in the pane on the right.</p>
    </div>
  </div>
<p>

Now that you know where the data lives, it’s time to create a query.

## The Graph Browser

In your browser, navigate to `<Sitecore hostname>/Sitecore/api/graph/items/master/ui` to bring up the Sitecore Experience Graph Browser.

![Habitat Fitness](/assets/img/GraphQL03.png)

This tool gives users a place to write and test custom queries. The left pane allows for query input. The right pane will display return results.

<br><br>

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

Now that you have gathered most of the pertinent info, it’s time to put together a query.

Start by calling search, passing in a `fieldsEqual` parameter. This will be an array of _name : value_ pairs indicating which fields to specifically query on, and what you want those values to be. If you pass in multiple objects, the query will AND them together. 

```javascript
{
  search(fieldsEqual: [{
    name: "_fullpath", 
    value: "/sitecore/content/habitatfitness/home/events*"}]) {
    results {
      items {
        name
      }
    }
  }
}
```

For this exercise, find all the items under the Events node, so specify a `_fullpath` value that contains that full path, appended with a wildcard so as to get the node’s children.

Now specify how the return results should be formatted. After looking at the schema for **ContentSearchResults**, you will see a results object of the type **ContentSearchResultConnection**. That object will in turn have an `items` array. Items have a `name` property, so just return that for now.

<br>

Execute the query. You should get the following result.

![Habitat Fitness](/assets/img/GraphQL09.png)

This pulls back every item under the Events node. This isn’t helpful yet, though, as it’s pulling back every node.

Refine the search by searching only for those Event Page nodes that contain the data you want.

<br>

Return to the Content Editor and view the _Canada &#62; Alberta &#62; Banff &#62; Banff 3 on 3 Basketball Challenge_ node, and verify in “Quick Info” that its template type is event-page.

![Habitat Fitness](/assets/img/GraphQL10.png)

<br>

Return to the query, and add another object to the `fieldsEqual` array.

This time, specify that you need these items to also have a `_templatename` property equal to `“event-page”`.

```javascript
{
  search(fieldsEqual: [
    {name: "_fullpath", value: "/sitecore/content/habitatfitness/home/events*"}, 
    {name: "_templatename", value: "event-page"}]) {
    results {
      items {
        name
      }
    }
  }
}
```

<br>

Execute the query and see that the result set has been refined.

![Habitat Fitness](/assets/img/GraphQL12.png)

Now that you are getting the nodes you need, start pulling the event data for these items.

<br>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL13.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>To find these in the schema, go back to the Documentation Explorer and drill down to <em>Query &#62; ContentSearchResults &#62; ContentSearchResultConnection</em>, then click on the items type, <strong>ContentSearchResult</strong>.</p>     
    </div>
  </div>
<p>

<br>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/GraphQL14.png" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>This will show the <strong>ContentSearchResult</strong> schema.</p>      
    </div>
  </div>
<p>

<br>

The property you will need is `fields`, an array of <em>name : value</em> pairs associated with this item. Add it to the query return to see what is available.

```javascript
{ 
  search(fieldsEqual: [
    {name:"_fullpath", value:"/sitecore/content/habitatfitness/home/events*"},
    {name:"_templatename", value:"event-page" }
  ]){
    results{
      items {        
        name
        fields{
          name
          value
        }
      }
    }
  }
}

```

<br>

Execute the query and see that each node is pulling back a lot of useful information.

![Habitat Fitness](/assets/img/GraphQL16.png)

<br>

Too much information, actually, and not in a format that an application can easily reference without iterating through an array every time it needs to retrieve one of these values.

Clean this up by adding your own properties to the result object, and using the `field()` function to retrieve the field values you want.

Start by setting the items name to the event’s `name` field. (for clarity, comment out the `fields` property)

```javascript
{ 
  search(fieldsEqual: [
    {name:"_fullpath", value:"/sitecore/content/habitatfitness/home/events*"},
    {name:"_templatename", value:"event-page" }
  ]){
    results{
      items {        
        name: field(name: "name")   
        #fields{
          #name
          #value
        #}
      }
    }
  }
}
```

<br>

Execute the query and get the following.

![Habitat Fitness](/assets/img/GraphQL18.png)

<br>

Now add a few more fields that you will need, like `description`, `date`, `image`, `latitude`, `longitude`, etc. Then set this array of `items` to a property named `events`.

```javascript
{ 
  search(fieldsEqual: [
    {name:"_fullpath", value:"/sitecore/content/habitatfitness/home/events*"},
    {name:"_templatename", value:"event-page" }
  ]){
    results{
      events: items {        
        name: field(name: "name")   
        description: field(name: "description")      
        date: field(name: "date")
        image: field(name: "image")         
        latitude: field(name: "latitude") 
        longitude: field(name: "longitude")				
      }
    }
  }
}
```

<br>

Execute the query once again and get a nicely formatted result set that looks like this.

![Habitat Fitness](/assets/img/GraphQL20.png)

Excellent! That looks like some usable data! 

However, having the image name alone isn’t particularly useful. What is needed to display an image are the src and alt properties. These can be found by accessing the `Item` object and its `fields: [ItemFields]` array.

Write a small _fragment_ below the query named ImageQuery. It will cast the incoming **ItemField** as an **ImageField**, returning its `alt` and `src` values.

```javascript
fragment ImageQuery on ImageField {
  alt
  src
}
```

Now add an 'item' property that retrieves a field named `image`. Have it reference our ImageQuery fragment. 
```javascript
{ 
  firstSearch: search(fieldsEqual: [
    {name:"_fullpath", value:"/sitecore/content/habitatfitness/home/events*"},
    {name:"_templatename", value:"event-page" }
  ]){
    results{
      items {        
        name: field(name: "name")                
        description: field(name: "description") 
        date: field(name: "date")
        latitude: field(name: "latitude") 
        longitude: field(name: "longitude")				
        item{
          image: field(name: "image"){
            ...ImageQuery
          }
        }
      }
    }
  }
}

fragment ImageQuery on ImageField {
  alt
  src
}
```


<br>

Now run the query to see the following:

![Habitat Fitness](/assets/img/GraphQL22.png)

Now the image `alt` and `src` data is available to display the image in a component. Excellent!

<br>

From here, you might want to add facets to the search; For instance, what if you wanted to look for only items associated with a given language? You might also want to narrow the search to a specific province. 

There is much you can do, and GraphQL provides plenty of tools with which to modify and refine queries.

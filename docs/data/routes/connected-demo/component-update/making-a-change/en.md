---
name: making-a-change
routeTemplate: ./data/routes/connected-demo/en.yml
title: Making a Change to a Component
---

# Updating Component

## Making a Change to a Component

We can make changes to a component in our local application, then see those changes refreshed in the browser immediately.

In your preferred editor, open the file EventListItem component, located in the following location:

```text
\fitness\app\src\components\EventListItem\index.js
```

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/Changes1.jpg" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>Find the <code>&#60;NavLink&#62;</code> tag that wraps the <code>&#60;Text&#62;</code> field for our event items name. (should be somewhere around line 60).</p>      
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/Changes2.jpg" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>Change the order of the <code>&#60;NavLink&#62;</code> and <code>&#60;DateField&#62;</code> tags so that <code>&#60;DateField&#62;</code> appears first.</p>   
    </div>
  </div>
<p>

<p>
  <div class="row">
    <div class="col-md-6"> 
      <p><img src="/assets/img/Changes3.jpg" alt="Habitat Fitness"></p>
    </div>
    <div class="col-md-6"> 
      <p>Save your changes. The jss script will detect your changes and immediately refresh the browser. You should see this image.</p>      
    </div>
  </div>
<p>

Once you are done working locally, in a typical environment you could then deploy your changes.

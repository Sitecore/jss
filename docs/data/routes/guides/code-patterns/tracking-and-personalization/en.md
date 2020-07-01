---
name: tracking-and-personalization
routeTemplate: ./data/component-templates/guide.yml
title: Tracking & Personalization
---

# Tracking & Personalization

## Tracking identity during AJAX calls
When using fetch() to ajax data from the server, cookies are not sent by default, and cookies need to be sent to tell the server the identity of the current user. Use the `init` parameter to make fetch send cookies.

Reference: developer.mozilla.org - fetch Parameters

```javascript
fetch(url, {
  credentials: 'same-origin'
});
```

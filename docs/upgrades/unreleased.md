## Unreleased

 * [sitecore-jss] Switch to edge site query for XP
    * Gets config sites + sxa sites (ignoring website)
    * Previously introduced Boolean `useSiteQuery` switch for XMCloud users has been removed.
    * Search query usage has been removed.
    * If you have any non-nextjs sites they should filter them out in multisite config plugin

### nextjs

### nextjs-xmcloud

### nextjs-sxa

### nextjs-multisite

* **Update** packages\create-sitecore-jss\src\templates\nextjs-multisite\scripts\config\plugins\multisite.ts

```
//Remove
useSiteQuery: true,
```

### nextjs-styleguide

### react

### angular

### vue

---
name: ssr
routeTemplate: ./data/component-templates/guide.yml
title: SSR Recommended Practices
---

Server-Side Rendering (SSR) is required on Content Management (CM) servers to enable inline editing of data by Content Authors in Experience Editor. But as far as Content Delivery (CD) servers go, the primary reason for using SSR is to guarantee SEO compliancy.

Using SSR is recommended if you have content that you want indexed by search engines. Using SSR is not recommended for web apps that render user-specific information (ex. user portals), or dynamic interfaces that should not be indexed (ex. commerce checkout, food ordering, etc).

## Tips for SSR compatibility

It is best practice to build all JSS components to be compatible with SSR, even if the production build uses client-side rendering. The purpose is to stay compatible with the authoring environment (i.e. Experience Editor) so that Content Authors can edit components in a GUI interface.

### Treat browser-specific objects with care

Limit usage of browser-specific objects as much as possible:
- `window`
- `document`
- `localStorage`
- `sessionStorage`

If usage of these browser-specific objects is necessary, be sure to wrap the code in a conditional that checks the current execution context, or place the code in a lifecycle method that does not fire during SSR.

### Use JSS's `isServer()` Helper
JSS has a utility function [`isServer()`](https://github.com/Sitecore/jss/blob/dev/packages/sitecore-jss/src/util.ts#L1) for checking whether the app is currently rendering in a Node context.

Sample usage:

```javascript
import { isServer } from ‘@sitecore-jss/sitecore-jss’;

fetch('https://some-url', { options }).catch((error) => {
  if (isServer()) {
    // use Node's global console object to log the error
    console.error('Error:', error);
  } else {
    // Notify the user about the error. Note: this is for code demonstration only;
    // this is not at attractive way to show errors to end-users
    window.alert('An error has occurred');
  }
});
```

### Verify 3rd party dependencies

When using 3rd party dependencies in your project, extra configuration or middleware may be needed to support SSR.

Check the documentation for SSR compatibility - look for anything special regarding initialization options, render-time params, build configuration specific to SSR, etc. Common dependencies to be mindful of:
- Data fetching libs (Axios, SWR)
- State management libs (Redux, Vuex)
- GraphQL data graph implementations (Apollo)
- Routing libs (react-router, vue-router)
- CSS-in-JS libs (styled-components, emotion)
- Document head manager libs (react-helmet)
- Dynamically loaded components (react-loadable)

---

## Framework-specific guides

- [Vue's (absolutely amazing) SSR Guide](https://ssr.vuejs.org/#what-is-server-side-rendering-ssr)
- [Angular's docs on SSR](https://angular.io/guide/universal)


> Find more SSR content in the [Debugging guide](error-handling-debugging/debugging-help#debugging-node).
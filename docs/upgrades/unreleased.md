## Unreleased

Most of this re-iterates the instructions already provided in 21.6 and 21.7 upgrade guides. We need to double ensure these changes are made, as this release removes related deprecations.

* With the simplification of Editing Support work we have added the following breaking changes to the `sitecore-jss-react` package.
 - `sitecoreContext` property within the `WithSitecoreContextProps` interface has been made optional. Please add safegaurds for scenarios where `sitecoreContext` could be undefined.
 - `WithSitecoreContextHocProps` is now marked as deprecated and will be removed. We recommend that you define and use your own component prop types.

### nextjs

### nextjs-xmcloud

### nextjs-sxa

### nextjs-multisite

### react

### angular

### vue

### headless-ssr-proxy

### headless-ssr-experience-edge

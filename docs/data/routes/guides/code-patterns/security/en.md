---
name: security
routeTemplate: ./data/component-templates/guide.yml
title: Security
---

# Security

## Layout service security
It's important to remember that Layout Service output is not secure, and can be inspected client-side. So with either method, ensure you are not exposing more than necessary, and ensure you are not exposing any sensitive information.

To validate:

If extra fields are being appended to the Sitecore context, check all of these fields
- Are used by front-end components (no reason to add something that's not being used)
- Represent global application state
- Do not expose sensitive information

If the application contains custom Content Resolvers, check that all resolvers
- Do not expose sensitive information


## Framework-specific security guides

- [Vue](https://vuejs.org/v2/guide/security.html)
- [Angular](https://angular.io/guide/security)


## JSS & Federated Authentication POC

*Coming soon*
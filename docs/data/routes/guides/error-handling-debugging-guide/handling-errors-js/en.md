---
name: handling-errors-js
routeTemplate: ./data/component-templates/guide.yml
title: Handling Errors in JS
---

## Compile-Time Errors

---

## Run-Time Errors

---

## Errors in JavaScript

### Ensure all promise failures are handled
A `promises` is a type of object that is returned when you make an async call to the server. ([Read more about promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises))

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

In addition to errors coming from the server, a JSS app needs to handle JavaScript errors as well. For that there are many possible implementations depending on what your specific use-case is. For example, React has [Error Boundaries](https://reactjs.org/docs/error-boundaries.html), which lets you bound the scope where an error is handled in React components.

---

## Validation via Static Type Checking
Static type checkers, such as Flow and TypeScript, can help you find bugs at compilation time, provide Intellisense code auto-completion, and aids in refactoring and making major changes safer in large code bases. 

Sitecore JSS components types definitions are included in the npm package for all front-end frameworks.  For type checking your custom components, you can create these types manually.
Some teams have experimented with extracting these types definitions from the Sitecore manifest.  JSS does not currently provide this functionality. https://github.com/Sitecore/jss/issues/74

### Angular
TypeScript is considered the primary language of Angular app development so this sample app comes configured to handle TypeScript out of the box.

### React
Flow + TypeScript: https://gary.wenneker.org/sitecore-jss-get-typed/
TypeScript: https://www.sergevandenoever.nl/sitecore_jss_typescript/
React TypeScript Starter App: https://github.com/macaw-interactive/react-jss-typescript-starter

More info available on React's docs: https://reactjs.org/docs/static-type-checking.html

### Vue
Vue + TypeScript: https://blog.boro2g.co.uk/setting-up-jss-with-vue-typescript-and-dependency-injection/

More info available on Vue docs: https://vuejs.org/v2/guide/typescript.html

---

## Validation via Framework-Specific Parameter Validators

There is no compilation-time type checking on props passed to a component and whether they will be used correctly by Content Authors. Document the "contract" between the front-end side and the Sitecore side within the source code by defining the expected field names and field types using validators provided by your front-end framework.


>  - In React: use [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
>  - In Vue: use [Prop validation](https://vuejs.org/v2/guide/components-props.html#Prop-Validation)
>  - In Angular: use [Template type checking](https://angular.io/guide/template-typecheck)

### React Example

```javascript
import React from 'react';
import PropTypes from 'prop-types';

const Article = () => (
  // component code
);

Article.propTypes = {
  fields: PropTypes.shape({
    text: PropTypes.shape({
      value: PropTypes.string.isRequired,
      editable: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Article;
```

Having trouble figuring out the propTypes? Check the source code of the relevant field type in the JSS package for the framework you're using. For example, in `packages/sitecore-jss-react/src/components/Link.tsx`

```javascript
Link.propTypes = {
  field: PropTypes.oneOfType([
    PropTypes.shape({
      href: PropTypes.string,
    }),
    PropTypes.shape({
      value: PropTypes.object,
      editableFirstPart: PropTypes.string,
      editableLastPart: PropTypes.string,
    }),
  ]).isRequired,
  editable: PropTypes.bool,
};
```

If using `React`, also check out [Error Boundaries](https://reactjs.org/docs/error-boundaries.html), which are components that catch errors in descendent components, and provide means for you to handle them gracefully.

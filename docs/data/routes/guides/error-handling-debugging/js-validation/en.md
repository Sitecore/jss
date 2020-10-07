---
name: js-validation
routeTemplate: ./data/component-templates/guide.yml
title: Guide to Validation in JavaScript
---

## Run-Time Validation

### Validation Content Author data

#### Account for missing data sources
Don't assume that `props.fields` will always be provided to all components. It could be `null` or `undefined` either due to user error or by intended design of the component (if the source code defines `props.fields` as `props.fields?`). If this is not accounted for in the code then Experience Editor can blow up when editors try to add renderings without data sources. 

To validate: Check that all JSS components which use `props.fields` account for the case when `props.fields` is `null` or `undefined`.

#### Access field values safely

The `sitecore-jss` package contains a helper function called `getFieldValue` that safely extracts field values from renderings and fields objects. It returns `null` if the specified field is not defined, and you can optionally pass in a fallback value that should be used in this case.

**Definitions from [`layoutDataUtils.ts`](https://github.com/Sitecore/jss/blob/master/packages/sitecore-jss/src/layoutDataUtils.ts)**:
```javascript
export declare function getFieldValue<T>(renderingOrFields: ComponentRendering | {
    [name: string]: Field | Item[];
}, fieldName: string): T | undefined;

export declare function getFieldValue<T>(renderingOrFields: ComponentRendering | {
    [name: string]: Field | Item[];
}, fieldName: string, defaultValue: T): T;
```

**Sample Usage**

This function is re-exported from the framework-specific packaged, for convenience. Below is a sample of how this function can be called from a component. In this component, the Content Author has a checkbox called "isFeatured" that allows him or her to flag Article pages as being featured. A use case for this could be the client wanting make featured items look or sort differently in search results.

```javascript
import React from 'react';
import { getFieldValue } from '@sitecore-jss/sitecore-jss-react';

export default ({fields}) => {
  const isFeatured = getFieldValue(
    fields,        /* fields property passed in from props */
    'isFeatured',  /* name of the field */
    false          /* fallback value if undefined by Content Author */
  );

  return (
    <YourComponent>
      {isFeatured && (
        <span>
          {/* extra code for featured items here */}
        <span>
      )}
    </YourComponent>
  );
};
```

### Ensure all promise failures are handled
A `promises` is a type of object that is returned when you make an async call to the server. ([Read more about promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises))

### Validation via framework-specific features

In addition to errors coming from the server, a JSS app needs to handle JavaScript errors as well. There is no compilation-time type checking on prop values passed to components since these values come from Content Authors, so it's unknown at development time.  For that there are many possible implementations depending on what your specific use-case is.

#### Parameter Validators
Document the "contract" between the front-end side and the Sitecore side within the source code by defining the expected field names and field types using validators provided by your front-end framework.

>  - In React: use [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
>  - In Vue: use [Prop validation](https://vuejs.org/v2/guide/components-props.html#Prop-Validation)
>  - In Angular: use [Template type checking](https://angular.io/guide/template-typecheck)

React Example:

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

If using `React`, also check out [Error Boundaries](https://reactjs.org/docs/error-boundaries.html), which are components that catch errors in descendent components, and provide means for you to handle them gracefully.

---

## Compile-Time Validation

### Validation via Static Type Checking
Static type checkers, such as Flow and TypeScript, can help you find bugs at compilation time, provide Intellisense code auto-completion, and aids in refactoring and making major changes safer in large code bases. 

Sitecore JSS components types definitions are included in the npm package for all front-end frameworks.  For type checking your custom components, you can create these types manually.
Some teams have experimented with extracting these types definitions from the Sitecore manifest.  JSS does not currently provide this functionality. https://github.com/Sitecore/jss/issues/74

#### Angular
TypeScript is considered the primary language of Angular app development so this sample app comes configured to handle TypeScript out of the box.

#### React
Flow + TypeScript: https://gary.wenneker.org/sitecore-jss-get-typed/
TypeScript: https://www.sergevandenoever.nl/sitecore_jss_typescript/
React TypeScript Starter App: https://github.com/macaw-interactive/react-jss-typescript-starter

More info available on React's docs: https://reactjs.org/docs/static-type-checking.html

#### Vue
Vue + TypeScript: https://blog.boro2g.co.uk/setting-up-jss-with-vue-typescript-and-dependency-injection/

More info available on Vue docs: https://vuejs.org/v2/guide/typescript.html

### Using logging during build

See [Debugging Help: Node Logging](/guides/error-handling-debugging/debugging-help#node-logging)
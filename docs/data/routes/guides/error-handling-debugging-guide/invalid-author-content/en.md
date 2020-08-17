---
name: invalid-author-content
routeTemplate: ./data/component-templates/guide.yml
title: Handling Content Errors
---

## Access field values safely

### Account for potential Content Author errors

Don't assume that props.fields will always be provided to all components. It could be null/undefined either due to user error or by intended design of the component (the source code defines props.fields as `props.fields?`). If this is not accounted for in the code then Experience Editor can blow up when editors try to add renderings without data sources. 

To validate:
Check that all JSS components which use props.fields account for the case when props.fields is null or undefined.

### Use the getFieldValue() helper
The `sitecore-jss` package contains a helper function called `getFieldValue` that safely extracts field values from renderings and fields objects. It returns `null` if the specified field is not defined, and you can optionally pass in a fallback value that should be used in this case.

> `sitecore-jss/types/layoutDataUtils.d.ts`
> ```javascript
> export declare function getFieldValue<T>(renderingOrFields: ComponentRendering | {
>     [name: string]: Field | Item[];
> }, fieldName: string): T | undefined;
> ```
> ```javascript
> export declare function getFieldValue<T>(renderingOrFields: ComponentRendering | {
>     [name: string]: Field | Item[];
> }, fieldName: string, defaultValue: T): T;
> ```

### Sample Usage
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

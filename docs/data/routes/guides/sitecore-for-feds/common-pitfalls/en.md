---
name: common-pitfalls
routeTemplate: ./data/component-templates/guide.yml
title: Common Pitfalls
---

# (How To Avoid) Common Pitfalls

## Layout
## Avoid hard-coding layout
Do not explicitly hard-code nesting of components. Instead, use the `<Placeholder>` component from the JSS libs to create "holes" in your component that allow the Content Author to nest other components inside it. 

> To validate:
> Experience editor is working as expected; renderings can be inserted, deleted, and moved by Content Authors.

## Avoid hard-coding fields
If a components has values that should be controlled by Content Authors, import the associated field components from the JSS libs (`Text`, `Image`, etc) and use these components in place of those values. Never hard-code values or inject them any other way.

> To validate:
> Experience editor is working as expected; all datasource fields can be edited inline by Content Authors.

## Placeholder naming conventions
Multiple placeholders with same name within same JSS component are not allowed

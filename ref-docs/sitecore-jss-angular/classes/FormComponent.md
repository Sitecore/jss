[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / FormComponent

# Class: FormComponent

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:49](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/form.component.ts#L49)

A component that renders a Sitecore Form.
It fetches the form markup from the Sitecore Edge service and renders it in the component's template.

## Implements

- `OnInit`
- `OnDestroy`

## Constructors

### Constructor

> **new FormComponent**(): `FormComponent`

#### Returns

`FormComponent`

## Properties

### hasError

> **hasError**: `boolean` = `false`

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:55](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/form.component.ts#L55)

***

### isEditing

> **isEditing**: `boolean` = `false`

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:57](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/form.component.ts#L57)

***

### rendering

> **rendering**: `FormRendering`

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:53](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/form.component.ts#L53)

The rendering data for the component

## Methods

### loadForm()

> **loadForm**(): `Promise`\<`void`\>

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:84](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/form.component.ts#L84)

Fetches the form markup from the Sitecore Edge service and renders it in the component's template.

#### Returns

`Promise`\<`void`\>

***

### ngOnDestroy()

> **ngOnDestroy**(): `void`

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:75](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/form.component.ts#L75)

A callback method that performs custom clean-up, invoked immediately
before a directive, pipe, or service instance is destroyed.

#### Returns

`void`

#### Implementation of

`OnDestroy.ngOnDestroy`

***

### ngOnInit()

> **ngOnInit**(): `void`

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:65](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/form.component.ts#L65)

A callback method that is invoked immediately after the
default change detector has checked the directive's
data-bound properties for the first time,
and before any of the view or content children have been checked.
It is invoked only once when the directive is instantiated.

#### Returns

`void`

#### Implementation of

`OnInit.ngOnInit`

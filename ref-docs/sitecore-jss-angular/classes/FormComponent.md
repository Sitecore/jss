[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / FormComponent

# Class: FormComponent

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:48](https://github.com/Sitecore/jss/blob/8e5111fb559f48e10ceb0f08db83263998e91c3d/packages/sitecore-jss-angular/src/components/form.component.ts#L48)

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

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:54](https://github.com/Sitecore/jss/blob/8e5111fb559f48e10ceb0f08db83263998e91c3d/packages/sitecore-jss-angular/src/components/form.component.ts#L54)

***

### isEditing

> **isEditing**: `boolean` = `false`

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:56](https://github.com/Sitecore/jss/blob/8e5111fb559f48e10ceb0f08db83263998e91c3d/packages/sitecore-jss-angular/src/components/form.component.ts#L56)

***

### rendering

> **rendering**: `FormRendering`

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:52](https://github.com/Sitecore/jss/blob/8e5111fb559f48e10ceb0f08db83263998e91c3d/packages/sitecore-jss-angular/src/components/form.component.ts#L52)

The rendering data for the component

## Methods

### loadForm()

> **loadForm**(): `Promise`\<`void`\>

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:83](https://github.com/Sitecore/jss/blob/8e5111fb559f48e10ceb0f08db83263998e91c3d/packages/sitecore-jss-angular/src/components/form.component.ts#L83)

Fetches the form markup from the Sitecore Edge service and renders it in the component's template.

#### Returns

`Promise`\<`void`\>

***

### ngOnDestroy()

> **ngOnDestroy**(): `void`

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:74](https://github.com/Sitecore/jss/blob/8e5111fb559f48e10ceb0f08db83263998e91c3d/packages/sitecore-jss-angular/src/components/form.component.ts#L74)

A callback method that performs custom clean-up, invoked immediately
before a directive, pipe, or service instance is destroyed.

#### Returns

`void`

#### Implementation of

`OnDestroy.ngOnDestroy`

***

### ngOnInit()

> **ngOnInit**(): `void`

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:64](https://github.com/Sitecore/jss/blob/8e5111fb559f48e10ceb0f08db83263998e91c3d/packages/sitecore-jss-angular/src/components/form.component.ts#L64)

A callback method that is invoked immediately after the
default change detector has checked the directive's
data-bound properties for the first time,
and before any of the view or content children have been checked.
It is invoked only once when the directive is instantiated.

#### Returns

`void`

#### Implementation of

`OnInit.ngOnInit`

[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / FormComponent

# Class: FormComponent

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:48](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/form.component.ts#L48)
=======
Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:48](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/form.component.ts#L48)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:54](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/form.component.ts#L54)
=======
Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:54](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/form.component.ts#L54)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

***

### isEditing

> **isEditing**: `boolean` = `false`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:56](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/form.component.ts#L56)
=======
Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:56](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/form.component.ts#L56)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

***

### rendering

> **rendering**: `FormRendering`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:52](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/form.component.ts#L52)
=======
Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:52](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/form.component.ts#L52)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The rendering data for the component

## Methods

### loadForm()

> **loadForm**(): `Promise`\<`void`\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:83](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/form.component.ts#L83)
=======
Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:83](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/form.component.ts#L83)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Fetches the form markup from the Sitecore Edge service and renders it in the component's template.

#### Returns

`Promise`\<`void`\>

***

### ngOnDestroy()

> **ngOnDestroy**(): `void`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:74](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/form.component.ts#L74)
=======
Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:74](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/form.component.ts#L74)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

A callback method that performs custom clean-up, invoked immediately
before a directive, pipe, or service instance is destroyed.

#### Returns

`void`

#### Implementation of

`OnDestroy.ngOnDestroy`

***

### ngOnInit()

> **ngOnInit**(): `void`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:64](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/form.component.ts#L64)
=======
Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:64](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/form.component.ts#L64)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

A callback method that is invoked immediately after the
default change detector has checked the directive's
data-bound properties for the first time,
and before any of the view or content children have been checked.
It is invoked only once when the directive is instantiated.

#### Returns

`void`

#### Implementation of

`OnInit.ngOnInit`

[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [utils](../README.md) / handleEditorAnchors

# Function: handleEditorAnchors()

> **handleEditorAnchors**(): `void`

## Returns

`void`

## Description

in Experience Editor, anchor tags
with both onclick and href attributes will use the href, blocking the onclick from firing.
This function makes it so the anchor tags function as intended in the sample when using Experience Editor

The Mutation Observer API is used to observe changes to the body, then select all elements with href="#" and an onclick,
and replaces the # value with javascript:void(0); which prevents the anchor tag from blocking the onclick event handler.

## See

Mutation Observer API: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/MutationObserver

## Defined in

[packages/sitecore-jss/src/editing/utils.ts:149](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/editing/utils.ts#L149)

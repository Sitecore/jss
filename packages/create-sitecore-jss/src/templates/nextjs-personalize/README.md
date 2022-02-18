# Sitecore JSS Next.js Personalization using Next.js middlware + Boxever API

## Summary of Changes/flow:

1. On Sitecore XM/Exp Edge: layout data now includes expiriences node on the component level, if component has personalization this node holds layout for the component for specific expirience.

2. CdpIntegrationScript is added to the path - it responsible for embeding Boxever.js to the page and tracking page events from the browser
3. Introduced personalizeLayout(layoutData, segment) function to the page-props-factory.ts so that layout data modified to just have renderings for a specific segment
4. Changes in page-props-factory.ts in extractPath function were made to exclude segment code from the path
5. Added _middleware.ts to the pages folder it responcibles for intercepting requests and running additional logic on the Edge server

What is happening on the Edge server:
* _middleware intercepts all requests
* calls ExpEdge to get proper page id to call Boxever
* calls Boxever to get segment code for current user 
* sets bid (browser Id) cookie to have current user identifier in browser
* rewrites response to the specific segment

## Detailed user flow:

1. user opens https://demo.com/studyguide
2. middleware intercepts request, call ExpEdge and Boxever, Boxever decides that current user is in CITYBIKESEGMENT
3. middleware rewrites response to https://demo.com/_segmentId_CITYBIKESEGMENT/studyguide
4. request goes to [[...path]] where path = "/_segmentId_CITYBIKESEGMENT/studyguide"
5. changes in page-props-factory.ts makes sure that layout data is loaded for routePath = "/studyguide"
6. layout data modified to use "CITYBIKESEGMENT" expirience (layout includes experiences for all configured segments on the page by default)
7. personalized page returned to the user
8. when page loaded on the browser Boxever.js calls Boxever Api to track page view event

Currently POC using SSR. For SSG ExpEdge schema should be extended with segments Ids per page (Item graph type is going to include additional field with personalization metadata)

on build time we could generate:
* https://demo.com/_segmentId_CITYBIKESEGMENT/studyguide 
* https://demo.com/_segmentId_MOUNTAINEBIKESEGMENT/studyguide 
* etc.


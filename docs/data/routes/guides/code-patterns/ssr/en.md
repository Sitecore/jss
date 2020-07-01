---
name: ssr
routeTemplate: ./data/component-templates/guide.yml
title: SSR 
---

# SSR

## Why bother with SSR?
SSR is required on Content Management (CM) servers to enable inline editing of data by Content Authors in Experience Editor.

But as far as Content Delivery (CD) servers go, the primary reason for using SSR is to guarantee SEO compliancy.

SSR is required for your content to be indexed properly for the majority of search engines.  Some search engines, mainly Google, accepts JS rendered pages but there some minor caveats:
- Google takes a bit longer (days/weeks) to index JS rendered pages 
- There is no guarantee that Google will render the page correctly based on the way Googlebot works

SSR is recommended if you have content that you want indexed by search engines.
SSR is not be recommended for web applications, which normally contain user-specific information (ex. user portals), or for dynamic interfaces that should not be indexed (ex. commerce checkout, food ordering, etc).


## Recommended practice - ensure SSR compatibility
JSS requires using server-side rendering (SSR). Even if the production deployment build of the JavaScript code base uses client-side rendering, the code must still be SSR-friendly because SSR is utilized by the authoring environment. 

> If the app cannot be compiled and rendered server-side, then it will not work in Experience Editor, and Content Authors will not be able to use the authoring interface to manage the app. Features like inline content editing, point-and-click management of personalization rules, and visual assembly of pages will not work.  

## Tips for SSR compatibility
We recommend limiting usage of the browser-specific objects as much as possible (`window`, `document`, `localStorage`, `sessionStorage`). If using these browser-specific objects is necessary, checks should be included to ensure they only execute conditionally - when running in a browser or in a lifecycle method that does not fire during SSR.

Additionally, when using 3rd party dependencies in your project, check the documentation of the dependencies and be mindful that sometimes features may not support SSR out of the box. Common "gotchyas" to pay careful attention to:
- Data fetching libs
- State management libs (Redux, Vuex)
- GraphQL (Apollo)
- Routing ilbs
- CSS-in-JS libs
- Document head manager libs (react-helmet)
- Dynamically loaded components (react-loadable)

If these features are not working as expected OOTB, it's likely that some extra configuration is required.
- Check the documentation of the libs for anything special regarding initialization options, render-time params, build configuration specific to SSR, etc. Check 
- If you need to debug the SSR bundle generation, `server/server.js` is the entry point
- Instructions for how to debug JSS in SSR mode exist [here](/docs/techniques/ssr/configuring-and-debugging-ssr).


### JSS Helper for SSR Detection
JSS library includes a method to check if your JSS App is currently being Server-side Rendered:
```javascript
import { isServer } from ‘@sitecore-jss/sitecore-jss’

// sample usage
fetch('https://some-url', { options })
.catch((error) => {
	if (isServer()) {
		// use Node's global console object to log the error
		console.error('Error:', error);
	} else {
		// Notify the user about the error. Note: this is for code demonstration only;
		// this is not at attractive way to show errors to end-users
		window.alert('An error has occured');
	}
});
```


## SSR Logging
You may have used the global `console` object in browsers for debugging purposes. Node also has a global `console` object, but for debugging issues in production it’s more reliable to write log messages to log files on the filesystem than to the console. When in SSR mode, the `Console` class can be utilized for this.

From Node.js docs:
> The Console class can be used to create a simple logger with configurable output streams and can be accessed using either require(‘console’).Console or console.Console (or their destructured counterparts):  


Sample implementation (adapted from example @ [https://nodejs.org/api/console.html#console_new_console_stdout_stderr_ignoreerrors](https://nodejs.org/api/console.html#console_new_console_stdout_stderr_ignoreerrors))
```javascript
import fs from 'fs';
import { Console } from 'console';

const filename = (new Date).toISOString().split('T')[0];
const infoLog = filename + '-log.log';
const errorLog = filename + '-error.log';

// test if files exist, and create them if they don't

const output = fs.createWriteStream(infoLog);
const errorOutput = fs.createWriteStream(errorLog);
const logger = new Console({ stdout: output, stderr: errorOutput });

export default logger;
```


Usage
```javascript
import logger from ‘./logger’;

function foo {
	try {
		// do something
		logger.log('Victory in foo!');
	} catch (error) {
		logger.error(`Foo failed. Error: $(error)`);
	}
}
```

See [‘Console’ page in Node docs](https://nodejs.org/api/console.html) for more info.



## Framework-specific guides

- [Vue's (absolutely amazing) SSR Guide](https://ssr.vuejs.org/#what-is-server-side-rendering-ssr)
- [Angular's docs on SSR](https://angular.io/guide/universal)
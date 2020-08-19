---
name: project-structure
routeTemplate: ./data/component-templates/guide.yml
title: Project Structure
---

> This discussion and recommendations on this page apply only to the directory of the JSS project that contains front-end components (`/src`, typically).

## The default structure that JSS CLI generates

### The pros of the default structure

> TODO

---

## Can front-end devs use a different structure?

### Recommended practices for making your custom structure integrate well with Sitecore

It comes down to expanding your approach `component granularity`

### Component granularity considerations

Topics:
* Component Factory
* 

The “React codebase” is a subset of a JSS project (I’m referring to the /src part of a JSS project created from our starter). It houses code for the React components, the React application entry point, and a bunch of helper scripts. One thing that I could imagine causing issues is if the front-end devs have not had a chance to see the Experience Editor, to get a sense of how their React components will map to Sitecore components that Content Authors have to interacts with. React components tend to get broken up a lot more granularly for the sake of reusability. For example, there might be a component called “Visibility” that does one thing – toggle the visibility state with an animation. This component encapsulates a behavior that’s imported by multiple other components, but by itself it’s pretty useless, so it wouldn’t make sense to expose it to Content Authors as a Sitecore component.
 
Luckily, the way that React components are mapped to Sitecore components are controlled by a script in your solution (generate-component-factory.js, it can be customized if needed). It doesn’t just grab ALL react components, it only grabs the ones that match a specific pattern. This makes it pretty easy to add shared/utility/helper components that help break up the code, but don’t influence Experience Editor.
 
See slides 16 – 18 from my SUGCON presentation for more on this subject.
 [https://noti.st/anastasiyaflynn/rCKoF0/sitecore-javascript-services-immersion-lessons-learned#s7VE4zd](https://noti.st/anastasiyaflynn/rCKoF0/sitecore-javascript-services-immersion-lessons-learned#s7VE4zd) 
 
So the bottom line is that there is no Sitecore-specific or JSS-specific structure that needs to be enforced within the /src folder. Front-end devs are free to follow the same best practices that apply to regular react projects within this folder. But they need to be aware how their React components are getting mapped to Sitecore components, and they may need to edit the Component Factory generator script to fit their needs if they are doing something special with the structure.

---

## Component Granularity
- Components may be built as granular as desired, but placeholders should not be used to compose larger components.
- Larger, logical components should be composed in the front-end framework in a way that content authors would use them.  
- Only these components should be imported to Sitecore as renderings.
 
### In Code-First workflow
By default, the `scripts/generate-component-factory.js` script includes all files that follow the naming convention: `src/components/{ComponentName}/index.js`.
To ensure that your granular components are not being included in the componentFactory, you can:
* Use a filename other than `index.js` (example: `Background.js`, `Card.js`, etc)
* Move component to another folder (example: `src/shared/{ComponentName}.js`)
* Update `generate-component-factory.js` script to include components matching your conventions
 
![](/assets/img/guides/component-composition.png)

---

## Naming conventions

> **Recommended Practices**
> - Define and export only one component per file.
> - Keep filenames and exported component names in sync.

Yes, this is basic stuff, but it's easy to overlook updating filenames when renaming components. Here is why this is important:

In this example, the Sitecore definition file is named `Welcome.sitecore.js`, but the manifest defines a component named `Article`, and this functions fine.
![Article component](/assets/img/guides/solution-structure/filename-and-export-do-not-match.png)

But this makes it impossible to navigate to files by component name, which is really convenient in large solutions.
![Search for file by name](/assets/img/guides/solution-structure/search-file-by-name.png)

> **Additional Recommended Practice for Multisite apps**
> - Adopt a site-based prefix naming convention
> See also: [Multisite Guide](/)

---

## Helix
[Helix](https://helix.sitecore.net/) is a set of patterns and conventions for back-end Sitecore developers that deal with solution organization and dependency management. Helix is very popular amongst the Sitecore community, so it's recommended that all developers at least learn the concepts (since it will likely come up in a solution structure debate eventually).

From a technical perspective, JSS *component code* is not required to adhere to Helix principles, and front-end developers may define conventions that differ from those of the back-end team.

However, some front-end developers have reported that following Helix principles for component structure and dependency management helped reduce technical debt and the cost of maintenance over time. 
[JSS Helix React template](https://github.com/jflheureux/jss-app-templates)
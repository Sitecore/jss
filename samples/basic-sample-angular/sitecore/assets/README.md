# Assets

For a Sitecore application you have two types of assets:

1. Assets that should be bundled as static files
2. Assets that should be added to Sitecore's Media Library

# Assets as static files

Place these assets in the `/src/assets` folder.

These files will be picked up by `@angular/cli` tool, when referenced from your application code (more or less everywhere in `src` folder except `*.sitecore.ts`).

Learn more about [assets in Angular-CLI projects](https://github.com/angular/angular-cli/wiki/stories-asset-configuration).

# Assets for Sitecore Media Library

Place assets for Sitecore Media Library in the `/sitecore/assets`.

These files will be picked up by `scjss-manifest` and `scjss-package-generate` tools, when referenced from the `*.sitecore.ts` files.

---
name: nextjs-telemetry
routeTemplate: ./data/component-templates/article.yml
title: Disable Next.js telemetry
---

# Disable [Next.js Telemetry](https://nextjs.org/telemetry)

Next.js collects anonymous telemetry data about general usage. Participation in the program is optional.

To opt-out of the telemetry data collection, you must:

1. Identify your JSS Next.js `.env` file, based on the development environment setup you chose.

   * For full-stack, use `src/rendering/.env`.
   * For front-end, use the `.env` in the root directory of your project. 

2. In the JSS Next.js Application directory (application folder or `src/rendering` for full-stack development)  set the following variable in your `.env` file.

   ```
   NEXT_TELEMETRY_DISABLED=1
   ```


## Unreleased

# react

* With the simplification of Editing Support work we have added the following breaking changes to the `sitecore-jss-react` package. Please make the necessary updates.
  - `ComponentConsumerProps` is removed. You might need to reuse _WithSitecoreContextProps_ type.

### headless-ssr-experience-edge
* Replace `scripts/generate-config.js` if you have not modified it. Otherwise:
    * Add a `trim()` call to `config[prop]` and replace comma before a newline (`,`) with semicolon (`;`) in configText prop assignment so it would look like this:
        
        ```
            configText += `config.${prop} = process.env.REACT_APP_${constantCase(prop)} || "${
                config[prop]?.trim()
            }";\n`;
        ```

# angular

* Replace `scripts/generate-config.ts` if you have not modified it. Otherwise:
    * Add a `trim()` call to `config[prop]` (use toString() to avoid type conflicts) and replace commas before a newline (`,`) with semicolon (`;`) in configText prop assignments so it would look like this:
        
        ```
            configText += `config.${prop} = process.env.${constantCase(prop)} || "${config[prop]?.toString().trim()}";\n`;
        ```


# vue

* Replace `scripts/generate-config.js` if you have not modified it. Otherwise:
    *  Add a `trim()` call to `config[prop]` and replace commas before a newline (`,`) with semicolon (`;`) in configText prop assignments so it would look like this:
        
        ```
            configText += `config.${prop} = process.env.VUE_APP_${constantCase(prop)} || "${
                config[prop]?.trim()
            }";\n`;
        ```

# nextjs

* Replace `scripts/generate-config.ts` if you have not modified it. Otherwise:
    * Add a `trim()` call to `config[prop]` and replace comma before a newline (`,`) with semicolon (`;`) in configText prop assignment so it would look like this:
        
        ```
            configText += `config.${prop} = process.env.${constantCase(prop)} || '${config[prop]?.trim()}';\n`;
        ```

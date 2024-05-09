## Unreleased

# react

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

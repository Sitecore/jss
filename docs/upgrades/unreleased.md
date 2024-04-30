## Unreleased

# react

* Replace `scripts/generate-config.js` if you have not modified it. Otherwise:
    * Replace comma before a newline (`,`) with semicolon (`;`) in the following place:
        
        ```
            configText += `config.${prop} = process.env.REACT_APP_${constantCase(prop)} || "${
                config[prop]
            }",\n`;
        ```

# angular

* Replace `scripts/generate-config.ts` if you have not modified it. Otherwise:
    * Replace comma before a newline (`,`) with semicolon (`;`) in the following place:
        
        ```
            configText += `config.${prop} = process.env.${constantCase(prop)} || "${config[prop]}",\n`;
        ```


# vue

* Replace `scripts/generate-config.js` if you have not modified it. Otherwise:
    * Replace comma before a newline (`,`) with semicolon (`;`) in the following place:
        
        ```
            configText += `config.${prop} = process.env.VUE_APP_${constantCase(prop)} || "${
                config[prop]
            }",\n`;
        ```

# nextjs

* Replace `scripts/generate-config.ts` if you have not modified it. Otherwise:
    * Replace comma before a newline (`,`) with semicolon (`;`) in the following place:
        
        ```
            configText += `config.${prop} = process.env.${constantCase(prop)} || '${config[prop]}',\n`;
        ```

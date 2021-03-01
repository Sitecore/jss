---
name: node-certificates
routeTemplate: ./data/component-templates/article.yml
title: Configure Sitecore CA certificates for Node.js
---
# Configure Sitecore CA certificates for Node.js

On local environments, Sitecore instances are installed using privately signed certificates. However, these are rejected by Node.js since their root CAs are not known. As of Node.js 7.3.0, it is possible to add well-known extra certificates to Node.js with a [`NODE_EXTRA_CA_CERTS`](https://nodejs.org/api/cli.html#cli_node_extra_ca_certs_file) environment variable.

> Note in [Headless Mode](/docs/techniques/authentication/sitecore-auth#headless-mode), you can also disable SSL validation entirely in the proxy, but this is for development ONLY.

If this is not configured properly, you will see errors containing `UNABLE_TO_VERIFY_LEAF_SIGNATURE` when running your JSS application.

Example errors:

```
Error: unable to verify the first certificate
 ...
 type: 'system',
  errno: 'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
  code: 'UNABLE_TO_VERIFY_LEAF_SIGNATURE'
```

```
Error occurred while trying to proxy request /sitecore/api/layout/render/jss?item=%2F&sc_apikey={A6AAE4C9-EEFF-4728-BDCB-80292FDB16EC} 
from localhost:3000 to <https://cm.localhost> (UNABLE_TO_VERIFY_LEAF_SIGNATURE)
```

This article will guide you through the required configuration.

## Step 1 (Sitecore Containers instance): Identify the certificate file

For Docker container-based Sitecore instances, the certificate file is already created by `mkcert`. You can find the location using the following command:

```powershell
mkcert -CAROOT
```

The certificate is in PEM format, and is called *rootCA.pem* by default. So, your file path should look something like: *C:\Users\<username>\AppData\Local\mkcert\rootCA.pem*

## Step 1 (Sitecore on-prem instance): Create the certificate file

For on-prem Sitecore instances installed with Sitecore Install Framework (SIF), the certificate must be exported from the Windows Certificate Store.

1. Open Windows Certificates manager for local computer (`certlm` from command line, or search for "Manage Computer Certificates")
2. Under Trusted Root Certification > Certificates, find the SIF certificate "Sitecore Install Framework"
3. Right-click > All Tasks > Export...
   1. Click Next, then choose "No, do not export the private key", then click Next
   2. Choose "Base-64 encoded X.509 (.CER)", then click Next
   3. Enter a file name (e.g. *SIFRoot.cer*) and location to store the .cer file, then click Next, then Finish

### Note: If you have both Sitecore containers and on-prem instances, you can combine the certificates into a single file.

File structure example:

```
-----BEGIN CERTIFICATE-----
{your mkcert certificate}
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
{your SIF certificate}
-----END CERTIFICATE-----
```

## Step 2: Add `NODE_EXTRA_CA_CERTS` to your environment variables

**Option 1: In local or system environment**

```powershell
setx NODE_EXTRA_CA_CERTS <file>
```

This will set it in the *local* environment. Use the optional `/m` parameter for *system*.

You will need to restart your terminal or VS Code for it to take effect.

**Option 2: In Powershell session**

```powershell
$env:NODE_EXTRA_CA_CERTS="<file>"
```

**Option 3: In package.json file**

```
"start:connected": "cross-env-shell NODE_EXTRA_CA_CERTS=<file> ..."
```

> Note adding it to a `.env` file (using `dotenv`) will not work as these are loaded too late for node to recognize.
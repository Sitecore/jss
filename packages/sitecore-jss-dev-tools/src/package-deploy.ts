import chalk from 'chalk';
import fs from 'fs';
import https, { RequestOptions } from 'https';
import http from 'http';
import path from 'path';
import FormData from 'form-data';
import { TLSSocket } from 'tls';
import { digest, hmac } from './digest';
import { ClientRequest } from 'http';

export interface PackageDeployOptions {
  packagePath: string;
  appName: string;
  importServiceUrl: string;
  secret: string;
  debugSecurity?: boolean;
  acceptCertificate?: string;
  proxy?: string;
}

// Node does not use system level trusted CAs. This causes issues because SIF likes to install
// using a Windows trusted CA - so SSL connections to Sitecore will fail from Node.
// If the options.acceptCertificate is passed, we disable normal SSL validation and use this function
// to whitelist only a cert with the specific thumbprint - essentially certificate pinning.
/**
 * @param {ClientRequest} req
 * @param {PackageDeployOptions} options
 */
export function applyCertPinning(req: ClientRequest, options: PackageDeployOptions) {
  req.on('socket', (socket) => {
    socket.on('secureConnect', () => {
      const fingerprint = (socket as TLSSocket).getPeerCertificate().fingerprint;

      // Match the fingerprint with our saved fingerprint
      if (
        options.acceptCertificate &&
        !doFingerprintsMatch(options.acceptCertificate, fingerprint)
      ) {
        // Abort request, optionally emit an error event
        req.emit(
          'error',
          new Error(
            `Expected server SSL certificate to have thumbprint ${options.acceptCertificate} from acceptCertificate, but got ${fingerprint} from server. This may mean the certificate has changed, or that a malicious certificate is present.`
          )
        );

        return req.abort();
      }
    });
  });
}
/**
 * @param {string} fp
 */
export function normalizeFingerprint(fp: string): string {
  //
  // The fingerprint for a certificate is a 20-byte value.
  // Such values are typically expressed as strings, but
  // there are many different formats that may be used.
  //
  // For example, the following values all represent
  // the same fingerprint:
  //  * 5E:D1:5E:D4:D4:42:71:CC:30:A5:B6:A2:DA:A4:79:06:67:CB:F6:36
  //  * 5ED15ED4D44271CC30A5B6A2DAA4790667CBF636
  //  * 5e:d1:5e:d4:d4:42:71:cc:30:a5:b6:a2:da:a4:79:06:67:cb:f6:36
  //  * 5ed15ed4d44271cc30a5b6a2daa4790667cbf636
  //
  // Before two fingerprints can be properly compared,
  // they must be converted into the same format. This
  // function implements the logic for that conversion.
  return fp.toLowerCase().replace(new RegExp(':', 'g'), '');
}
/**
 * @param {string} fp1
 * @param {string} fp2
 */
export function doFingerprintsMatch(fp1: string, fp2: string): boolean {
  return normalizeFingerprint(fp1) === normalizeFingerprint(fp2);
}

/**
 * @param {object} params
 * @param {string[]} params.warnings
 * @param {string[]} params.errors
 * @param {Function} params.resolve
 * @param {Function} params.reject
 */
export function finishWatchJobStatusTask({
  warnings,
  errors,
  resolve,
  reject,
}: {
  warnings: string[];
  errors: string[];
  resolve: (value?: unknown) => void;
  reject: () => void;
}) {
  console.log();
  console.log('Import is complete.');

  if (warnings.length) {
    console.log();
    console.warn(chalk.yellow('IMPORT WARNING(S) OCCURRED!'));
    warnings.forEach((w) => console.error(chalk.yellow(w)));
  }

  if (errors.length) {
    console.log();
    console.error(chalk.red('IMPORT ERROR(S) OCCURRED!'));
    errors.forEach((e) => console.error(chalk.red(e)));
    reject();
  } else {
    resolve();
  }
}

/**
 * @param {object} params
 * @param {string} params.message
 * @param {string} params.entryLevel
 * @param {string[]} params.warnings
 * @param {string[]} params.errors
 */
export function logJobStatus({
  message,
  entryLevel,
  warnings,
  errors,
}: {
  message: string;
  entryLevel: string;
  warnings: string[];
  errors: string[];
}) {
  switch (entryLevel) {
    case 'WARN':
      console.warn(chalk.yellow(message));
      warnings.push(message);
      break;
    case 'ERROR':
      console.error(chalk.red(message));
      errors.push(message);
      break;
    case 'DEBUG':
      console.log(chalk.white(message));
      break;
    default:
      console.log(chalk.green(message));
      break;
  }
}

/**
 * @param {PackageDeployOptions} options
 * @param {string} taskName
 */
export async function watchJobStatus(options: PackageDeployOptions, taskName: string) {
  let logOffset = 0;
  const errors: string[] = [];
  const warnings: string[] = [];

  const factors = [options.appName, taskName, `${options.importServiceUrl}/status`];
  const mac = hmac(factors, options.secret);

  const url = new URL(
    `${options.importServiceUrl}/status?appName=${options.appName}&jobName=${taskName}&after=${logOffset}`
  );

  const isHttps = options.importServiceUrl.startsWith('https');
  const client = isHttps ? https : http;

  const reqOptions: RequestOptions = {
    headers: {
      'User-Agent': 'Sitecore/JSS-Import',
      'Cache-Control': 'no-cache',
      'X-JSS-Auth': mac,
    },
    method: 'GET',
    hostname: url.hostname,
    protocol: url.protocol,
    path: url.pathname + url.search,
    agent: isHttps
      ? new https.Agent({
          // we turn off normal CA cert validation when we are whitelisting a single cert thumbprint
          rejectUnauthorized: options.acceptCertificate ? false : true,
          // needed to allow whitelisting a cert thumbprint if a connection is reused
          maxCachedSessions: options.acceptCertificate ? 0 : undefined,
        })
      : undefined,
  };

  if (options.debugSecurity) {
    console.log(`Deployment status security factors: ${factors}`);
    console.log(`Deployment status HMAC: ${mac}`);
  }

  if (options.proxy) {
    setProxy(reqOptions, options.proxy, options.importServiceUrl);
  }

  const req = client.request(reqOptions);

  if (isHttps) {
    applyCertPinning(req, options);
  }

  let responseData = '';

  req.on('response', (res) => {
    if (res.statusCode !== 200) {
      let errorData = '';

      res.on('data', (chunk) => {
        errorData += chunk;
      });

      res.on('end', () => {
        console.error(
          chalk.red(
            'Unexpected response from import status service. The import task is probably still running; check the Sitecore logs for details.'
          )
        );
        console.error(chalk.red(`Status message: ${res.statusMessage}`));
        console.error(chalk.red(`Status: ${res.statusCode}`));
        process.exit(1);
      });

      return;
    }

    res.on('error', (err) => {
      console.error(
        chalk.red(
          'Unexpected response from import status service. The import task is probably still running; check the Sitecore logs for details.'
        )
      );
      console.error(chalk.red(`Status message: ${err.message}`));
      console.error(chalk.red(`Status: ${res.statusCode}`));
      process.exit(1);
    });

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      try {
        const body = JSON.parse(responseData);
        const { state, messages }: { state: string; messages: string[] } = body;

        messages.forEach((entry) => {
          logOffset++;

          const entryBits = /^(\[([A-Z]+)\] )?(.+)/.exec(entry);

          let entryLevel = 'INFO';
          let message = entry;

          if (entryBits && entryBits[2]) {
            entryLevel = entryBits[2];
            // 3 = '[] ' in say [INFO] My log message
            // we're not using the capture group as the message might be multi-line
            message = entry.substring(entryLevel.length + 3);
          }

          if (message.startsWith('[JSS] - ')) {
            message = message.substring(8);
          }

          logJobStatus({ message, entryLevel, warnings, errors });
        });

        if (state === 'Finished') {
          finishWatchJobStatusTask({ warnings, errors, resolve: () => {}, reject: () => {} });
          return;
        }

        setTimeout(() => watchJobStatus(options, taskName), 1000);
      } catch (error) {
        console.error(
          chalk.red(`Unexpected error processing reply from import status service: ${error}`)
        );
        console.error(chalk.red(`Response: ${responseData}`));
        console.error(chalk.red('Consult the Sitecore logs for details.'));
        process.exit(1);
      }
    });
  });

  req.on('error', (err) => {
    console.error(chalk.red(`Request error: ${err.message}`));
    process.exit(1);
  });

  req.end();
}

/**
 * @param {PackageDeployOptions} options
 */
export async function packageDeploy(options: PackageDeployOptions) {
  if (!options.secret) {
    throw new Error(
      'Deployment secret was not passed. A shared secret must be configured on both the Sitecore app config and the JS app config'
    );
  }

  if (options.secret.length < 32) {
    throw new Error(
      'Deployment secret was too short. Use a RANDOM (not words or phrases) secret at least 32 characters long.'
    );
  }

  let packageFile = '';
  fs.readdirSync(options.packagePath).forEach((file) => {
    if (file.startsWith(options.appName) && file.endsWith('.manifest.zip')) {
      packageFile = path.join(options.packagePath, file);
    }
  });

  if (!packageFile) {
    throw new Error('Package file not found, ensure you have generated the package first.');
  }

  const factors = [options.appName, options.importServiceUrl, await digest(packageFile)];

  if (options.debugSecurity) {
    console.log('Security debugging is enabled. Do not use this unless absolutely necessary.');
    console.log(`Deployment secret: ${options.secret}`);
    console.log(`Deployment security factors: ${factors}`);
    console.log(`Deployment HMAC: ${hmac(factors, options.secret)}`);
  }

  const formData = new FormData();

  const fileStream = fs.createReadStream(packageFile);

  const url = new URL(options.importServiceUrl);

  formData.append('appName', options.appName);
  formData.append('path', fileStream);

  const isHttps = options.importServiceUrl.startsWith('https');

  const client = isHttps ? https : http;

  const reqOptions: RequestOptions = {
    headers: {
      'User-Agent': 'Sitecore/JSS-Import',
      'Cache-Control': 'no-cache',
      'X-JSS-Auth': hmac(factors, options.secret),
      ...formData.getHeaders(),
    },
    method: 'POST',
    hostname: url.hostname,
    protocol: url.protocol,
    path: url.pathname,
    agent: isHttps
      ? new https.Agent({
          // we turn off normal CA cert validation when we are whitelisting a single cert thumbprint
          rejectUnauthorized: options.acceptCertificate ? false : true,
          // needed to allow whitelisting a cert thumbprint if a connection is reused
          maxCachedSessions: options.acceptCertificate ? 0 : undefined,
        })
      : undefined,
  };

  if (options.proxy) {
    setProxy(reqOptions, options.proxy, options.importServiceUrl);
  }

  const req = client.request(reqOptions);

  if (https) {
    applyCertPinning(req, options);
  }

  attachFormDataHandlers(req, formData);

  formData.pipe(req);

  req.on('response', (res) => {
    if (res.statusCode !== 200) {
      let errorData = '';

      res.on('data', (chunk) => {
        errorData += chunk;
      });

      res.on('end', () => {
        console.error(
          chalk.red(`Error while uploading package: ${res.statusCode} ${res.statusMessage}`)
        );
        console.error(chalk.red(errorData));
        process.exit(1);
      });

      return;
    }

    let responseData = '';

    res.on('error', (err) => {
      console.error(chalk.red(`Response error when uploading package: ${err.message}`));
      process.exit(1);
    });

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      const taskName = responseData;
      console.log('we are in packageDeploy', responseData);

      console.log(chalk.green(`Package uploaded. Import task name: ${taskName}`));

      watchJobStatus(options, taskName);
    });
  });

  req.on('error', (err) => {
    console.error(chalk.red(`Error while uploading package: ${err.message}`));
    process.exit(1);
  });
}

/**
 * Creates valid proxy object
 * @param {RequestOptions} reqOptions
 * @param {string} proxy proxy url
 * @param {string} targetUrl target url
 */
export function setProxy(reqOptions: RequestOptions, proxy: string, targetUrl: string) {
  try {
    const proxyUrl = new URL(proxy);

    reqOptions.hostname = proxyUrl.hostname;
    reqOptions.port = proxyUrl.port || (proxyUrl.protocol === 'https:' ? '443' : '80');
    reqOptions.protocol = proxyUrl.protocol;
    reqOptions.path = targetUrl;
    reqOptions.headers = {
      ...reqOptions.headers,
      Host: new URL(targetUrl).hostname,
    };
  } catch (error) {
    console.error(chalk.red(`Invalid proxy url provided ${proxy}`));
    process.exit(1);
  }
}

/**
 * Attach form data handlers to handle errors and close events
 * @param {ClientRequest} req request object
 * @param {FormData} formData FormData object
 */
export function attachFormDataHandlers(req: ClientRequest, formData: FormData) {
  let ended = false;
  let errored = false;

  formData.on('end', () => {
    ended = true;
  });

  formData.once('error', (err) => {
    errored = true;
    console.log('Error when uploading package:', err);
    req.destroy(err);
  });

  formData.on('close', () => {
    if (!ended && !errored) {
      new Error('Request stream has been aborted');
    }
  });
}

import chalk from 'chalk';
import fs from 'fs';
import https, { Agent as HttpsAgent } from 'https';
import path from 'path';
import FormData from 'form-data';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { TLSSocket } from 'tls';
import { digest, hmac } from './digest';
import { ClientRequest } from 'http';
import { IncomingMessage } from 'http';

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
 * @param {PackageDeployOptions} options
 * @param {string} taskName
 */
async function watchJobStatus(options: PackageDeployOptions, taskName: string) {
  let logOffset = 0;
  const errors: string[] = [];
  const warnings: string[] = [];

  const factors = [options.appName, taskName, `${options.importServiceUrl}/status`];
  const mac = hmac(factors, options.secret);

  const isHttps = options.importServiceUrl.startsWith('https');

  const requestBaseOptions = {
    transport: isHttps ? getHttpsTransport(options) : undefined,
    headers: {
      'User-Agent': 'Sitecore/JSS-Import',
      'Cache-Control': 'no-cache',
      'X-JSS-Auth': mac,
    },
    proxy: extractProxy(options.proxy),
    maxRedirects: 0,
    httpsAgent: isHttps
      ? new HttpsAgent({
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

  return new Promise((resolve, reject) => {
    /**
     * Send job status request
     */
    function sendJobStatusRequest() {
      axios
        .get(
          `${options.importServiceUrl}/status?appName=${options.appName}&jobName=${taskName}&after=${logOffset}`,
          requestBaseOptions
        )
        .then((response) => {
          const body = response.data;

          try {
            const logReplies: string[] = body;

            let complete = false;

            logReplies.forEach((entry) => {
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

              if (entry.startsWith('Job ended:')) {
                console.log();
                console.log('Import is complete.');

                if (warnings.length > 0) {
                  console.log();
                  console.warn(chalk.yellow('IMPORT WARNING(S) OCCURRED!'));
                  warnings.forEach((w) => console.error(chalk.yellow(w)));
                }

                if (errors.length > 0) {
                  console.log();
                  console.error(chalk.red('IMPORT ERROR(S) OCCURRED!'));
                  errors.forEach((e) => console.error(chalk.red(e)));
                  reject();
                } else {
                  resolve();
                }

                complete = true;
                return;
              }

              if (message.startsWith('[JSS] - ')) {
                message = message.substring(8);
              }

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
            });

            if (!complete) {
              setTimeout(sendJobStatusRequest, 1000);
            }
          } catch (error) {
            console.error(
              chalk.red(`Unexpected error processing reply from import status service: ${error}`)
            );
            console.error(chalk.red(`Response: ${body}`));
            console.error(chalk.red('Consult the Sitecore logs for details.'));
            reject(error);
          }
        })
        .catch((error: AxiosError) => {
          console.error(
            chalk.red(
              'Unexpected response from import status service. The import task is probably still running; check the Sitecore logs for details.'
            )
          );
          if (error.response) {
            console.error(chalk.red(`Status message: ${error.response.statusText}`));
            console.error(chalk.red(`Status: ${error.response.status}`));
          } else {
            console.error(chalk.red(error.message));
          }

          reject();
        });
    }

    setTimeout(sendJobStatusRequest, 1000);
  });
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

  let packageFile = null;
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

  formData.append('path', fs.createReadStream(packageFile));
  formData.append('appName', options.appName);

  const isHttps = options.importServiceUrl.startsWith('https');

  const requestBaseOptions = {
    transport: isHttps ? getHttpsTransport(options) : undefined,
    headers: {
      'User-Agent': 'Sitecore/JSS-Import',
      'Cache-Control': 'no-cache',
      'X-JSS-Auth': hmac(factors, options.secret),
      ...formData.getHeaders(),
    },
    proxy: extractProxy(options.proxy),
    httpsAgent: isHttps
      ? new HttpsAgent({
          // we turn off normal CA cert validation when we are whitelisting a single cert thumbprint
          rejectUnauthorized: options.acceptCertificate ? false : true,
          // needed to allow whitelisting a cert thumbprint if a connection is reused
          maxCachedSessions: options.acceptCertificate ? 0 : undefined,
        })
      : undefined,
    maxRedirects: 0,
  } as AxiosRequestConfig;

  console.log(`Sending package ${packageFile} to ${options.importServiceUrl}...`);
  return new Promise<string>((resolve, reject) => {
    axios
      .post(options.importServiceUrl, formData, requestBaseOptions)
      .then((response) => {
        const body = response.data;

        console.log(chalk.green(`Sitecore has accepted import task ${body}`));
        resolve(body);
      })
      .catch((error: AxiosError) => {
        console.error(chalk.red('Unexpected response from import service:'));
        if (error.response) {
          console.error(chalk.red(`Status message: ${error.response.statusText}`));
          console.error(chalk.red(`Status: ${error.response.status}`));
        } else {
          console.error(chalk.red(error.message));
        }

        reject();
      });
  }).then((taskName) => watchJobStatus(options, taskName));
}

/**
 * Creates valid proxy object which fit to axios configuration
 * @param {string} [proxy] proxy url
 */
export function extractProxy(proxy?: string) {
  if (!proxy) return undefined;

  try {
    const proxyUrl = new URL(proxy);

    return {
      protocol: proxyUrl.protocol.slice(0, -1),
      host: proxyUrl.hostname,
      port: +proxyUrl.port,
    };
  } catch (error) {
    console.error(chalk.red(`Invalid proxy url provided ${proxy}`));
    process.exit(1);
  }
}

/**
 * Provides way to customize axios request adapter
 * in order to execute certificate pinning before request sent:
 * {@link https://github.com/axios/axios/issues/2808}
 * @param {PackageDeployOptions} options
 */
export function getHttpsTransport(options: PackageDeployOptions) {
  return {
    ...https,
    request: (reqOptions: https.RequestOptions, callback: (res: IncomingMessage) => void) => {
      const req = https.request(
        {
          ...reqOptions,
        },
        callback
      );
      applyCertPinning(req, options);

      return req;
    },
  };
}

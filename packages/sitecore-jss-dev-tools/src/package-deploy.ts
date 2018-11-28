import chalk from 'chalk';
import fs from 'fs';
import { Agent as HttpsAgent } from 'https';
import path from 'path';
import request from 'request';
import { TLSSocket } from 'tls';
import { digest, hmac } from './digest';

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
function applyCertPinning(req: request.Request, options: PackageDeployOptions) {
  req.on('socket', (socket) => {
    socket.on('secureConnect', () => {
      const fingerprint = (socket as TLSSocket).getPeerCertificate().fingerprint;

      // Match the fingerprint with our saved fingerprint
      if (options.acceptCertificate && (options.acceptCertificate !== fingerprint)) {
        // Abort request, optionally emit an error event
        // tslint:disable-next-line:max-line-length
        req.emit('error', new Error(`Expected server SSL certificate to have thumbprint ${options.acceptCertificate} from acceptCertificate, but got ${fingerprint} from server. This may mean the certificate has changed, or that a malicious certificate is present.`));

        return req.abort();
      }
    });
  });
}

async function watchJobStatus(options: PackageDeployOptions, taskName: string) {
  let logOffset = 0;
  const errors: string[] = [];
  const warnings: string[] = [];

  const factors = [options.appName, taskName, `${options.importServiceUrl}/status`];
  const mac = hmac(factors, options.secret);

  const requestBaseOptions: request.CoreOptions = {
    headers: {
      'User-Agent': 'Sitecore/JSS-Import',
      'Cache-Control': 'no-cache',
      'X-JSS-Auth': mac,
    },
    proxy: options.proxy,
    // we turn off normal CA cert validation when we are whitelisting a single cert thumbprint
    strictSSL: options.acceptCertificate ? false : true,
    followRedirect: false,
  };

  // needed to allow whitelisting a cert thumbprint if a connection is reused
  if (options.importServiceUrl.startsWith('https') && options.acceptCertificate) {
    requestBaseOptions.agent = new HttpsAgent({ maxCachedSessions: 0 });
  }

  if (options.debugSecurity) {
    console.log(`Deployment status security factors: ${factors}`);
    console.log(`Deployment status HMAC: ${mac}`);
  }

  return new Promise((resolve, reject) => {
    function sendJobStatusRequest() {
      // tslint:disable-next-line:max-line-length
      const req = request.get(`${options.importServiceUrl}/status?appName=${options.appName}&jobName=${taskName}&after=${logOffset}`, requestBaseOptions, (error, response, body) => {
        if (error || response.statusCode < 200 || response.statusCode >= 300) {
          // tslint:disable-next-line:max-line-length
          console.error(chalk.red('Unexpected response from import status service. The import task is probably still running; check the Sitecore logs for details.'));
          if (error) {
            console.error(chalk.red(error));
          }
          if (response && response.statusMessage) {
            console.error(chalk.red(response.statusMessage));
          }
          if (body) {
            console.error(chalk.red(body));
          }
          reject();
          return;
        }

        try {
          const logReplies: string[] = JSON.parse(body);

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
          console.error(chalk.red(`Unexpected error processing reply from import status service: ${error}`));
          console.error(chalk.red(`Response: ${body}`));
          console.error(chalk.red('Consult the Sitecore logs for details.'));
          reject(error);
        }
      });

      applyCertPinning(req, options);
    }

    setTimeout(sendJobStatusRequest, 1000);
  });
}

export async function packageDeploy(options: PackageDeployOptions) {
  if (!options.secret) {
    // tslint:disable-next-line:max-line-length
    throw new Error('Deployment secret was not passed. A shared secret must be configured on both the Sitecore app config and the JS app config');
  }

  if (options.secret.length < 32) {
    // tslint:disable-next-line:max-line-length
    throw new Error('Deployment secret was too short. Use a RANDOM (not words or phrases) secret at least 32 characters long.');
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

  const requestBaseOptions: request.CoreOptions = {
    headers: {
      'User-Agent': 'Sitecore/JSS-Import',
      'Cache-Control': 'no-cache',
      'X-JSS-Auth': hmac(factors, options.secret),
    },
    proxy: options.proxy,
    // we turn off normal CA cert validation when we are whitelisting a single cert thumbprint
    strictSSL: options.acceptCertificate ? false : true,
    followRedirect: false,
    formData: {
      path: fs.createReadStream(packageFile),
      appName: options.appName,
    },
  };

  // needed to allow whitelisting a cert thumbprint if a connection is reused
  if (options.importServiceUrl.startsWith('https') && options.acceptCertificate) {
    requestBaseOptions.agent = new HttpsAgent({ maxCachedSessions: 0 });
  }

  console.log(`Sending package ${packageFile} to ${options.importServiceUrl}...`);
  return new Promise<string>((resolve, reject) => {
    const req = request.post(options.importServiceUrl, requestBaseOptions, (error, response, body) => {
      if (error || response.statusCode < 200 || response.statusCode >= 300) {
        console.error(chalk.red('Unexpected response from import service:'));
        if (error) {
          console.error(chalk.red(error));
        }
        if (response && response.statusMessage) {
          console.error(chalk.red(`Status message: ${response.statusMessage}`));
        }
        if (body) {
          console.error(chalk.red(`Body: ${body}`));
        }
        reject();
        return;
      }

      console.log(chalk.green(`Sitecore has accepted import task ${body}`));
      resolve(body);
    });

    applyCertPinning(req, options);
  })
  .then((taskName) => watchJobStatus(options, taskName));
}

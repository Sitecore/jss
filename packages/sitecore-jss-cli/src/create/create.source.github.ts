import chalk from 'chalk';
import fs from 'fs';
import JSZip from 'jszip';
import path from 'path';
import request from 'request';
import tmp from 'tmp';

export class GitHubSource {
  branch: string;
  githubListApi: string;
  githubDownloadUrl: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  argv: any;
  destinationPath: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(argv: any, destinationPath: string) {
    const repository = argv.repository || 'Sitecore/jss';
    const branch = argv.branch || 'master';

    this.branch = branch;
    this.githubListApi = `https://api.github.com/repos/${repository}/contents/samples?ref=${branch}`;
    this.githubDownloadUrl = `https://github.com/${repository}/archive/${branch}.zip`;
    this.argv = argv;
    this.destinationPath = destinationPath;
  }

  async getFromSource() {
    await this.verifyTemplate();

    return new Promise<void>((resolve, reject) => {
      tmp.setGracefulCleanup();

      // unsafeCleanup just means it'll kill any files left in the temp folder
      // that we've created.
      tmp.dir({ unsafeCleanup: true }, async (err, tempDir, cleanupTempDir) => {
        if (err) {
          reject(err);
        }

        const zipFileName = path.join(tempDir, 'jss.zip');
        await this.downloadRepo(zipFileName);

        await this.extractTemplateFiles(zipFileName);

        cleanupTempDir();

        resolve();
      });
    });
  }

  async verifyTemplate() {
    return new Promise((resolve) => {
      // tslint:disable-next-line:max-line-length
      request.get(
        this.githubListApi,
        { proxy: this.argv.proxy, json: true, headers: { 'User-Agent': 'SitecoreJSSCLI' } },
        (error, response, body) => {
          if (error) {
            console.error(chalk.red(error));
            process.exit(1);
          }

          if (response.statusCode !== 200) {
            console.error(
              chalk.red(
                `Server sent ${response.statusCode} ${response.statusMessage} while enumerating templates.`
              )
            );
            process.exit(1);
          }

          if (!body || !Array.isArray(body)) {
            console.log(body);
            console.error(
              chalk.red(
                'Received unexpected response from server while trying to enumerate templates.'
              )
            );
            process.exit(1);
          }

          const apiResult: Array<{ name: string }> = body;
          if (!apiResult.some((result) => result.name === this.argv.template)) {
            console.error(chalk.red(`Template ${this.argv.template} did not exist.`));
            console.error(chalk.red('Valid templates are: '));
            apiResult.forEach((result) => {
              if (result.name === 'node-headless-ssr-proxy') {
                return;
              }

              console.error(chalk.yellow(result.name));
            });
            process.exit(1);
          }

          resolve(apiResult);
        }
      );
    });
  }

  async downloadRepo(fileName: string) {
    console.log(chalk.cyan(`Acquiring templates from ${this.githubDownloadUrl}...`));

    await new Promise((resolve, reject) => {
      const res = request.get(this.githubDownloadUrl, {
        proxy: this.argv.proxy,
        headers: { 'User-Agent': 'SitecoreJSSCLI' },
      });
      const fileStream = fs.createWriteStream(fileName, { autoClose: true });
      res.pipe(fileStream);
      res.on('error', reject);
      fileStream.on('finish', resolve);
    });
  }

  async extractTemplateFiles(zipFile: string) {
    console.log(chalk.cyan(`Extracting template ${this.argv.template}...`));

    const filter = new RegExp(`^[^/]+/samples/${this.argv.template}/(.+)`);

    fs.mkdirSync(this.destinationPath);

    return new Promise<void>((resolve, reject) => {
      fs.readFile(zipFile, (err, data) => {
        if (err) {
          reject(err);
        }

        const jszip = new JSZip();
        const writePromises: Array<Promise<unknown>> = [];

        jszip.loadAsync(data).then(async (zip) => {
          zip
            .filter((innerPath) => filter.test(innerPath))
            .forEach((file) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const relativePath = (filter.exec(file.name) as any)[1];
              const outputPath = path.join(this.destinationPath, relativePath);

              if (file.dir) {
                // create directory
                if (!fs.existsSync(outputPath)) {
                  console.log(chalk.gray(`mkdir ${outputPath}`));
                  fs.mkdirSync(outputPath);
                }
              } else {
                // read file from zip, write to file
                writePromises.push(
                  file.async('nodebuffer').then((content) => {
                    console.log(chalk.gray(`write ${outputPath}`));
                    fs.writeFileSync(outputPath, content);
                  })
                );
              }
            });

          await Promise.all(writePromises);
          resolve();
        });
      });
    });
  }
}

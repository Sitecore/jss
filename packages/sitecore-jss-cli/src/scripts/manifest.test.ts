/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import sinon from 'sinon';
import readlineSync from 'readline-sync';
import chalk from 'chalk';
import { handler } from './manifest';
import * as resolvePkg from '../resolve-package';
import * as generate from '@sitecore-jss/sitecore-jss-dev-tools/dist/cjs/manifest/generator/generate';
import * as verify from '@sitecore-jss/sitecore-jss-dev-tools/dist/cjs/setup/verify-setup';
import fs from 'fs';

describe('manifest script', () => {
  afterEach(() => {
    sinon.restore();
  });

  const packageJson = {
    config: {
      sitecoreConfigPath: 'Santiago',
      sitecoreDistPath: 'C:/SanFrancisco',
      appName: 'jss-unit-package',
      deploySecret: 'you-are-85%-water',
      deployUrl: 'deploy.jss.com',
      rootPlaceholders: ['second-best'],
      language: 'da-DK',
    },
  };

  const argv = {
    manifestSourceFiles: ['one.js', 'another.js'],
    require: 'config.js',
    appName: 'jss-manifest',
    includeContent: false,
    includeDictionary: true,
    manifestOutputPath: 'C:/JSS',
    debug: false,
    rootPlaceholders: ['main', 'top'],
    pipelinePatchFiles: ['red-tape.txt'],
    wipe: false,
    allowConflictingPlaceholderNames: false,
    language: 'en',
  };

  const defaultExpectedArgs = {
    fileGlobs: argv.manifestSourceFiles,
    requireArg: argv.require,
    appName: argv.appName,
    excludeItems: !argv.includeContent,
    excludeMedia: !argv.includeContent,
    excludeDictionary: !argv.includeDictionary,
    outputPath: `${argv.manifestOutputPath}/sitecore-import.json`,
    language: argv.language,
    pipelinePatchFileGlobs: argv.pipelinePatchFiles,
    debug: argv.debug,
    rootPlaceholders: argv.rootPlaceholders,
    wipe: argv.wipe,
    skipPlaceholderBlacklist: argv.allowConflictingPlaceholderNames,
  };

  it('should invoke file generation with parsed args', async () => {
    const generateFileStub = sinon.stub(generate, 'generateToFile').resolves();
    sinon.stub(verify, 'verifySetup');
    sinon.stub(resolvePkg, 'default').resolves(packageJson);

    sinon.stub(fs, 'existsSync').returns(false);

    await handler(argv);

    expect(generateFileStub.calledWith(defaultExpectedArgs)).to.be.true;
  });

  it('should use fallaback for appName, language, rootPlaceholders, if not proided', async () => {
    const cutArgv = {
      ...argv,
      appName: undefined,
      language: undefined,
      rootPlaceholders: undefined,
    };

    const expectedArgs = {
      ...defaultExpectedArgs,
      appName: packageJson.config.appName,
      language: packageJson.config.language,
      rootPlaceholders: packageJson.config.rootPlaceholders,
    };

    const generateFileStub = sinon.stub(generate, 'generateToFile').resolves();
    sinon.stub(verify, 'verifySetup');
    sinon.stub(resolvePkg, 'default').resolves(packageJson);

    await handler(cutArgv);

    expect(generateFileStub.calledWith(expectedArgs)).to.be.true;
  });

  it('should clarify when wipe is invoked', async () => {
    const cutArgv = {
      ...argv,
      wipe: true,
      unattendedWipe: false,
    };
    const keyInStub = sinon.stub(readlineSync, 'keyInYN').returns(false);
    sinon.stub(process, 'exit');

    const generateFileStub = sinon.stub(generate, 'generateToFile').resolves();
    sinon.stub(verify, 'verifySetup');
    sinon.stub(resolvePkg, 'default').resolves(packageJson);

    await handler(cutArgv);

    expect(
      keyInStub.calledWith(chalk.yellow('This will delete any content changes made in Sitecore'))
    ).to.be.true;
  });
});

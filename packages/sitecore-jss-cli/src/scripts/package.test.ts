/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import sinon from 'sinon';
import { handler } from './package';
import * as resolvePkg from '../resolve-package';
import * as generate from '@sitecore-jss/sitecore-jss-dev-tools/dist/cjs/package-generate';

describe('package script', () => {
  afterEach(() => {
    sinon.restore();
  });

  const packageJson = {
    config: {
      appName: 'jss-unit-package',
    },
  };

  const argv = {
    appName: 'jss-manifest',
    manifestOutputPath: 'C:/JSS',
    packageOutputPath: 'C:/packages',
    noItems: true,
    skipManifest: true,
  };

  const expectedGenerateArgs = {
    appName: argv.appName,
    manifestPath: argv.manifestOutputPath,
    manifestFileName: 'sitecore-import.json',
    outputPath: argv.packageOutputPath,
  };

  it('should invoke package generation with parsed args', async () => {
    const generatePkgStub = sinon.stub(generate, 'packageGenerate').resolves();
    sinon.stub(resolvePkg, 'default').resolves(packageJson);

    await handler(argv);

    expect(generatePkgStub.calledWith(expectedGenerateArgs)).to.be.true;
  });

  it('should use fallaback for appName if not proided', async () => {
    const cutArgv = {
      ...argv,
      appName: undefined,
    };

    const expectedArgs = {
      ...expectedGenerateArgs,
      appName: packageJson.config.appName,
    };
    const generatePkgStub = sinon.stub(generate, 'packageGenerate').resolves();
    sinon.stub(resolvePkg, 'default').resolves(packageJson);

    await handler(cutArgv);

    expect(generatePkgStub.calledWith(expectedArgs)).to.be.true;
  });
});

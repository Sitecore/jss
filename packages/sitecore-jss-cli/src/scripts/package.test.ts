/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import sinon from 'sinon';

describe('package script', () => {
  const quibble = require('quibble');
  const testedPath = './package';

  afterEach(() => {
    sinon.restore();
    quibble.reset();
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
    const generateFileStub = sinon.stub().resolves();

    quibble('@sitecore-jss/sitecore-jss-dev-tools', {
      packageGenerate: generateFileStub,
    });
    quibble('../resolve-package', sinon.stub().resolves(packageJson));

    const deployFiles = require(testedPath);

    await deployFiles.handler(argv);

    expect(generateFileStub.calledWith(expectedGenerateArgs)).to.be.true;
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

    const generateFileStub = sinon.stub().resolves();

    quibble('@sitecore-jss/sitecore-jss-dev-tools', {
      packageGenerate: generateFileStub,
    });
    quibble('../resolve-package', sinon.stub().resolves(packageJson));

    const deployFiles = require(testedPath);

    await deployFiles.handler(cutArgv);

    expect(generateFileStub.calledWith(expectedArgs)).to.be.true;
  });
});

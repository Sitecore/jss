/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import sinon from 'sinon';

describe('deploy.files script', () => {
  const quibble = require('quibble');

  afterEach(() => {
    sinon.restore();
    quibble.reset();
  });

  it('should call deploy with parsed options', async () => {
    const argv = {
      destination: 'S:/Santiago',
      source: 'F:/Biarritz',
      exclude: ['this one', 'that one'],
      clean: false,
    };
    const expectedOptions = {
      destinationPath: argv.destination,
      sourcePath: argv.source,
      excludeFile: argv.exclude,
      clean: argv.clean,
    };

    const packageJson = {
      config: {
        sitecoreConfigPath: 'Santiago',
        sitecoreDistPath: 'C:/SanFrancisco',
      },
    };
    const deployStub = sinon.stub();

    quibble('@sitecore-jss/sitecore-jss-dev-tools', {
      deploy: deployStub,
      verifySetup: sinon.stub(),
    });
    quibble('../resolve-package', sinon.stub().resolves(packageJson));

    const deployFiles = require('./deploy.files');

    await deployFiles.handler(argv);

    expect(deployStub.calledWith(expectedOptions)).to.be.true;
  });

  it('should attempt to resolve destination when not provided', async () => {
    const argv = {
      destination: '',
      source: 'F:/Biarritz',
      exclude: ['this one', 'that one'],
      clean: false,
    };
    const expectedOptions = {
      destinationPath: 'S:\\SanFrancisco',
      sourcePath: argv.source,
      excludeFile: argv.exclude,
      clean: false,
    };

    const scJssConfig = {
      sitecore: {
        instancePath: 'S:/',
      },
    };
    const packageJson = {
      config: {
        sitecoreConfigPath: 'Santiago',
        sitecoreDistPath: 'SanFrancisco',
      },
    };
    const deployStub = sinon.stub();

    quibble('@sitecore-jss/sitecore-jss-dev-tools', {
      deploy: deployStub,
      resolveScJssConfig: sinon.stub().resolves(scJssConfig),
      verifySetup: sinon.stub(),
    });

    quibble('../resolve-package', sinon.stub().resolves(packageJson));

    const deployFiles = require('./deploy.files');

    await deployFiles.handler(argv);

    expect(deployStub.calledWith(expectedOptions)).to.be.true;
  });

  it('should abort and log error if sitecore dist path is missing from package.json', async () => {
    const packageJson = {
      config: {
        sitecoreConfigPath: 'Santiago',
      },
    };
    const deployStub = sinon.stub();
    const logSpy = sinon.spy(console, 'error');

    quibble('@sitecore-jss/sitecore-jss-dev-tools', {
      verifySetup: sinon.stub(),
      deploy: deployStub,
    });

    quibble('../resolve-package', sinon.stub().resolves(packageJson));

    const deployFiles = require('./deploy.files');

    await deployFiles.handler({});

    expect(logSpy.getCall(0).args[0].toString()).to.contain(
      'The current project does not support file deployment into the Sitecore instance. You should use an HTTP POST based integration for Experience Editor support. See SDK documentation for details.'
    );
    expect(deployStub.called).to.be.false;
  });
});

/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import chalk from 'chalk';
import path, { sep } from 'path';
import { Initializer, InitializerResults } from './common/Initializer';
import { InitializerFactory } from './InitializerFactory';
import { initRunner } from './init-runner';
import * as helpers from './common/utils/helpers';
import * as install from './common/processes/install';
import * as next from './common/processes/next';

describe('initRunner', () => {
  let log: SinonStub;
  let installPackagesStub: SinonStub;
  let lintFixStub: SinonStub;
  let nextStepsStub: SinonStub;
  let saveConfigurationStub: SinonStub;
  let createStub: SinonStub;

  const mockInitializer = (isBase: boolean, results: InitializerResults) => {
    const mock = <Initializer>{};
    mock.init = sinon.stub().returns(results);
    mock.isBase = isBase;
    return mock;
  };

  beforeEach(() => {
    log = sinon.stub(console, 'log');
    installPackagesStub = sinon.stub(install, 'installPackages');
    lintFixStub = sinon.stub(install, 'lintFix');
    nextStepsStub = sinon.stub(next, 'nextSteps');
    saveConfigurationStub = sinon.stub(helpers, 'saveConfiguration');
  });

  afterEach(() => {
    log?.restore();
    installPackagesStub?.restore();
    lintFixStub?.restore();
    nextStepsStub?.restore();
    saveConfigurationStub?.restore();
    createStub?.restore();
  });

  it('should run', async () => {
    const templates = ['foo', 'bar'];
    const appName = 'test-app';
    const args = {
      silent: false,
      destination: 'samples/next',
      templates,
    };

    const mockFoo = mockInitializer(true, { appName });
    const mockBar = mockInitializer(false, { appName });
    createStub = sinon.stub(InitializerFactory.prototype, 'create');
    createStub.withArgs('foo').returns(mockFoo);
    createStub.withArgs('bar').returns(mockBar);

    await initRunner(templates, args);

    expect(log.getCalls().length).to.equal(2);
    templates.forEach((template, i) => {
      expect(log.getCall(i).args[0]).to.equal(chalk.cyan(`Initializing '${template}'...`));
    });
    expect(mockFoo.init).to.be.calledOnceWith(args);
    expect(mockBar.init).to.be.calledOnceWith(args);
    expect(saveConfigurationStub).to.be.calledOnceWith(
      templates,
      path.resolve(`${args.destination}${sep}package.json`)
    );
    expect(installPackagesStub).to.be.calledOnceWith(args.destination, args.silent);
    expect(lintFixStub).to.be.calledOnceWith(args.destination, args.silent);
    expect(nextStepsStub).to.be.calledOnceWith(appName, []);
  });

  it('should process returned initializers', async () => {
    const templates = ['foo', 'bar'];
    const appName = 'test-app';
    const args = {
      silent: false,
      destination: 'samples/next',
      templates,
    };

    const mockFoo = mockInitializer(true, { appName });
    const mockBar = mockInitializer(false, { appName, initializers: ['baz'] });
    const mockBaz = mockInitializer(false, { appName, initializers: ['huh'] });
    const mockHuh = mockInitializer(false, { appName, initializers: [] });
    createStub = sinon.stub(InitializerFactory.prototype, 'create');
    createStub.withArgs('foo').returns(mockFoo);
    createStub.withArgs('bar').returns(mockBar);
    createStub.withArgs('baz').returns(mockBaz);
    createStub.withArgs('huh').returns(mockHuh);

    await initRunner(templates, args);

    expect(mockFoo.init).to.be.calledOnceWith(args);
    expect(mockBar.init).to.be.calledOnceWith(args);
    expect(mockBaz.init).to.be.calledOnceWith(args);
    expect(mockHuh.init).to.be.calledOnceWith(args);
    expect(args.templates).to.deep.equal(['foo', 'bar', 'baz', 'huh']);
  });

  it('should aggregate nextSteps', async () => {
    const templates = ['foo', 'bar'];
    const appName = 'test-app';
    const args = {
      silent: false,
      destination: 'samples/next',
      templates,
    };

    const mockFoo = mockInitializer(true, { appName, nextSteps: ['foo step 1'] });
    const mockBar = mockInitializer(false, {
      appName,
      nextSteps: ['bar step 1', 'bar step 2'],
      initializers: ['baz'],
    });
    const mockBaz = mockInitializer(false, { appName, nextSteps: ['baz step 1'] });
    createStub = sinon.stub(InitializerFactory.prototype, 'create');
    createStub.withArgs('foo').returns(mockFoo);
    createStub.withArgs('bar').returns(mockBar);
    createStub.withArgs('baz').returns(mockBaz);

    await initRunner(templates, args);

    expect(nextStepsStub).to.be.calledOnceWith(appName, [
      'foo step 1',
      'bar step 1',
      'bar step 2',
      'baz step 1',
    ]);
  });

  it('should respect silent', async () => {
    const templates = ['foo', 'bar'];
    const appName = 'test-app';
    const args = {
      silent: true,
      destination: 'samples/next',
      templates,
    };

    const mockFoo = mockInitializer(true, { appName });
    const mockBar = mockInitializer(false, { appName });
    createStub = sinon.stub(InitializerFactory.prototype, 'create');
    createStub.withArgs('foo').returns(mockFoo);
    createStub.withArgs('bar').returns(mockBar);

    await initRunner(templates, args);

    expect(log).to.not.have.been.called;
    expect(installPackagesStub).to.be.calledOnceWith(args.destination, args.silent);
    expect(lintFixStub).to.be.calledOnceWith(args.destination, args.silent);
    expect(nextStepsStub).to.not.have.been.called;
  });

  it('should respect noInstall', async () => {
    const templates = ['foo', 'bar'];
    const appName = 'test-app';
    const args = {
      silent: false,
      noInstall: true,
      destination: 'samples/next',
      templates,
    };

    const mockFoo = mockInitializer(true, { appName });
    const mockBar = mockInitializer(false, { appName });
    createStub = sinon.stub(InitializerFactory.prototype, 'create');
    createStub.withArgs('foo').returns(mockFoo);
    createStub.withArgs('bar').returns(mockBar);

    await initRunner(templates, args);

    expect(installPackagesStub).to.not.have.been.called;
    expect(lintFixStub).to.not.have.been.called;
  });

  it('should throw range error if unknown template', async () => {
    const templates = ['nope'];
    const args = {
      silent: false,
      destination: 'samples/next',
      templates,
    };

    createStub = sinon.stub(InitializerFactory.prototype, 'create');
    createStub.returns(undefined);

    await initRunner(templates, args).catch((error) => {
      expect(error).to.be.instanceOf(RangeError);
    });
  });
});

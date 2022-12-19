// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import del from 'del';
import { deploy, DeployOptions } from './deploy';
import sinon from 'sinon';
import { expect } from 'chai';
import fsExtra from 'fs-extra';
import chalk from 'chalk';

/* eslint-disable no-unused-expressions */

describe('deploy', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should copy files with correct params', () => {
    const logSpy = sinon.spy(console, 'log');
    const options: DeployOptions = {
      sourcePath: 'C:/source',
      destinationPath: 'D:/target',
    };
    sinon.stub(fsExtra, 'existsSync').returns(true);
    const fsStub = sinon.stub(fsExtra, 'copySync');

    deploy(options);

    expect(fsStub.calledWith(options.sourcePath, options.destinationPath, {})).to.be.true;
    expect(
      logSpy.calledWith(chalk.green('JSS app build artifacts have been deployed to Sitecore.'))
    ).to.be.true;
  });

  it('should filter files', () => {
    const logSpy = sinon.spy(console, 'log');
    const options: DeployOptions = {
      sourcePath: 'C:/source/',
      destinationPath: 'D:/target',
    };
    sinon.stub(fsExtra, 'existsSync').returns(true);
    const fsStub = sinon.stub(fsExtra, 'copySync');

    deploy(options);

    expect(fsStub.calledWith(options.sourcePath, options.destinationPath, {})).to.be.true;
    expect(
      logSpy.calledWith(chalk.green('JSS app build artifacts have been deployed to Sitecore.'))
    ).to.be.true;
  });

  it('should create destination folder when not present', () => {
    const options: DeployOptions = {
      sourcePath: 'C:/source/',
      destinationPath: 'D:/target',
    };
    const logSpy = sinon.spy(console, 'log');
    sinon
      .stub(fsExtra, 'existsSync')
      .withArgs(options.destinationPath)
      .returns(false);
    sinon.stub(fsExtra, 'copySync');

    const createFolderStub = sinon.stub(fsExtra, 'ensureDirSync');

    deploy(options);

    expect(createFolderStub.calledWith(options.destinationPath)).to.be.true;
    expect(
      logSpy.calledWith(
        `Creating nonexistant destination path ${chalk.green(options.destinationPath)}...`
      )
    ).to.be.true;
  });

  it('should clean destination when instructed', () => {
    const logSpy = sinon.spy(console, 'log');
    const options: DeployOptions = {
      sourcePath: 'C:/source/',
      destinationPath: 'D:/target',
      clean: true,
    };
    sinon.stub(fsExtra, 'existsSync').returns(true);
    const delStub = sinon.stub(del, 'sync');
    sinon.stub(fsExtra, 'copySync');

    deploy(options);

    expect(
      delStub.calledWith([`${options.destinationPath}/**`, `!${options.destinationPath}`], {
        force: true,
      })
    ).to.be.true;
    expect(
      logSpy.calledWith(`Cleaning existing files from ${chalk.green(options.destinationPath)}...`)
    ).to.be.true;
  });
});

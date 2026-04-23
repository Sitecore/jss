/* eslint-disable no-unused-expressions */
import * as updateUtils from './update';
import fsExtra from 'fs-extra';
import path from 'path';
import sinon from 'sinon';
import { packageGenerate } from './package-generate';
import { expect } from 'chai';

describe('package-generate', () => {
  let clock: sinon.SinonFakeTimers;

  beforeEach(() => {
    // Use fake timers to control Date.now() for consistent testing
    clock = sinon.useFakeTimers(new Date('2024-01-15T10:30:00.000Z').getTime());
  });

  afterEach(() => {
    clock.restore();
    sinon.restore();
  });

  it('should make a call to generate package', async () => {
    sinon.stub(fsExtra, 'emptyDirSync');
    sinon.stub(fsExtra, 'copySync');

    const options = {
      appName: 'unit',
      outputPath: 'C:/sc/dist/app',
      manifestPath: 'C:/myApp/manifest',
      manifestFileName: 'mani.fest',
    };

    const createPackageStub = sinon.stub(updateUtils, 'createPackage').callsArg(2);

    await packageGenerate(options);

    expect(createPackageStub.called).to.be.true;
  });

  it('should clear output folder before generating package', async () => {
    const emptyDirSyncStub = sinon.stub(fsExtra, 'emptyDirSync');
    sinon.stub(fsExtra, 'copySync');
    sinon.stub(updateUtils, 'createPackage').callsArg(2);

    const options = {
      appName: 'myApp',
      outputPath: 'C:/output',
      manifestPath: 'C:/source/manifest',
      manifestFileName: 'manifest.json',
    };

    await packageGenerate(options);

    expect(emptyDirSyncStub.calledOnce).to.be.true;
    expect(emptyDirSyncStub.calledWith('C:/output')).to.be.true;
  });

  it('should copy manifest from source to destination with timestamp path', async () => {
    sinon.stub(fsExtra, 'emptyDirSync');
    const copySyncStub = sinon.stub(fsExtra, 'copySync');
    sinon.stub(updateUtils, 'createPackage').callsArg(2);

    const timestamp = new Date().getTime();
    const options = {
      appName: 'testApp',
      outputPath: 'C:/output',
      manifestPath: 'C:/source/manifest',
      manifestFileName: 'manifest.json',
    };

    await packageGenerate(options);

    const expectedDestination = path.join('C:/output', '.', 'temp', 'testApp', String(timestamp));

    expect(copySyncStub.calledOnce).to.be.true;
    expect(copySyncStub.calledWith('C:/source/manifest', expectedDestination)).to.be.true;
  });

  it('should handle relative manifest path correctly', async () => {
    sinon.stub(fsExtra, 'emptyDirSync');
    const copySyncStub = sinon.stub(fsExtra, 'copySync');
    sinon.stub(updateUtils, 'createPackage').callsArg(2);

    const timestamp = new Date().getTime();
    const options = {
      appName: 'testApp',
      outputPath: 'C:/output',
      manifestPath: 'relative/manifest/path',
      manifestFileName: 'manifest.json',
    };

    await packageGenerate(options);

    const expectedSource = path.join('.', 'relative/manifest/path');
    const expectedDestination = path.join('C:/output', '.', 'temp', 'testApp', String(timestamp));

    expect(copySyncStub.calledOnce).to.be.true;
    expect(copySyncStub.calledWith(expectedSource, expectedDestination)).to.be.true;
  });

  it('should handle relative output path correctly', async () => {
    sinon.stub(fsExtra, 'emptyDirSync');
    const copySyncStub = sinon.stub(fsExtra, 'copySync');
    sinon.stub(updateUtils, 'createPackage').callsArg(2);

    const timestamp = new Date().getTime();
    const options = {
      appName: 'testApp',
      outputPath: 'relative/output',
      manifestPath: 'C:/source/manifest',
      manifestFileName: 'manifest.json',
    };

    await packageGenerate(options);

    const expectedDestination = path.join(
      '.',
      'relative/output',
      '.',
      'temp',
      'testApp',
      String(timestamp)
    );

    expect(copySyncStub.calledOnce).to.be.true;
    expect(copySyncStub.calledWith('C:/source/manifest', expectedDestination)).to.be.true;
  });

  it('should create package with correct name and paths', async () => {
    sinon.stub(fsExtra, 'emptyDirSync');
    sinon.stub(fsExtra, 'copySync');
    const createPackageStub = sinon.stub(updateUtils, 'createPackage').callsArg(2);

    const timestamp = new Date().getTime();
    const options = {
      appName: 'myApp',
      outputPath: 'C:/output',
      manifestPath: 'C:/source/manifest',
      manifestFileName: 'manifest.json',
    };

    await packageGenerate(options);

    const expectedManifestPath = path.join('C:/output', '.', 'temp', 'myApp', String(timestamp));
    const expectedPackagePath = path.join('C:/output', `myApp.${timestamp}.manifest.zip`);

    expect(createPackageStub.calledOnce).to.be.true;
    expect(createPackageStub.calledWith(expectedManifestPath, expectedPackagePath)).to.be.true;
  });

  it('should return a promise that resolves when package is created', async () => {
    sinon.stub(fsExtra, 'emptyDirSync');
    sinon.stub(fsExtra, 'copySync');
    sinon.stub(updateUtils, 'createPackage').callsArg(2);

    const options = {
      appName: 'myApp',
      outputPath: 'C:/output',
      manifestPath: 'C:/source/manifest',
      manifestFileName: 'manifest.json',
    };

    const result = await packageGenerate(options);

    expect(result).to.be.null;
  });

  it('should handle both relative paths correctly', async () => {
    sinon.stub(fsExtra, 'emptyDirSync');
    const copySyncStub = sinon.stub(fsExtra, 'copySync');
    const createPackageStub = sinon.stub(updateUtils, 'createPackage').callsArg(2);

    const timestamp = new Date().getTime();
    const options = {
      appName: 'relativeApp',
      outputPath: 'dist/output',
      manifestPath: 'src/manifest',
      manifestFileName: 'manifest.json',
    };

    await packageGenerate(options);

    const expectedSource = path.join('.', 'src/manifest');
    const expectedDestination = path.join(
      '.',
      'dist/output',
      '.',
      'temp',
      'relativeApp',
      String(timestamp)
    );
    const expectedPackagePath = path.join('dist/output', `relativeApp.${timestamp}.manifest.zip`);

    expect(copySyncStub.calledWith(expectedSource, expectedDestination)).to.be.true;
    expect(createPackageStub.calledWith(expectedDestination, expectedPackagePath)).to.be.true;
  });

  it('should use timestamp in manifest path and package name', async () => {
    sinon.stub(fsExtra, 'emptyDirSync');
    const copySyncStub = sinon.stub(fsExtra, 'copySync');
    const createPackageStub = sinon.stub(updateUtils, 'createPackage').callsArg(2);

    const expectedTimestamp = new Date().getTime();
    const options = {
      appName: 'timestampApp',
      outputPath: 'C:/output',
      manifestPath: 'C:/source/manifest',
      manifestFileName: 'manifest.json',
    };

    await packageGenerate(options);

    const copySyncDestination = copySyncStub.firstCall.args[1];
    const createPackageSource = createPackageStub.firstCall.args[0];
    const createPackageZip = createPackageStub.firstCall.args[1];

    expect(copySyncDestination).to.include(String(expectedTimestamp));
    expect(createPackageSource).to.include(String(expectedTimestamp));
    expect(createPackageZip).to.include(`timestampApp.${expectedTimestamp}.manifest.zip`);
  });
});

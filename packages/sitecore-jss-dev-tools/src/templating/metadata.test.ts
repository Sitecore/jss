/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { getMetadata } from './metadata';
import sinon, { SinonStub } from 'sinon';
import childProcess from 'child_process';
import packageLockNextjs from './../test-data/metadata/package-lock-nextjs.json';
import packageLockAngular from './../test-data/metadata/package-lock-angular.json';
import packageLockNoSitecore from './../test-data/metadata/package-lock-no-sitecore-scopes.json';
import metadataNextjs from './../test-data/metadata/metadata-nextjs.json';
import metadataAngular from './../test-data/metadata/metadata-angular.json';

describe('metadata', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('getMetadata', () => {
    const packageLockPath = `.${path.sep}package-lock.json`;
    let readdirSync: SinonStub;
    let readFileSync: SinonStub;
    let existsSync: SinonStub;
    let execSyncStub: SinonStub;

    afterEach(() => {
      readdirSync?.restore();
      readFileSync?.restore();
      existsSync?.restore();
      execSyncStub?.restore();
    });

    it('it should create package-lock.json if not already present and then remove it', () => {
      existsSync = sinon.stub(fs, 'existsSync');
      existsSync.withArgs(packageLockPath).returns(false);
      readFileSync = sinon.stub(fs, 'readFileSync');
      readFileSync.withArgs(packageLockPath, 'utf8').returns(JSON.stringify({}));
      execSyncStub = sinon.stub(childProcess, 'execSync');
      getMetadata();
      expect(execSyncStub.calledTwice).to.be.true;
    });

    it('should thorow if package-lock creation failed', () => {
      existsSync = sinon.stub(fs, 'existsSync');
      existsSync.withArgs(packageLockPath).returns(false);
      execSyncStub = sinon.stub(childProcess, 'execSync').throws('error');
      expect(() => getMetadata()).to.throw;
    });

    it('should return tracked packages from example nextjs package-lock.json', () => {
      existsSync = sinon.stub(fs, 'existsSync');
      existsSync.withArgs(packageLockPath).returns(true);
      readFileSync = sinon.stub(fs, 'readFileSync');
      readFileSync.withArgs(packageLockPath, 'utf8').returns(JSON.stringify(packageLockNextjs));

      const metadata = getMetadata();
      expect(metadata).to.deep.equal(metadataNextjs);
    });

    it('should return tracked packages from example angular package-lock.json', () => {
      existsSync = sinon.stub(fs, 'existsSync');
      existsSync.withArgs(packageLockPath).returns(true);
      readFileSync = sinon.stub(fs, 'readFileSync');
      readFileSync.withArgs(packageLockPath, 'utf8').returns(JSON.stringify(packageLockAngular));

      const metadata = getMetadata();
      expect(metadata).to.deep.equal(metadataAngular);
    });

    it('should not return packages for package-lock not containng tracked packages', () => {
      existsSync = sinon.stub(fs, 'existsSync');
      existsSync.withArgs(packageLockPath).returns(true);
      readFileSync = sinon.stub(fs, 'readFileSync');
      readFileSync.withArgs(packageLockPath, 'utf8').returns(JSON.stringify(packageLockNoSitecore));

      const metadata = getMetadata();
      expect(metadata).to.deep.equal({ packages: {} });
    });

    it('should throw if package-lock json not valid', () => {
      existsSync = sinon.stub(fs, 'existsSync');
      existsSync.withArgs(packageLockPath).returns(true);
      readFileSync = sinon.stub(fs, 'readFileSync');
      readFileSync
        .withArgs(packageLockPath, 'utf8')
        .returns(fs.readFileSync('./../test-data/metadata/package-lock-invalid.json', 'utf8'));
      expect(() => getMetadata()).to.throw;
    });
  });
});

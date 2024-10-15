/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { getMetadata } from './metadata';
import sinon, { SinonStub } from 'sinon';
import { Metadata } from '@sitecore-jss/sitecore-jss/editing';
import childProcess from 'child_process';
import packageLockNextjs from './../test-data/metadata/package-lock-nextjs.json';
import metadataNextjs from './../test-data/metadata/metadata-nextjs.json';

describe('metadata', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('getMetadata', () => {
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

    it('should return packages metadata from @sitecore scope', () => {
      readdirSync = sinon.stub(fs, 'readdirSync');
      readdirSync.withArgs('node_modules').returns(['@sitecore']);
      readdirSync.withArgs(path.join('node_modules', '@sitecore')).returns(['byoc', 'components']);

      readFileSync = sinon.stub(fs, 'readFileSync');
      readFileSync
        .withArgs(path.join('node_modules', '@sitecore', 'byoc', 'package.json'))
        .returns('{"name": "@sitecore/byoc","version": "0.2.8"}');
      readFileSync
        .withArgs(path.join('node_modules', '@sitecore', 'components', 'package.json'))
        .returns('{"name": "@sitecore/components","version": "1.1.6"}');

      const expected: Metadata = {
        packages: {
          '@sitecore/byoc': '0.2.8',
          '@sitecore/components': '1.1.6',
        },
      };

      const packagesMetadata = getMetadata();
      expect(packagesMetadata).to.deep.equal(expected);
    });

    it('should return packages metadata from @sitecore-jss scope', () => {
      readdirSync = sinon.stub(fs, 'readdirSync');
      readdirSync.withArgs('node_modules').returns(['@sitecore-jss']);
      readdirSync
        .withArgs(path.join('node_modules', '@sitecore-jss'))
        .returns(['sitecore-jss-cli', 'sitecore-jss-nextjs']);

      readFileSync = sinon.stub(fs, 'readFileSync');
      readFileSync
        .withArgs(path.join('node_modules', '@sitecore-jss', 'sitecore-jss-cli', 'package.json'))
        .returns('{"name": "@sitecore-jss/sitecore-jss-cli","version": "21.7.0-canary.55"}');
      readFileSync
        .withArgs(path.join('node_modules', '@sitecore-jss', 'sitecore-jss-nextjs', 'package.json'))
        .returns('{"name": "@sitecore-jss/sitecore-jss-nextjs","version": "21.7.0-canary.55"}');

      const expected: Metadata = {
        packages: {
          '@sitecore-jss/sitecore-jss-cli': '21.7.0-canary.55',
          '@sitecore-jss/sitecore-jss-nextjs': '21.7.0-canary.55',
        },
      };

      const packagesMetadata = getMetadata();
      expect(packagesMetadata).to.deep.equal(expected);
    });

    it('should return packages metadata from @sitecore-cloudsdk scope', () => {
      readdirSync = sinon.stub(fs, 'readdirSync');
      readdirSync.withArgs('node_modules').returns(['@sitecore-cloudsdk']);
      readdirSync.withArgs(path.join('node_modules', '@sitecore-cloudsdk')).returns(['core']);

      readFileSync = sinon.stub(fs, 'readFileSync');
      readFileSync
        .withArgs(path.join('node_modules', '@sitecore-cloudsdk', 'core', 'package.json'))
        .returns('{"name": "@sitecore-cloudsdk/core","version": "0.1.5"}');

      const expected: Metadata = {
        packages: {
          '@sitecore-cloudsdk/core': '0.1.5',
        },
      };

      const packagesMetadata = getMetadata();
      expect(packagesMetadata).to.deep.equal(expected);
    });

    it('should return packages metadata from @sitecore-feaas scope', () => {
      readdirSync = sinon.stub(fs, 'readdirSync');
      readdirSync.withArgs('node_modules').returns(['@sitecore-feaas']);
      readdirSync.withArgs(path.join('node_modules', '@sitecore-feaas')).returns(['clientside']);

      readFileSync = sinon.stub(fs, 'readFileSync');
      readFileSync
        .withArgs(path.join('node_modules', '@sitecore-feaas', 'clientside', 'package.json'))
        .returns('{"name": "@sitecore-feaas/clientside","version": "0.5.12"}');

      const expected: Metadata = {
        packages: {
          '@sitecore-feaas/clientside': '0.5.12',
        },
      };

      const packagesMetadata = getMetadata();
      expect(packagesMetadata).to.deep.equal(expected);
    });

    it('should not return packages metadata for not tracked scopes', () => {
      const scope = '@nottracked-scope';
      readdirSync = sinon.stub(fs, 'readdirSync');
      readdirSync.withArgs('node_modules').returns([scope]);

      const expected: Metadata = { packages: {} };

      const packagesMetadata = getMetadata();
      expect(packagesMetadata).to.deep.equal(expected);
    });

    it('should throw if package.json not found', () => {
      readdirSync = sinon.stub(fs, 'readdirSync');
      readdirSync.withArgs('node_modules').returns(['@sitecore-feaas']);
      readdirSync.withArgs(path.join('node_modules', '@sitecore-feaas')).returns(['clientside']);

      readFileSync = sinon.stub(fs, 'readFileSync');
      readFileSync
        .withArgs(path.join('node_modules', '@sitecore-feaas', 'clientside', 'package.json'))
        .returns(null);

      expect(() => getMetadata()).to.throw;
    });

    it('should throw if json not valid', () => {
      readdirSync = sinon.stub(fs, 'readdirSync');
      readdirSync.withArgs('node_modules').returns(['@sitecore-feaas']);
      readdirSync.withArgs(path.join('node_modules', '@sitecore-feaas')).returns(['clientside']);

      readFileSync = sinon.stub(fs, 'readFileSync');
      readFileSync
        .withArgs(path.join('node_modules', '@sitecore-feaas', 'clientside', 'package.json'))
        .returns('{"name": "@sitecore-feaas/clientside","version": "0.5.12"');

      expect(() => getMetadata()).to.throw;
    });

    it('new test: it should create package-lock.json if not already present and then remove it', () => {
      existsSync = sinon.stub(fs, 'existsSync');
      existsSync.withArgs('./package-lock.json').returns(false);
      readFileSync = sinon.stub(fs, 'readFileSync');
      readFileSync.withArgs('./package-lock.json', 'utf8').returns(JSON.stringify({}));
      execSyncStub = sinon.stub(childProcess, 'execSync');
      getMetadata();
      expect(execSyncStub.calledTwice).to.be.true;
    });

    it('new test: should thorow if package-lock creation failed', () => {
      existsSync = sinon.stub(fs, 'existsSync');
      existsSync.withArgs('./package-lock.json').returns(false);
      execSyncStub = sinon.stub(childProcess, 'execSync').throws('error');
      expect(() => getMetadata()).to.throw;
    });

    it('new test: should return tracked packages from example nextjs package-lock.json', () => {
      existsSync = sinon.stub(fs, 'existsSync');
      existsSync.withArgs('./package-lock.json').returns(true);
      readFileSync = sinon.stub(fs, 'readFileSync');
      readFileSync
        .withArgs('./package-lock.json', 'utf8')
        .returns(JSON.stringify(packageLockNextjs));

      const metadata = getMetadata();
      expect(metadata).to.deep.equal(metadataNextjs);
    });
  });
});

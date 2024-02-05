/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { getPackagesMetadata } from './metadata';
import sinon, { SinonStub } from 'sinon';

describe('metadata', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('getPackagesMetadata', () => {
    let readdirSync: SinonStub;
    let readFileSync: SinonStub;

    afterEach(() => {
      readdirSync?.restore();
      readFileSync?.restore();
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

      const expected: { [key: string]: string } = {
        '@sitecore/byoc': '0.2.8',
        '@sitecore/components': '1.1.6',
      };

      const packagesMetadata = getPackagesMetadata();
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

      const expected: { [key: string]: string } = {
        '@sitecore-jss/sitecore-jss-cli': '21.7.0-canary.55',
        '@sitecore-jss/sitecore-jss-nextjs': '21.7.0-canary.55',
      };

      const packagesMetadata = getPackagesMetadata();
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

      const expected: { [key: string]: string } = {
        '@sitecore-cloudsdk/core': '0.1.5',
      };

      const packagesMetadata = getPackagesMetadata();
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

      const expected: { [key: string]: string } = {
        '@sitecore-feaas/clientside': '0.5.12',
      };

      const packagesMetadata = getPackagesMetadata();
      expect(packagesMetadata).to.deep.equal(expected);
    });

    it('should not return packages metadata for not tracked scopes', () => {
      const scope = '@nottracked-scope';
      readdirSync = sinon.stub(fs, 'readdirSync');
      readdirSync.withArgs('node_modules').returns([scope]);

      const expected: { [key: string]: string } = {};

      const packagesMetadata = getPackagesMetadata();
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

      expect(() => getPackagesMetadata()).to.throw;
    });

    it('should throw if json not valid', () => {
      readdirSync = sinon.stub(fs, 'readdirSync');
      readdirSync.withArgs('node_modules').returns(['@sitecore-feaas']);
      readdirSync.withArgs(path.join('node_modules', '@sitecore-feaas')).returns(['clientside']);

      readFileSync = sinon.stub(fs, 'readFileSync');
      readFileSync
        .withArgs(path.join('node_modules', '@sitecore-feaas', 'clientside', 'package.json'))
        .returns('{"name": "@sitecore-feaas/clientside","version": "0.5.12"');

      expect(() => getPackagesMetadata()).to.throw;
    });
  });
});

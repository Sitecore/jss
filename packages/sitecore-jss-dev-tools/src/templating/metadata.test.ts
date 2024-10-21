/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getMetadata } from './metadata';
import sinon, { SinonStub } from 'sinon';
import childProcess from 'child_process';
import metadataNextjs from './../test-data/metadata/metadata-nextjs.json';
import metadataAngular from './../test-data/metadata/metadata-angular.json';
import npmQueryResultNext from './../test-data/metadata/npm-query-nextjs.json';
import npmQueryResultAngular from './../test-data/metadata/npm-query-angular.json';
import npmQueryResultNoSc from './../test-data/metadata/npm-query-no-sc.json';

describe('metadata', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('getMetadata', () => {
    let execSyncStub: SinonStub;

    afterEach(() => {
      execSyncStub?.restore();
    });

    it('should return tracked packages with exact versions from result of npm query (nextjs app)', () => {
      execSyncStub = sinon.stub(childProcess, 'execSync');
      execSyncStub
        .withArgs('npm query [name*=@sitecore] --workspaces false')
        .returns(JSON.stringify(npmQueryResultNext));
      const metadata = getMetadata();
      expect(metadata).to.deep.equal(metadataNextjs);
    });

    it('should return tracked packages with exact versions from result of npm query (angular app)', () => {
      execSyncStub = sinon.stub(childProcess, 'execSync');
      execSyncStub
        .withArgs('npm query [name*=@sitecore] --workspaces false')
        .returns(JSON.stringify(npmQueryResultAngular));
      const metadata = getMetadata();
      expect(metadata).to.deep.equal(metadataAngular);
    });

    it('should throw if result of npm query is not valid', () => {
      execSyncStub = sinon.stub(childProcess, 'execSync');
      execSyncStub.withArgs('npm query [name*=@sitecore] --workspaces false').returns('[{"name":}');
      expect(() => getMetadata()).to.throw;
    });

    it('should thorow if npm query command fails', () => {
      execSyncStub = sinon.stub(childProcess, 'execSync');
      execSyncStub.withArgs('npm query [name*=@sitecore] --workspaces false').throws();
      expect(() => getMetadata()).to.throw;
    });

    it('should not return packages for result of npm query not containng tracked packages', () => {
      execSyncStub = sinon.stub(childProcess, 'execSync');
      execSyncStub
        .withArgs('npm query [name*=@sitecore] --workspaces false')
        .returns(JSON.stringify(npmQueryResultNoSc));
      const metadata = getMetadata();
      expect(metadata).to.deep.equal({ packages: {} });
    });
  });
});

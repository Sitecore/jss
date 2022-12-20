/* eslint-disable no-unused-expressions */
import * as updateUtils from './update';
import fsExtra from 'fs-extra';
import sinon from 'sinon';
import { packageGenerate } from './package-generate';
import { expect } from 'chai';

describe('package-generate', () => {
  afterEach(() => {
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
});

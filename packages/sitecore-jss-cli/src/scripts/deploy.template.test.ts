/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import sinon from 'sinon';
import * as microManifest from '../micro-manifest';
import { handler } from './deploy.template';

describe('deploy.template script', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should parse fields from input', async () => {
    const argv = {
      fields: ['single', 'multi:multi-line text'],
      skipDeploy: true,
    };
    const expectedFields = [
      {
        name: 'single',
        type: 'Single-LineText',
      },
      {
        name: 'multi',
        type: 'multi-linetext',
      },
    ];
    const logSpy = sinon.spy(console, 'log');

    await handler(argv);

    const logOutput = logSpy
      .getCall(0)
      .args[0].toString()
      .replace(/\s/g, '');

    expect(logOutput).to.contain(JSON.stringify(expectedFields));
  });

  // the actual work is done in microManifest - so we just test success messages
  // and test microManifest separately
  it('should log on successful deploy', async () => {
    sinon.stub(microManifest, 'default').resolves();
    const logSpy = sinon.spy(console, 'log');
    const argv = {
      name: 'unit',
      displayName: 'absolute unit',
      icon: '',
      fields: [],
      placeholders: [],
      allowedPlaceholders: [],
    };
    const successMsg = 'Your template has been created (or updated)!';
    await handler(argv);

    expect(logSpy.getCall(1).args[0].toString()).to.contain(successMsg);
  });
});

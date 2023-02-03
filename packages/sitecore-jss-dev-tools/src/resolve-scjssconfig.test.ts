/* eslint-disable no-unused-expressions */
import { resolveScJssConfig } from './resolve-scjssconfig';
import sinon from 'sinon';
import { expect } from 'chai';

describe('resolve-scjssconfig', () => {
  let consoleSpy: sinon.SinonSpy;

  beforeEach(() => {
    consoleSpy = sinon.spy(console, 'error');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should log and reject when config file not found', async () => {
    const mockConfigPath = './src/test-data/scjssconfig-notexists.json';
    const resolveInput = {
      configPath: mockConfigPath,
      configName: 'sitecore',
      assert: true,
    };

    try {
      await resolveScJssConfig(resolveInput);
      expect(true).to.be.false; // should be not reachable
    } catch (err) {
      if (err instanceof Error) {
        expect(err.toString()).to.equal('config is missing');
      }
    }
    expect(
      consoleSpy.calledWith(
        'The scjssconfig.json file was missing, and is required. Please set up your connection with `jss setup` and try again.'
      )
    ).to.be.true;
  });

  it('should reject when sitecore data not found in config', async () => {
    const mockConfigPath = './src/test-data/scjssconfig-empty.json';

    const resolveInput = {
      configPath: mockConfigPath,
      configName: 'sitecore',
      assert: true,
    };

    try {
      await resolveScJssConfig(resolveInput);
      console.log('this is fine');
    } catch (err) {
      if (err instanceof Error) {
        expect(err.toString()).to.equal('config is invalid');
      }
    }
    expect(
      consoleSpy.calledWith(
        `The scjssconfig.json did not contain the ${resolveInput.configName} configuration.`
      )
    ).to.be.true;
  });

  it('should return config', async () => {
    const mockConfigPath = './src/test-data/scjssconfig-working.json';
    const resolveInput = {
      configPath: mockConfigPath,
      configName: 'sitecore',
      assert: true,
    };

    const mockScJssConfig = require('./test-data/scjssconfig-working.json');

    const result = await resolveScJssConfig(resolveInput);

    expect(result).to.deep.equal(mockScJssConfig);
    expect(consoleSpy.called).to.be.false;
  });
});

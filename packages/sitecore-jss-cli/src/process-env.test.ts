/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import tmp from 'tmp';
import processEnv from './process-env';

interface EnvFile {
  name: string;
  value: string;
}

describe('processEnv', () => {
  let nodeEnvOriginal: string | undefined;

  const testTempEnv = (files: EnvFile[], callback: () => void) => {
    const { name, removeCallback } = tmp.dirSync({ unsafeCleanup: true });

    try {
      for (const file of files) {
        fs.writeFileSync(path.resolve(name, file.name), file.value);
      }
      processEnv(name);
      callback();
    } finally {
      removeCallback();
    }
  };

  before(() => {
    // stash if set to Test
    nodeEnvOriginal = process.env.NODE_ENV;
    delete process.env.NODE_ENV;
  });

  after(() => {
    // restore original
    process.env.NODE_ENV = nodeEnvOriginal;
  });

  beforeEach(() => {
    delete process.env.NODE_ENV;
    delete process.env.FOO;
    delete process.env.BAR;
  });

  it('should load environment values from the provided path', () => {
    const files = [{ name: '.env', value: 'FOO=foo' }];
    testTempEnv(files, () => {
      expect(process.env.FOO).to.equal('foo');
    });
  });

  it('should merge environment local values', () => {
    const files = [
      { name: '.env', value: 'FOO=foo' },
      { name: '.env.local', value: 'BAR=bar' },
    ];
    testTempEnv(files, () => {
      expect(process.env.FOO).to.equal('foo');
      expect(process.env.BAR).to.equal('bar');
    });
  });

  it('should override environment values from base file', () => {
    const files = [
      { name: '.env', value: 'FOO=foo' },
      { name: '.env.local', value: 'FOO=bar' },
    ];
    testTempEnv(files, () => {
      expect(process.env.FOO).to.equal('bar');
    });
  });

  it('should not merge environment local values when testing', () => {
    process.env.NODE_ENV = 'test';
    const files = [{ name: '.env.local', value: 'BAR=bar' }];
    testTempEnv(files, () => {
      expect(process.env.BAR).to.be.undefined;
    });
  });

  it('should merge environment values', () => {
    process.env.NODE_ENV = 'production';
    const files = [
      { name: '.env', value: 'FOO=foo' },
      { name: '.env.production', value: 'BAR=bar' },
    ];
    testTempEnv(files, () => {
      expect(process.env.FOO).to.equal('foo');
      expect(process.env.BAR).to.equal('bar');
    });
  });

  it('should merge environment local values', () => {
    process.env.NODE_ENV = 'production';
    const files = [
      { name: '.env', value: 'FOO=foo' },
      { name: '.env.production', value: 'BAR=bar' },
      { name: '.env.production.local', value: 'BAR=baz' },
    ];
    testTempEnv(files, () => {
      expect(process.env.FOO).to.equal('foo');
      expect(process.env.BAR).to.equal('baz');
    });
  });

  it('should default to development environment', () => {
    const files = [{ name: '.env.development', value: 'FOO=foo' }];
    testTempEnv(files, () => {
      expect(process.env.FOO).to.equal('foo');
    });
  });

  it('should expand variable values', () => {
    const files = [
      {
        name: '.env',
        value: `FOO=foo
BAR=\${FOO}bar`,
      },
    ];
    testTempEnv(files, () => {
      expect(process.env.FOO).to.equal('foo');
      expect(process.env.BAR).to.equal('foobar');
    });
  });
});

/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { InitializerFactory } from './InitializerFactory';

describe('InitializerFactory', () => {
  it('should create', async () => {
    const factory = new InitializerFactory('src/common/test-data');
    const initializer = await factory.create('test');

    expect(initializer).to.not.be.undefined;
    expect(initializer?.constructor.name).to.equal('TestInitializer');
  });

  it('should return undefined if not exists', async () => {
    const factory = new InitializerFactory('src/common/test-data');
    const initializer = await factory.create('nope');

    expect(initializer).to.be.undefined;
  });
});

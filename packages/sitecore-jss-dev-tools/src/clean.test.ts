// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import del from 'del';
import { clean } from './clean';
import sinon from 'sinon';
import { expect } from 'chai';

/* eslint-disable no-unused-expressions */

describe('clean', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should clean', () => {
    const path = 'c:/test';
    const mockPaths = [`${path}/index.ts`];
    const delStub = sinon.stub(del, 'sync').returns(mockPaths);

    const logSpy = sinon.spy(console, 'log');
    clean({ path: path });

    expect(delStub.called).to.be.true;
    expect(logSpy.calledWith('Cleaned:\n', mockPaths.join('\n'))).to.be.true;
  });
});

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
    const path = 'your bank account';
    const mockPaths = [
      {
        name: 'test',
        path: path,
        dirent: {
          name: 'test',
          isBlockDevice: () => false,
          isFIFO: () => false,
          isCharacterDevice: () => false,
          isDirectory: () => true,
          isFile: () => false,
          isSocket: () => false,
          isSymbolicLink: () => false,
        },
      },
    ];
    const delStub = sinon.stub(del, 'sync').returns(mockPaths);

    const logSpy = sinon.spy(console, 'log');
    clean({ path: path });

    expect(delStub.called).to.be.true;
    expect(logSpy.calledWith('Cleaned:\n', mockPaths.join('\n'))).to.be.true;
  });
});

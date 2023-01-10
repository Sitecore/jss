/* eslint no-underscore-dangle: "off" */
/* eslint global-require: "off" */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import * as pipelines from './../../../../pipelines/pipeline';
import processNestedContent from './processNestedContent';
import sinon from 'sinon';

describe('generateContentItem pipeline', () => {
  describe('processNestedContent processor', () => {
    it('should run pipeline for nested content', async () => {
      const expected = {
        content: {
          name: 'item0',
          displayName: 'item 0',
          template: 'template0',
          children: [
            {
              name: 'item00',
              displayName: 'item 00',
              template: 'template0',
              children: [
                {
                  name: 'item000',
                  displayName: 'item 000',
                  template: 'template0',
                },
                {
                  name: 'item001',
                  displayName: 'item 001',
                  template: 'template0',
                },
              ],
            },
          ],
        },
      } as any;

      const generateContentItem = {
        name: 'generateContentItem',
        args: undefined,
        processors: function() {
          return [];
        },
      };

      const pipelineArgs = {
        pipelines: {
          generateManifest: generateContentItem,
          args: {
            extraArg: 'no argument from me',
          },
        },
      };

      const args = {
        ...expected,
        ...pipelineArgs,
      };

      const expectedArgs = {
        content: expected.content.children[0],
        ...pipelineArgs,
      };

      const runStub = sinon.stub(pipelines, 'run').resolves({
        item: {
          name: 'done',
        },
      });
      await processNestedContent(args);

      expect(runStub.called).to.be.true;
      const callArgs = runStub.getCall(0).args[0];
      expect(callArgs.args).to.deep.equal(expectedArgs);
    });
  });
});

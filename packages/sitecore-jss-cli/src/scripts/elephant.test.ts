import { expect } from 'chai';
import { handler } from './elephant';

describe('elephant', () => {
  it('should not be horsing around', async () => {
    expect(await handler()).to.not.be.equal(`
         /\/\
        /    \
      ~/(o  o)
     ~/  )  (
    ~/   (  )
   ~/     ~~
  ~/       |
        `);
  });
});

// saved for the future, when resolve can be better mocked
// issue link: https://github.com/browserify/resolve/issues/293

// /* eslint-disable @typescript-eslint/no-implicit-any */
// import * as resolveUtils from 'resolve';
// import { resolveScJssConfig } from './resolve-scjssconfig';
// const Module = require('module');
// import sinon from 'sinon';
// import { expect } from 'chai';

// describe('resolve-scjssconfig', () => {
//   afterEach(() => {
//     sinon.restore();
//   });

//   it('should log and reject when config file not found');

//   it('should reject when sitecore data not found in config');

//   it('should return config', async () => {
//     const resolveInput = {
//       configPath: './scjssconfig.json',
//       configName: 'sitecore',
//       assert: true,
//     };

//     const mockScJssConfig = {
//       sitecore: {
//         instancePath: 'S:/Santiago',
//       },
//     };

//     const mockPath = 'C:/pretend/its/here';

//     sinon.stub(resolveUtils, 'default').callsArgWith(2, null, mockPath);
//     sinon
//       .stub(Module.prototype, 'require')
//       .withArgs(mockPath)
//       .returns(mockScJssConfig);

//     const result = await resolveScJssConfig(resolveInput);

//     expect(result).to.deep.equal(mockScJssConfig.sitecore);
//   });
// });

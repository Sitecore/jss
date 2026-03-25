import { createConfig } from '../../eslint-configs/flat/index.mjs';
export default createConfig(['./src/**', 'src/**'], {
  ignore: ['src/templates/**', 'src/common/test-data/**'],
});

const path = require('path');
const SassAlias = require('sass-alias');

/**
 * @param {import('next').NextConfig} nextConfig
 */
 const sassPlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
      sassOptions: {
        importer: new SassAlias({
          '@sass': path.join(__dirname, '../../../assets', 'sass'),
        }).getImporter(),
      },
    });
};

module.exports = sassPlugin;

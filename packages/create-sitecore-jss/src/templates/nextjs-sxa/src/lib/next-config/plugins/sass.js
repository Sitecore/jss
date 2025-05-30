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
          '@fontawesome': path.join(__dirname, '../../../../node_modules', 'font-awesome'),
        }).getImporter(),
        // temporary measure until new versions of bootstrap and font-awesome released
        quietDeps: true,    
        silenceDeprecations: ["import", "legacy-js-api"],
      },
    });
};

module.exports = sassPlugin;

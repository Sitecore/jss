const path = require('path');
const fs = require('fs');
const { pathToFileURL, fileURLToPath } = require('url');

/**
 * Custom Sass importer compatible with Next.js 16's Sass API
 * Implements canonicalize and load methods as required by the new Sass JS API
 */
function createAliasImporter(aliases) {
  return {
    canonicalize(url, context) {
      // Check if the URL matches any of our aliases
      for (const [alias, aliasPath] of Object.entries(aliases)) {
        if (url.startsWith(alias)) {
          // Remove the alias prefix and resolve the path
          const relativePath = url.slice(alias.length);
          // Remove leading slash if present
          const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
          const fullPath = path.resolve(aliasPath, cleanPath);
          
          // Try to find the file with common extensions
          const extensions = ['.scss', '.sass', '.css'];
          for (const ext of extensions) {
            const filePath = fullPath + ext;
            if (fs.existsSync(filePath)) {
              return pathToFileURL(filePath);
            }
          }
          
          // Try as a directory with index file
          if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
            for (const ext of extensions) {
              const indexPath = path.join(fullPath, 'index' + ext);
              if (fs.existsSync(indexPath)) {
                return pathToFileURL(indexPath);
              }
            }
          }
          
          // Try with underscore prefix (Sass partials)
          const dir = path.dirname(fullPath);
          const basename = path.basename(fullPath);
          for (const ext of extensions) {
            const partialPath = path.join(dir, '_' + basename + ext);
            if (fs.existsSync(partialPath)) {
              return pathToFileURL(partialPath);
            }
          }
          
          // Return the path even if file doesn't exist yet, let Sass handle the error
          return pathToFileURL(fullPath);
        }
      }
      
      // Return null if no alias matches, let other importers handle it
      return null;
    },
    
    load(canonicalUrl) {
      if (canonicalUrl.protocol === 'file:') {
        // Convert file:// URL back to file path
        const filePath = fileURLToPath(canonicalUrl);
        
        if (fs.existsSync(filePath)) {
          const contents = fs.readFileSync(filePath, 'utf8');
          // Determine syntax based on file extension
          const syntax = filePath.endsWith('.sass') ? 'indented' : 'scss';
          return {
            contents,
            syntax,
          };
        }
      }
      return null;
    },
  };
}

/**
 * @param {import('next').NextConfig} nextConfig
 */
const sassPlugin = (nextConfig = {}) => {
  const aliases = {
    '@sass': path.join(__dirname, '../../../assets', 'sass'),
    '@fontawesome': path.join(__dirname, '../../../../node_modules', 'font-awesome'),
  };
  
  return Object.assign({}, nextConfig, {
    sassOptions: {
      importers: [createAliasImporter(aliases)],
      // temporary measure until new versions of bootstrap and font-awesome released
      quietDeps: true,    
      silenceDeprecations: ["import", "legacy-js-api"],
    },
    webpack: (config, options) => {
      // Exclude Node.js built-in modules used by this plugin from client bundle
      if (!options.isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          path: false,
          url: false,
        };
      }
      
      // Call existing webpack config if present
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }
      
      return config;
    },
  });
};

module.exports = sassPlugin;

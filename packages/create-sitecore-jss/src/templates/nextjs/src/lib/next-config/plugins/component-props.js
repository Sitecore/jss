/**
 * @param {import('next').NextConfig} nextConfig
 */
const componentPropsPlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      
      if (!options.isServer) {
        // Add a loader to strip out getServerSideProps and getStaticProps from components in the client bundle
        config.module.rules.unshift({
          test: /src\\components\\.*\.tsx$/,
          use: ['@sitecore-jss\\sitecore-jss-dev-tools\\dist\\cjs\\templating\\nextjs\\component-props.loader.js'],
        });
      }

      // Overload the Webpack config if it was already overloaded
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

module.exports = componentPropsPlugin;

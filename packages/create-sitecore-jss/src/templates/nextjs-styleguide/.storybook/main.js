const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  staticDirs: ['./../data/media/img'],
  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        util: require.resolve('../node_modules/util/'),
        path: require.resolve('../node_modules/path-browserify/'),
      },
      alias: {
        ...config.resolve.alias,
        components: path.resolve(__dirname, '../src/components'),
        lib: path.resolve(__dirname, '../src/lib'),
        temp: path.resolve(__dirname, '../src/temp'),
        'storybook-utils': path.resolve(__dirname),
      },
    };
    config.resolve.extensions.push('.ts', '.tsx');

    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-typescript', '@babel/preset-react'] },
        },
        'graphql-let/loader',
      ],
    });

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      use: ['graphql-let/schema/loader'],
    });

    return config;
  },
};

// Following is workaround by defining process globally so that the code that accesses it doesn't fail.
// Refer to the following open issue for more info:
// https://github.com/testing-library/dom-testing-library/issues/1180

window.process = {
  env: {
    NODE_ENV: 'production',
  },
};

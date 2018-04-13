export function mockViewBag(componentName, language) {
  return {
    request: {
      url: 'http://sitecore-host/some-url',
      path: '/some-url',
      querystring: {},
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    },
  };
}

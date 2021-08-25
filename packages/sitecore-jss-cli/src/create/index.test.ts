/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import {
  applyNameToPackageJson,
  applyHostNameToSitecoreConfig,
  applyNameReplacement,
} from './index';

describe('applyNameReplacement', () => {
  it('should replace name', () => {
    const result = applyNameReplacement('this is a test.', 'test', 'passing test');
    expect(result).to.equal('this is a passing test.');
  });

  it('should replace multiple names', () => {
    const result = applyNameReplacement('this is a test. yay for testing.', 'test', 'passing test');
    expect(result).to.equal('this is a passing test. yay for passing testing.');
  });

  it('should replace multiline', () => {
    const result = applyNameReplacement(
      `
<testNode>
    <a>this is a test</a>
</testNode>
      `,
      'test',
      'passingTest'
    );
    expect(result).to.equal(
      `
<passingTestNode>
    <a>this is a passingTest</a>
</passingTestNode>
      `
    );
  });

  it('should handle special RegEx characters in replaceName', () => {
    const result = applyNameReplacement('this is a te$+.', 'te$+', 'passing test');
    expect(result).to.equal('this is a passing test.');
  });
});

describe('applyNameToPackageJson', () => {
  it('should apply name using replaceName', () => {
    const result = applyNameToPackageJson(
      {
        name: 'FooName',
        config: {
          appName: 'FooAppName',
          sitecoreDistPath: '/somewhere/dist/FooAppName',
        },
      },
      'bar',
      'FooAppName'
    );
    expect(result.name).to.equal('bar');
    expect(result.config.appName).to.equal('bar');
    expect(result.config.sitecoreDistPath).to.equal('/somewhere/dist/bar');
  });

  it('should not apply name using replaceName if no match', () => {
    const result = applyNameToPackageJson(
      {
        name: 'FooName',
        config: {
          appName: 'FooAppName',
          sitecoreDistPath: '/somewhere/dist/FooAppName',
          graphQLEndpointPath: '/somewhere/api/FooAppName',
        },
      },
      'bar',
      'BarAppName'
    );
    expect(result.name).to.equal('bar');
    expect(result.config.appName).to.equal('FooAppName');
    expect(result.config.sitecoreDistPath).to.equal('/somewhere/dist/FooAppName');
    expect(result.config.graphQLEndpointPath).to.equal('/somewhere/api/FooAppName');
  });

  it('should only apply sitecoreDistPath and graphQLEndpointPath if present', () => {
    const result = applyNameToPackageJson(
      {
        name: 'FooName',
        config: { appName: 'FooAppName' },
      },
      'bar',
      'JssTestWeb'
    );
    expect(result.config.sitecoreDistPath).to.be.undefined;
    expect(result.config.graphQLEndpointPath).to.be.undefined;
  });
});

describe('applyHostNameToSitecoreConfig', () => {
  const mockConfig = () => {
    return `
<configuration>
  <sitecore>
    <sites>
      <site patch:before="site[@name='website']"
            inherits="website"
            name="Foo"
            hostName="Foo.localhost" />
    </sites>
  </sitecore>
</configuration>
    `;
  };

  it('should apply hostName', () => {
    const config = mockConfig();
    const result = applyHostNameToSitecoreConfig(config, 'bar.localhost');
    expect(result).to.match(/<site ((.|\n|\r)*?)hostName="bar.localhost"/, 'site host name');
  });
});

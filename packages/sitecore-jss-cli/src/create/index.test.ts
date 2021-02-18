/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import {
  applyNameToPackageJson,
  applyHostNameToSitecoreConfig,
  applyNameToSitecoreConfig,
} from './index';

describe('applyNameToPackageJson', () => {
  it('should apply name using defaults', () => {
    const result = applyNameToPackageJson(
      {
        name: 'FooName',
        config: { appName: 'FooAppName', sitecoreDistPath: 'na', graphQLEndpointPath: 'na' },
      },
      'bar'
    );
    expect(result.name).to.equal('bar');
    expect(result.config.appName).to.equal('bar');
    expect(result.config.sitecoreDistPath).to.equal('/dist/bar');
    expect(result.config.graphQLEndpointPath).to.equal('/api/bar');
  });

  it('should apply name using replaceName', () => {
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
      'FooAppName'
    );
    expect(result.name).to.equal('bar');
    expect(result.config.appName).to.equal('bar');
    expect(result.config.sitecoreDistPath).to.equal('/somewhere/dist/bar');
    expect(result.config.graphQLEndpointPath).to.equal('/somewhere/api/bar');
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
      'bar'
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

describe('applyNameToSitecoreConfig', () => {
  const mockConfig = (appName: string, customPath?: string) => {
    return `
<configuration>
  <sitecore>
    <sites>
      <site patch:before="site[@name='website']"
            inherits="website"
            name="${appName}"
            rootPath="${customPath ? customPath : '/sitecore/content/'}${appName}"
            startItem="/home"
            database="master" />
    </sites>
    <javaScriptServices>
      <apps>
        <app name="${appName}"
            sitecorePath="${customPath ? customPath : '/sitecore/content/'}${appName}"
            useLanguageSpecificLayout="true"
            graphQLEndpoint="${customPath ? customPath : '/api/'}${appName}"
            inherits="defaults"
        />
      </apps>
    </javaScriptServices>
    <api>
      <GraphQL>
        <endpoints>
          <${appName}GraphQLEndpoint url="${customPath ? customPath : '/api/'}${appName}">
            <schema>
              <content>
                <templates>
                  <paths>
                    <templates>${
                      customPath ? customPath : '/sitecore/templates/Project/'
                    }${appName}</templates>
                  </paths>
                </templates>
              </content>
            </schema>
          </${appName}GraphQLEndpoint>
        </endpoints>
      </GraphQL>
    </api>
  </sitecore>
</configuration>
    `;
  };

  it('should apply name using defaults', () => {
    const config = mockConfig('FooApp', '/somewhere/else/');
    const result = applyNameToSitecoreConfig(config, 'Bar');
    expect(result).to.match(/<site ((.|\n|\r)*?)name="Bar"/, 'site name');
    expect(result).to.match(
      /<site ((.|\n|\r)*?)rootPath="\/sitecore\/content\/Bar"/,
      'site root path'
    );
    expect(result).to.match(/<app ((.|\n|\r)*?)name="Bar"/, 'app name');
    expect(result).to.match(
      /<app ((.|\n|\r)*?)sitecorePath="\/sitecore\/content\/Bar"/,
      'app sitecorePath'
    );
    expect(result).to.match(
      /<app ((.|\n|\r)*?)graphQLEndpoint="\/api\/Bar"/,
      'app graphQLEndpoint'
    );
    expect(result).to.match(
      /<BarGraphQLEndpoint ((.|\n|\r)*?)url="\/api\/Bar"/,
      'GraphQL endpoint'
    );
  });

  it('should apply name using replaceName', () => {
    const config = mockConfig('FooApp', '/somewhere/else/');
    const result = applyNameToSitecoreConfig(config, 'Bar', 'FooApp');
    expect(result).to.match(/<site ((.|\n|\r)*?)name="Bar"/, 'site name');
    expect(result).to.match(
      /<site ((.|\n|\r)*?)rootPath="\/somewhere\/else\/Bar"/,
      'site root path'
    );
    expect(result).to.match(/<app ((.|\n|\r)*?)name="Bar"/, 'app name');
    expect(result).to.match(
      /<app ((.|\n|\r)*?)sitecorePath="\/somewhere\/else\/Bar"/,
      'app sitecorePath'
    );
    expect(result).to.match(
      /<app ((.|\n|\r)*?)graphQLEndpoint="\/somewhere\/else\/Bar"/,
      'app graphQLEndpoint'
    );
    expect(result).to.match(
      /<BarGraphQLEndpoint ((.|\n|\r)*?)url="\/somewhere\/else\/Bar"/,
      'GraphQL endpoint'
    );
  });

  it('should not apply name using replaceName if no match', () => {
    const config = mockConfig('FooApp', '/somewhere/else/');
    const result = applyNameToSitecoreConfig(config, 'Bar', 'BarApp');
    expect(result).to.not.match(/<site ((.|\n|\r)*?)name="Bar"/, 'site name');
    expect(result).to.not.match(
      /<site ((.|\n|\r)*?)rootPath="\/somewhere\/else\/Bar"/,
      'site root path'
    );
    expect(result).to.not.match(/<app ((.|\n|\r)*?)name="Bar"/, 'app name');
    expect(result).to.not.match(
      /<app ((.|\n|\r)*?)sitecorePath="\/somewhere\/else\/Bar"/,
      'app sitecorePath'
    );
    expect(result).to.not.match(
      /<app ((.|\n|\r)*?)graphQLEndpoint="\/somewhere\/else\/Bar"/,
      'app graphQLEndpoint'
    );
    expect(result).to.not.match(
      /<BarGraphQLEndpoint ((.|\n|\r)*?)url="\/somewhere\/else\/Bar"/,
      'GraphQL endpoint'
    );
  });
});

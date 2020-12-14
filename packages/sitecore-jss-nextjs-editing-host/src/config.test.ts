import chai = require('chai');
import chaiString = require('chai-string');
import { config } from './config';

const expect = chai.use(chaiString).expect;

describe('config', () => {
  const publicUrl = 'http://test.com';
  const publicUrlDomain = 'test.com';

  it('should not apply if disabled', () => {
    const withEditing = config({ enabled: false });
    const nextConfig = withEditing();
    expect(nextConfig).to.not.have.property('assetPrefix');
    expect(nextConfig).to.not.have.property('distDir');
    expect(nextConfig).to.not.have.property('images');
    expect(nextConfig).to.not.have.property('publicUrl');
  });

  it('should set assetPrefix to public url', () => {
    const withEditing = config({ enabled: true, publicUrl });
    const nextConfig = withEditing();
    expect(nextConfig).to.have.property('assetPrefix').that.equal(publicUrl);
  });
  
  it('should add env.publicUrl as public url', () => {
    const withEditing = config({ enabled: true, publicUrl });
    const nextConfig = withEditing();
    expect(nextConfig).to.have.property('env').with.property('publicUrl').that.equal(publicUrl);
  });
  
  it('should override existing env.publicUrl', () => {
    const withEditing = config({ enabled: true, publicUrl });
    const nextConfig = withEditing({ env: { publicUrl: 'http://something.else' }});
    expect(nextConfig).to.have.property('env').with.property('publicUrl').that.equal(publicUrl);
  });

  it ('should set images.path using public url', () => {
    const withEditing = config({ enabled: true, publicUrl });
    const nextConfig = withEditing();
    expect(nextConfig).to.have.property('images').with.property('path').that.startsWith(publicUrl);
  });

  it ('should set images.domains using public url', () => {
    const withEditing = config({ enabled: true, publicUrl });
    const nextConfig = withEditing();
    expect(nextConfig).to.have.property('images').with.property('domains').that.contains(publicUrlDomain);
  });

  it ('should concat existing images.domains', () => {
    const withEditing = config({ enabled: true, publicUrl });
    const nextConfig = withEditing({
      images: { domains: ['foo'] }
    });
    expect(nextConfig).to.have.property('images').with.property('domains').that.contains('foo');
    expect(nextConfig).to.have.property('images').with.property('domains').that.contains(publicUrlDomain);
  });

  it('should fallback to http://localhost:3000 if public url missing', () => {
    const withEditing = config({ enabled: true });
    const nextConfig = withEditing();
    expect(nextConfig).to.have.property('assetPrefix').that.equal('http://localhost:3000');
    expect(nextConfig).to.have.property('images').with.property('path').that.startsWith('http://localhost:3000');
    expect(nextConfig).to.have.property('images').with.property('domains').that.contains('localhost');
  });

  it('should throw if public url invalid', () => {
    const withEditing = config({ enabled: true, publicUrl: 'nope' });
    expect(withEditing).to.throw();
  });

  it('should set distDir', () => {
    const withEditing = config({ enabled: true, distDir: '.build-editing' });
    const nextConfig = withEditing();
    expect(nextConfig).to.have.property('distDir').that.equal('.build-editing');
  });

  it('should throw if distDir is ".next"', () => {
    const withEditing = config({ enabled: true, distDir: '.next' });
    expect(withEditing).to.throw();
  });

  it('should set distDir to ".next" if primary distDir is different', () => {
    const withEditing = config({ enabled: true, distDir: '.next' });
    const nextConfig = withEditing({
      distDir: 'build'
    });
    expect(nextConfig).to.have.property('distDir').that.equal('.next');
  });

});

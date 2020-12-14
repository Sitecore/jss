import chai = require('chai');
import chaiString = require('chai-string');
import { AbsolutifyHtmlProcessor } from './html-processors';

const expect = chai.use(chaiString).expect;

describe('AbsolutifyHtmlProcessor', () => {

  it('adds public url to relative urls', () => {
    const publicUrl = 'http://test.local';
    const processor = new AbsolutifyHtmlProcessor(publicUrl);
    let html = `
      <html>
        <head>
          <link rel="stylesheet" href="/dist/styles.css">
        </head>
        <body>
          <a href="/path/file.pdf" />
          <img src="/logo.png" />
        </body>
      </html>
    `;

    html = processor.processHtml(html);
    
    expect(html).contains('http://test.local/dist/styles.css', 'link href');
    expect(html).contains('http://test.local/path/file.pdf', 'a href');
    expect(html).contains('http://test.local/logo.png', 'img src');
  });

  it('handles trailing slash on public url', () => {
    const publicUrl = 'http://test.local/';
    const processor = new AbsolutifyHtmlProcessor(publicUrl);
    let html = `
      <html>
        <head>
          <link rel="stylesheet" href="/dist/styles.css">
        </head>
      </html>
    `;

    html = processor.processHtml(html);
    
    expect(html).contains('http://test.local/dist/styles.css');
  });

  it('handles root relative url', () => {
    const publicUrl = 'http://test.local';
    const processor = new AbsolutifyHtmlProcessor(publicUrl);
    let html = `
      <html>
        <body>
          <a href="/">Homepage</a>
        </body>
      </html>
    `;

    html = processor.processHtml(html);
    
    expect(html).contains('<a href="http://test.local/">');
  });

  it('ignores specified paths', () => {
    const publicUrl = 'http://test.local';
    const ignoredPaths = ['/-/media/','/~/jssmedia/', '/sitecore/shell/'];
    const processor = new AbsolutifyHtmlProcessor(publicUrl, ignoredPaths);
    let html = `
      <html>
        <head>
          <link rel="stylesheet" href="/sitecore/shell/styles.css">
        </head>
        <body>
          <a href="/-/media/path/file.pdf" />
          <img src="/~/jssmedia/logo.png" />
        </body>
      </html>
    `;

    html = processor.processHtml(html);
    
    expect(html).contains('href="/sitecore/shell/styles.css"');
    expect(html).contains('href="/-/media/path/file.pdf"');
    expect(html).contains('src="/~/jssmedia/logo.png"');
  });

  it('ignores specified paths without leading slash', () => {
    const publicUrl = 'http://test.local';
    const ignoredPaths = ['-/media/','~/jssmedia/', 'sitecore/shell/'];
    const processor = new AbsolutifyHtmlProcessor(publicUrl, ignoredPaths);
    let html = `
      <html>
        <head>
          <link rel="stylesheet" href="/sitecore/shell/styles.css">
        </head>
        <body>
          <a href="/-/media/path/file.pdf" />
          <img src="/~/jssmedia/logo.png" />
        </body>
      </html>
    `;

    html = processor.processHtml(html);
    
    expect(html).contains('href="/sitecore/shell/styles.css"');
    expect(html).contains('href="/-/media/path/file.pdf"');
    expect(html).contains('src="/~/jssmedia/logo.png"');
  });
});

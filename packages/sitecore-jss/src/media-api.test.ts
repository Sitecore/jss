/* eslint-disable no-unused-expressions */

// what is `import x = require('x');`? great question: https://github.com/Microsoft/TypeScript/issues/5073
import chai = require('chai');
import chaiString = require('chai-string');
import URL = require('url-parse');
import { findEditorImageTag, getSrcSet, updateImageUrl, getRequiredParams } from './media-api';

// chai.should();
const expect = chai.use(chaiString).expect;

describe('findEditorImageTag', () => {
  it('should find, parse, and return an img tag from EE rendered Image field', () => {
    /* eslint-disable no-useless-escape */
    const editableField =
      '<input id=\'fld_0FDED3F7211E48A18A466E7F2C95C40E_9DDD62F9D0B1456A8F0ED80B66C98A03_en_1_27eee2bb989840b78cc3e5f5dc81c558_49\' class=\'scFieldValue\' name=\'fld_0FDED3F7211E48A18A466E7F2C95C40E_9DDD62F9D0B1456A8F0ED80B66C98A03_en_1_27eee2bb989840b78cc3e5f5dc81c558_49\' type=\'hidden\' value="&lt;image mediaid=&quot;{49C5EC6F-97CE-4D69-A303-BFBED4768ED2}&quot; /&gt;" /><code id="fld_0FDED3F7211E48A18A466E7F2C95C40E_9DDD62F9D0B1456A8F0ED80B66C98A03_en_1_27eee2bb989840b78cc3e5f5dc81c558_49_edit" type="text/sitecore" chromeType="field" scFieldType="image" class="scpm" kind="open">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit:chooseimage\\"})","header":"Choose Image","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2.png","disabledIcon":"/temp/photo_landscape2_disabled16x16.png","isDivider":false,"tooltip":"Choose an image.","type":""},{"click":"chrome:field:editcontrol({command:\\"webedit:editimage\\"})","header":"Properties","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_edit.png","disabledIcon":"/temp/photo_landscape2_edit_disabled16x16.png","isDivider":false,"tooltip":"Modify image appearance.","type":""},{"click":"chrome:field:editcontrol({command:\\"webedit:clearimage\\"})","header":"Clear","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_delete.png","disabledIcon":"/temp/photo_landscape2_delete_disabled16x16.png","isDivider":false,"tooltip":"Remove the image.","type":""},{"click":"chrome:common:edititem({command:\\"webedit:open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit:personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"}],"contextItemUri":"sitecore://master/{0FDED3F7-211E-48A1-8A46-6E7F2C95C40E}?lang=en&ver=1","custom":{},"displayName":"Image","expandedDisplayName":null}</code><img src="http://jssadvancedapp/sitecore/shell/-/media/JssAdvancedApp/assets/img/portfolio/1.ashx?h=350&amp;la=en&amp;w=650&amp;hash=CC5043DC03C6C27F40EDB08CF84AB8670C05D63D" alt="" width="650" height="350" /><code class="scpm" type="text/sitecore" chromeType="field" kind="close"></code>';
    const imgTag =
      '<img src="http://jssadvancedapp/sitecore/shell/-/media/JssAdvancedApp/assets/img/portfolio/1.ashx?h=350&amp;la=en&amp;w=650&amp;hash=CC5043DC03C6C27F40EDB08CF84AB8670C05D63D" alt="" width="650" height="350" />';
    /* eslint-enable no-useless-escape */

    const imgMatch = findEditorImageTag(editableField);

    expect(imgMatch).to.not.be.undefined;

    expect(imgMatch?.imgTag).to.equal(imgTag);
    expect(imgMatch && Object.keys(imgMatch.attrs).length).to.equal(4);
    expect(imgMatch?.attrs.width).to.equal('650');
    expect(imgMatch?.attrs.height).to.equal('350');
    expect(imgMatch?.attrs.alt).to.be.empty; // eslint-disable-line no-unused-expressions
    expect(imgMatch?.attrs.src).to.startsWith('http://jssadvancedapp');
    expect(imgMatch?.attrs.src).to.endsWith('CC5043DC03C6C27F40EDB08CF84AB8670C05D63D');
    expect(imgMatch?.attrs.src).to.not.contain('&amp;');
  });

  it('should decode html entities', () => {
    const editableField = '<input><code><img lorem="&amp;&gt;&lt;" /></code></input>';
    const imgMatch = findEditorImageTag(editableField);
    expect(imgMatch?.attrs.lorem).to.equal('&><');
  });
});

describe('getRequiredParams', () => {
  it('should return required query string params', () => {
    const parsedQs = {
      rev: '11',
      db: '22',
      xxx: 'ppp',
      la: '33',
      vs: '44',
      ts: '55',
      yyy: 'vvv',
    };

    const params = getRequiredParams(parsedQs);

    expect(params).to.deep.equal({
      rev: '11',
      db: '22',
      la: '33',
      vs: '44',
      ts: '55',
    });
  });
});

describe('updateImageUrl', () => {
  it('should return original if no params', () => {
    const original =
      'http://sitecore/-/media/lorem/ipsum.jpg?h=1&w=2&hash=CC5043DC03C6C27F40EDB08CF84AB8670C05D63D';
    const updated = updateImageUrl(original);
    expect(updated).to.equal(original);
  });

  it('should override parameters with those provided', () => {
    const original = 'http://sitecore/-/media/lorem.png?mh=3&mw=4';
    const updated = updateImageUrl(original, { mh: '5', mw: '6' });
    const url = URL(updated, true);
    expect(url.query.mh).to.equal('5');
    expect(url.query.mw).to.equal('6');
  });

  it('should remove non-required query parameters not provided', () => {
    const original =
      'http://sitecore/-/media/lorem.png?h=1&w=2&mh=3&mw=4&hash=CC5043DC03C6C27F40EDB08CF84AB8670C05D63D';
    const updated = updateImageUrl(original, { mh: '5', mw: '6' });
    const url = URL(updated, true);
    expect(url.query.mh).to.equal('5');
    expect(url.query.mw).to.equal('6');
    expect(url.query.h).to.be.undefined;
    expect(url.query.w).to.be.undefined;
    expect(url.query.hash).to.be.undefined;
  });

  it('should preserve required query parameters', () => {
    const original =
      'http://sitecore/-/media/lorem.png?rev=100&db=master&la=en&vs=200&ts=foo&mh=3&mw=4';
    const updated = updateImageUrl(original, { mh: '5', mw: '6' });
    const url = URL(updated, true);
    expect(url.query.mh).to.equal('5');
    expect(url.query.mw).to.equal('6');
    expect(url.query.rev).to.equal('100');
    expect(url.query.db).to.equal('master');
    expect(url.query.la).to.equal('en');
    expect(url.query.vs).to.equal('200');
    expect(url.query.ts).to.equal('foo');
  });

  it('should replace /-/media/ with /-/jssmedia/', () => {
    const original = 'http://sitecore/-/media/lorem/ipsum.jpg';
    const updated = updateImageUrl(original, {});
    const url = URL(updated);
    expect(url.pathname).to.startsWith('/-/jssmedia/');
  });

  it('should replace /~/media/ with /~/jssmedia/', () => {
    const original = 'http://sitecore/~/media/lorem/ipsum.jpg';
    const updated = updateImageUrl(original, {});
    const url = URL(updated);
    expect(url.pathname).to.startsWith('/~/jssmedia/');
  });

  describe('should replace url using custom mediaUrlPrefix', () => {
    it('should replace /-assets/ with /-/jssmedia', () => {
      const original = 'http://sitecore/-assets/lorem/ipsum.jpg';
      const mediaUrlPrefix = /\/([-~]{1})assets\//i;
      const updated = updateImageUrl(original, {}, mediaUrlPrefix);
      const url = URL(updated);
      expect(url.pathname).to.startsWith('/-/jssmedia/');
    });

    it('should replace /~assets/ with /~/jssmedia', () => {
      const original = 'http://sitecore/~assets/lorem/ipsum.jpg';
      const mediaUrlPrefix = /\/([-~]{1})assets\//i;
      const updated = updateImageUrl(original, {}, mediaUrlPrefix);
      const url = URL(updated);
      expect(url.pathname).to.startsWith('/~/jssmedia/');
    });

    it('should replace /-/assets/ with /-/jssmedia/', () => {
      const original = 'http://sitecore/-/assets/lorem/ipsum.jpg';
      const mediaUrlPrefix = /\/([-~]{1})\/assets\//i;
      const updated = updateImageUrl(original, {}, mediaUrlPrefix);
      const url = URL(updated);
      expect(url.pathname).to.startsWith('/-/jssmedia/');
    });

    it('should replace /~/assets/ with /~/jssmedia/', () => {
      const original = 'http://sitecore/~/assets/lorem/ipsum.jpg';
      const mediaUrlPrefix = /\/([-~]{1})\/assets\//i;
      const updated = updateImageUrl(original, {}, mediaUrlPrefix);
      const url = URL(updated);
      expect(url.pathname).to.startsWith('/~/jssmedia/');
    });
  });

  it('should merge querystring and params', () => {
    const src =
      '/media/lorem/ipsum.jpg?x=valueX&y=value111&rev=109010&db=333&la=444&vs=555&ts=666&unknownParam=54321';
    const params = { y: 'valueY', z: 'valueZ' };
    const parsed = updateImageUrl(src, params);
    const url = URL(parsed, {}, true);

    expect(url.toString()).equal(
      '/media/lorem/ipsum.jpg?y=valueY&z=valueZ&rev=109010&db=333&la=444&vs=555&ts=666'
    );
    expect(url.query).deep.equal({
      y: 'valueY',
      z: 'valueZ',
      rev: '109010',
      db: '333',
      la: '444',
      vs: '555',
      ts: '666',
    });
  });
});

describe('getSrcSet', () => {
  it('should create a srcset for all provided widths', () => {
    const original = '/ipsum.jpg';
    const expected =
      '/ipsum.jpg?h=1000&w=1000 1000w, /ipsum.jpg?h=500&w=500 500w, /ipsum.jpg?mh=250&mw=250 250w';
    const params = [
      { h: '1000', w: '1000' },
      { h: '500', w: '500' },
      { mh: '250', mw: '250' },
      { h: '100' },
    ];
    const srcSet = getSrcSet(original, params);
    expect(srcSet).to.equal(expected);
  });

  it('should combine default and srcset parameters', () => {
    const original = '/ipsum.jpg';
    const expected = '/ipsum.jpg?as=1&w=1000 1000w, /ipsum.jpg?as=1&w=500 500w';
    const params = [{ w: '1000' }, { w: '500' }];
    const srcSet = getSrcSet(original, params, { as: '1', w: '9999' });
    expect(srcSet).to.equal(expected);
  });

  describe('should replace url using custom mediaUrlPrefix', () => {
    const params = [{ w: '1000' }, { w: '500' }];

    it('should replace /-assets/ with /-/jssmedia', () => {
      const original = '/-assets/lorem/ipsum.jpg';
      const expected =
        '/-/jssmedia/lorem/ipsum.jpg?w=1000 1000w, /-/jssmedia/lorem/ipsum.jpg?w=500 500w';
      const mediaUrlPrefix = /\/([-~]{1})assets\//i;
      const srcSet = getSrcSet(original, params, undefined, mediaUrlPrefix);
      expect(srcSet).to.equal(expected);
    });

    it('should replace /~assets/ with /~/jssmedia', () => {
      const original = '/~assets/lorem/ipsum.jpg';
      const expected =
        '/~/jssmedia/lorem/ipsum.jpg?w=1000 1000w, /~/jssmedia/lorem/ipsum.jpg?w=500 500w';
      const mediaUrlPrefix = /\/([-~]{1})assets\//i;
      const srcSet = getSrcSet(original, params, undefined, mediaUrlPrefix);
      expect(srcSet).to.equal(expected);
    });

    it('should replace /-/assets/ with /-/jssmedia/', () => {
      const original = '/-/assets/lorem/ipsum.jpg';
      const expected =
        '/-/jssmedia/lorem/ipsum.jpg?w=1000 1000w, /-/jssmedia/lorem/ipsum.jpg?w=500 500w';
      const mediaUrlPrefix = /\/([-~]{1})\/assets\//i;
      const srcSet = getSrcSet(original, params, undefined, mediaUrlPrefix);
      expect(srcSet).to.equal(expected);
    });

    it('should replace /~/assets/ with /~/jssmedia/', () => {
      const original = '/~/assets/lorem/ipsum.jpg';
      const expected =
        '/~/jssmedia/lorem/ipsum.jpg?w=1000 1000w, /~/jssmedia/lorem/ipsum.jpg?w=500 500w';
      const mediaUrlPrefix = /\/([-~]{1})\/assets\//i;
      const srcSet = getSrcSet(original, params, undefined, mediaUrlPrefix);
      expect(srcSet).to.equal(expected);
    });
  });
});

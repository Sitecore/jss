import { expect } from 'chai';
import { replaceTokens, replaceTokensInObject, PERSONALIZE_TOKENS_HEADER } from './token-replace';

describe('token-replace', () => {
  describe('PERSONALIZE_TOKENS_HEADER', () => {
    it('should equal x-sc-personalize-tokens', () => {
      expect(PERSONALIZE_TOKENS_HEADER).to.equal('x-sc-personalize-tokens');
    });
  });

  describe('replaceTokens', () => {
    it('should replace a single token', () => {
      expect(replaceTokens('Hello {{firstName}}', { firstName: 'Bob' })).to.equal('Hello Bob');
    });

    it('should replace multiple tokens in one string', () => {
      const result = replaceTokens('{{greeting}}, {{firstName}}! You live in {{city}}.', {
        greeting: 'Hello',
        firstName: 'Bob',
        city: 'Portland',
      });
      expect(result).to.equal('Hello, Bob! You live in Portland.');
    });

    it('should return input unchanged when no token syntax in string', () => {
      expect(replaceTokens('No tokens here', { firstName: 'Bob' })).to.equal('No tokens here');
    });

    it('should return input unchanged when tokens map is empty', () => {
      expect(replaceTokens('Hello {{firstName}}', {})).to.equal('Hello {{firstName}}');
    });

    it('should handle adjacent tokens with no separator', () => {
      expect(replaceTokens('{{a}}{{b}}', { a: 'foo', b: 'bar' })).to.equal('foobar');
    });

    it('should trim whitespace in token keys', () => {
      expect(replaceTokens('Hello {{ firstName }}', { firstName: 'Bob' })).to.equal('Hello Bob');
    });

    it('should use fallback when token key is missing from map', () => {
      expect(replaceTokens('Hello {{firstName|Valued Customer}}', {})).to.equal(
        'Hello Valued Customer'
      );
    });

    it('should use fallback when token value is empty string', () => {
      expect(replaceTokens('Hello {{firstName|Valued Customer}}', { firstName: '' })).to.equal(
        'Hello Valued Customer'
      );
    });

    it('should use token value over fallback when token is present', () => {
      expect(replaceTokens('Hello {{firstName|Valued Customer}}', { firstName: 'Bob' })).to.equal(
        'Hello Bob'
      );
    });

    it('should use empty string for empty fallback', () => {
      expect(replaceTokens('Hello {{firstName|}}', {})).to.equal('Hello ');
    });

    it('should preserve leading and trailing whitespace in fallback values', () => {
      expect(replaceTokens('Note: {{msg|No results found. }}', {})).to.equal(
        'Note: No results found. '
      );
    });

    it('should leave unmatched tokens as-is by default', () => {
      expect(replaceTokens('Hello {{unknown}}', {})).to.equal('Hello {{unknown}}');
    });

    it('should remove unmatched tokens when removeUnmatched is true', () => {
      expect(replaceTokens('Hello {{unknown}}!', {}, { removeUnmatched: true })).to.equal(
        'Hello !'
      );
    });

    it('should invoke onUnmatched callback for each unresolved token key', () => {
      const unmatched: string[] = [];
      const result = replaceTokens(
        'Hello {{firstName}}, you are in {{city}} and your rank is {{rank|Bronze}}.',
        { firstName: 'Bob' },
        { removeUnmatched: true, onUnmatched: (key) => unmatched.push(key) }
      );
      // firstName resolves → no callback. city is unmatched (no fallback) → callback.
      // rank has a fallback → resolved via fallback, NOT unmatched → no callback.
      expect(result).to.equal('Hello Bob, you are in  and your rank is Bronze.');
      expect(unmatched).to.deep.equal(['city']);
    });

    it('should not invoke onUnmatched for tokens that resolve via fallback', () => {
      const unmatched: string[] = [];
      replaceTokens('{{key|default}}', {}, { onUnmatched: (k) => unmatched.push(k) });
      expect(unmatched).to.have.length(0);
    });

    it('should invoke onUnmatched even when removeUnmatched is false (leave-as-is)', () => {
      const unmatched: string[] = [];
      const result = replaceTokens(
        'Hello {{unknown}}',
        {},
        { removeUnmatched: false, onUnmatched: (k) => unmatched.push(k) }
      );
      expect(result).to.equal('Hello {{unknown}}'); // kept as-is per policy
      expect(unmatched).to.deep.equal(['unknown']); // but callback still fires
    });

    it('should replace tokens in URL paths', () => {
      const result = replaceTokens('/products/{{category}}/{{productId}}', {
        category: 'shoes',
        productId: '42',
      });
      expect(result).to.equal('/products/shoes/42');
    });

    it('should replace tokens in HTML attribute values', () => {
      const result = replaceTokens('<a href="/profile/{{userId}}" class="{{cssClass}}">', {
        userId: '99',
        cssClass: 'active',
      });
      expect(result).to.equal('<a href="/profile/99" class="active">');
    });

    it('should replace tokens in rich text HTML content', () => {
      const result = replaceTokens(
        '<p>Welcome back, <strong>{{firstName}}</strong>! Your city is {{city}}.</p>',
        { firstName: 'Bob', city: 'Portland' }
      );
      expect(result).to.equal('<p>Welcome back, <strong>Bob</strong>! Your city is Portland.</p>');
    });

    it('should handle token values containing special regex chars like $10.00 (USD)', () => {
      expect(replaceTokens('Price: {{amount}}', { amount: '$10.00 (USD)' })).to.equal(
        'Price: $10.00 (USD)'
      );
    });

    it('should return empty string for empty input', () => {
      expect(replaceTokens('', { firstName: 'Bob' })).to.equal('');
    });
  });

  describe('replaceTokensInObject', () => {
    it('should replace tokens in flat object string values', () => {
      const obj = { heading: { value: 'Hi {{name}}' } };
      const result = replaceTokensInObject(obj, { name: 'Alice' });
      expect(result).to.deep.equal({ heading: { value: 'Hi Alice' } });
    });

    it('should replace tokens in deeply nested objects (4 levels)', () => {
      const obj = { a: { b: { c: { d: '{{token}}' } } } };
      const result = replaceTokensInObject(obj, { token: 'deep' });
      expect(result).to.deep.equal({ a: { b: { c: { d: 'deep' } } } });
    });

    it('should replace tokens in array elements', () => {
      const obj = { items: ['Hello {{a}}', '{{b}} world'] };
      const result = replaceTokensInObject(obj, { a: 'foo', b: 'bar' });
      expect(result).to.deep.equal({ items: ['Hello foo', 'bar world'] });
    });

    it('should pass through non-string primitives unchanged', () => {
      const obj = { count: 42, active: true, nothing: null };
      const result = replaceTokensInObject(obj, { count: 'ignored' });
      expect(result).to.deep.equal({ count: 42, active: true, nothing: null });
    });

    it('should not mutate the original object', () => {
      const orig = { f: { value: '{{x}}' } };
      replaceTokensInObject(orig, { x: 'replaced' });
      expect(orig.f.value).to.equal('{{x}}');
    });

    it('should propagate options through nested object traversal', () => {
      const unmatched: string[] = [];
      const obj = { level1: { level2: { value: 'Hello {{name}}, your code is {{code}}' } } };
      const result = replaceTokensInObject(
        obj,
        { name: 'Bob' },
        {
          removeUnmatched: true,
          onUnmatched: (k) => unmatched.push(k),
        }
      );
      expect(result).to.deep.equal({ level1: { level2: { value: 'Hello Bob, your code is ' } } });
      expect(unmatched).to.deep.equal(['code']);
    });

    it('should handle empty object', () => {
      expect(replaceTokensInObject({}, { token: 'value' })).to.deep.equal({});
    });

    it('should handle null input', () => {
      expect(replaceTokensInObject(null, { token: 'value' })).to.equal(null);
    });

    it('should handle undefined input', () => {
      expect(replaceTokensInObject(undefined, { token: 'value' })).to.equal(undefined);
    });

    it('should handle realistic LayoutServiceData-shaped fields with fallbacks', () => {
      const fields = {
        content: { value: 'Welcome, {{firstName|Valued Customer}}! You are in {{city}}.' },
        heading: { value: '{{pageTitle|Our Store}}' },
        image: { src: '{{imageUrl}}', alt: '{{imageAlt|product image}}' },
      };
      const result = replaceTokensInObject(fields, { firstName: 'Bob', city: 'Portland' });
      expect(result).to.deep.equal({
        content: { value: 'Welcome, Bob! You are in Portland.' },
        heading: { value: 'Our Store' },
        image: { src: '{{imageUrl}}', alt: 'product image' },
      });
    });

    it('should not be exploitable by __proto__ key in input (prototype pollution guard)', () => {
      // JSON.parse creates __proto__ as a real own property, not via the setter.
      const malicious = JSON.parse('{"__proto__":{"polluted":true},"title":"{{token}}"}');
      const result = replaceTokensInObject(malicious, { token: 'safe' });
      // The __proto__ key must be silently dropped — not present as an own property.
      expect(Object.prototype.hasOwnProperty.call(result, '__proto__')).to.be.false;
      // The result must not inherit any pollution from the malicious input.
      expect((result as Record<string, unknown>).polluted).to.be.undefined;
      // The title field must still be processed normally.
      expect((result as Record<string, unknown>).title).to.equal('safe');
      // Verify Object.prototype itself was not mutated globally.
      expect(({} as Record<string, unknown>).polluted).to.be.undefined;
    });

    it('should handle unclosed {{ token with many trailing spaces without hanging (ReDoS guard)', () => {
      // Previously the \s*[^{}|]+?\s* pattern caused O(N^2) backtracking
      // on all-whitespace input; this must complete in milliseconds.
      const input = '{{ ' + ' '.repeat(500);
      const start = Date.now();
      const result = replaceTokens(input, {});
      const elapsed = Date.now() - start;
      expect(result).to.equal(input); // no match, returned as-is
      expect(elapsed).to.be.lessThan(50); // must not regress to O(N^2)
    });
  });
});

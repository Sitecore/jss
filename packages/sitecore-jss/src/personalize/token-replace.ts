/**
 * Header name used to pass base64-encoded personalization tokens from the
 * Next.js edge middleware to page-props plugins.
 */
export const PERSONALIZE_TOKENS_HEADER = 'x-sc-personalize-tokens';

/**
 * Map of token keys to their replacement string values, as returned by the
 * Sitecore Personalize decision-table response.
 * @example { firstName: 'Bob', city: 'Portland' }
 */
export type TokenMap = Record<string, string>;

/**
 * Options for token replacement functions.
 */
export type ReplaceTokensOptions = {
  /**
   * When `true`, any placeholder that has no matching token and no fallback is
   * removed from the output string entirely.  When `false` or omitted, unmatched
   * placeholders are left as-is (default behaviour).
   */
  removeUnmatched?: boolean;
  /**
   * Optional callback invoked for every token key that could not be resolved
   * (i.e. not present in the token map and has no fallback defined).
   * Useful for debug logging without coupling the utility to a specific logger.
   * @example
   * replaceTokensInObject(layout, tokens, {
   *   removeUnmatched: true,
   *   onUnmatched: (key) => debug.personalize('unmatched token: %s', key),
   * });
   */
  onUnmatched?: (key: string) => void;
};

/**
 * Regex that matches {{key}} and {{key|fallback}} mustache-style tokens.
 *
 * Intentionally omits \s* groups inside the pattern to avoid polynomial
 * backtracking when the engine encounters an unclosed `{{` with many
 * whitespace characters (O(N²) with the original \s*[^{}|]+?\s* form).
 * Whitespace trimming is performed in the replacer callback instead.
 */
const TOKEN_REGEX = /\{\{([^{}|]+?)(?:\|([^{}]*))?\}\}/g;

/**
 * Replace `{{key}}` and `{{key|fallback}}` tokens in a string with values from a
 * {@link TokenMap}.
 *
 * Resolution order for each placeholder:
 * 1. If `tokens[key]` is a non-empty string, use it.
 * 2. If the placeholder includes a fallback (even `{{key|}}`), use the fallback as-is.
 * 3. Otherwise leave the placeholder as-is, or remove it when
 * `options.removeUnmatched` is `true`.
 *
 * Note: Token **keys** are whitespace-trimmed so `{{ firstName }}` matches the key
 * `firstName`.  Fallback values are **not** trimmed — `{{key|No results. }}` preserves
 * the trailing space.
 *
 * Values that contain `$` or `\` are always safe because a function-based
 * replacer is used instead of a string replacement pattern.
 * @param {string} input The string that may contain `{{token}}` placeholders.
 * @param {TokenMap} tokens Map of token keys to replacement values.
 * @param {ReplaceTokensOptions} [options] Optional replacement behaviour flags.
 * @returns {string} The string with all matched tokens substituted.
 */
export function replaceTokens(
  input: string,
  tokens: TokenMap,
  options?: ReplaceTokensOptions
): string {
  if (!input) return input;

  return input.replace(TOKEN_REGEX, (_match, rawKey: string, rawFallback: string | undefined) => {
    // Trim key only — fallback is literal content and must not be modified.
    // This allows intentional leading/trailing whitespace in fallback values
    // such as {{key|No results found. }} preserving the trailing space.
    const key = rawKey.trim();
    const fallback = rawFallback;
    const value = tokens[key];
    if (value !== undefined && value !== '') {
      return value;
    }
    if (fallback !== undefined) {
      return fallback;
    }
    // Token has no value and no fallback — notify the caller, then apply policy.
    options?.onUnmatched?.(key);
    return options?.removeUnmatched ? '' : _match;
  });
}

/**
 * Recursively walk an object and call {@link replaceTokens} on every string
 * value, returning a new object without mutating the original.
 *
 * Handled value types:
 * - `null` / `undefined` — returned as-is.
 * - `string` — passed through {@link replaceTokens}.
 * - `Array` — each element is processed recursively.
 * - Plain `object` — each property value is processed recursively.
 * - Any other primitive (`number`, `boolean`, etc.) — passed through unchanged.
 * @template T The type of the input value.
 * @param {T} obj The value to process.
 * @param {TokenMap} tokens Map of token keys to replacement values.
 * @param {ReplaceTokensOptions} [options] Optional replacement behaviour flags.
 * @returns {T} A new value of the same shape with all string tokens replaced.
 */
export function replaceTokensInObject<T>(
  obj: T,
  tokens: TokenMap,
  options?: ReplaceTokensOptions
): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    return (replaceTokens(obj, tokens, options) as unknown) as T;
  }

  if (Array.isArray(obj)) {
    return (obj.map((item: unknown) =>
      replaceTokensInObject(item, tokens, options)
    ) as unknown) as T;
  }

  if (typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(obj as Record<string, unknown>)) {
      // Guard against prototype pollution: skip keys that invoke the __proto__
      // setter or shadow Object/Function built-ins.
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
      result[key] = replaceTokensInObject((obj as Record<string, unknown>)[key], tokens, options);
    }
    return (result as unknown) as T;
  }

  return obj;
}

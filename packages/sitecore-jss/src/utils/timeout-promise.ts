/**
 * A helper to assign timeouts to fetch or other promises
 * Useful in nextjs middleware until fetch.signal is fully supported by Vercel edge functions
 */
export default class TimeoutPromise {
  timeoutId: NodeJS.Timeout | undefined;

  constructor(private timeout: number | undefined) {
    this.timeoutId = undefined;
  }

  /**
   * Creates a timeout promise
   */
  get start(): Promise<unknown> {
    return new Promise((_, reject) => {
      this.timeoutId = setTimeout(() => {
        const abortError = new Error('Request timed out');
        abortError.name = 'AbortError';
        reject(abortError);
      }, this.timeout);
    });
  }

  /**
   * Clears the timeout from timeout promise
   */
  clear() {
    this.timeoutId && clearTimeout(this.timeoutId);
  }
}

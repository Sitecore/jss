/**
 * A helper to assign timeouts to fetch or other promises
 * Useful in nextjs middleware until fetch.signal is fully supported by Vercel edge functions
 */
export default class TimeoutPromise {
  timeoutID: NodeJS.Timeout | undefined;
  
  constructor(private timeout: number | undefined) {
    this.timeoutID = undefined;
  }

  /**
   * Creates a timeout promise
   */
  get start(): Promise<any> {
    if (this.timeout) {
      return new Promise((_, reject) => {
        this.timeoutID = setTimeout(() => {
          const abortError = new Error('Request timed out');
          abortError.name = 'AbortError';
          reject(abortError);
        }, this.timeout);
      });
    }
    return new Promise((_, reject) => reject('Timeout promise created with no timeout value'));
  }

  /**
   * Clears the timeout from timeout promise
   */
  clear() {
    this.timeoutID && clearTimeout(this.timeoutID);
  }
}

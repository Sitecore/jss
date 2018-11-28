export interface RenderResponse {
  /**
   * The rendered HTML to return to the client
   */
  html: string;
  /**
   * Set the HTTP status code. If not set, the status code returned from Layout Service is returned.
   */
  status?: number;
  /**
   * Sets a redirect URL, causing the reply to send a HTTP redirect instead of the HTML content.
   * Note: when using this you must set the status code to 301 or 302.
   */
  redirect?: string;
}

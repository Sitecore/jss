import { type NextRequest } from 'next/server';

/**
 * Handler for use in healthcheck Next.js Route Handler (e.g. '/api/healthz').
 */
export class HealthcheckHandler {
  /**
   * Gets the Next.js API route handler
   * @returns route handler
   */
  public getHandler() {
    return this.handler;
  }

  private handler = async (_req: NextRequest) => {
    return new Response('Healthy', {
      status: 200
    })
  };
}

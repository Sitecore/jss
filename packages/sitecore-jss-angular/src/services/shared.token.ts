import { InjectionToken } from '@angular/core';

/**
 * Shape of the Sitecore Edge configuration.
 */
export type EdgeConfigToken = {
  sitecoreEdgeUrl?: string;
  sitecoreEdgeContextId: string;
};

/**
 * Injection token for the Sitecore Edge configuration.
 */
export const EDGE_CONFIG = new InjectionToken<EdgeConfigToken>('Sc.edgeConfig');

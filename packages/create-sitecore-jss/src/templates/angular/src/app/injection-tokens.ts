import { InjectionToken } from '@angular/core';
import { JssState } from './JssState';

/**
 * Injection token for server-side layout data provided by server.bundle
 */
export const JSS_SERVER_LAYOUT_DATA = new InjectionToken<JssState>('JSS_SERVER_LAYOUT_DATA');


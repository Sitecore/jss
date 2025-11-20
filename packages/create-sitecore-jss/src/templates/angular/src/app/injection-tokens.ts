import { InjectionToken } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { JssState } from './JssState';
import { ViewBag } from './ViewBag';

/**
 * Injection token for server-side layout data provided by server.bundle
 */
export const JSS_SERVER_LAYOUT_DATA = new InjectionToken<JssState>('JSS_SERVER_LAYOUT_DATA');

export const JSS_SERVER_VIEWBAG = new InjectionToken<ViewBag>('JSS_SERVER_VIEWBAG');

export const APOLLO_CACHE = new InjectionToken<InMemoryCache>('APOLLO_CACHE');
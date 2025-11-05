import { InjectionToken } from '@angular/core';

export interface ViewBag {
    [key: string]: unknown;
    dictionary: { [key: string]: string };
}

export const JSS_SERVER_VIEWBAG = new InjectionToken<ViewBag>('JSS_SERVER_VIEWBAG');
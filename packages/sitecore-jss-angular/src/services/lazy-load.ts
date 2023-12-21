import { ModuleWithProviders, Type } from '@angular/core';
import { JssModule } from '../lib.module';
import { DYNAMIC_COMPONENT } from '../public_api';

export interface ComponentMap {
  [key: string]: Type<unknown>;
}

/**
 * @param {ComponentMap} componentMap
 *
 * ### Example
 *
 * ```javascript
 * @NgModule({
 *  imports: [
 *      provideLazyLoad({
 *          HeroBanner: HeroBannerComponent,
 *      }),
 *  ],
 * })
 * export class BannersLazyModule {}
 * ```
 */
export function provideLazyLoad(componentMap: ComponentMap): ModuleWithProviders<JssModule> {
  return {
    ngModule: JssModule,
    providers: [
      {
        provide: DYNAMIC_COMPONENT,
        useValue: componentMap,
      },
    ],
  };
}

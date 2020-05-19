import { CommonModule, DatePipe } from '@angular/common';
import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Injector,
  ModuleWithProviders,
  NgModule,
  Type,
} from '@angular/core';
import { ActivatedRoute, Router, ROUTES } from '@angular/router';
import { dataResolverFactory } from './components/data-resolver-factory';
import { DateDirective } from './components/date.directive';
import { FileDirective } from './components/file.directive';
import { GenericLinkDirective } from './components/generic-link.directive';
import { guardResolverFactory } from './components/guard-resolver-factory';
import { ImageDirective } from './components/image.directive';
import { LinkDirective } from './components/link.directive';
import { MissingComponentComponent } from './components/missing-component.component';
import { PlaceholderLoadingDirective } from './components/placeholder-loading.directive';
import { PlaceholderComponent } from './components/placeholder.component';
import {
  ComponentNameAndModule,
  ComponentNameAndType,
  DATA_RESOLVER,
  DYNAMIC_COMPONENT,
  GUARD_RESOLVER,
  PLACEHOLDER_COMPONENTS,
  PLACEHOLDER_LAZY_COMPONENTS,
  PLACEHOLDER_MISSING_COMPONENT_COMPONENT,
} from './components/placeholder.token';
import { RawComponent } from './components/raw.component';
import { RenderComponentComponent } from './components/render-component.component';
import { RenderEachDirective } from './components/render-each.directive';
import { RenderEmptyDirective } from './components/render-empty.directive';
import { RichTextDirective } from './components/rich-text.directive';
import { RouterLinkDirective } from './components/router-link.directive';
import { TextDirective } from './components/text.directive';
import { JssComponentFactoryService } from './jss-component-factory.service';
import { LayoutService } from './layout.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FileDirective,
    ImageDirective,
    LinkDirective,
    RouterLinkDirective,
    GenericLinkDirective,
    DateDirective,
    RenderEachDirective,
    RenderEmptyDirective,
    PlaceholderLoadingDirective,
    RenderComponentComponent,
    PlaceholderComponent,
    RawComponent,
    RichTextDirective,
    TextDirective,
    MissingComponentComponent,
  ],
  exports: [
    FileDirective,
    ImageDirective,
    DateDirective,
    LinkDirective,
    RouterLinkDirective,
    GenericLinkDirective,
    RenderEachDirective,
    RenderEmptyDirective,
    RenderComponentComponent,
    PlaceholderComponent,
    PlaceholderLoadingDirective,
    RichTextDirective,
    TextDirective,
  ],
  entryComponents: [	
    RawComponent,	
    MissingComponentComponent,	
  ],
})
export class JssModule {
  /**
   * Instantiates the JSS module with no component factory.
   * Useful for using it from libraries. Most of the time you'd want withComponents()
   */
  static forRoot(): ModuleWithProviders<JssModule> {
    return {
      ngModule: JssModule,
      providers: [
        LayoutService,
        DatePipe,
        JssComponentFactoryService,
        {
          provide: GUARD_RESOLVER,
          useFactory: guardResolverFactory,
          deps: [Injector, ActivatedRoute, Router],
        },
        {
          provide: DATA_RESOLVER,
          useFactory: dataResolverFactory,
          deps: [Injector, ActivatedRoute, Router],
        },
      ],
    };
  }

  /** Instantiates a module for a lazy-loaded JSS component */
  static forChild(component: Type<any>): ModuleWithProviders<JssModule> {
    return {
      ngModule: JssModule,
      providers: [
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: component, multi: true },
        { provide: ROUTES, useValue: [], multi: true },
        { provide: DYNAMIC_COMPONENT, useValue: component },
      ],
    };
  }

  /**
   * Instantiates the JSS module and specifies the mapping from component name to component implementation.
   * Appropriate when defining the set of JSS components that your app is aware of.
   */
  static withComponents(components: ComponentNameAndType[], lazyComponents?: ComponentNameAndModule[]): ModuleWithProviders<JssModule> {
    return {
      ngModule: JssModule,
      providers: [
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: components,
          multi: true,
        },
        { provide: PLACEHOLDER_COMPONENTS, useValue: components },
        { provide: PLACEHOLDER_LAZY_COMPONENTS, useValue: lazyComponents || [] },
        { provide: ROUTES, useValue: lazyComponents || [], multi: true },
        { provide: PLACEHOLDER_MISSING_COMPONENT_COMPONENT, useValue: MissingComponentComponent },
        ...(JssModule.forRoot().providers as any[]),
      ],
    };
  }
}

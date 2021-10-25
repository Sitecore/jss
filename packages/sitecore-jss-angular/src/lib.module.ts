import { CommonModule, DatePipe } from '@angular/common';
import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  ModuleWithProviders,
  NgModule,
  Provider,
  Type,
} from '@angular/core';
import { ROUTES } from '@angular/router';
import { DateDirective } from './components/date.directive';
import { FileDirective } from './components/file.directive';
import { GenericLinkDirective } from './components/generic-link.directive';
import { ImageDirective } from './components/image.directive';
import { LinkDirective } from './components/link.directive';
import { MissingComponentComponent } from './components/missing-component.component';
import { HiddenRenderingComponent } from './components/hidden-rendering.component';
import { PlaceholderLoadingDirective } from './components/placeholder-loading.directive';
import { PlaceholderComponent } from './components/placeholder.component';
import {
  ComponentNameAndModule,
  ComponentNameAndType,
  DYNAMIC_COMPONENT,
  PLACEHOLDER_COMPONENTS,
  PLACEHOLDER_LAZY_COMPONENTS,
  PLACEHOLDER_MISSING_COMPONENT_COMPONENT,
  PLACEHOLDER_HIDDEN_RENDERING_COMPONENT
} from './components/placeholder.token';
import { RawComponent } from './components/raw.component';
import { RenderComponentComponent } from './components/render-component.component';
import { RenderEachDirective } from './components/render-each.directive';
import { RenderEmptyDirective } from './components/render-empty.directive';
import { RichTextDirective } from './components/rich-text.directive';
import { RouterLinkDirective } from './components/router-link.directive';
import { TextDirective } from './components/text.directive';
import { JssComponentFactoryService } from './jss-component-factory.service';

@NgModule({
  imports: [CommonModule],
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
    HiddenRenderingComponent,
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
    HiddenRenderingComponent,
    PlaceholderLoadingDirective,
    RichTextDirective,
    TextDirective,
  ],
  entryComponents: [RawComponent, MissingComponentComponent],
})
export class JssModule {
  /**
   * Instantiates the JSS module with no component factory.
   * Useful for using it from libraries. Most of the time you'd want withComponents()
   * @returns {ModuleWithProviders<JssModule>} module
   */
  static forRoot(): ModuleWithProviders<JssModule> {
    return {
      ngModule: JssModule,
      providers: [DatePipe, JssComponentFactoryService],
    };
  }

  /**
   * Instantiates a module for a lazy-loaded JSS component
   * @param {Type<unknown>} component
   * @returns {ModuleWithProviders<JssModule>} module
   */
  static forChild(component: Type<unknown>): ModuleWithProviders<JssModule> {
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
   * @param {ComponentNameAndType[]} components
   * @param {ComponentNameAndModule[]} [lazyComponents]
   * @returns {ModuleWithProviders<JssModule>} module
   */
  static withComponents(
    components: ComponentNameAndType[],
    lazyComponents?: ComponentNameAndModule[]
  ): ModuleWithProviders<JssModule> {
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
        { provide: PLACEHOLDER_HIDDEN_RENDERING_COMPONENT, useValue: HiddenRenderingComponent },
        ...(JssModule.forRoot().providers as Provider[]),
      ],
    };
  }
}

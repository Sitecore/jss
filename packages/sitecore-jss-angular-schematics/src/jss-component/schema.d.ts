/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export interface Schema {
  /**
   * The path to create the component.
   */
  path?: string;
  /**
   * Skips generating a disconnected manifest definition. Use for Sitecore-first development.
   */
  noManifest?: boolean;
  /**
   * The name of the project.
   */
  project?: string;
  /**
   * The name of the component.
   */
  name: string;
  /**
   * Specifies if the style will be in the ts file.
   */
  inlineStyle?: boolean;
  /**
   * Specifies if the template will be in the ts file.
   */
  inlineTemplate?: boolean;
  /**
   * Specifies the view encapsulation strategy.
   */
  viewEncapsulation?: ('Emulated' | 'Native' | 'None');
  /**
   * Specifies the change detection strategy.
   */
  changeDetection?: ('Default' | 'OnPush');
  /**
   * The prefix to apply to generated selectors.
   */
  prefix?: string;
  /**
   * The file extension to be used for style files.
   */
  styleext?: string;
  /**
   * Specifies if a spec file is generated.
   */
  spec?: boolean;
  /**
   * Flag to indicate if a dir is created.
   */
  flat?: boolean;
  /**
   * The selector to use for the component.
   */
  selector?: string;
  /**
   * Specify whether to generate a lazy-loading module file for the component.
   * When using the default JSS component factory code generator, this will cause the component to lazy load when needed.
   * If using hand-edited component factory, you'll need to add the module to the lazy components manually.
   */
  lazyload?: boolean;
}

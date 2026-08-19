import React, { JSX } from 'react';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';
import { useSitecoreContext } from './withSitecoreContext';

export const DefaultEditingError = (): JSX.Element => (
  <div className="sc-jss-editing-error" role="alert">
    Datasource is required. Please choose a content item for this component.
  </div>
);

export interface WithDatasourceCheckProps {
  rendering: ComponentRendering;
}

export interface WithDatasourceCheckOptions {
  /**
   * A component that is rendered when a datasource is missing or failed to resolve during editing.
   * If unspecified, a default component with message is displayed.
   */
  editingErrorComponent?: React.ComponentClass<unknown> | React.FC<unknown>;
}

/**
 * Returns true when the rendering has a datasource and Layout Service did not report a resolve failure.
 * @param {ComponentRendering} [rendering] rendering data from Layout Service
 * @returns {boolean} whether the datasource is present and valid
 */
function hasValidDatasource(rendering?: ComponentRendering): boolean {
  if (!rendering?.dataSource) {
    return false;
  }

  return rendering.dataSourceResolveFailed !== true;
}

/**
 * Checks whether a Sitecore datasource is present and valid, then renders appropriately depending on page mode (normal vs editing).
 * `dataSourceResolveFailed: true` is treated the same as a missing datasource. If the property is omitted, the original presence check is used.
 * @param {WithDatasourceCheckOptions} [options]
 * @returns
 *  The wrapped component, if a datasource is present and valid.
 *  A null component (in normal mode) or an error component (in editing mode), if a datasource is missing or failed to resolve.
 * @example
 * // Wrap once. Deleted/archived datasources (dataSourceResolveFailed: true) use the same
 * // fallback as a missing datasource: hide in normal mode, show an editing error in editing mode.
 * const ContentBlock = (props) => <div>{props.fields.heading}</div>;
 * export default withDatasourceCheck()(ContentBlock);
 *
 * // Layout Service: { componentName: 'ContentBlock', dataSource: '{id}', dataSourceResolveFailed: true }
 * // → ContentBlock is not rendered; no extra app-level check is required.
 */
export function withDatasourceCheck(options?: WithDatasourceCheckOptions) {
  return function withDatasourceCheckHoc<ComponentProps extends WithDatasourceCheckProps>(
    Component: React.ComponentType<ComponentProps>
  ) {
    return function WithDatasourceCheck(props: ComponentProps) {
      const { sitecoreContext } = useSitecoreContext();
      const EditingError = options?.editingErrorComponent ?? DefaultEditingError;

      return hasValidDatasource(props.rendering) ? (
        <Component {...props} />
      ) : sitecoreContext.pageEditing ? (
        <EditingError />
      ) : null;
    };
  };
}

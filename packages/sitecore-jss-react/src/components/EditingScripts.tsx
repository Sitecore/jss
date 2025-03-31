import React from 'react';
import { EditMode, LayoutServicePageState, RenderingType } from '@sitecore-jss/sitecore-jss/layout';
import { useSitecoreContext } from '../enhancers/withSitecoreContext';
import { getJssPagesClientData } from '@sitecore-jss/sitecore-jss/editing';
import { getDesignLibraryScriptLink } from '@sitecore-jss/sitecore-jss/editing';

/**
 * Props for the EditingScripts component.
 */
export type EditingScriptsProps = {
  /**
   * The URL of the design library.
   */
  designLibraryUrl?: string;
};

/**
 * - Renders client scripts and data for editing/preview mode for Pages
 * - Renders script required for the Design Library (when RenderingType is `component`).
 * This script is only rendered when EditMode is Metadata or RenderingType is `component`, otherwise it renders nothing.
 * @param {EditingScriptsProps} props - The props for the EditingScripts component.
 * @param {string} props.designLibraryUrl - The URL of the design library.
 * @returns A JSX element containing the editing scripts or an empty fragment if not in editing/preview mode.
 */
export const EditingScripts = (props: EditingScriptsProps): JSX.Element => {
  const {
    sitecoreContext: { pageState, editMode, clientData, clientScripts, renderingType },
  } = useSitecoreContext();

  // Don't render anything if not in editing/preview mode and rendering type is not component
  if (
    renderingType !== RenderingType.Component &&
    (pageState === LayoutServicePageState.Normal || pageState === LayoutServicePageState.Preview)
  ) {
    return <></>;
  }

  // In case of Design Libnrary - render only the script required for the Design Library
  if (renderingType === RenderingType.Component) {
    return (
      <>
        <script src={getDesignLibraryScriptLink(props.designLibraryUrl)}></script>
      </>
    );
  }

  if (editMode === EditMode.Metadata) {
    const jssClientData = { ...clientData, ...getJssPagesClientData() };

    return (
      <>
        {clientScripts?.map((src, index) => (
          <script src={src} key={index} />
        ))}
        {Object.keys(jssClientData).map((id) => (
          <script
            key={id}
            id={id}
            type="application/json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jssClientData[id]) }}
          />
        ))}
      </>
    );
  }

  return <></>;
};

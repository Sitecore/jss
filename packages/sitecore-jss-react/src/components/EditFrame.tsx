import React, { PropsWithChildren } from 'react';
import { useSitecoreContext } from '../enhancers/withSitecoreContext';
import {
  EditFrameDataSource,
  ChromeCommand,
  EditButtonTypes,
  mapButtonToCommand,
} from '@sitecore-jss/sitecore-jss/utils';

export interface EditFrameProps {
  dataSource?: EditFrameDataSource;
  buttons?: EditButtonTypes[];
  title?: string;
  tooltip?: string;
  cssClass?: string;
  parameters?: Record<string, string | number | boolean | undefined | null>;
}

export const EditFrame: React.FC<PropsWithChildren<EditFrameProps>> = ({
  children,
  dataSource,
  buttons,
  title,
  tooltip,
  cssClass,
  parameters,
}: PropsWithChildren<EditFrameProps>) => {
  const { sitecoreContext } = useSitecoreContext();

  if (!sitecoreContext.pageEditing) {
    return <>{children}</>;
  }

  const chromeData: Record<string, unknown> = {
    displayName: title,
    expandedDisplayName: tooltip,
  };

  const frameProps: Record<string, unknown> = {};
  frameProps.className = 'scLooseFrameZone';
  if (cssClass) {
    frameProps.className = `${frameProps.className} ${cssClass}`;
  }

  // item uri for edit frame target
  if (dataSource) {
    const databaseName = dataSource.databaseName || sitecoreContext.route?.databaseName;
    const language = dataSource.language || sitecoreContext.language;
    frameProps.sc_item = `sitecore://${databaseName}/${dataSource.itemId}?lang=${language}`;
    chromeData.contextItemUri = frameProps.sc_item;
  }

  chromeData.commands = buttons?.map(
    (value): ChromeCommand => {
      return mapButtonToCommand(value, dataSource?.itemId, parameters);
    }
  );

  return (
    <div className="scLooseFrameZone" {...frameProps}>
      <span className="scChromeData">{JSON.stringify(chromeData)}</span>
      {children}
    </div>
  );
};

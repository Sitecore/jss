// import PropTypes from 'prop-types';
import React, { PropsWithChildren } from 'react';
import { useSitecoreContext } from '../enhancers/withSitecoreContext';
import {
  DefaultEditFrameButtonIds,
  EditFrameDataSource,
  EditFrameButton,
  FieldEditButton,
  WebEditButton,
  isWebEditButton,
  commandBuilder,
} from '@sitecore-jss/sitecore-jss/utils';

export interface EditFrameProps {
  dataSource?: EditFrameDataSource;
  buttons?: (FieldEditButton | WebEditButton | '|')[];
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
}: PropsWithChildren<EditFrameProps>): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  if (!sitecoreContext.pageEditing) {
    return <></>;
  }

  const commandData: Record<string, unknown> = {
    displayName: title,
    expandedDisplayName: tooltip,
  };

  const frameProps: Record<string, unknown> = {};
  frameProps.class = 'scLooseFrameZone';
  if (cssClass) {
    frameProps.class = `${frameProps.class} ${cssClass}`;
  }

  // item uri for edit frame target
  if (dataSource) {
    const databaseName = dataSource.databaseName || sitecoreContext.route?.databaseName;
    const language = dataSource.language || sitecoreContext.language;
    frameProps.sc_item = `sitecore://${databaseName}/${dataSource.itemId}?lang=${language}`;
    commandData.contextItemUri = frameProps.sc_item;
  }

  commandData.commands = buttons?.map(
    (value): EditFrameButton => {
      if (value === '|') {
        return {
          click: 'chrome:dummy',
          header: 'Separator',
          icon: '',
          isDivider: false,
          tooltip: null,
          type: 'separator',
        };
      } else if (isWebEditButton(value)) {
        return commandBuilder(value, dataSource?.itemId, parameters);
      } else {
        const fieldsString = value.fields.join('|');
        const editButton: WebEditButton = {
          click: `webedit:fieldeditor(command=${DefaultEditFrameButtonIds.edit},fields=${fieldsString})`,
          ...value,
        };

        return commandBuilder(editButton, dataSource?.itemId, parameters);
      }
    }
  );

  return (
    <div className="scLooseFrameZone" {...frameProps}>
      <span className="scChromeData">{JSON.stringify(commandData)}</span>
      {children}
    </div>
  );
};

EditFrame.defaultProps = {
  dataSource: undefined,
  buttons: [],
  title: 'Edit',
};

export interface EditFrameProps {
  dataSource?: EditFrameDataSource;
  buttons?: (FieldEditButton | WebEditButton | '|')[];
  title?: string;
  tooltip?: string;
  cssClass?: string;
  parameters?: Record<string, string | number | boolean | undefined | null>;
}

// EditFrame.propTypes = {
//   dataSource: PropTypes.oneOf([
//     undefined,
//     PropTypes.shape({
//       itemId: PropTypes.string.isRequired,
//       databaseName: PropTypes.string,
//       language: PropTypes.string,
//     }),
//   ]),
//   buttons: PropTypes.arrayOf(
//     PropTypes.oneOf([
//       PropTypes.shape({
//         header: PropTypes.string,
//         icon: PropTypes.string,
//         fields: PropTypes.arrayOf(PropTypes.string).isRequired,
//         tooltip: PropTypes.string,
//       }),
//       PropTypes.shape({
//         header: PropTypes.string.isRequired,
//         icon: PropTypes.string.isRequired,
//         click: PropTypes.string.isRequired,
//         tooltip: PropTypes.string,
//         parameters: PropTypes.string.isRequired,
//         type: PropTypes.string,
//       }),
//       '|',
//     ])
//   ),
//   title: PropTypes.string,
//   tooltip: PropTypes.string,
//   cssClass: PropTypes.string,
// };

EditFrame.displayName = 'Edit Frame';

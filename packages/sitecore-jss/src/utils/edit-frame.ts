
export type EditFrameButton = {
  isDivider: boolean;
  click: string;
  header: string;
  icon: string;
  tooltip: string | null;
  type: string | null;
};

export const DefaultEditFrameButtonIds = {
  edit: '{70C4EED5-D4CD-4D7D-9763-80C42504F5E7}',
};

export const DefaultEditFrameButton = {
  insert: {
    header: 'Insert New',
    icon: '/~/icon/Office/16x16/insert_from_template.png',
    click: 'webedit:new',
    tooltip: 'Insert a new item',
  },
  editRelatedItem: {
    header: 'Edit the related item',
    icon: '/~/icon/Office/16x16/cubes.png',
    click: 'webedit:open', // Command in Sitecore, 'chrome:common:edititem({command:"webedit:open"})',
    tooltip: 'Edit the related item in the Content Editor.',
  },
  edit: {
    header: 'Edit Item',
    icon: '/~/icon/people/16x16/cubes_blue.png',
    fields: ['Title', 'Text'],
    tooltip: 'Edit the item fields.',
  },
};

export const DefaultEditFrameButtons = [
  DefaultEditFrameButton.editRelatedItem,
  DefaultEditFrameButton.insert,
  DefaultEditFrameButton.edit,
];

/**
 * @param {WebEditButton | FieldEditButton} button the button to determine the type of
 */
export function isWebEditButton(button: WebEditButton | FieldEditButton): button is WebEditButton {
  return (button as WebEditButton).click !== undefined;
}

export type EditFrameDataSource = {
  itemId: string;
  databaseName?: string;
  language?: string;
};

export type FieldEditButton = {
  header: string;
  icon: string;
  fields: string[];
  tooltip: string;
};

export type WebEditButton = {
  header: string;
  icon: string;
  click: string;
  tooltip: string;
  parameters?: Record<string, string | number | boolean | undefined | null>;
  type?: string;
};

/**
 * @param {WebEditButton } button the button to build a EditFrameButton for
 * @param {string} itemId the ID of the item the EditFrame is associated with
 * @param {Record<string, string>} frameParameters additional parameters passed to the EditFrame
 */
export function commandBuilder(
  button: WebEditButton,
  itemId?: string,
  frameParameters?: Record<string, string | number | boolean | undefined | null>
): EditFrameButton {
  if (!button.click) {
    return {
      isDivider: false,
      type: button.type || null,
      ...button,
    };
  } else if (button.click.startsWith('javascript:') || button.click.startsWith('chrome:')) {
    return {
      isDivider: false,
      type: button.type || null,
      ...button,
    };
  } else {
    if (!itemId) {
      return {
        isDivider: false,
        type: button.type || null,
        ...button,
      };
    } else {
      let message = button.click;
      let parameters: Record<string, string> = {};

      const length = button.click.indexOf('(');
      if (length >= 0) {
        const end = button.click.indexOf(')');
        if (end < 0) {
          throw new Error('Message with arguments must end with ")".');
        }
        parameters = button.click
          .substring(length + 1, end)
          .split(',')
          .map((_) => _.trim())
          .reduce((previous: Record<string, string>, current) => {
            const parts = current.split('=');
            if (parts.length < 2) {
              previous[parts[0]] = '';
            } else {
              previous[parts[0]] = parts[1];
            }
            return previous;
          }, {});
        message = button.click.substring(0, length);
      }

      parameters.id = itemId;

      if (button.parameters) {
        Object.keys(button.parameters).forEach((_) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          parameters[_] = button.parameters![_]?.toString() || '';
        });
      }

      if (frameParameters) {
        Object.keys(frameParameters).forEach((_) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          parameters[_] = frameParameters![_]?.toString() || '';
        });
      }

      const parameterString = Object.keys(parameters)
        .map((_) => `${_}=${parameters[_]}`)
        .join(', ');

      const click = `${message}(${parameterString})`;

      return {
        isDivider: false,
        click: `javascript:Sitecore.PageModes.PageEditor.postRequest('${click}',null,false)`,
        header: button.header,
        icon: button.icon,
        tooltip: button.tooltip,
        type: button.type || null,
      };
    }
  }
}
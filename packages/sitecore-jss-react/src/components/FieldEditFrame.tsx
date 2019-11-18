import React from 'react';
import { withSitecoreContext } from '../enhancers/withSitecoreContext';

export interface FieldEditFrameProps {
    itemId?: string,
    fields?: string[],
    header?: string,
    icon?: string,
    disabledIcon?: string,
    tooltip?: string,
    command?: string,
    commandDisplayName?: string,
    databaseName?: string,
    language?: string,
    hideIfNotPageEditing?: boolean,
    sitecoreContext: {
        language?: string,
        pageEditing?: boolean,
        route: {
            databaseName?: string
        }
    }
}

export const FieldEditFrameWrapper: React.SFC<FieldEditFrameProps> = ({
    itemId,
    fields,
    header,
    icon,
    disabledIcon,
    tooltip,
    command,
    commandDisplayName,
    databaseName,
    language,
    children
}) => {
    // ensure fields and itemId are configured
    if (!itemId || !fields) {
        return null;
    }

    // item uri for edit frame target
    const contextItemUri = `sitecore://${databaseName}/${itemId}?lang=${language}`;

    // click action for edit frame command
    const clickCommandAction = `webedit:fieldeditor(command=${command},fields=${fields.join(
        "|"
    )},id=${itemId})`;

    // click for command for the edit frame
    const clickCommand = {
        click: `javascript:Sitecore.PageModes.PageEditor.postRequest('${clickCommandAction}',null,false)`,
        header: header,
        icon: icon,
        disabledIcon: disabledIcon,
        isDivider: false,
        tooltip: tooltip || `Edit the following fields: ${fields.join(", ")}`,
        type: null
    };

    // command data that is serialized for the edit frame
    const commandData = {
        commands: [clickCommand],
        contextItemUri: contextItemUri,
        custom: {},
        displayName: commandDisplayName || 'Edit Properties',
        expandedDisplayName: ""
    };

    // edit frame attributes
    const divAttrs = {
        'sc_item': contextItemUri,
        'sc-part-of': 'editframe'
    }

    return <div
        className="scLooseFrameZone scEnabledChrome"
        {...divAttrs}>
        <span className="scChromeData">{JSON.stringify(commandData)}</span>
        {children}
    </div>
};

export const FieldEditFrameComponent: React.SFC<FieldEditFrameProps> = ({
    sitecoreContext,
    children,
    itemId,
    fields,
    hideIfNotPageEditing,
    databaseName,
    language,
    ...otherProps
}) => {
    // check if we're in experience editor and configured properly
    const shouldRender = sitecoreContext.pageEditing && itemId && fields && fields.length;

    // hide if not in page editing mode and prop is passed telling us to hide
    if (!shouldRender && hideIfNotPageEditing) {
        return null;
    }

    // if we're configured properly, wrap in edit frame.
    const WrapperComponent = shouldRender ? FieldEditFrameWrapper : React.Fragment;

    // build the props for our edit frame
    const WrapperProps = {
        itemId,
        fields,
        databaseName: databaseName || sitecoreContext.route.databaseName,
        language: language || sitecoreContext.language,
        sitecoreContext,
        ...otherProps
    }

    return <WrapperComponent {...WrapperProps}>
        {children}
    </WrapperComponent>
}

FieldEditFrameComponent.defaultProps = {
    itemId: '',
    fields: [],
    header: 'Edit Fields',
    icon: '/temp/iconcache/people/16x16/cubes_blue.png',
    disabledIcon: '/temp/cubes_blue_disabled16x16.png',
    command: '{70C4EED5-D4CD-4D7D-9763-80C42504F5E7}'
};

export const FieldEditFrame = withSitecoreContext()(FieldEditFrameComponent);
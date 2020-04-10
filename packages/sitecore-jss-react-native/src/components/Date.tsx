import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native'
import HtmlView from 'react-native-htmlview';

export interface DateFieldProps {
	/** The date field data. */
	field: {
		value?: string;
		editable?: string;
	};
  /**
   * Can be used to explicitly disable inline editing.
   * If true and `field.editable` has a value, then `field.editable` will be processed and rendered as component output. If false, `field.editable` value will be ignored and not rendered.
   * @default true
   */
	editable?: boolean;
	render?: (date: Date | null) => React.ComponentType<any> | React.ReactNode;
	[htmlAttributes: string]: any;
}

export const DateField: React.SFC<DateFieldProps> = ({ field, editable, render, ...otherProps }) => {
	if (!field || (!field.editable && !field.value)) {
		return null;
	}

	let children: any;

	if (render) {
		children = render(field.value ? new Date(field.value) : null);
	} else {
		children = field.value
	}

	if (field.editable && editable) {
		return <HtmlView value={children} {...otherProps} />;
	} else {
		return render 
			? children
			: <Text>{children}</Text>;
	}
};

DateField.propTypes = {
	field: PropTypes.shape({
		value: PropTypes.any,
		editable: PropTypes.string,
	}).isRequired,
	editable: PropTypes.bool,
	render: PropTypes.func,
};

DateField.defaultProps = {
	editable: true,
};

DateField.displayName = 'Date';
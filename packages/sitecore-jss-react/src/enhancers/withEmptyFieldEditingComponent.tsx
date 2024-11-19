import React, { ComponentType, forwardRef } from 'react';
import {
  GenericFieldValue,
  Field,
  isFieldValueEmpty,
  FieldMetadata,
} from '@sitecore-jss/sitecore-jss/layout';

/**
 * The HOC options
 */
export interface WithEmptyFieldEditingComponentOptions {
  /**
   * the default empty field component
   */
  defaultEmptyFieldEditingComponent: React.FC;
  /**
   * 'true' if forward reference is needed
   */
  isForwardRef?: boolean;
}

/*
 * represents the WithEmptyFieldEditingComponent HOC's props
 */
interface WithEmptyFieldEditingComponentProps {
  // Partial<T> type is used here because _field.value_ could be required or optional for the different field types
  field?: (Partial<Field> | GenericFieldValue) & FieldMetadata;
  editable?: boolean;
  emptyFieldEditingComponent?: React.ComponentClass | React.FC;
}

/**
 * Returns the passed field component or default component in case field value is empty and edit mode is 'metadata'
 * @param {ComponentType<FieldComponentProps>} FieldComponent the field component
 * @param {WithEmptyFieldEditingComponentProps} options the options of the HOC;
 */
export function withEmptyFieldEditingComponent<
  FieldComponentProps extends WithEmptyFieldEditingComponentProps,
  RefElementType = HTMLElement
>(
  FieldComponent: ComponentType<FieldComponentProps>,
  options: WithEmptyFieldEditingComponentOptions
) {
  const getEmptyFieldEditingComponent = (
    props: FieldComponentProps
  ): React.ComponentClass | React.FC => {
    const { editable = true } = props;
    if (props.field?.metadata && editable && isFieldValueEmpty(props.field)) {
      return props.emptyFieldEditingComponent || options.defaultEmptyFieldEditingComponent;
    }

    return null;
  };

  if (options.isForwardRef) {
    // eslint-disable-next-line react/display-name
    return forwardRef<RefElementType, FieldComponentProps>((props, ref) => {
      const EmptyFieldEditingComponent = getEmptyFieldEditingComponent(
        props as FieldComponentProps
      );
      return (
        <>
          {(EmptyFieldEditingComponent && <EmptyFieldEditingComponent />) || (
            <FieldComponent {...(props as FieldComponentProps)} ref={ref} />
          )}
        </>
      );
    });
  }

  // eslint-disable-next-line react/display-name
  return (props: FieldComponentProps) => {
    const EmptyFieldEditingComponent = getEmptyFieldEditingComponent(props);
    return (
      <>
        {(EmptyFieldEditingComponent && <EmptyFieldEditingComponent />) || (
          <FieldComponent {...props} />
        )}
      </>
    );
  };
}

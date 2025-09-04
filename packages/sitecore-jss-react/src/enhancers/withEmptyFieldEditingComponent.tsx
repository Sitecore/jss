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
interface WithEmptyFieldEditingComponentProps<Props> {
  // Partial<T> type is used here because _field.value_ could be required or optional for the different field types
  field?: (Partial<Field> | GenericFieldValue) & FieldMetadata;
  editable?: boolean;
  emptyFieldEditingComponent?: React.ComponentClass<Props> | React.FC<Props>;
}

/**
 * Returns the passed field component or default component in case field value is empty and edit mode is 'metadata'
 * @param {ComponentType<FieldComponentProps>} FieldComponent the field component
 * @param {WithEmptyFieldEditingComponentProps} options the options of the HOC;
 */
export function withEmptyFieldEditingComponent<
  FieldComponentProps extends WithEmptyFieldEditingComponentProps<FieldComponentProps>,
  RefElementType = HTMLElement
>(
  FieldComponent: ComponentType<FieldComponentProps>,
  options: WithEmptyFieldEditingComponentOptions
) {
  const getEmptyFieldEditingComponent = (props: FieldComponentProps) => {
    const { editable = true } = props;
    if (props.field?.metadata && editable && isFieldValueEmpty(props.field)) {
      const Component =
        props.emptyFieldEditingComponent || options.defaultEmptyFieldEditingComponent;

      let resolvedProps = props;

      // If no custom empty field editing component is provided, we can omit unnecessary props
      // to do not insert them to html
      if (!props.emptyFieldEditingComponent) {
        resolvedProps = {
          ...props,
          editable: undefined,
          field: undefined,
        };
      }

      return <Component {...resolvedProps} />;
    }

    return null;
  };

  if (options.isForwardRef) {
    // eslint-disable-next-line react/display-name
    return forwardRef<RefElementType, FieldComponentProps>((props, ref) => {
      const emptyFieldEditingComponent = getEmptyFieldEditingComponent(
        props as FieldComponentProps
      );

      return (
        emptyFieldEditingComponent || (
          <FieldComponent {...(props as FieldComponentProps)} ref={ref} />
        )
      );
    });
  }

  // eslint-disable-next-line react/display-name
  return (props: FieldComponentProps) => {
    const emptyFieldEditingComponent = getEmptyFieldEditingComponent(props);
    return emptyFieldEditingComponent || <FieldComponent {...props} />;
  };
}

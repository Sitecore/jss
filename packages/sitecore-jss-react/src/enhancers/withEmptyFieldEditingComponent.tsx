import React, { ComponentType, forwardRef } from 'react';
import {
  GenericFieldValue,
  Field,
  isFieldValueEmpty,
  FieldMetadata,
} from '@sitecore-jss/sitecore-jss/layout';

interface WithEmptyFieldEditingComponentProps {
  // Parial is used here because field.value could be required or optional for the different field types
  field?: (Partial<Field> | GenericFieldValue) & FieldMetadata;
  editable?: boolean;
  emptyFieldEditingComponent?: React.ComponentClass | React.FC;
}

/**
 * Returns the passed field component or default component in case field value is empty and edit mode is 'metadata'
 * @param {ComponentType<FieldComponentProps>} FieldComponent the field component
 * @param {React.FC} defaultEmptyFieldEditingComponent the default empty field placeholder component
 * @param {boolean} isForwardRef set to 'true' if forward reference is needed
 */
export function withEmptyFieldEditingComponent<
  FieldComponentProps extends WithEmptyFieldEditingComponentProps,
  RefElementType = HTMLElement
>(
  FieldComponent: ComponentType<FieldComponentProps>,
  defaultEmptyFieldEditingComponent: React.FC,
  isForwardRef = false
) {
  const getEmptyFieldEditingComponent = (
    props: FieldComponentProps
  ): React.ComponentClass | React.FC => {
    const { editable = true } = props;
    if (props.field?.metadata && editable && isFieldValueEmpty(props.field)) {
      return props.emptyFieldEditingComponent || defaultEmptyFieldEditingComponent;
    }

    return null;
  };

  if (isForwardRef) {
    // eslint-disable-next-line react/display-name
    return forwardRef((props: FieldComponentProps, ref: React.ForwardedRef<RefElementType>) => {
      const EmptyFieldEditingComponent = getEmptyFieldEditingComponent(props);
      return (
        <>
          {(EmptyFieldEditingComponent && <EmptyFieldEditingComponent />) || (
            <FieldComponent {...props} ref={ref} />
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

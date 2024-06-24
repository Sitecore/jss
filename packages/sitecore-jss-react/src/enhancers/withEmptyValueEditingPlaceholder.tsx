import React, { ComponentType, forwardRef } from 'react';
import { LinkFieldValue } from '../components/Link';
import { ImageFieldValue } from '../components/Image';

interface GeneralField {
  metadata?: { [key: string]: unknown };
  value?: unknown;
}

interface WithEmptyValueEditingPlaceholderProps {
  field?: GeneralField;
  editable?: boolean;
  emptyValueEditingPlaceholder?: React.ComponentClass | React.FC;
}

/**
 * Returns the passed field component or placeholder content in case field value is empty and edit mode is 'metadata'
 * @param {ComponentType<FieldComponentProps>} FieldComponent the field component
 * @param {React.FC} defaultEmptyFieldEditingComponent the default empty field placeholder component
 * @param {boolean} isForwardRef set to 'true' if forward reference is needed
 */
export function withEmptyValueEditingPlaceholder<
  FieldComponentProps extends WithEmptyValueEditingPlaceholderProps,
  RefElementType = HTMLElement
>(
  FieldComponent: ComponentType<FieldComponentProps>,
  defaultEmptyFieldEditingComponent: React.FC,
  isForwardRef = false
) {
  const hasValue = (field: GeneralField | ImageFieldValue | LinkFieldValue) =>
    field?.value || (field as ImageFieldValue)?.src || (field as LinkFieldValue)?.href;

  const getEmptyFieldPhComponent = (
    props: FieldComponentProps
  ): React.ComponentClass | React.FC => {
    const { editable = true } = props;
    if (props.field?.metadata && editable && !hasValue(props.field)) {
      return props.emptyValueEditingPlaceholder || defaultEmptyFieldEditingComponent;
    }

    return null;
  };

  if (isForwardRef) {
    // eslint-disable-next-line react/display-name
    return forwardRef((props: FieldComponentProps, ref: React.ForwardedRef<RefElementType>) => {
      const EmptyFieldPhComponent = getEmptyFieldPhComponent(props);
      return (
        <>
          {(EmptyFieldPhComponent && <EmptyFieldPhComponent />) || (
            <FieldComponent {...props} ref={ref} />
          )}
        </>
      );
    });
  }

  // eslint-disable-next-line react/display-name
  return (props: FieldComponentProps) => {
    const EmptyFieldPhComponent = getEmptyFieldPhComponent(props);
    return (
      <>{(EmptyFieldPhComponent && <EmptyFieldPhComponent />) || <FieldComponent {...props} />}</>
    );
  };
}

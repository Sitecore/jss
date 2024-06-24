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

  function getEmptyFieldPhComponent(props: FieldComponentProps): React.ComponentClass | React.FC {
    const { editable = true } = props;
    // render empty field placeholder in editMode metadata
    if (props.field?.metadata && editable && !hasValue(props.field)) {
      return props.emptyValueEditingPlaceholder || defaultEmptyFieldEditingComponent;
    }

    return null;
  }

  if (isForwardRef) {
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

  return (props: FieldComponentProps) => {
    const EmptyFieldPhComponent = getEmptyFieldPhComponent(props);
    return (
      <>{(EmptyFieldPhComponent && <EmptyFieldPhComponent />) || <FieldComponent {...props} />}</>
    );
  };
}

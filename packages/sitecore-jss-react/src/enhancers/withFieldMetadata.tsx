import React, { ComponentType, forwardRef } from 'react';
import { FieldMetadata } from '../components/FieldMetadata';

interface WithMetadataProps {
  field?: {
    metadata?: { [key: string]: unknown };
  };
  editable?: boolean;
}

/**
 * Wraps the field component with metadata markup intended to be used for chromes hydration in Pages
 * @param {ComponentType<FieldComponentProps>} FieldComponent the field component
 * @param {boolean} isForwardRef set to 'true' if forward reference is needed
 */
export function withFieldMetadata<
  FieldComponentProps extends WithMetadataProps,
  RefElementType = HTMLElement
>(FieldComponent: ComponentType<FieldComponentProps>, isForwardRef = false) {
  if (isForwardRef) {
    // eslint-disable-next-line react/display-name
    return forwardRef((props: FieldComponentProps, ref: React.ForwardedRef<RefElementType>) => {
      const { editable = true } = props;
      const metadata = props.field?.metadata;

      if (!metadata || !editable) {
        return <FieldComponent {...props} ref={ref} />;
      }

      return (
        <FieldMetadata metadata={metadata}>
          <FieldComponent {...props} ref={ref} />
        </FieldMetadata>
      );
    });
  }

  // eslint-disable-next-line react/display-name
  return (props: FieldComponentProps) => {
    const { editable = true } = props;
    const metadata = props.field?.metadata;

    if (!metadata || !editable) {
      return <FieldComponent {...props} />;
    }

    return (
      <FieldMetadata metadata={metadata}>
        <FieldComponent {...props} />
      </FieldMetadata>
    );
  };
}

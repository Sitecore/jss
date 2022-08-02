import React from 'react';
import { ErrorBoundary, ErrorBoundaryProps } from '../components/ErrorBoundary';

/**
 * @param errorComponent
 * @param errorBoundaryComponent
 */
export function withErrorBoundary(
  errorComponent?: React.ComponentClass | React.FC,
  errorBoundaryComponent?: React.ComponentClass<ErrorBoundaryProps> | React.FC<ErrorBoundaryProps>
) {
  return function withErrorBoundaryHOC<TComponentProps>(
    BoundComponent: React.ComponentType<TComponentProps>
  ) {
    return BoundComponent === null
      ? null
      : function errorWrapper(props: TComponentProps) {
          const ErrorBoundaryInternal = errorBoundaryComponent ?? ErrorBoundary;
          return (
            <ErrorBoundaryInternal errorComponent={errorComponent}>
              <BoundComponent {...props} />
            </ErrorBoundaryInternal>
          );
        };
  };
}

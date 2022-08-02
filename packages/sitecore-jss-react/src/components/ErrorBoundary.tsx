import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorState {
  hasError?: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

type ErrorComponentProps = {
  [prop: string]: unknown;
};

export interface ErrorBoundaryProps {
  errorComponent?: React.ComponentClass<ErrorComponentProps> | React.FC<ErrorComponentProps>;
  children?: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  defaultErrorComponent: React.FC<{ error: Error; errorInfo: ErrorInfo }> = ({
    error,
    errorInfo,
  }) => {
    return (
        <div className="sc-jss-component-error">
          <p>A rendering error occurred: {error.message}.</p>
          <p>Stack trace: {errorInfo.componentStack}</p>
        </div>
    );
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError || this.state.error) {
      if (this.props.errorComponent) {
        return (
          <this.props.errorComponent
            errorMessage={this.state.error.message}
            errorStack={this.state.errorInfo.componentStack}
          />
        );
      } else {
        return (
          <this.defaultErrorComponent error={this.state.error} errorInfo={this.state.errorInfo} />
        );
      }
    }
    return this.props.children;
  }
}

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorState {
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

//**
// * This component will simply wrap any other component passed down to it and contain an error that could be thrown
// * So that all other components on page would still be displayed
//*
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  previousError: Error;

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
    if (JSON.stringify(error) !== JSON.stringify(this.previousError)){
        this.previousError = error;
        this.setState({ error, errorInfo });
    }
  }

  render() {
    if (this.state.error) {
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

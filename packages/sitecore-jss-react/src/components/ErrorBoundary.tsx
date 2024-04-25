import React, { ReactNode, Suspense } from 'react';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';

type CustomErrorComponentProps = {
  [prop: string]: unknown;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
  customErrorComponent?:
    | React.ComponentClass<CustomErrorComponentProps>
    | React.FC<CustomErrorComponentProps>;
  rendering?: ComponentRendering;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state: { error: Error };

  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error: error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.error) {
      if (this.props.customErrorComponent) {
        return <this.props.customErrorComponent error={this.state.error} />;
      } else {
        return (
          <div>
            <div className="sc-jss-placeholder-error">
              A rendering error occurred in component <em>{this.props.rendering?.componentName}</em>
              <br />
              Error: <em>{this.state.error.message}</em>
            </div>
          </div>
        );
      }
    }

    return (
      <Suspense fallback={<h4>Component is still loading...</h4>}>{this.props.children}</Suspense>
    );
  }
}

export default ErrorBoundary;

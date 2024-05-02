import React, { ReactNode, Suspense } from 'react';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';
import { withSitecoreContext } from '../enhancers/withSitecoreContext';
import { SitecoreContextValue } from './SitecoreContext';

type CustomErrorComponentProps = {
  [prop: string]: unknown;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
  sitecoreContext: SitecoreContextValue;
  type: string;
  customErrorComponent?:
    | React.ComponentClass<CustomErrorComponentProps>
    | React.FC<CustomErrorComponentProps>;
  rendering?: ComponentRendering;
  componentLoadingMessage?: string;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  defaultErrorMessage =
    'There was a problem loading this section. Refresh your browser to try again.'; // eslint-disable-line
  defaultLoadingMessage = 'Loading component...';
  state: { error: Error };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error: error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error({ error, errorInfo });
  }

  isInDevMode(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  render() {
    if (this.state.error) {
      if (this.props.customErrorComponent) {
        return <this.props.customErrorComponent error={this.state.error} />;
      } else {
        if (this.isInDevMode() || this.props.sitecoreContext?.pageEditing) {
          return (
            <div>
              <div className="sc-jss-placeholder-error">
                A rendering error occurred in component{' '}
                <em>{this.props.rendering?.componentName}</em>
                <br />
                Error: <em>{this.state.error.message}</em>
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <div className="sc-jss-placeholder-error">{this.defaultErrorMessage}</div>
            </div>
          );
        }
      }
    }

    return (
      <Suspense
        fallback={<h4>{this.props.componentLoadingMessage || this.defaultLoadingMessage}</h4>}
      >
        {this.props.children}
      </Suspense>
    );
  }
}

export default withSitecoreContext()(ErrorBoundary);

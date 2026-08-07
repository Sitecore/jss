import React, { ReactNode, Suspense } from 'react';
import { ComponentRendering, LayoutServicePageState } from '@sitecore-jss/sitecore-jss/layout';
import { withSitecoreContext } from '../enhancers/withSitecoreContext';
import { SitecoreContextValue } from './SitecoreContext';

type ErrorComponentProps = {
  [prop: string]: unknown;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
  sitecoreContext: SitecoreContextValue;
  type: string;
  isDynamic?: boolean;
  disableSuspense?: boolean;
  errorComponent?: React.ComponentClass<ErrorComponentProps> | React.FC<ErrorComponentProps>;
  rendering?: ComponentRendering;
  componentLoadingMessage?: string;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  defaultErrorMessage = 'There was a problem loading this section.';
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
    if (this.showErrorDetails()) {
      console.error(
        `An error occurred in component ${this.props.rendering?.componentName} (${this.props.rendering?.uid}): `
      );
    }

    console.error({ error, errorInfo });
  }

  isInDevMode(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  showErrorDetails(): boolean {
    return (
      this.isInDevMode() ||
      this.props.sitecoreContext?.pageState === LayoutServicePageState.Edit ||
      this.props.sitecoreContext?.pageState === LayoutServicePageState.Preview
    );
  }

  isPageEditing(): boolean {
    return (
      !!this.props.sitecoreContext?.pageEditing ||
      this.props.sitecoreContext?.pageState === LayoutServicePageState.Edit
    );
  }

  render() {
    if (this.state.error) {
      if (this.props.errorComponent) {
        return <this.props.errorComponent error={this.state.error} />;
      } else {
        if (this.showErrorDetails()) {
          return (
            <div>
              <div className="sc-jss-placeholder-error">
                A rendering error occurred in component{' '}
                <em>{this.props.rendering?.componentName}</em>
                <br />
                Error: <em>{this.state.error.message || JSON.stringify(this.state.error)}</em>
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

    // do not apply suspense when suspense is disabled or when on already dynamic components
    let content: ReactNode;
    if ((this.props.disableSuspense ?? true) || this.props.isDynamic) {
      content = this.props.children;
    } else {
      content = (
        <Suspense
          fallback={<h4>{this.props.componentLoadingMessage || this.defaultLoadingMessage}</h4>}
        >
          {this.props.children}
        </Suspense>
      );
    }

    // Experience Editor tags the outermost DOM node of each rendering (sc-part-of,
    // scEnabledChrome) after SSR. Own that node in the SDK during editing so hydration
    // mismatches can be suppressed without requiring suppressHydrationWarning on every
    // app component. `display: contents` keeps SXA/Bootstrap column layout intact.
    if (this.isPageEditing()) {
      return (
        <div suppressHydrationWarning style={{ display: 'contents' }}>
          {content}
        </div>
      );
    }

    return content;
  }
}

export default withSitecoreContext()(ErrorBoundary);

import React, { ReactNode, Suspense } from 'react';

export type ErrorBoundaryProps = {
  children: ReactNode;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state: Readonly<{ error?: Error }>;

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI
    return { error: error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>Oops, there is an error!</h2>
        </div>
      );
    }

    return (
      <Suspense
        fallback={
          <h4 style={{ color: 'blue', fontWeight: 'bold' }}>Component is still loading...</h4>
        }
      >
        {this.props.children}
      </Suspense>
    );
  }
}

export default ErrorBoundary;

'use client';

import { Component, ReactNode } from 'react';
import Container from './container';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Container>
          <div className="flex h-[50vh] flex-col items-center justify-center">
            <h2 className="mb-2 text-2xl font-bold text-red-500">Something went wrong</h2>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              Please try refreshing the page
            </p>
            <button
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}>
              Refresh Page
            </button>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}
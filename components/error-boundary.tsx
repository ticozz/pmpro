'use client';

import { Component, ReactNode } from 'react';
import { CardWrapper } from './dashboard/analytics/card-wrapper';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <CardWrapper title="Error">
          <div className="text-center py-10">
            Something went wrong. Please try again later.
          </div>
        </CardWrapper>
      );
    }

    return this.props.children;
  }
} 
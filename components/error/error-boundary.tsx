"use client"

import React from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Weather app error:", error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />
      }

      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />
    }

    return this.props.children
  }
}

interface DefaultErrorFallbackProps {
  error?: Error
  resetError: () => void
}

function DefaultErrorFallback({ error, resetError }: DefaultErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-weather-navy flex items-center justify-center p-6">
      <div className="flex flex-col items-center justify-center text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-destructive" />
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-4 text-balance">
          Something went wrong
        </h1>

        <p className="text-muted-foreground mb-8 text-pretty leading-relaxed">
          The weather app encountered an unexpected error. Please try refreshing
          the page or contact support if the problem persists.
        </p>

        {process.env.NODE_ENV === "development" && error && (
          <details className="mb-6 p-4 bg-card rounded-lg text-left w-full">
            <summary className="text-card-foreground font-medium cursor-pointer mb-2">
              Error Details
            </summary>
            <pre className="text-xs text-muted-foreground overflow-auto">
              {error.stack}
            </pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={resetError} className="px-6">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="px-6"
          >
            <Home className="w-4 h-4 mr-2" />
            Reload App
          </Button>
        </div>
      </div>
    </div>
  );
}

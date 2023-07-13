import React from "react";

export default class ErrorComponentBoundary extends React.Component<{children?: JSX.Element},  {hasError: boolean}> {
    constructor(props: any) {
      super(props);
    }
    
    static getDerivedStateFromError(error: any) {
      return { hasError: true };
    }
  
    componentDidCatch(error : any, errorInfo : any) {
    }
  
    render() {
      if (this.state?.hasError) {
        return <h1>Something went wrong.</h1>;
      }

      return this.props.children; 
    }
  }
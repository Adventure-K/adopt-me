// Error Boundaries must be class components.
import { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
    state = {hasError: false};
    static getDerivedStateFromError() { // Lifecycle component. This and componentDidCatch are
        return { hasError: true }       // the reasons this must be done in a class component 
    }                                   // as they do not exist in function components.

    componentDidCatch(error, info) {
        // typically this would log to TrackJS etc etc
        console.error("ErrorBoundary component caught an error", error, info);
    }

    render() {
        if (this.state.hasError)  {
            return (
                <h2>
                    There was an error with this listing. 
                    <Link to="/">Click here</Link> to go back to the homepage.
                </h2>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
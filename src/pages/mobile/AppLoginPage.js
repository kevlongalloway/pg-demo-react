import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../../styles/styles.css'; // Create a new CSS file for transitions and import it here

export default function AppHomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate a delay to showcase the transition
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  return (
    <div className="relative min-h-screen">
        
    </div>
  );
}

import React from 'react';
import './GradientProgress.css';

const GradientProgress = ({ title, actual, expected }) => {
  // Ensure values are between 0 and 100
  console.log(actual)
  const clampedActual = Math.min(100, Math.max(0, actual));
  const clampedExpected = expected ? Math.min(100, Math.max(0, expected)) : null;
  
  return (
    <div className="progress-container">
      {title && <h3 className="progress-title">{title}</h3>}
      
      {/* Expected value label (if provided) - Above */}
      {clampedExpected !== null && (
        <div 
          className="label-wrapper label-wrapper-top"
          style={{ left: `${clampedExpected}%` }}
        >
          <div className="label-bubble label-expected">
            E :{expected}
          </div>
        </div>
      )}

      <div className="progress-bar">
        <div className="gradient-background"></div>
      </div>

      {/* Actual value label - Below */}
      <div 
        className="label-wrapper label-wrapper-bottom"
        style={{ left: `${clampedActual}%` }}
      >
        <div className="label-bubble label-actual">
          A: {actual}
        </div>
      </div>
    </div>
  );
};

export default GradientProgress;
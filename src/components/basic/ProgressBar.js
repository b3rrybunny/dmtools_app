import React, { useState, useEffect } from 'react';

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  height = 20,
  backgroundColor = '#e0e0e0',
  fillColor = '#4CAF50',
  borderRadius = 10,
  showPercentage = true,
  animated = false,
  striped = false,
  className = '',
  unit = '',
  showRemainingDistance = false
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const remaining = max - value;

  const containerStyle = {
    width: '100%',
    height: `${height}px`,
    backgroundColor: backgroundColor,
    borderRadius: `${borderRadius}px`,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
  };

  const fillStyle = {
    width: `${percentage}%`,
    height: '100%',
    backgroundColor: fillColor,
    transition: animated ? 'width 0.3s ease-in-out' : 'none',
    borderRadius: `${borderRadius}px`,
    position: 'relative',
    background: striped 
      ? `repeating-linear-gradient(
          45deg,
          ${fillColor},
          ${fillColor} 10px,
          rgba(255,255,255,0.1) 10px,
          rgba(255,255,255,0.1) 20px
        )`
      : fillColor
  };

  const textStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: `${Math.max(height * 0.6, 10)}px`,
    fontWeight: 'bold',
    color: percentage > 50 ? 'white' : '#333',
    textShadow: percentage > 50 ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none',
    zIndex: 1
  };

  const labelStyle = {
    marginBottom: '8px',
    fontSize: '28px',
    fontWeight: '500',
    color: '#333',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  return (
    <div className={className} style={{margin: '0px !important', padding: '0px !important'}}>
      {showRemainingDistance && (
        <div style={labelStyle}>
          <span>
            {remaining > 0 ? `${remaining.toLocaleString()}${unit} remaining` : 'Complete!'}
          </span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div style={containerStyle}>
        <div style={fillStyle} />
        {showPercentage && !showRemainingDistance && (
          <span style={textStyle}>
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  );
};

// Demo component to showcase the progress bar for distance tracking
const ProgressBarDemo = () => {
  const [progress1, setProgress1] = useState(0);
  const [milesWalked, setMilesWalked] = useState(2.3);
  const [kmRun, setKmRun] = useState(8.5);

  const dailyMileGoal = 10;
  const marathonGoal = 42.2; // 42.2 km marathon

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress1(prev => (prev >= 100 ? 0 : prev + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleMilesChange = (e) => {
    setMilesWalked(parseFloat(e.target.value));
  };

  const handleKmChange = (e) => {
    setKmRun(parseFloat(e.target.value));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px' }}>
      <h1>Distance Tracking Progress Bars</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h3>Daily Walking Goal</h3>
        <input 
          type="range" 
          min="0" 
          max={dailyMileGoal} 
          step="0.1"
          value={milesWalked}
          onChange={handleMilesChange}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
          Current: {milesWalked} miles
        </div>
        <ProgressBar 
          value={milesWalked} 
          max={dailyMileGoal}
          height={25}
          fillColor="#4CAF50"
          animated={true}
          showRemainingDistance={true}
          unit=" miles"
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Marathon Training Progress</h3>
        <input 
          type="range" 
          min="0" 
          max={marathonGoal} 
          step="0.1"
          value={kmRun}
          onChange={handleKmChange}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
          Distance completed: {kmRun} km
        </div>
        <ProgressBar 
          value={kmRun} 
          max={marathonGoal}
          height={30}
          fillColor="#FF5722"
          animated={true}
          showRemainingDistance={true}
          unit=" km"
          striped={true}
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Weekly Step Goal (Auto-updating Demo)</h3>
        <ProgressBar 
          value={progress1 * 100} 
          max={10000}
          height={20}
          fillColor="#2196F3"
          animated={true}
          showRemainingDistance={true}
          unit=" steps"
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Standard Progress Bar (No Distance Label)</h3>
        <ProgressBar 
          value={75} 
          height={25}
          fillColor="#9C27B0"
          animated={true}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
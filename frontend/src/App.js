import React, { useState, useEffect } from 'react';
import CountdownTimer from './CountdownTimer';

function App() {
  
  return (
    <div className="App">
      <h1>Workout Interval Timer</h1>
      <div>
        <h2>Rounds</h2>
        <button>Add round</button>
      </div>
      <br/>
      <button>Start Workout</button>
      <CountdownTimer initialSeconds={0} />
      <button>Reset</button>
    </div>
  );
}

export default App;

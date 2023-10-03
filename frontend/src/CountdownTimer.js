import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'

function CountdownTimer({ rounds }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [seconds, setSeconds] = useState(rounds[currentRound].round_duration);
  const [workoutInProgress, setWorkoutInProgress] = useState(true);

  useEffect(() => {
    if (seconds === 0) {
      if (currentRound < rounds.length - 1) {
        setCurrentRound(currentRound + 1);
        setSeconds(rounds[currentRound + 1].round_duration);
      } else {
        setWorkoutInProgress(false); 
      }
    }

    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds, currentRound, rounds]);

  return (
    <div className="container">
      {workoutInProgress ? (
        <div className='countdown'>
          <div>
            <p className='exercise'>{rounds[currentRound].exercise_name}</p>
          </div>
          <div className='seconds-div'>
            <p>{seconds}</p>
          </div>
        </div>
      ) : (
        <p className='workout-complete'>Workout Complete!</p>
      )}
    </div>
  );  
}

export default CountdownTimer;

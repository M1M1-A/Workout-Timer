import React, { useState, useEffect } from 'react';

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
    <div>
      {workoutInProgress ? (
        <div>
          <p>Exercise: {rounds[currentRound].exercise_name}</p>
          <p>Time remaining: {seconds} seconds</p>
        </div>
      ) : (
        <p>Workout Complete!</p>
      )}
    </div>
  );
}

export default CountdownTimer;

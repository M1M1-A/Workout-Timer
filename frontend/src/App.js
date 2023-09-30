import React, { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import "./App.css";

function App() {
  const [rounds, setRounds] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [roundDuration, setRoundDuration] = useState("");
  const [startWorkout, setStartWorkout] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/get_rounds");
        const data = await response.json();
        setRounds(data);
      } catch (error) {
        console.error("Fetch data failed", error);
      }
    }

    fetchData();
  }, []);

  const handleSaveRound = async () => {
    try {
      const roundDurationAsInt = parseInt(roundDuration, 10);

      const response = await fetch("/add_round", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exercise_name: exerciseName,
          round_duration: roundDurationAsInt,
        }),
      });

      if (response.ok) {
        setExerciseName("");
        setRoundDuration("");
        const updatedResponse = await fetch("/get_rounds");
        const updatedData = await updatedResponse.json();
        setRounds(updatedData);
      } else {
        console.error("Failed to add round");
      }
    } catch (error) {
      console.error("Save round error", error);
    }
  };

  const handleStartWorkout = () => {
    setStartWorkout(true);
  };

  const handleReset = async () => {
    const response = await fetch("/delete_all", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setRounds([]);
      setStartWorkout(false);
    }
  };

  return (
    <div className="App">
      <h1>Workout Interval Timer</h1>
      <h2>Round(s)</h2>
      {rounds.length > 0 ? (
        rounds.map((round, index) => (
          <div key={index}>
            <p>Round Number: {round.round_number}</p>
            <p>Exercise: {round.exercise_name}</p>
            <p>Duration: {round.round_duration}</p>
          </div>
        ))
      ) : (
        <p>No rounds available. Add round to get started</p>
      )}
      <div>
        <label>
          Exercise Name:
          <input
            id='exercise_name'
            type="text"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Round Duration:
          <input
            id='round_duration'
            type="text"
            value={roundDuration}
            onChange={(e) => setRoundDuration(e.target.value)}
          />
        </label>
        <br />
        <button id='add_round' onClick={handleSaveRound}>Add Round</button>
      </div>
      <br />
      <button id="start-workout" onClick={handleStartWorkout}>
        Start Workout
      </button>
      {startWorkout && (
        <div>
          <CountdownTimer rounds={rounds}/>
        </div>
      )}
      <br />
      <button id="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default App;

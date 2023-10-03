import React, { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import "./App.css";

function App() {
  const [rounds, setRounds] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [error, setError] = useState("")
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
        setError("");
        const updatedResponse = await fetch("/get_rounds");
        const updatedData = await updatedResponse.json();
        setRounds(updatedData);
      } else {
        const errorData = await response.json()
        setError(errorData.message)
        console.error("Failed to add round")
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
      setError("")
    }
  };

  return (
    <div className="App">
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <h1>Workout Interval Timer</h1>
      <h2>Round(s)</h2>
      <div className="info-container">
        <div className="round-info">
          <p className="column-name">Round Number</p>
        </div>
        <div>
          <p className="column-name">Exercise</p>
        </div>
        <div>
          <p className="column-name">Duration (seconds)</p>
        </div>
      </div>
      {rounds.length > 0 ? (
        rounds.map((round, index) => (
          <div className='info-container' key={index}>
            <div className="round-info">
              <p className="info-field">{round.round_number}</p>
            </div>
            <div>
              <p className="info-field">{round.exercise_name}</p>
            </div>
            <div>
              <p className="info-field">{round.round_duration}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="no-rounds">No rounds available. Add round to get started</p>
      )}
      <div className="input-fields">
        <div className="empty-div"></div>
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
          Duration (seconds):
          <input
            id='round_duration'
            type="text"
            value={roundDuration}
            onChange={(e) => setRoundDuration(e.target.value)}
          />
        </label>
        <br />
        <button id='add_round' onClick={handleSaveRound}>+</button>
      </div>
      {error && <div className="error-message">{error}</div>}
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

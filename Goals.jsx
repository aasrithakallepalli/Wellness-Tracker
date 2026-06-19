import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Goals() {
  const [exerciseGoal, setExerciseGoal] = useState("");
  const [sleepGoal, setSleepGoal] = useState("");
  const [waterGoal, setWaterGoal] = useState("");
  const [savedGoals, setSavedGoals] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    // load saved goals
    const username = localStorage.getItem("username");
    const allGoals = JSON.parse(localStorage.getItem("goals")) || [];
    const userGoal = allGoals.find(g => g.username === username);
    if (userGoal) {
      setSavedGoals(userGoal);
    }
  }, []);

  const handleSaveGoals = () => {
    if (!exerciseGoal || !sleepGoal || !waterGoal) {
      alert("Please fill all goal fields");
      return;
    }

    const username = localStorage.getItem("username");
    const allGoals = JSON.parse(localStorage.getItem("goals")) || [];

    // check if user already has goals
    const existingIndex = allGoals.findIndex(g => g.username === username);

    const newGoal = { username, exerciseGoal, sleepGoal, waterGoal };

    if (existingIndex !== -1) {
      allGoals[existingIndex] = newGoal;
    } else {
      allGoals.push(newGoal);
    }

    localStorage.setItem("goals", JSON.stringify(allGoals));
    setSavedGoals(newGoal);
    alert("Goals saved successfully!");
  };

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", padding: "120px" }}>
        <h2>Set My Wellness Goals</h2>

        {/* Show current saved goals */}
        {savedGoals && (
          <div className="highlights" style={{ marginBottom: "30px" }}>
            <h3>Current Goals</h3>
            <p>🏋️ Exercise: {savedGoals.exerciseGoal} mins/day</p>
            <p>😴 Sleep: {savedGoals.sleepGoal} hrs/night</p>
            <p>💧 Water: {savedGoals.waterGoal} L/day</p>
          </div>
        )}

        <input
          type="number"
          placeholder="Daily Exercise Goal (minutes)"
          value={exerciseGoal}
          onChange={(e) => setExerciseGoal(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Daily Sleep Goal (hours)"
          value={sleepGoal}
          onChange={(e) => setSleepGoal(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Daily Water Goal (liters)"
          value={waterGoal}
          onChange={(e) => setWaterGoal(e.target.value)}
        />
        <br /><br />

        <button onClick={handleSaveGoals}>Save Goals</button>
      </div>
      <Footer />
    </>
  );
}

export default Goals;

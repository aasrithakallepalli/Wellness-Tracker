import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function LogActivity() {
  const [activityType, setActivityType] = useState("Exercise");
  const [duration, setDuration] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [waterLiters, setWaterLiters] = useState("");
  const [mood, setMood] = useState("Good");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleLog = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    if (!duration || !sleepHours || !waterLiters) {
      alert("Please fill all required fields");
      return;
    }

    // get existing activities
    const activities = JSON.parse(localStorage.getItem("activities")) || [];

    // save new activity entry
    const newEntry = {
      activityType,
      duration,
      sleepHours,
      waterLiters,
      mood,
      notes,
      date: new Date().toLocaleDateString(),
      username: localStorage.getItem("username")
    };

    activities.push(newEntry);
    localStorage.setItem("activities", JSON.stringify(activities));

    alert("Activity logged successfully!");
    navigate("/dashboard");
  };

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", padding: "120px" }}>
        <h2>Log Today's Activity</h2>

        <label>Activity Type:</label><br />
        <select value={activityType} onChange={(e) => setActivityType(e.target.value)}>
          <option>Exercise</option>
          <option>Yoga</option>
          <option>Walking</option>
          <option>Running</option>
          <option>Cycling</option>
          <option>Swimming</option>
        </select>
        <br /><br />

        <input
          type="number"
          placeholder="Exercise Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Sleep Hours"
          value={sleepHours}
          onChange={(e) => setSleepHours(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Water Intake (liters)"
          value={waterLiters}
          onChange={(e) => setWaterLiters(e.target.value)}
        />
        <br /><br />

        <label>Mood:</label><br />
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option>Excellent</option>
          <option>Good</option>
          <option>Okay</option>
          <option>Tired</option>
          <option>Stressed</option>
        </select>
        <br /><br />

        <input
          type="text"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <br /><br />

        <button onClick={handleLog}>Log Activity</button>
      </div>
      <Footer />
    </>
  );
}

export default LogActivity;

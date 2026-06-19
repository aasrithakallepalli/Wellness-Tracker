import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("activities")) || [];
    const username = localStorage.getItem("username");

    // filter only current user's activities
    const userActivities = stored.filter(a => a.username === username);
    setActivities(userActivities);
  }, []);

  // Total exercise minutes
  let totalExercise = 0;
  activities.forEach(item => {
    totalExercise += parseInt(item.duration) || 0;
  });

  // Average sleep
  let totalSleep = 0;
  activities.forEach(item => {
    totalSleep += parseFloat(item.sleepHours) || 0;
  });
  const avgSleep = activities.length > 0 ? (totalSleep / activities.length).toFixed(1) : 0;

  // Total water intake
  let totalWater = 0;
  activities.forEach(item => {
    totalWater += parseFloat(item.waterLiters) || 0;
  });

  // Wellness Score
  const wellnessScore = activities.length > 0
    ? Math.min(100, Math.round((totalExercise / 10) + (avgSleep * 5) + (totalWater * 3)))
    : 0;

  // delete activity entry
  const removeActivity = (indexToRemove) => {
    const updatedActivities = activities.filter((_, index) => index !== indexToRemove);
    setActivities(updatedActivities);

    const allActivities = JSON.parse(localStorage.getItem("activities")) || [];
    const username = localStorage.getItem("username");
    const otherActivities = allActivities.filter(a => a.username !== username);
    localStorage.setItem("activities", JSON.stringify([...otherActivities, ...updatedActivities]));
  };

  return (
    <>
      <Header />

      <div style={{ paddingTop: "120px", paddingBottom: "80px", textAlign: "center" }}>
        <h1>My Wellness Dashboard</h1>

        {/* Summary Stats */}
        <div className="stats">
          <div className="stat-card">
            <h3>🏋️ Total Exercise</h3>
            <p>{totalExercise} mins</p>
          </div>
          <div className="stat-card">
            <h3>😴 Avg Sleep</h3>
            <p>{avgSleep} hrs</p>
          </div>
          <div className="stat-card">
            <h3>💧 Total Water</h3>
            <p>{totalWater} L</p>
          </div>
          <div className="stat-card">
            <h3>⭐ Wellness Score</h3>
            <p>{wellnessScore} / 100</p>
          </div>
        </div>

        <h2 style={{ marginTop: "40px" }}>Activity Log</h2>

        {activities.length === 0 ? (
          <h3>No activities logged yet. <a href="/log">Log your first activity!</a></h3>
        ) : (
          <div className="activities">
            {activities.map((item, index) => (
              <div className="activity-card" key={index}>
                <h3>{item.activityType}</h3>
                <p>📅 Date: {item.date}</p>
                <p>⏱ Duration: {item.duration} mins</p>
                <p>😴 Sleep: {item.sleepHours} hrs</p>
                <p>💧 Water: {item.waterLiters} L</p>
                <p>😊 Mood: {item.mood}</p>
                {item.notes && <p>📝 Notes: {item.notes}</p>}

                <button onClick={() => removeActivity(index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;

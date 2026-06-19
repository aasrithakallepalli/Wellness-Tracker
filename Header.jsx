import { Link, useNavigate } from "react-router-dom";

function Header() {
  const name = localStorage.getItem("username");
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.clear();   // deletes EVERYTHING from localStorage
  //   navigate("/");          // redirect to home page
  // };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");

    navigate("/");
  };

  return (
    <header>
      <h1>🏃 Welcome to WellnessTracker</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/log">Log Activity</Link>
        <Link to="/goals">Goals</Link>

        {/* Show Logout only if logged in */}
        {name ? <button onClick={handleLogout}>Logout</button> : null}
      </nav>

      {/* <div id="user-display">Welcome, User</div> */}
      <div id="user-display">
        {name ? `Welcome, ${name}` : ""}
      </div>
    </header>
  );
}

export default Header;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleLogin = () => {
  //   // Simple validation (you can connect DB later)
  //   if (username === "student1" && password === "123") {
  //     localStorage.setItem("isLoggedIn", "true");
  //     localStorage.setItem("username", username);
  //     navigate("/dashboard");
  //   } else {
  //     alert("Invalid username or password");
  //   }
  // };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      u => u.username === username && u.password === password
    );

    if (validUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", padding: "120px" }}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button onClick={handleLogin}>Login</button>

        {/* signup link */}
        <p>
          New user? <Link to="/signup">Register here</Link>
        </p>

      </div>
      <Footer />
    </>
  );
}

export default Login;

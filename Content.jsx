import { Link } from "react-router-dom";

function Content() {
  return (
    <section className="content">
      <h2>Track Your Wellness Journey!</h2>
      <p>Monitor sleep, hydration, exercise and mental health all in one place</p>

      <Link to="/login" className="btn">
        Get Started
      </Link>
    </section>
  );
}

export default Content;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggles between login and sign-up
  const [isStudent, setIsStudent] = useState(true); // Toggles between student and admin
  const [formData, setFormData] = useState({
    organization: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // To handle navigation after login/sign-up

  // Handle form data change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (for both login and sign-up)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    // Perform login/signup logic here

    // For demo purposes, navigate to home after submission
    navigate("/");
  };

  // Toggle between login and sign-up
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  // Toggle between student and educator
  const toggleRole = () => {
    setIsStudent(!isStudent);
  };

  return (
    <div className="auth-container">
      <h1>
        {isSignUp
          ? isStudent
            ? "Student Sign Up"
            : "Educator Sign Up"
          : isStudent
          ? "Student Log In"
          : "Educator Log In"}
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Always show Organization field for both student and educator */}
        <div>
          <label>Organization</label>
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="Organization"
            required={isSignUp} // Only required during sign-up
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>

        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">
          {isSignUp ? "Sign Up" : "Login"}
        </button>
      </form>

      <div className="switch">
        {isStudent ? (
          <p>
            Not a student?{" "}
            <a onClick={toggleRole}>Educator {isSignUp ? "Sign Up" : "Log In"}</a>
          </p>
        ) : (
          <p>
            Not an educator?{" "}
            <a onClick={toggleRole}>Student {isSignUp ? "Sign Up" : "Log In"}</a>
          </p>
        )}

        <p>
          {isSignUp ? (
            <a onClick={toggleSignUp}>Already have an account? Log In</a>
          ) : (
            <a onClick={toggleSignUp}>Don't have an account? Sign Up</a>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

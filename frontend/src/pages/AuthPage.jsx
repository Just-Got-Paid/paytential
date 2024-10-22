import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHandler } from "../utils/fetchingUtils";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggles between login and sign-up
  const [isStudent, setIsStudent] = useState(true); // Toggles between student and admin
  const [formData, setFormData] = useState({
    organization: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle form data change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (for both login and sign-up)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    try {
      const url = isSignUp ? "/api/sign-up" : "/api/login"; // Adjust URL based on sign-up or login
      const [data, error] = await fetchHandler(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (data) {
        const userId = data.id; 
        navigate(`/users/${userId}`);
      } else {
        console.error("Authentication failed:", error);
      }
    } catch (error) {
      console.error("Error occurred during authentication:", error);
    }
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
        {/* Show Organization and Email fields only during sign-up */}
        {isSignUp && (
          <>
            <div>
              <label>Organization</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Organization"
                required
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
          </>
        )}

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

      {/* Links for toggling between Student and Educator, and Sign Up vs Log In */}
      <div className="switch">
        <p>
          {isStudent ? `Not a student?` : `Not an educator?`}{" "}
          <a
            onClick={toggleRole}
            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Switch to {isStudent ? "Educator" : "Student"}
          </a>
        </p>
        <p>
          {isSignUp ? `Already have an account?` : `Don't have an account?`}{" "}
          <a
            onClick={toggleSignUp}
            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHandler } from "../utils/fetchingUtils";

const AuthPage = ({ isSignUp, isStudent, toggleSignUp, toggleRole }) => {
  const [formData, setFormData] = useState({
    organization: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignUp ? "/api/sign-up" : "/api/login";
    try {
      const [data, error] = await fetchHandler(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (data) {
        navigate(`/users/${data.id}`);
      } else {
        console.error("Authentication failed:", error);
      }
    } catch (error) {
      console.error("Error occurred during authentication:", error);
    }
  };

  return (
    <div className="auth-container">
      <h1>{isSignUp ? (isStudent ? "Student Sign Up" : "Educator Sign Up") : (isStudent ? "Student Log In" : "Educator Log In")}</h1>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <>
            <div>
              <label>Organization</label>
              <input type="text" name="organization" value={formData.organization} onChange={handleChange} required />
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </>
        )}
        <div>
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
      </form>

      <div className="switch">
        <p>{isStudent ? `Not a student?` : `Not an educator?`} <a onClick={toggleRole}>Switch to {isStudent ? "Educator" : "Student"}</a></p>
        <p>{isSignUp ? `Already have an account?` : `Don't have an account?`} <a onClick={toggleSignUp}>{isSignUp ? "Log In" : "Sign Up"}</a></p>
      </div>
    </div>
  );
};

export default AuthPage;

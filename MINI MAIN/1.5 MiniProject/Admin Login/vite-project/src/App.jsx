import React, { useState } from "react";
import axios from "axios";

const AdminLoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:3000/AdminLogin",
        {
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Login successful!");
      console.log("Login response:", response.data);

      setTimeout(() => {
        window.location.href = "CRUD.html";

      }, 1000);
      
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.response?.data?.error || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <img src="./CBSELogo.png" alt="CBSE Logo" className="logo" />
        <h1>Admin Login</h1>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <h2>Enter Admin Credentials</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Processing..." : "Login"}
        </button>
      </form>

      <footer className="footer">
        &copy; 2025 CBSE Admin Services. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminLoginForm;

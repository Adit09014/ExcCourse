import React, { useState } from "react";
import axios from "axios";

const StudentResultForm = () => {
  const [formData, setFormData] = useState({
    rollno: "",
    schoolId: "",
    field: "",
    value: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/AdminUpdate",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Success");
    } catch (error) {
      console.error("Error updating data:", error);
      alert(error.response?.data?.error || "Failed to update student record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <img src="./CBSELogo.png" alt="CBSE Logo" className="logo" />
        <h1>Update Student Record</h1>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <h2>Enter Student Details</h2>

        <div className="form-group">
          <label>Roll Number:</label>
          <input
            type="text"
            name="rollno"
            placeholder="Enter Roll Number"
            value={formData.rollno}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>School ID:</label>
          <input
            type="text"
            name="schoolId"
            placeholder="Enter School ID"
            value={formData.schoolId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Field to Update:</label>
          <input
            type="text"
            name="field"
            placeholder="Enter Field Name"
            value={formData.field}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>New Value:</label>
          <input
            type="text"
            name="value"
            placeholder="Enter New Value"
            value={formData.value}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Processing..." : "Update Student"}
        </button>
      </form>

      <footer className="footer">
        &copy; 2025 CBSE Result Services. All rights reserved.
      </footer>
    </div>
  );
};

export default StudentResultForm;

import React, { useState } from "react";
import axios from "axios";

const StudentResultForm = () => {
  const [formData, setFormData] = useState({
    rollno: "",
    name: "",
    mothername: "",
    fathername: "",
    dob: "",
    school: "",
    schoolId: "",
    subjects: Array.from({ length: 6 }, () => ({
      subjectcode: "",
      subjectname: "",
      theory: "",
      practical: "",
      total: "",
      totalinwords: "",
      positionalgrade: ""
    })),
    result: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const flattenedSubjects = {};
    formData.subjects.forEach((subject, index) => {
      const subjectNum = index + 1;
      flattenedSubjects[`subjectcode${subjectNum}`] = subject.subjectcode;
      flattenedSubjects[`subjectname${subjectNum}`] = subject.subjectname;
      flattenedSubjects[`theory${subjectNum}`] = subject.theory;
      flattenedSubjects[`practical${subjectNum}`] = subject.practical;
      flattenedSubjects[`total${subjectNum}`] = subject.total;
      flattenedSubjects[`totalinwords${subjectNum}`] = subject.totalinwords;
      flattenedSubjects[`positionalgrade${subjectNum}`] = subject.positionalgrade;
    });

    const finalData = { ...formData, ...flattenedSubjects };
    delete finalData.subjects;

    try {
      await axios.post("http://localhost:3000/fillResult", finalData);
      alert("Student Data Submitted Successfully");
    } catch (error) {
      console.error("Error submitting data", error);
      alert("Done");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <img src="./CBSEimage.png" alt="CBSE Logo" className="logo" />
        <h1>Student Result Addition Portal</h1>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <h2>Student Result Details</h2>
        {['rollno', 'name', 'mothername', 'fathername', 'dob', 'school', 'schoolId'].map((field, index) => (
          <div key={index} className="form-group">
            <label>{field.replace(/([A-Z])/g, ' $1')}:</label>
            <input 
              type={field === "dob" ? "date" : "text"}
              name={field} 
              placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`} 
              onChange={handleChange} 
              required 
            />
          </div>
        ))}

        <h3>Subjects and Grades</h3>
        {formData.subjects.map((subject, i) => (
          <div key={i} className="subject-section">
            <h4>Subject {i + 1}</h4>
            {['subjectcode', 'subjectname', 'theory', 'practical', 'total', 'totalinwords', 'positionalgrade'].map((field, j) => (
              <div key={j} className="form-group">
                <label>{field.replace(/([A-Z])/g, ' $1')}:</label>
                <input 
                  type={['theory', 'practical', 'total'].includes(field) ? "number" : "text"} 
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`} 
                  onChange={(e) => {
                    const { value } = e.target;
                    setFormData((prevData) => {
                      const updatedSubjects = [...prevData.subjects];
                      updatedSubjects[i] = { ...updatedSubjects[i], [field]: value };
                      return { ...prevData, subjects: updatedSubjects };
                    });
                  }}
                  required 
                />
              </div>
            ))}
          </div>
        ))}

        <div className="form-group">
          <label>Final Result:</label>
          <input 
            type="text" 
            name="result"
            placeholder="Enter Result Status" 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit" className="submit-btn">SUBMIT</button>
      </form>

      <footer className="footer">
        &copy; 2025 CBSE Result Services. All rights reserved.
      </footer>
    </div>
  );
};

export default StudentResultForm;

import { useEffect, useState } from 'react';
import CBSEtop from '../CBSEtop.jpg';
import './App.css';
import ResultPage from './Result'; 
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const rollNumber = document.getElementById('rollNumber').value;
    const schoolId = document.getElementById('schoolId').value;

    setIsLoading(true);
    setErrorMessage('');

    axios.get('http://localhost:3000/students', {
      params: {
        rollno: rollNumber,
        schoolId: schoolId,
      }
    })
      .then(response => {
        if (response.data && response.data.length > 0) {
          setFormData({ rollNumber, schoolId });
        } else {
          setErrorMessage('Incorrect Roll Number or School ID. Please try again.');
        }
      })
      .catch(err => {
        console.log(err);
        setErrorMessage('Incorrect Credentials. Please try again.');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <header style={{ backgroundColor: 'cyan', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', height: '100px' }}>
        <img src={CBSEtop} style={{ height: '100px', width: '450px', marginLeft: '20px' }} alt="CBSE Logo" />
        <p style={{ fontSize: '40px', color: 'white', marginRight: '20px' }}>Examination Results 2024</p>
      </header>

      {formData ? (
        <ResultPage rollNumber={formData.rollNumber} schoolId={formData.schoolId} />
      ) : (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p style={{ fontWeight: 'bold', fontSize: '40px' }}>Senior School Certificate Examination (Class XII) Results 2024</p>
          <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <label style={{ fontSize: '20px', width: '200px', textAlign: 'left', marginRight: '20px' }}>Enter Your Roll No.: </label>
              <input 
                type="text" 
                id="rollNumber"
                placeholder="Roll Number" 
                style={{ height: '30px', width: '400px' }}
                required
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <label style={{ fontSize: '20px', width: '200px', textAlign: 'left', marginRight: '20px' }}>Enter Your School ID: </label>
              <input 
                type="text" 
                id="schoolId"
                placeholder="School ID"
                required
                style={{ height: '30px', width: '400px' }}
              />
            </div>
            {errorMessage && (
              <p style={{ color: 'red', fontSize: '18px' }}>{errorMessage}</p>
            )}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button type="submit" style={{ marginRight: '10px', backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }} disabled={isLoading}>
                {isLoading ? 'Checking...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
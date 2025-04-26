import { useEffect, useState } from 'react';
import axios from 'axios';

function ResultPage({ rollNumber, schoolId }) {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/students', {
      params: {
        rollno: rollNumber,
        schoolId: schoolId,
      }
    })
      .then(response => {
        if (response.data && response.data.length > 0) {
          setUsers(response.data);
        } else {
          setErrorMessage('No data found for the given Roll No and School ID');
        }
      })
      .catch(err => {
        setErrorMessage('Error fetching data. Please try again later.');
        console.log(err);
      });
  }, [rollNumber, schoolId]);

  if (errorMessage) {
    return <div style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</div>;
  }

  return (
    <div>
      {users.length > 0 ? (
        users.map(user => (
          <div key={user.rollno}>
            <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
              This is to certify that <span style={{ marginLeft: '20px', fontWeight: 'lighter', textTransform: 'uppercase' }}>{user.name}</span>
            </p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Roll No: <span style={{ marginLeft: '20px', fontWeight: 'lighter', textTransform: 'uppercase' }}>{user.rollno}</span></p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Mother's Name: <span style={{ marginLeft: '20px', fontWeight: 'lighter', textTransform: 'uppercase' }}>{user.mothername}</span></p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Father's Name: <span style={{ marginLeft: '20px', fontWeight: 'lighter', textTransform: 'uppercase' }}>{user.fathername}</span></p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>School: <span style={{ marginLeft: '20px', fontWeight: 'lighter', textTransform: 'uppercase' }}>{user.school}</span></p>
            
            <table border={1} style={{ width: '100%' }}>
              <thead>
                <tr style={{backgroundColor:'blue'}}> 
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Theory</th>
                  <th>Practical</th>
                  <th>Total</th>
                  <th>Total (in words)</th>
                  <th>Positional Grade</th>
                </tr>
              </thead>
              <tbody>
                {['1', '2', '3', '4', '5', '6'].map(index => (
                  <tr key={`${user.rollno}-${index}`}>
                    <td>{user[`subjectcode${index}`]}</td>
                    <td>{user[`subjectname${index}`]}</td>
                    <td>{user[`theory${index}`]}</td>
                    <td>{user[`practical${index}`]}</td>
                    <td>{user[`total${index}`]}</td>
                    <td>{user[`totalinwords${index}`]}</td>
                    <td>{user[`positionalgrade${index}`]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
             RESULT:- <span style={{ marginLeft: '20px', fontWeight: 'lighter', textTransform: 'uppercase' }}>{user.result}</span>
            </p>
          </div>
        ))
      ) : (
        <div>No student data available.</div>
      )}
    </div>
  );
}

export default ResultPage;

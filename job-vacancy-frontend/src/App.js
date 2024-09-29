import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobList from './components/JobList';
import AddJob from './components/AddJob';


function App() {
  // eslint-disable-next-line
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <Router>
      <div>
        <h1 className="text-center mt-4">Job Vacancy Advertising</h1>
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/add" element={<AddJob />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

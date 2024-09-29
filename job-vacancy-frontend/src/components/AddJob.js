// src/components/AddJob.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newJob = { title, description, company, location, salary };
      await axios.post('http://localhost:5000/api/jobs', newJob);
      // Optionally redirect to the job listings page after submission
      navigate('/'); // Redirect to home page after adding a job
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleReturn = () => {
    navigate('/'); // Navigate back to job listings page
  };

  return (
    <div className="container mt-4">
      <h2>Add Job Listing</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Company</label>
          <input
            type="text"
            className="form-control"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            type="number"
            className="form-control"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Job</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={handleReturn}>
          Return
        </button>
      </form>
    </div>
  );
};

export default AddJob;

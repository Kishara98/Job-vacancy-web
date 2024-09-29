// src/components/JobList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const JobList = () => {
    // eslint-disable-next-line
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data);
        setFilteredJobs(response.data); // Initialize filtered jobs with all jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Handle search input from the Navbar component
  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/jobs/search?searchTerm=${searchTerm}`);
      setFilteredJobs(response.data); // Update the displayed jobs with the search result
    } catch (error) {
      console.error('Error searching jobs:', error);
    }
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="container mt-4">
        <h2>Job Listings</h2>
        {/* Check if there are any filtered jobs */}
        {filteredJobs.length === 0 ? (
          <p>No job listings found.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Company</th>
                <th>Location</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.description}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td>{job.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default JobList;

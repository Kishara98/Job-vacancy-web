// src/components/Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Call the parent search handler
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">JobFinder</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">Post a Job</Link>
            </li>
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title, company, location..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </li>
          </ul>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

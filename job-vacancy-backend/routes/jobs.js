const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

// Create a new job listing
router.post('/', async (req, res) => {
  const { title, description, company, location, salary } = req.body;

  try {
    const newJob = new Job({ title, description, company, location, salary });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error });
  }
});

// Get all job listings
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
});

// Search for jobs
// router.get('/search', async (req, res) => {
//   const { title, company, location } = req.query;

//   // Build the search criteria
//   let query = {};
//   if (title) {
//     query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
//   }
//   if (company) {
//     query.company = { $regex: company, $options: 'i' };
//   }
//   if (location) {
//     query.location = { $regex: location, $options: 'i' };
//   }

//   try {
//     const jobs = await Job.find(query);
//     res.status(200).json(jobs);
//   } catch (error) {
//     res.status(500).json({ message: 'Error searching jobs', error });
//   }
// });
router.get('/search', async (req, res) => {
  const { searchTerm } = req.query;  // Extract search term from query

  // Search across title, company, and location with a single term
  let query = {};
  if (searchTerm) {
    query = {
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { company: { $regex: searchTerm, $options: 'i' } },
        { location: { $regex: searchTerm, $options: 'i' } }
      ]
    };
  }

  try {
    const jobs = await Job.find(query); // Find jobs matching the query
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error searching jobs', error });
  }
});



// Update a job listing
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, company, location, salary } = req.body;
  
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { title, description, company, location, salary },
      { new: true, runValidators: true } // Return the updated document and validate
    );
  
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
  
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error });
  }
});

  
module.exports = router;

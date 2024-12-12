// Backend: Node.js (Express) with MySQL
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'ott_user', 
    password: 'your_password', 
    database: 'ott_db' 
  });
  

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create Profiles Table (Run this once to initialize)
const createTable = `
CREATE TABLE IF NOT EXISTS Profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  avatar TEXT,
  language VARCHAR(50),
  content_preferences TEXT
);
`;

db.query(createTable, err => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Profiles table ready');
  }
});

// Get all profiles
app.get('/profiles', (req, res) => {
  db.query('SELECT * FROM Profiles', (err, results) => {
    if (err) {
      console.error('Error fetching profiles:', err);
      res.status(500).send('Error fetching profiles');
    } else {
      res.json(results);
    }
  });
});

// Get a single profile
app.get('/profiles/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Profiles WHERE id = ?', [id], (err, results) => {
    if (err || results.length === 0) {
      console.error('Profile not found:', err);
      res.status(404).send('Profile not found');
    } else {
      res.json(results[0]);
    }
  });
});

// Create a new profile
app.post('/profiles', (req, res) => {
  const { name, avatar, language, contentPreferences } = req.body;
  const preferences = JSON.stringify(contentPreferences);
  db.query(
    'INSERT INTO Profiles (name, avatar, language, content_preferences) VALUES (?, ?, ?, ?)',
    [name, avatar, language, preferences],
    (err, results) => {
      if (err) {
        console.error('Error creating profile:', err);
        res.status(500).send('Error creating profile');
      } else {
        res.status(201).json({ id: results.insertId, name, avatar, language, contentPreferences });
      }
    }
  );
});

// Update a profile
app.put('/profiles/:id', (req, res) => {
  const { id } = req.params;
  const { name, avatar, language, contentPreferences } = req.body;
  const preferences = JSON.stringify(contentPreferences);
  db.query(
    'UPDATE Profiles SET name = ?, avatar = ?, language = ?, content_preferences = ? WHERE id = ?',
    [name, avatar, language, preferences, id],
    (err, results) => {
      if (err) {
        console.error('Error updating profile:', err);
        res.status(500).send('Error updating profile');
      } else {
        res.json({ id, name, avatar, language, contentPreferences });
      }
    }
  );
});

// Delete a profile
app.delete('/profiles/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Profiles WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error deleting profile:', err);
      res.status(500).send('Error deleting profile');
    } else {
      res.status(204).send();
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Frontend: React (Profile Page)
const React = require('react');
const { useState, useEffect } = require('react');
import axios from 'axios';

const ProfilePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/profiles')
      .then(response => setProfiles(response.data))
      .catch(error => console.error('Error fetching profiles:', error));
  }, []);

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
  };

  return (
    <div className="profile-page">
      <h1>Profile Management</h1>
      <div className="profile-list">
        <h2>Profiles</h2>
        {profiles.map(profile => (
          <div key={profile.id} onClick={() => handleProfileSelect(profile)} className="profile-card">
            <img src={profile.avatar} alt={`${profile.name}'s avatar`} />
            <h3>{profile.name}</h3>
          </div>
        ))}
      </div>
      {selectedProfile && (
        <div className="profile-details">
          <h2>Profile Details</h2>
          <p><strong>Name:</strong> {selectedProfile.name}</p>
          <p><strong>Language:</strong> {selectedProfile.language}</p>
          <p><strong>Content Preferences:</strong> {selectedProfile.contentPreferences.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

module.exports= ProfilePage;

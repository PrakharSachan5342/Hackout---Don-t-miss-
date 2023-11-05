const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Simulation of destinations and travel costs
const destinations = {
  'New York': {
    travelTime: '5 hours',
    flightCost: '$300'
  },
  'Los Angeles': {
    travelTime: '4 hours',
    flightCost: '$250'
  },
  // Add more destinations as needed
};

// Existing code...

// Simulated hostel data for different destinations
const hostelsData = {
  'New York': ['Hostel A', 'Hostel B', 'Hostel C'],
  'Los Angeles': ['Hostel X', 'Hostel Y', 'Hostel Z'],
  // Add more destinations and their associated hostels
};

// Endpoint for handling user's options after login
app.post('/user-options', (req, res) => {
  const { option } = req.body;

  if (option === 'travel cost') {
    res.json({ message: 'Please enter source and destination for travel cost calculation' });
  } else if (option === 'trip planner') {
    res.json({ message: 'Please enter source and destination for trip planning' });
  } else {
    res.status(400).json({ message: 'Invalid option' });
  }
});

// Endpoint for travel cost calculation
app.post('/travel-cost', (req, res) => {
  const { source, destination } = req.body;

  const selectedDestination = destinations[destination];

  if (selectedDestination) {
    const { travelTime, flightCost } = selectedDestination;
    res.json({ travelTime, flightCost });
  } else {
    res.status(400).json({ message: 'Invalid source or destination' });
  }
});

// Endpoint for user to select a hostel after viewing travel cost and time
app.post('/select-hostel', (req, res) => {
  const { destination } = req.body;
  const selectedHostels = hostelsData[destination];

  if (selectedHostels) {
    res.json({ hostels: selectedHostels });
  } else {
    res.status(400).json({ message: 'No hostels found for the selected destination' });
  }
});

// Listen to the port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const otpGenerator = require('otp-generator');

const app = express();
app.use(bodyParser.json());

// Database simulation (replace with an actual database in a real application)
const users = [];

// Endpoint for user signup
app.post('/signup', (req, res) => {
  const { name, password, phoneNumber } = req.body;

  // Generate OTP
  const generatedOTP = otpGenerator.generate(6, { upperCase: false, specialChars: false });

  // Simulate storing user data
  users.push({ name, password, phoneNumber, otp: generatedOTP });

  // Send OTP to phoneNumber (in a real scenario, use a service like Twilio to send SMS)
  console.log(OTP for ${phoneNumber}: ${generatedOTP});

  res.json({ message: 'OTP sent successfully' });
});

// Endpoint for user login
app.post('/login', (req, res) => {
  const { name, password } = req.body;

  // Check if user exists
  const foundUser = users.find(user => user.name === name && user.password === password);

  if (foundUser) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

const PORT = 3000; // Set the port where your server will run
app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});

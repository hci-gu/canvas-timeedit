const path = require('path');
const express = require('express');
const lti = require('ltijs').Provider;

// Setup an express app
const app = express();

// 1. Initialize LTI Provider
lti.setup(
  'LTIKEY', // Replace with a unique key
//   { url: 'mongodb://localhost/ltijsdb', connection: { useUnifiedTopology: true } }, // Database configuration
  { url: 'sqlite://:memory:' },
  {
    appUrl: '/', // App launch endpoint
    loginUrl: '/login', // Login endpoint
    keysetUrl: '/keys', // JWKS keys endpoint
  }
);

// 2. Define the main route (launch endpoint)
lti.onConnect((token, req, res) => {
  console.log('LTI Launch Successful:', token);
  return res.send('LTI Tool successfully launched!');
});

// 3. Setup a "deep linking" route (optional)
lti.onDeepLinking((token, req, res) => {
  console.log('Deep Linking Launched');
  return res.send('Deep Linking Response');
});

// 4. Deploy the server
const setup = async () => {
  await lti.deploy({ serverless: false, expressApp: app, port: 3000 });
  console.log('LTI.js Tool running on http://localhost:3000');
};

setup();

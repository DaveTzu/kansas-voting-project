require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/electionQuery', async (req, res) => {
  try {
    const response = await axios.get('https://www.googleapis.com/civicinfo/v2/elections', {
      params: {
        key: process.env.GOOGLE_CIVIC_API_KEY
      }
    });

    const electionData = response.data;
    res.json(electionData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching election data' });
  }
});

app.get('/voterInfoQuery', async (req, res) => {
  const electionId = 2000;
  const address = '1701 HORACE ST NEW ORLEANS LA'; // Replace with user input or a latitude and longitude coordinate
  
  try {
    const response = await axios.get('https://www.googleapis.com/civicinfo/v2/voterinfo', {
      params: {
        key: process.env.GOOGLE_CIVIC_API_KEY,
        electionId: electionId,
        address: address,
      },
    });

    const voterInfoData = response.data;
    res.json(voterInfoData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching voter information' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

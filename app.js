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

app.get('/test', (req, res) => {
  const testDataString = `{
    "election": {
      "id": "2000",
      "name": "VIP Test Election",
      "electionDay": "2025-06-06",
      "ocdDivisionId": "ocd-division/country:us"
    },
    "contests": [{
        "type": "General",
        "office": "US Senator",
        "level": ["country"],
        "roles": ["legislatorUpperBody"],
        "district": {
          "name": "Louisiana",
          "scope": "statewide",
          "id": "ocd-division/country:us/state:la"
        },
        "sources": [{
          "name": "Ballot Information Project",
          "official": false
        }],
        "candidates": [{
            "name": "Wayne Ables",
            "party": "Democratic",
            "candidateUrl": "http://wayneables.com/",
            "phone": "337-342-5029"
          },
          {
            "name": "'Bill' Cassidy",
            "party": "Republican",
            "candidateUrl": "http://billcassidy.com/",
            "phone": "225-346-6858",
            "channels": [{
                "type": "Facebook",
                "id": "https://www.facebook.com/billcassidy"
              },
              {
                "type": "Twitter",
                "id": "https://twitter.com/billcassidy"
              },
              {
                "type": "YouTube",
                "id": "https://www.youtube.com/channel/UCumamw48HaIRUbM3KbNc2qw"
              }
            ]
          },
          {
            "name": "Thomas Clements",
            "party": "Republican",
            "candidateUrl": "http://www.thomasclements1776.com/",
            "phone": "337-445-9390",
            "channels": [{
                "type": "Facebook",
                "id": "https://www.facebook.com/thomas.clements.908"
              },
              {
                "type": "Twitter",
                "id": "https://twitter.com/SenateCandidate"
              }
            ]
          },
          {
            "name": "Mary L. Landrieu",
            "party": "Democratic",
            "candidateUrl": "http://www.marylandrieu.com/",
            "phone": "000-000-0000",
            "channels": [{
                "type": "Facebook",
                "id": "https://www.facebook.com/senatorlandrieu"
              },
              {
                "type": "Twitter",
                "id": "https://twitter.com/marylandrieu"
              },
              {
                "type": "YouTube",
                "id": "https://www.youtube.com/user/MaryLandrieu4Senate"
              }
            ]
          },
          {
            "name": "'Rob' Maness",
            "party": "Republican",
            "candidateUrl": "http://www.robmaness.com/",
            "phone": "504-481-7685",
            "channels": [{
                "type": "Facebook",
                "id": "https://www.facebook.com/LouisianaSenateVet"
              },
              {
                "type": "Twitter",
                "id": "https://twitter.com/RobManess"
              },
              {
                "type": "YouTube",
                "id": "https://www.youtube.com/user/RobManessForSenate"
              }
            ]
          },
          {
            "name": "Brannon Lee McMorris",
            "party": "Libertarian",
            "candidateUrl": "http://brannonmcmorris.com/main/#page=home",
            "phone": "225-278-1658",
            "channels": [{
                "type": "Facebook",
                "id": "https://www.facebook.com/mcmorris.us.senate"
              },
              {
                "type": "Twitter",
                "id": "https://twitter.com/mcmorrisb"
              },
              {
                "type": "YouTube",
                "id": "https://www.youtube.com/channel/UCqn9JdMoJD76xtR2AynOHSg"
              }
            ]
          },
          {
            "name": "Vallian Senegal",
            "party": "Democratic",
            "candidateUrl": "http://www.valforsenate.com/",
            "phone": "337-942-2200",
            "channels": [{
              "type": "Facebook",
              "id": "https://www.facebook.com/valsenegalforussenate"
            }]
          },
          {
            "name": "William P. Waymire Jr.",
            "party": "Democratic",
            "phone": "225-474-5063",
            "channels": [{
              "type": "Facebook",
              "id": "https://www.facebook.com/100006582376025"
            }]
          }
        ]
      },
      {
        "type": "General",
        "office": "US Representative, 2nd Congressional District",
        "level": ["country"],
        "roles": ["legislatorLowerBody"],
        "district": {
          "name": "Louisiana's 2nd congressional district",
          "scope": "congressional",
          "id": "ocd-division/country:us/state:la/cd:2"
        },
        "sources": [{
          "name": "Ballot Information Project",
          "official": false
        }],
        "candidates": [{
            "name": "David Brooks",
            "party": "No Party",
            "candidateUrl": "https://davidgbrooks.com/",
            "phone": "504-723-2420",
            "channels": [{
                "type": "Facebook",
                "id": "https://www.facebook.com/dbrooks4congress"
              },
              {
                "type": "Twitter",
                "id": "https://twitter.com/DBrooks4USHouse"
              },
              {
                "type": "YouTube",
                "id": "https://www.youtube.com/channel/UCFJE6EdC0n-BfvkbX75hR5A"
              }
            ]
          },
          {
            "name": "Samuel Davenport",
            "party": "Libertarian",
            "candidateUrl": "http://www.samuelforcongress.com/",
            "phone": "000-000-0000",
            "channels": [{
              "type": "Facebook",
              "id": "https://www.facebook.com/SamDavenportforCongress"
            }, {
              "type": "Twitter",
              "id": "https://twitter.com/Samuel4Congress"
            }]
          }, {
            "name": "Gary Landrieu",
            "party": "Democratic",
            "candidateUrl": "http://www.garylandrieu.com/",
            "phone": "504-460-6101",
            "channels": [{
              "type": "Facebook",
              "id": "https://www.facebook.com/electgarylandrieu"
            }]
          }, {
            "name": "Cedric Richmond",
            "party": "Democratic",
            "candidateUrl": "http://www.cedricrichmond.com/",
            "phone": "000-000-0000",
            "channels": [{
              "type": "Facebook",
              "id": "https://www.facebook.com/VoteCedricRichmond"
            }, {
              "type": "Twitter",
              "id": "https://twitter.com/cedricrichmond"
            }, {
              "type": "YouTube",
              "id": "https://www.youtube.com/user/cedricrichmond2010"
            }]
          }
        ]
      }, {
        "type": "Referendum",
        "district": {
          "name": "Louisiana",
          "scope": "statewide",
          "id": "ocd-division/country:us/state:la"
        },
        "referendumTitle": "Proposed Amendment No. 1",
        "referendumUrl": "http://www.sos.la.gov/ElectionsAndVoting/PublishedDocuments/AmendmentSummaries2014.pdf",
        "sources": [{
          "name": "Ballot Information Project",
          "official": false
        }]
      }, {
        "type": "Referendum",
        "district": {
          "name": "Louisiana",
          "scope": "statewide",
          "id": "ocd-division/country:us/state:la"
        },
        "referendumTitle": "Proposed Amendment No. 10",
        "referendumUrl": "http://www.sos.la.gov/ElectionsAndVoting/PublishedDocuments/AmendmentSummaries2014.pdf",
        "sources": [{
          "name": "Ballot Information Project",
          "official": false
        }]
      }, {
        "type": "Referendum",
        "district": {
          "name": "Louisiana",
          "scope": "statewide",
          "id": "ocd-division/country:us/state:la"
        },
        "referendumTitle": "Proposed Amendment No. 11",
        "referendumUrl": "http://www.sos.la.gov/ElectionsAndVoting/PublishedDocuments/AmendmentSummaries2014.pdf",
        "sources": [{
          "name": "Ballot Information Project",
          "official": false
        }]
      }, {
        "type": "Referendum",
        "district": {
          "name": "Louisiana",
          "scope": "statewide",
          "id": "ocd-division/country:us/state:la"
        },
        "referendumTitle": "Proposed Amendment No. 12",
        "referendumUrl": "http://www.sos.la.gov/ElectionsAndVoting/PublishedDocuments/AmendmentSummaries2014.pdf",
        "sources": [{
          "name": "Ballot Information Project",
          "official": false
        }]
      }, {
        "type": "Referendum",
        "district": {
          "name": "Louisiana",
          "scope": "statewide",
          "id": "ocd-division/country:us/state:la"
        },
        "referendumTitle": "Proposed Amendment No. 13",
        "referendumUrl": "http://www.sos.la.gov/ElectionsAndVoting/PublishedDocuments/AmendmentSummaries2014.pdf",
        "sources": [{
          "name": "Ballot Information Project",
          "official": false
        }]
      }, {
        "type": "Referendum",
        "district": {
          "name": "Louisiana",
          "scope": "statewide",
          "id": "ocd-division/country:us/state:la"
        },
        "referendumTitle": "Proposed Amendment No. 14",
        "referendumUrl": "http://www.sos.la.gov/ElectionsAndVoting/PublishedDocuments/AmendmentSummaries2014.pdf",
        "sources": [{
          "name": "Ballot Information Project",
          "official": false
        }]
      }, {
        "type": "Referendum",
        "district": {
          "name": "Louisiana",
          "scope": "statewide",
          "id": "ocd-division/country:us/state:la"
        },
        "referendumTitle": "Proposed Amendment No. 2",
        "referendumUrl": "http://www.sos.la.gov/ElectionsAndVoting/PublishedDocuments/AmendmentSummaries2014.pdf",
        "sources": [{
          "name": "Ballot Information Project",
          "official": false
        }]
      }, {
        "type": "Referendum",
        "district": {
          "name": "Louisiana",
          "scope": "statewide",
          "id": "ocd-division/country:us/state:la"
        },
        "referendumTitle": "Proposed Amendment No. 3",
        "referendumUrl": "http://www.sos.la.gov/ElectionsAndVoting/PublishedDocuments/AmendmentSummaries2014.pdf",
        "sources": [{
          "name": "Ballot Information Project",
          "official": false
        }]
      }, {
        "type": "Referendum",
        "district": {
          "name": "Louisiana",
          "scope": "statewide",
          "id": "ocd-division/country:us/state:la"
        },
        "referendumTitle": "Proposed Amendment No. 4",
        "referendumUrl": "http://www.sos.la.gov/ElectionsAndVoting/PublishedDocuments/AmendmentSummaries2014.pdf",
        "sources": [{
          "name": "Ballot Information Project",
          "official": false
        }]
      }, {
        "type": "Referendum",
        "district": {
          "name": "Louisiana",
          "scope": "statewide",
          "id": "ocd-division/country:us/state:la"
        },
        "referendumTitle": "Proposed Amendment No. 5",
        "referendumUrl": "http://www.sos.la.gov/ElectionsAndVoting/PublishedDocuments/AmendmentSummaries2014.pdf",
        "sources": [{
          "name": "Ballot Information Project",
          "official": false
        }]
      }, {
        "type": "Referendum",
        "district": {
          "name": "Louisiana",
          "scope": "statewide",
          "id": "ocd-division/country:us/state:la"
        },
        "referendumTitle": "Proposed Amendment No. 6",
        "referendumUrl": "http://www.sos.la.gov/ElectionsAndVoting/PublishedDocuments/AmendmentSummaries2014.pdf",
        "sources": [{
          "name": "Ballot Information Project",
          "official": false
        }]
      }, {
        "type": "Referendum",
        "district": {
          "name": "Louisiana",
          "scope": "statewide",
          "id": "ocd-division/country:us/state:la"
        },
        "referendumTitle": "Proposed Amendment No. 7",
        "referendumUrl": "http://www.sos.la.gov/ElectionsAndVoting/PublishedDocuments/AmendmentSummaries2014.pdf",
        "sources": [{
          "name": "Ballot Information Project",
          "official": false
        }]
      }, {
        "type": "Referendum",
        "district": {
          "name": "Louisiana",
          "scope": "statewide",
          "id": "ocd-division/country:us/state:la"
        },
        "referendumTitle": "Proposed Amendment No. 8",
        "referendumUrl": "http://www.sos.la.gov/ElectionsAndVoting/PublishedDocuments/AmendmentSummaries2014.pdf",
        "sources": [{
          "name": "Ballot Information Project",
          "official": false
        }]
      }, {
        "type": "Referendum",
        "district": {
          "name": "Louisiana",
          "scope": "statewide",
          "id": "ocd-division/country:us/state:la"
        },
        "referendumTitle": "Proposed Amendment No. 9",
        "referendumUrl": "http://www.sos.la.gov/ElectionsAndVoting/PublishedDocuments/AmendmentSummaries2014.pdf",
        "sources": [{
          "name": "Ballot Information Project",
          "official": false
        }]
      }
    ],
    "kind": "civicinfo#voterInfoResponse"
  }`;

  const testData = JSON.parse(testDataString);

  const election = testData.election;
  const contests = testData.contests;

  res.render('test', { election: election, contests: contests });
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

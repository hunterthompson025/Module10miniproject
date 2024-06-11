const diagnostics = require('express').Router();
const uuid = require('../helpers/uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  console.info(`${req.method} request received for diagnostic information`);

  readFromFile('./db/feedback.json').then((data) => res.json(JSON.parse(data)));
  // TODO: Logic for sending all the content of db/diagnostics.json
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  console.info(`${req.method} request received to run diagnostics`);

  const { tip, topic, username } = req.body;

  if (tip && topic && username) {
    const newDiagnostic = {
      time: 1,
      error_id: uuid(),
      errors: {
        tip: tip,
        topic: topic,
        username: username,
      }
    }

    readAndAppend(newDiagnostic, './db/diagnostic.json');

    const response = {
      status: 'success',
      body: newDiagnostic,
    };
    
    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }

  });

module.exports = diagnostics;

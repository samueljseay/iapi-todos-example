#!/usr/bin/env node

const { exec } = require("child_process");
const path = require("path");

// Retrieve the step number from the command line arguments
const step = process.argv[2];

// Execute the git apply command
exec(`git checkout workshop/step-${step}`, {}, (error, stdout, stderr) => {
  if (error) {
    console.error(`Could not go to step ${step}: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Could not go to step ${step}: ${stderr}`);
    return;
  }
  console.log(`On step ${step} of the workshop.`);
});

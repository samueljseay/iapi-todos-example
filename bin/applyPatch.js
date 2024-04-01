#!/usr/bin/env node

const { exec } = require("child_process");
const path = require("path");

// Retrieve the step number from the command line arguments
const step = process.argv[2];

if (!step) {
  console.log("Please specify a tutorial step to skip to.");
  process.exit(1);
}

// Construct the path to the patch file
const patchFilePath = path.join(__dirname, "patches", `step-${step}.patch`);

// Execute the git apply command
exec(`git apply ${patchFilePath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  console.log(`Step ${step} applied successfully: ${stdout}`);
});

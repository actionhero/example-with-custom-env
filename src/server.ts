#!/usr/bin/env node

import asyncConfig from "./modules/asyncConfig";

async function main() {
  // modifying the environment needs to happen before requiring or importing Actionhero
  await asyncConfig();

  const { Process } = await import("actionhero"); // <-- note the use of async import

  // create a new actionhero process
  const app = new Process();

  // handle unix signals and uncaught exceptions & rejections
  app.registerProcessSignals((exitCode) => {
    process.exit(exitCode);
  });

  // start the app!
  // you can pass custom configuration to the process as needed
  await app.start();
}

main();

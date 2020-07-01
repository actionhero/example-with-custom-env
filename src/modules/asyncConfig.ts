import * as path from "path";

// I modify process.env from an .env file, and I'm async
export default async function getConfig() {
  await sleep(); // to really demonstrate an async function
  const envFile = path.join(__dirname, "..", "..", ".env");
  require("dotenv").config({ path: envFile });
}

function sleep(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

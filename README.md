# example-with-custom-env

![Node.js CI](https://github.com/actionhero/example-with-custom-env/workflows/Node.js%20CI/badge.svg)

This repository contains an Actionhero example showcasing how to modify the environment at runtime and integrate with the config system. Specifically, we focus on needing to rely on an `async` method to determine what these changes to `process.env` should be. Perhaps you need to load the config from an API or read them from the file system.

## config/hero.ts and initializers/hero.ts

These are the 2 "normal" actionhero components that our config is trying to set up. We have a new entry for `config.hero.favorite` which we then want to log in an initializer.

```ts
// config/hero.ts
export const DEFAULT = {
  hero: () => {
    return {
      favorite: process.env.FAVORITE_HERO,
    };
  },
};

// initializers/hero.ts
import { Initializer, config, log } from "actionhero";

export class MyInitializer extends Initializer {
  constructor() {
    super();
    this.name = "hero";
  }

  async initialize() {
    log(`Loaded favorite hero: ${config.hero.favorite}`, "warning");
  }
}
```

## modules/asyncConfig and .env

This is our example method that will modify `process.env` within an async function.

```ts
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
```

We are using the [`dotenv`](https://www.npmjs.com/package/dotenv) package to load the contents of `.env` into our environment.

```
# normally, you shouldn't check this file into git, but this is an example.

FAVORITE_HERO=BATMAN
```

## server.ts

Finally, we load and run `getConfig()` as part of the setup of our server.

```ts
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
```

_visit www.actionherojs.com for more information_

## To install:

(assuming you have [node](http://nodejs.org/), [TypeScript](https://www.typescriptlang.org/), and NPM installed)

`npm install`

## To Run:

`npm start`

## To Test:

`npm test`

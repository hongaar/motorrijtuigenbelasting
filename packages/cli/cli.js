#!/usr/bin/env node

import cli from "./dist/index.js";

cli.run().catch((error) => {
  // console.error(String(error))
  console.error(error);
});

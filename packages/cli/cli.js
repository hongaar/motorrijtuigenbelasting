#!/usr/bin/env node

import { app } from "./dist/index.js";

app.run().catch((error) => {
  if ("DEBUG" in process.env) {
    console.error(error);
  } else {
    console.error(String(error));
  }
});

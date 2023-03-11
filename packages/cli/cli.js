#!/usr/bin/env node

import { app } from "./dist/index.js";

app.run().catch((error) => {
  // console.error(String(error))
  console.error(error);
});

#!/usr/bin/env node

import { cli } from "./dist/cli.js";

cli.run().catch(console.error);

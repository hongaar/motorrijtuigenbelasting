# motorrijtuigenbelasting [![npm](https://img.shields.io/npm/v/@motorrijtuigenbelasting/cli)](https://www.npmjs.com/package/@motorrijtuigenbelasting/cli)

**Calculate Dutch car tax (motorrijtuigenbelasting) in JavaScript**

---

> **Warning**: **in development**
>
> This module is in development and not ready for use. The implemented rules are
> tested and verified, but quite some rules are not implemented yet.

---

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [CLI](#cli)
  - [Usage](#usage)
- [SDK](#sdk)
  - [Installation](#installation)
  - [Usage](#usage-1)
- [Contributing](#contributing)
  - [Roadmap](#roadmap)
  - [Development](#development)
  - [Devcontainer](#devcontainer)
  - [Credits](#credits)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# CLI

## Usage

In the examples below, we use [`yarn dlx`](https://yarnpkg.com/cli/dlx) to run
the CLI. You can also use [`npx`](https://docs.npmjs.com/cli/v9/commands/npx),
it should work exactly the same.

Example with manual input:

```bash
yarn dlx @motorrijtuigenbelasting/cli \
  --vehicle-type Personenauto \
  --weight 1051 \
  --propulsion-type Benzine \
  --co2-emission 86 \
  --province Utrecht
```

Example with vehicle ID (kenteken) as input:

```bash
export RDW_APP_TOKEN=foo
yarn dlx @motorrijtuigenbelasting/cli \
  --vehicle-id S-212-PK
  --province Utrecht
```

Example output:

![Example CLI output](cli.png)

> **Note**: App token can be obtained after registering at the
> [RDW open data portal](https://opendata.rdw.nl/signup).

# SDK

## Installation

```bash
yarn|npm add @motorrijtuigenbelasting/core @motorrijtuigenbelasting/mrb2023
```

> **Note**: When you want to use a different revision of the car tax law, use
> the corresponding package. See elsewhere in this README to see a list of
> supported revisions.

## Usage

```js
import {
  PropulsionType,
  Province,
  run,
  VehicleType,
} from "@motorrijtuigenbelasting/core";
import mrb2023 from "@motorrijtuigenbelasting/mrb2023";

const params = {
  vehicleType: VehicleType.Personenauto,
  weight: 1051,
  propulsions: [{ type: PropulsionType.Benzine, co2Emission: 86 }],
  province: Province.Utrecht,
};

const results = run(mrb2023, params);

console.log({ results });
```

# Contributing

Contributions are very welcome!

## Roadmap

- [ ] implement missing propulsiontypes
- [ ] implement missing vehicletypes
- [ ] implement betalennaargebruik package
- [ ] emit warning when there is a known discrepancy between the model and the
      official calculator

See [TODO.md](TODO.md) for known problems which need fixing and general todos.

## Development

To run the `@motorrijtuigenbelasting/cli` package from source, run:

```bash
cd packages/cli
yarn start
```

## Devcontainer

A devcontainer configuration is included in this repo to
[get started quickly](https://code.visualstudio.com/docs/remote/containers#_quick-start-open-an-existing-folder-in-a-container).

## Credits

©️ Copyright 2023 [Joram van den Boezem](https://joram.dev)  
♻️ Licensed under the [MIT license](LICENSE)

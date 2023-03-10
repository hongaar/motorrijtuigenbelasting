<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with
[DocToc](https://github.com/thlorenz/doctoc)_

- [motorrijtuigenbelasting \*](#motorrijtuigenbelasting-)
  - [Installatie](#installatie)
  - [MRB berekenen](#mrb-berekenen)
  - [Betalen naar gebruik](#betalen-naar-gebruik)
  - [Gebruik met RDW data](#gebruik-met-rdw-data)
  - [Onregelmatigheden](#onregelmatigheden)
  - [Roadmap](#roadmap)
  - [Credits](#credits)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# motorrijtuigenbelasting [![npm](https://img.shields.io/npm/v/motorrijtuigenbelasting)](https://www.npmjs.com/package/motorrijtuigenbelasting)

**Motorrijtuigenbelasting (MRB) berekenen in JavaScript**

---

> **Warning**: **API has changed**
>
> A new version is being prepared, which changes the API significantly. The
> README has not been updated yet to reflect these changes.

> **Warning**: **in ontwikkeling**
>
> Deze module is nog in ontwikkeling en kan momenteel niet worden gebruikt voor
> het berekenen van de MRB.

---

## Installatie

```bash
yarn|npm add motorrijtuigenbelasting
```

## MRB berekenen

Standaard wordt het meest recente `Model_2023` gebruikt.

```js
import {
  berekenMrb,
  Brandstof,
  Provincie,
  Voertuigtype,
} from "motorrijtuigenbelasting";

// bedrag is motorrijtuigenbelasting per tijdvak van 3 maanden in euro's
const bedrag = berekenMrb({
  voertuigtype: Voertuigtype.Personenauto,
  brandstof: Brandstof.Benzine,
  elektrisch_of_waterstof: false,
  gewicht: 1051,
  provincie: Provincie.Utrecht,
});
```

## Betalen naar gebruik

Om een voorlopige berekening te maken voor het toekomstige "Betalen naar
gebruik", kan `model` worden aangepast naar `Model_2030`.

```js
import {
  berekenMrb,
  Brandstof,
  Models,
  Provincie,
  Voertuigtype,
} from "motorrijtuigenbelasting";

// voorlopige berekening voor betalen naar gebruik
const bedrag = berekenMrb({
  model: Models.Model_2030,
  voertuigtype: Voertuigtype.Personenauto,
  brandstof: Brandstof.Benzine,
  elektrisch_of_waterstof: false,
  gewicht: 1051,
  provincie: Provincie.Utrecht,
  km_per_jaar: 10_000,
});
```

## Gebruik met RDW data

```js
import { berekenMrb, rdwDataToParams } from "motorrijtuigenbelasting";

const kenteken = "1-ABC-123";

const rdw = (resource) =>
  fetch(
    `https://opendata.rdw.nl/resource/${resource}.json?kenteken=${kenteken}`
  ).then((res: any) => res.json());

const basis = (await rdw("m9d7-ebf2"))[0];
const brandstof = await rdw("8ys7-d773");

const params = rdwDataToParams({ basis, brandstof });

// bedrag is motorrijtuigenbelasting per tijdvak van 3 maanden in euro's
const bedrag = berekenMrb({ ...params, provincie: Provincie.Utrecht });
```

## Onregelmatigheden

Onregelmatigheden zijn verschillen van dit algoritme met de
[officiele tool van de Belastingdienst](https://www.belastingdienst.nl/wps/wcm/connect/nl/auto-en-vervoer/content/hulpmiddel-motorrijtuigenbelasting-berekenen)
(_baseline_). Zie [TODO.md](TODO.md) voor een lijst met onregelmatigheden.

## Roadmap

- [ ] Personenauto
  - [x] Benzine
  - [x] Diesel
  - [x] Geen uitstoot (elektrisch of waterstof)
  - [x] Lage uitstoot (halftarief)
  - [ ] Overige brandstoffen
- [ ] Overige voertuigtypes

## Credits

©️ Copyright 2023 [Joram van den Boezem](https://joram.dev)  
♻️ Licensed under the [MIT license](LICENSE)

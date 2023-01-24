# motorrijtuigenbelasting [![npm](https://img.shields.io/npm/v/motorrijtuigenbelasting)](https://www.npmjs.com/package/motorrijtuigenbelasting)

**Motorrijtuigenbelasting (MRB) berekenen in JavaScript**

## Installatie

```bash
yarn|npm add motorrijtuigenbelasting
```

## Gebruik

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

## Roadmap

- [x] Benzine
- [x] Geen uitstoot (elektrisch of waterstof)
- [ ] Overige brandstoffen
- [ ] Niet-personenauto's

## Credits

©️ Copyright 2023 [Joram van den Boezem](https://joram.dev)  
♻️ Licensed under the [MIT license](LICENSE)

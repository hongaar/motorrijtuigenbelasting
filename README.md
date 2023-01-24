# motorrijtuigenbelasting [![npm](https://img.shields.io/npm/v/motorrijtuigenbelasting)](https://www.npmjs.com/package/motorrijtuigenbelasting)

**Motorrijtuigenbelasting (MRB) berekenen in JavaScript**

```bash
yarn|npm add motorrijtuigenbelasting
```

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

## Roadmap

- [x] Benzine
- [x] Geen uitstoot (elektrisch of waterstof)
- [ ] Overige brandstoffen
- [ ] Niet-personenauto's

## Credits

©️ Copyright 2023 [Joram van den Boezem](https://joram.dev)  
♻️ Licensed under the [MIT license](LICENSE)

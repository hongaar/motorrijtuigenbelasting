import { toPropulsions, toWeight } from "../src/index.js";

describe("toWeight", () => {
  test("extracts weight", () => {
    expect(
      toWeight({
        base: {
          kenteken: "foo",
          europese_voertuigcategorie: "bar",
          massa_ledig_voertuig: "300",
          datum_eerste_toelating_dt: "2010-01-01T00:00:00.000",
        },
        propulsions: [],
        body: {
          kenteken: "foo",
          carrosserie_volgnummer: "1",
          carrosserietype: "foo",
          type_carrosserie_europese_omschrijving: "foo",
        },
      })
    ).toStrictEqual(300);
  });
});

describe("toPropulsion", () => {
  test("extracts propulsion", () => {
    expect(
      toPropulsions({
        base: {
          kenteken: "foo",
          europese_voertuigcategorie: "bar",
          massa_ledig_voertuig: "300",
          datum_eerste_toelating_dt: "2010-01-01T00:00:00.000",
        },
        propulsions: [
          {
            kenteken: "foo",
            brandstof_volgnummer: "1",
            brandstof_omschrijving: "Benzine",
            co2_uitstoot_gecombineerd: "5",
          },
        ],
        body: {
          kenteken: "foo",
          carrosserie_volgnummer: "1",
          carrosserietype: "foo",
          type_carrosserie_europese_omschrijving: "foo",
        },
      })
    ).toStrictEqual([
      {
        type: "Benzine",
        co2Emission: 5,
      },
    ]);
  });
});

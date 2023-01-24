import { Model_2023_Personenauto } from "../../../src/models/2023/personenauto.js";
import { Brandstof, Provincie, Voertuigtype } from "../../../src/params.js";

test("0/benzine/geen_provincie", () => {
  expect(
    Model_2023_Personenauto({
      brandstof: Brandstof.Benzine,
      elektrisch_of_waterstof: false,
      voertuigtype: Voertuigtype.Personenauto,
      provincie: null,
      gewicht: 0,
    })
  ).toBe(18);
});

test("0/benzine/Utrecht", () => {
  expect(
    Model_2023_Personenauto({
      brandstof: Brandstof.Benzine,
      elektrisch_of_waterstof: false,
      voertuigtype: Voertuigtype.Personenauto,
      provincie: Provincie.Utrecht,
      gewicht: 0,
    })
  ).toBe(30);
});

test("1000/benzine/Utrecht", () => {
  expect(
    Model_2023_Personenauto({
      brandstof: Brandstof.Benzine,
      elektrisch_of_waterstof: false,
      voertuigtype: Voertuigtype.Personenauto,
      provincie: Provincie.Utrecht,
      gewicht: 1000,
    })
  ).toBe(107);
});

test("5000/benzine/Utrecht", () => {
  expect(
    Model_2023_Personenauto({
      brandstof: Brandstof.Benzine,
      elektrisch_of_waterstof: false,
      voertuigtype: Voertuigtype.Personenauto,
      provincie: Provincie.Utrecht,
      gewicht: 5000,
    })
  ).toBe(999);
});

test("elektrisch_of_waterstof", () => {
  expect(
    Model_2023_Personenauto({
      brandstof: null,
      elektrisch_of_waterstof: true,
      voertuigtype: Voertuigtype.Personenauto,
      provincie: Provincie.Utrecht,
      gewicht: 1000,
    })
  ).toBe(0);
});

test("geen_uitstoot", () => {
  expect(
    Model_2023_Personenauto({
      brandstof: Brandstof.Benzine,
      elektrisch_of_waterstof: false,
      voertuigtype:
        Voertuigtype["Personenauto met een CO2-uitstoot van 0 gr/km"],
      provincie: Provincie.Utrecht,
      gewicht: 1000,
    })
  ).toBe(0);
});

test("lage_uitstoot", () => {
  expect(
    Model_2023_Personenauto({
      brandstof: Brandstof.Benzine,
      elektrisch_of_waterstof: false,
      voertuigtype:
        Voertuigtype["Personenauto met een CO2-uitstoot van 1 t/m 50 gr/km"],
      provincie: Provincie.Utrecht,
      gewicht: 1000,
    })
  ).toBe(53);
});

test("invalid_provincie", () => {
  expect(() =>
    Model_2023_Personenauto({
      brandstof: Brandstof.Benzine,
      elektrisch_of_waterstof: false,
      voertuigtype: Voertuigtype.Personenauto,
      provincie: "invalid" as Provincie,
      gewicht: 0,
    })
  ).toThrow();
});

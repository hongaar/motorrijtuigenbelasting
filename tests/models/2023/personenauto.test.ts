import { Model_2023_Personenauto } from "../../../src/models/2023/personenauto.js";
import { Brandstof, Provincie, Voertuigtype } from "../../../src/params.js";

test("0/Benzine/geen_provincie", () => {
  expect(
    Model_2023_Personenauto({
      brandstof: Brandstof.Benzine,
      elektrisch_of_waterstof: false,
      voertuigtype: Voertuigtype.Personenauto,
      provincie: null,
      gewicht: 0,
    }).bedrag
  ).toBe(18);
});

test("0/Benzine/Utrecht", () => {
  expect(
    Model_2023_Personenauto({
      brandstof: Brandstof.Benzine,
      elektrisch_of_waterstof: false,
      voertuigtype: Voertuigtype.Personenauto,
      provincie: Provincie.Utrecht,
      gewicht: 0,
    }).bedrag
  ).toBe(30);
});

test("1000/Benzine/Utrecht", () => {
  expect(
    Model_2023_Personenauto({
      brandstof: Brandstof.Benzine,
      elektrisch_of_waterstof: false,
      voertuigtype: Voertuigtype.Personenauto,
      provincie: Provincie.Utrecht,
      gewicht: 1000,
    }).bedrag
  ).toBe(107);
});

test("5000/Benzine/Utrecht", () => {
  expect(
    Model_2023_Personenauto({
      brandstof: Brandstof.Benzine,
      elektrisch_of_waterstof: false,
      voertuigtype: Voertuigtype.Personenauto,
      provincie: Provincie.Utrecht,
      gewicht: 5000,
    }).bedrag
  ).toBe(999);
});

test.failing("0/Diesel/geen_fijnstoftoeslag/geen_provincie", () => {
  expect(
    Model_2023_Personenauto({
      brandstof: Brandstof.Diesel,
      fijnstoftoeslag: false,
      elektrisch_of_waterstof: false,
      voertuigtype: Voertuigtype.Personenauto,
      provincie: null,
      gewicht: 0,
    }).bedrag
  ).toBe(102);
});

test.failing("0/Diesel/geen_fijnstoftoeslag/Utrecht", () => {
  expect(
    Model_2023_Personenauto({
      brandstof: Brandstof.Diesel,
      fijnstoftoeslag: false,
      elektrisch_of_waterstof: false,
      voertuigtype: Voertuigtype.Personenauto,
      provincie: Provincie.Utrecht,
      gewicht: 0,
    }).bedrag
  ).toBe(103);
});

test.failing("1000/Diesel/geen_fijnstoftoeslag/Utrecht", () => {
  expect(
    Model_2023_Personenauto({
      brandstof: Brandstof.Diesel,
      fijnstoftoeslag: false,
      elektrisch_of_waterstof: false,
      voertuigtype: Voertuigtype.Personenauto,
      provincie: Provincie.Utrecht,
      gewicht: 1000,
    }).bedrag
  ).toBe(255);
});

test.failing("5000/Diesel/geen_fijnstoftoeslag/Utrecht", () => {
  expect(
    Model_2023_Personenauto({
      brandstof: Brandstof.Diesel,
      fijnstoftoeslag: false,
      elektrisch_of_waterstof: false,
      voertuigtype: Voertuigtype.Personenauto,
      provincie: Provincie.Utrecht,
      gewicht: 5000,
    }).bedrag
  ).toBe(1727);
});

test("elektrisch_of_waterstof", () => {
  expect(
    Model_2023_Personenauto({
      elektrisch_of_waterstof: true,
      brandstof: null,
      voertuigtype: Voertuigtype.Personenauto,
      provincie: Provincie.Utrecht,
      gewicht: 1000,
    }).bedrag
  ).toBe(0);
  expect(
    Model_2023_Personenauto({
      elektrisch_of_waterstof: true,
      voertuigtype: Voertuigtype.Personenauto,
      provincie: Provincie.Utrecht,
      gewicht: 1000,
    }).bedrag
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
    }).bedrag
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
    }).bedrag
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

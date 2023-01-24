import {
  findTarief,
  Model_Personenauto,
  rondGewichtAf,
} from "../../src/models/personenauto.js";
import { Brandstof } from "../../src/params.js";

test("rondGewichtAf", () => {
  expect(rondGewichtAf(0)).toBe(0);
  expect(rondGewichtAf(510)).toBe(500);
  expect(rondGewichtAf(550)).toBe(500);
  expect(rondGewichtAf(560)).toBe(600);
  expect(rondGewichtAf(1050)).toBe(1000);
  expect(rondGewichtAf(1051)).toBe(1100);
});

test("findTarief", () => {
  const tariefVanaf0 = {
    threshold_kg: 0,
    vast_euro: 10,
  };
  const tariefVanaf600 = {
    threshold_kg: 600,
    vast_euro: 20,
  };
  const tariefVanaf1000 = {
    threshold_kg: 1000,
    vast_euro: 30,
  };
  const tarieven = [tariefVanaf0, tariefVanaf600, tariefVanaf1000];

  // tariefVanaf0
  expect(
    findTarief({
      tarieven,
      afgerondGewicht: 0,
    })
  ).toBe(tariefVanaf0);
  expect(
    findTarief({
      tarieven,
      afgerondGewicht: 500,
    })
  ).toBe(tariefVanaf0);

  // tariefVanaf600
  expect(
    findTarief({
      tarieven,
      afgerondGewicht: 600,
    })
  ).toBe(tariefVanaf600);
  expect(
    findTarief({
      tarieven,
      afgerondGewicht: 900,
    })
  ).toBe(tariefVanaf600);

  // tariefVanaf1000
  expect(
    findTarief({
      tarieven,
      afgerondGewicht: 1000,
    })
  ).toBe(tariefVanaf1000);
  expect(
    findTarief({
      tarieven,
      afgerondGewicht: 6000,
    })
  ).toBe(tariefVanaf1000);

  // Only multiples of 100
  expect(() => findTarief({ tarieven, afgerondGewicht: 99 })).toThrow();
  expect(() => findTarief({ tarieven, afgerondGewicht: 100 })).not.toThrow();
  expect(() => findTarief({ tarieven, afgerondGewicht: 101 })).toThrow();
});

test("Model_Personenauto/benzine", () => {
  const tariefVanaf0 = {
    threshold_kg: 0,
    vast_euro: 10,
  };
  const tariefVanaf600 = {
    threshold_kg: 600,
    vast_euro: 20,
    variabel: {
      ondergrens: 600,
      euro: 1,
      per_kg: 100,
    },
  };
  const tarieven = [tariefVanaf0, tariefVanaf600];

  expect(
    Model_Personenauto({
      tarieven,
      gewicht: 0,
      brandstof: Brandstof.Benzine,
    })
  ).toBe(10);
  expect(
    Model_Personenauto({
      tarieven,
      gewicht: 550,
      brandstof: Brandstof.Benzine,
    })
  ).toBe(10);
  expect(
    Model_Personenauto({
      tarieven,
      gewicht: 650,
      brandstof: Brandstof.Benzine,
    })
  ).toBe(20);
  expect(
    Model_Personenauto({
      tarieven,
      gewicht: 750,
      brandstof: Brandstof.Benzine,
    })
  ).toBe(21);
});

import { berekenMrb, Models } from "../src/berekenMrb.js";
import {
  Brandstof,
  Gewichtsklasse,
  ModelParams,
  Provincie,
  Voertuigtype,
} from "../src/params.js";

const defaultParams: ModelParams = {
  provincie: Provincie.Utrecht,
  brandstof: Brandstof.Benzine,
  voertuigtype: Voertuigtype.Personenauto,
  elektrisch_of_waterstof: false,
  gewicht: Gewichtsklasse["951 t/m 1050"],
};

test("uses default model", () => {
  expect(() => berekenMrb(defaultParams)).not.toThrow();
});

test("can specify model", () => {
  expect(() =>
    berekenMrb({ ...defaultParams, model: Models.Model_2023 })
  ).not.toThrow();
});

test("can specify gewichtsklasse as number", () => {
  expect(() => berekenMrb({ ...defaultParams, gewicht: 1000 })).not.toThrow();
});

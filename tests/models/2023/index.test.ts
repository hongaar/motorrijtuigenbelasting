import {
  Brandstof,
  ModelParams,
  Provincie,
  Voertuigtype,
} from "../../../src/index.js";
import { Model_2023 } from "../../../src/models/2023";

const defaultParams: ModelParams = {
  provincie: null,
  voertuigtype: Voertuigtype.Personenauto,
  elektrisch_of_waterstof: false,
  brandstof: null,
  gewicht: 0,
};

test("benzine", () => {
  expect(
    Model_2023({
      ...defaultParams,
      brandstof: Brandstof.Benzine,
    })
  ).toBe(18);
});

test("benzine/Utrecht", () => {
  expect(
    Model_2023({
      ...defaultParams,
      brandstof: Brandstof.Benzine,
      provincie: Provincie.Utrecht,
    })
  ).toBe(33);
});

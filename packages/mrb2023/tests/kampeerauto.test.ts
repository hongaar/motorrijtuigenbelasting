import {
  PropulsionType,
  Province,
  VehicleType,
} from "@motorrijtuigenbelasting/core";
import { total } from "./util.js";

// Baseline is https://www.belastingdienst.nl/wps/wcm/connect/nl/auto-en-vervoer/content/hulpmiddel-motorrijtuigenbelasting-berekenen

const totalKampeerauto = total(VehicleType.Kampeerauto);
const totalBenzine = totalKampeerauto(PropulsionType.Benzine);
const totalDiesel = totalKampeerauto(PropulsionType.Diesel);
const totalElektrisch = totalKampeerauto(PropulsionType.Elektrisch);
const totalWaterstof = totalKampeerauto(PropulsionType.Waterstof);

test("Benzine/1000/Utrecht", () => {
  expect(totalBenzine(1000, Province.Utrecht, 100)).toBe(26);
});

/**
 * @todo we receive 52 while the baseline gives 65. not sure what is wrong
 * here.
 */
test.failing("Benzine+bedrijfsmatig verhuurd/1000/Utrecht", () => {
  expect(
    totalDiesel(1000, Province.Utrecht, 100, {
      rentedForBusinessPurposes: true,
    })
  ).toBe(65);
});

test("Diesel/1000/Utrecht", () => {
  expect(totalDiesel(1000, Province.Utrecht, 100)).toBe(63);
});

test("Diesel+fijnstoftoeslag/1000/Utrecht", () => {
  expect(
    totalDiesel(1000, Province.Utrecht, 100, {
      particulateMatterSurtax: true,
    })
  ).toBe(74);
});

test("Elektrisch/1000/Utrecht", () => {
  expect(totalElektrisch(1000, Province.Utrecht, 100)).toBe(0);
});

test("Waterstof/1000/Utrecht", () => {
  expect(totalWaterstof(1000, Province.Utrecht, 100)).toBe(0);
});

/**
 * @todo this scenario is not covered in baseline calculator
 */
test.failing("Benzine_low_emission/1000/Utrecht", () => {
  expect(totalBenzine(1000, Province.Utrecht, 50)).toBe(NaN);
});

/**
 * @todo this scenario is not covered in baseline calculator
 */
test.failing("Benzine_no_emission/1000/Utrecht", () => {
  expect(totalBenzine(1000, Province.Utrecht, 0)).toBe(NaN);
});

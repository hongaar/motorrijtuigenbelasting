import {
  Period,
  PropulsionType,
  Province,
  run,
  VehicleType,
} from "@motorrijtuigenbelasting/core";
import model from "../src/index.js";

const total =
  (vehicleType: VehicleType) =>
  (propulsionType: PropulsionType) =>
  (weight: number, province: Province | null, emission: number) => {
    return run(
      model,
      {
        vehicleType,
        weight,
        propulsions: [{ type: propulsionType, emission }],
        province,
      },
      Period.quarter
    ).total;
  };

describe("Personenauto", () => {
  const totalPersonenauto = total(VehicleType.Personenauto);
  const totalBenzine = totalPersonenauto(PropulsionType.Benzine);
  const totalDiesel = totalPersonenauto(PropulsionType.Diesel);
  const totalElektrisch = totalPersonenauto(PropulsionType.Elektrisch);
  const totalWaterstof = totalPersonenauto(PropulsionType.Waterstof);

  /**
   * @todo indien niet woonachtig in nederland, worden opcenten niet meegerekend
   * in baseline. volgens de wet zou dat wel moeten. missen wij iets?
   * http://wetten.overheid.nl/jci1.3:c:BWBR0005645&titeldeel=IV&hoofdstuk=XV&paragraaf=2&artikel=222a&lid=4
   */
  test.failing("Benzine/0/no_province", () => {
    expect(totalBenzine(0, null, 100)).toBe(18);
  });

  test("Benzine/0/Utrecht", () => {
    expect(totalBenzine(0, Province.Utrecht, 100)).toBe(30);
  });

  test("Benzine/1000/Utrecht", () => {
    expect(totalBenzine(1000, Province.Utrecht, 100)).toBe(107);
  });

  test("Benzine/5000/Utrecht", () => {
    expect(totalBenzine(5000, Province.Utrecht, 100)).toBe(999);
  });

  test("Diesel/0/no_province", () => {
    expect(totalDiesel(0, null, 100)).toBe(102);
  });

  test("Diesel/0/Utrecht", () => {
    expect(totalDiesel(0, Province.Utrecht, 100)).toBe(103);
  });

  test("Diesel/1000/Utrecht", () => {
    expect(totalDiesel(1000, Province.Utrecht, 100)).toBe(255);
  });

  test("Diesel/5000/Utrecht", () => {
    expect(totalDiesel(5000, Province.Utrecht, 100)).toBe(1727);
  });

  test("Elektrisch/1000/Utrecht", () => {
    expect(totalElektrisch(1000, Province.Utrecht, 100)).toBe(0);
  });

  test("Waterstof/1000/Utrecht", () => {
    expect(totalWaterstof(1000, Province.Utrecht, 100)).toBe(0);
  });

  test("Benzine_low_emission/1000/Utrecht", () => {
    expect(totalBenzine(1000, Province.Utrecht, 50)).toBe(53);
  });

  test("Benzine_no_emission/1000/Utrecht", () => {
    expect(totalBenzine(1000, Province.Utrecht, 0)).toBe(0);
  });
});

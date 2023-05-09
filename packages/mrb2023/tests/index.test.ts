import {
  Period,
  PropulsionType,
  Province,
  VehicleType,
  run,
  type Params,
} from "@motorrijtuigenbelasting/core";
import model from "../src/index.js";

// Baseline is https://www.belastingdienst.nl/wps/wcm/connect/nl/auto-en-vervoer/content/hulpmiddel-motorrijtuigenbelasting-berekenen

const total =
  (vehicleType: VehicleType) =>
  (propulsionType: PropulsionType) =>
  (
    weight: number,
    province: Province | null,
    co2Emission: number,
    rest: Omit<
      Params,
      "vehicleType" | "weight" | "province" | "propulsions"
    > = {}
  ) => {
    return run(
      model,
      {
        vehicleType,
        weight,
        propulsions: [{ type: propulsionType, co2Emission }],
        ...rest,
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
  test.failing("Benzine/1/no_province", () => {
    expect(totalBenzine(1, null, 100)).toBe(18);
  });

  test("Benzine/1/Utrecht", () => {
    expect(totalBenzine(1, Province.Utrecht, 100)).toBe(30);
  });

  test("Benzine/1000/Utrecht", () => {
    expect(totalBenzine(1000, Province.Utrecht, 100)).toBe(107);
  });

  test("Benzine/5000/Utrecht", () => {
    expect(totalBenzine(5000, Province.Utrecht, 100)).toBe(999);
  });

  test("Diesel/1/no_province", () => {
    expect(totalDiesel(1, null, 100)).toBe(102);
  });

  test("Diesel/1/Utrecht", () => {
    expect(totalDiesel(1, Province.Utrecht, 100)).toBe(103);
  });

  test("Diesel/1000/Utrecht", () => {
    expect(totalDiesel(1000, Province.Utrecht, 100)).toBe(255);
  });

  test("Diesel/5000/Utrecht", () => {
    expect(totalDiesel(5000, Province.Utrecht, 100)).toBe(1727);
  });

  test("Diesel+fijnstoftoeslag/1/no_province", () => {
    expect(totalDiesel(1, null, 100, { particulateMatterSurtax: true })).toBe(
      119
    );
  });

  test("Diesel+fijnstoftoeslag/1/Utrecht", () => {
    expect(
      totalDiesel(1, Province.Utrecht, 100, { particulateMatterSurtax: true })
    ).toBe(121);
  });

  test("Diesel+fijnstoftoeslag/1000/Utrecht", () => {
    expect(
      totalDiesel(1000, Province.Utrecht, 100, {
        particulateMatterSurtax: true,
      })
    ).toBe(297);
  });

  /**
   * @todo we receive 1978 while the baseline gives 1977. not sure what is wrong
   * here.
   */
  test.failing("Diesel+fijnstoftoeslag/5000/Utrecht", () => {
    expect(
      totalDiesel(5000, Province.Utrecht, 100, {
        particulateMatterSurtax: true,
      })
    ).toBe(1977);
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

describe("Kampeerauto", () => {
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
});

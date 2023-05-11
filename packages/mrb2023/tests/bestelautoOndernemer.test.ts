import {
  Period,
  PropulsionType,
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
    rest: Omit<Params, "vehicleType" | "weight" | "propulsions"> = {}
  ) => {
    return run(
      model,
      {
        vehicleType,
        weight,
        propulsions: [{ type: propulsionType, co2Emission: null }],
        ...rest,
      },
      Period.quarter
    ).total;
  };

describe("Bestelauto ondernemer", () => {
  const totalBestelautoOndernemer = total(VehicleType["Bestelauto ondernemer"]);
  const totalBenzine = totalBestelautoOndernemer(PropulsionType.Benzine);
  const totalDiesel = totalBestelautoOndernemer(PropulsionType.Diesel);
  const totalElektrisch = totalBestelautoOndernemer(PropulsionType.Elektrisch);
  const totalWaterstof = totalBestelautoOndernemer(PropulsionType.Waterstof);

  test("Benzine/1", () => {
    expect(totalBenzine(1)).toBe(45);
  });

  test("Benzine/1000", () => {
    expect(totalBenzine(1000)).toBe(84);
  });

  test("Benzine/3500", () => {
    expect(totalBenzine(3500)).toBe(235);
  });

  test("Diesel/1", () => {
    expect(totalDiesel(1)).toBe(45);
  });

  test("Diesel/1000", () => {
    expect(totalDiesel(1000)).toBe(84);
  });

  test("Diesel/3500", () => {
    expect(totalDiesel(3500)).toBe(235);
  });

  test("Diesel+particulateMatterSurtax/1", () => {
    expect(totalDiesel(1, { particulateMatterSurtax: true })).toBe(52);
  });

  test("Diesel+particulateMatterSurtax/1000", () => {
    expect(totalDiesel(1000, { particulateMatterSurtax: true })).toBe(96);
  });

  test("Diesel+particulateMatterSurtax/3500", () => {
    expect(totalDiesel(3500, { particulateMatterSurtax: true })).toBe(271);
  });

  test("Elektrisch/1000", () => {
    expect(totalElektrisch(1000)).toBe(0);
  });

  test("Waterstof/1000", () => {
    expect(totalWaterstof(1000)).toBe(0);
  });
});

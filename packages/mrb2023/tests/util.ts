import {
  Params,
  Period,
  PropulsionType,
  Province,
  run,
  VehicleType,
} from "@motorrijtuigenbelasting/core";
import model from "../src/index.js";

export const total =
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

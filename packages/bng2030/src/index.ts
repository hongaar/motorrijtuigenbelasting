import {
  BngVariant,
  InvalidArgument,
  NotImplementedError,
  VehicleType,
  validateBngVariant,
  validateMileage,
  validatePropulsions,
  type Model,
  type ModelOutput,
} from "@motorrijtuigenbelasting/core";
import {
  V1a,
  V1a_alt1,
  V1a_alt2,
  V1b,
  V2,
  V2_alt1,
  V2_alt2,
  V3,
} from "./rules/index.js";

const model: Model = (params) => {
  const { propulsions, weight, mileage, vehicleType, bngVariant } = params;
  const output: ModelOutput = [];

  validateBngVariant(bngVariant);
  validateMileage(mileage);
  validatePropulsions(propulsions);

  switch (vehicleType) {
    case VehicleType.Personenauto:
    case VehicleType["Bestelauto gehandicapte"]:
    case VehicleType["Bestelauto particulier"]:
    case VehicleType["Bestelauto ondernemer"]:
      break;
    default:
      throw new NotImplementedError(
        "BNG is only available for Personenauto en Bestelauto"
      );
  }

  switch (params.bngVariant) {
    case BngVariant.V1a:
      V1a(output, params);
      break;

    case BngVariant.V1b:
      V1b(output, params);
      break;

    case BngVariant.V1a_alt1:
      V1a_alt1(output, params);
      break;

    case BngVariant.V1a_alt2:
      V1a_alt2(output, params);
      break;

    case BngVariant.V2:
      V2(output, params);
      break;

    case BngVariant.V2_alt1:
      V2_alt1(output, params);
      break;

    case BngVariant.V2_alt2:
      V2_alt2(output, params);
      break;

    case BngVariant.V3:
      V3(output, params);
      break;

    default:
      throw new InvalidArgument("bngVariant has an invalid value");
  }

  return output;
};

export default model;

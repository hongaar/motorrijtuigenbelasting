import {
  VehicleType,
  validateBngVariant,
  type ModelOutput,
  type Params,
} from "@motorrijtuigenbelasting/core";
import { kmRateComponent } from "./utils.js";

export function V1a_alt1(output: ModelOutput, params: Params) {
  /**
   * gelijk aan variant V1a maar het tarief is dusdanig verhoogd dat in 2030
   * 2,5 Mton reductie aan CO2 resulteert t.o.v. de basispad. Er is dan geen
   * sprake meer van budgetneutraliteit.
   */
  const { vehicleType, bngVariant } = params;

  validateBngVariant(bngVariant);

  const kmRate = kmRateComponent(bngVariant);

  output.push(
    kmRate(vehicleType === VehicleType.Personenauto ? 0.1086 : 0.078)
  );
}

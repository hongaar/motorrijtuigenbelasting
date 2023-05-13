import {
  VehicleType,
  validateBngVariant,
  type ModelOutput,
  type Params,
} from "@motorrijtuigenbelasting/core";
import { kmRateComponent } from "./utils.js";

export function V1a(output: ModelOutput, params: Params) {
  /**
   * de mrb en de provinciale opcenten worden gevariabiliseerd en
   * budgetneutraal omgezet in een kilometertarief gelijk voor alle
   * personenauto’s en een tarief gelijk voor alle bestelauto’s.
   */
  const { vehicleType, bngVariant } = params;

  validateBngVariant(bngVariant);

  const kmRate = kmRateComponent(bngVariant);

  output.push(
    kmRate(vehicleType === VehicleType.Personenauto ? 0.0682 : 0.0416)
  );
}

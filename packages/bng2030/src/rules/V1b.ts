import {
  VehicleType,
  validateBngVariant,
  type ModelOutput,
  type Params,
} from "@motorrijtuigenbelasting/core";
import { opcenten } from "@motorrijtuigenbelasting/mrb2023";
import { kmRateComponent } from "./utils.js";

export function V1b(output: ModelOutput, params: Params) {
  /**
   * alleen het Rijksdeel mrb wordt gevariabiliseerd en budgetneutraal
   * omgezet in een kilometertarief. De provinciale opcenten gebaseerd op
   * gewicht blijven bestaan. Voor het overige is deze variant gelijk aan
   * V1a.
   */
  const { vehicleType, bngVariant } = params;

  validateBngVariant(bngVariant);

  const kmRate = kmRateComponent(bngVariant);

  output.push(
    kmRate(vehicleType === VehicleType.Personenauto ? 0.0464 : 0.0416)
  );
  opcenten(output, params);
}

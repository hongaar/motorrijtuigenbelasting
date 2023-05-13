import {
  VehicleType,
  validateBngVariant,
  validateMileage,
  type ModelOutput,
  type Params,
} from "@motorrijtuigenbelasting/core";
import { kmRateComponent } from "./utils.js";

export function V1a_alt2(output: ModelOutput, params: Params) {
  /**
   * gelijk aan variant V1a maar de eerste 3.000 kilometers zijn
   * vrijgesteld. Voor elke kilometer boven de 3.000 kilometer geldt
   * hierdoor een hoger tarief dan in variant V1a om dezelfde totale
   * inkomsten uit het kilometertarief en de overige autobelastingen te
   * kunnen genereren
   */
  const { mileage, vehicleType, bngVariant } = params;

  validateMileage(mileage);
  validateBngVariant(bngVariant);

  const kmRate = kmRateComponent(bngVariant);

  // Calculate the average rate, given the first 3000 km are free
  const rate = vehicleType === VehicleType.Personenauto ? 0.092 : 0.0497;
  const eligibleMileage = mileage - 3000;
  const subtotal = Math.max(0, rate * eligibleMileage);
  const averageRate = subtotal / mileage;

  output.push(kmRate(averageRate));
}

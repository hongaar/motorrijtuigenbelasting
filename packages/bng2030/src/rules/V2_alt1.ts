import {
  InvalidArgument,
  NotImplementedError,
  PropulsionType,
  VehicleType,
  containsOnlyPropulsionType,
  containsPropulsionType,
  validateBngVariant,
  validatePropulsions,
  type ModelOutput,
  type Params,
} from "@motorrijtuigenbelasting/core";
import { taxAmountByWeight } from "@motorrijtuigenbelasting/mrb1995";
import { rateMap_V2_alt1 } from "../rates.js";
import { kmRateComponent } from "./utils.js";

export function V2_alt1(output: ModelOutput, params: Params) {
  /**
   * In deze alternatieve uitwerking is rekening gehouden met het gemiddelde
   * gewicht per brandstofsoort. Het tarief is zo gekozen dat per
   * brandstofsoort het gemiddelde basistarief gelijk is voor een voertuig
   * met een gemiddeld gewicht binnen een brandstofsoort. Dit betekent dat
   * het basistarief voor benzine hoger is dan in V2 en voor alle andere
   * brandstoffen lager.
   */
  const { weight, vehicleType, propulsions, bngVariant } = params;

  validatePropulsions(propulsions);
  validateBngVariant(bngVariant);

  const kmRate = kmRateComponent(bngVariant);

  if (vehicleType !== VehicleType.Personenauto) {
    throw new NotImplementedError(
      "BNG variant V2_alt1 is only available for Personenauto"
    );
  }

  const lookupPropulsion = containsOnlyPropulsionType(
    PropulsionType.Benzine,
    propulsions
  )
    ? PropulsionType.Benzine
    : containsPropulsionType(
        [
          PropulsionType["LPG en overige (behalve elektriciteit en waterstof)"],
          PropulsionType["LPG3 en Aardgas"],
          PropulsionType.Diesel,
        ],
        propulsions
      )
    ? PropulsionType.Diesel
    : containsOnlyPropulsionType(
        [PropulsionType.Elektrisch, PropulsionType.Waterstof],
        propulsions
      )
    ? PropulsionType.Elektrisch
    : containsPropulsionType(
        [PropulsionType.Elektrisch, PropulsionType.Hybride],
        propulsions
      )
    ? PropulsionType.Hybride
    : null;

  if (lookupPropulsion === null) {
    throw new InvalidArgument("propulsions has an invalid value");
  }

  const rates = rateMap_V2_alt1[VehicleType.Personenauto][lookupPropulsion];
  const base = taxAmountByWeight({
    weight,
    rates,
  });

  // Stap 2: verhoging van 17% voor personenauto's
  const stap2 = base + (base * 17) / 100;

  // Stap 3: verhoging van 2,7% voor personenauto's
  const stap3 = stap2 + (stap2 * 2.7) / 100;

  output.push(kmRate(stap3));
}

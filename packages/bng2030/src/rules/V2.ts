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
import { rateMap_V2 } from "../rates.js";
import { kmRateComponent } from "./utils.js";

export function V2(output: ModelOutput, params: Params) {
  /**
   * De vormgeving van het tarief sluit zoveel mogelijk aan bij de
   * vormgeving van de huidige mrb. Het basistarief en de differentiatie
   * naar gewicht is gebaseerd op de mrb van benzinevoertuigen. Voor diesel
   * en LPG geldt, evenals in de huidige mrb, een opslag op het basistarief.
   * Doordat elektrische en plug-in hybride voertuigen gemiddeld zwaarder
   * zijn dan benzinevoertuigen, is het gemiddelde tarief voor EV en PHEV
   * hoger dan het tarief voor benzineauto’s.
   */
  const { weight, vehicleType, propulsions, bngVariant } = params;

  validatePropulsions(propulsions);
  validateBngVariant(bngVariant);

  const kmRate = kmRateComponent(bngVariant);

  if (vehicleType !== VehicleType.Personenauto) {
    throw new NotImplementedError(
      "BNG variant V2 is only available for Personenauto"
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

  const rates = rateMap_V2[VehicleType.Personenauto][lookupPropulsion];
  const base = taxAmountByWeight({
    weight,
    rates,
  });

  // Stap 2: verlaging van 14.3% voor personenauto's
  const stap2 = base - (base * 14.3) / 100;

  // Stap 3: verhoging van 2.8% voor personenauto's
  const stap3 = stap2 + (stap2 * 2.8) / 100;

  output.push(kmRate(stap3));
}

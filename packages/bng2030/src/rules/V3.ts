import {
  NotImplementedError,
  highestPropulsionEmission,
  validateBngVariant,
  validatePropulsions,
  type ModelOutput,
  type Params,
} from "@motorrijtuigenbelasting/core";
import { kmRateComponent } from "./utils.js";

export function V3(output: ModelOutput, params: Params) {
  /**
   * In deze variant wordt het tarief gedifferentieerd naar de CO2 emissies van
   * het voertuig. De mrb en de provinciale opcenten worden gevariabilieerd.
   * Het tarief in deze variant is opgebouwd uit een vast deel, gelijk voor alle
   * voertuigen, en een opslag afhankelijk van de CO2 uitstoot. Het basistarief
   * zorgt er voor dat voor zero-emissievoertuigen ook een bedrag per kilometer
   * betalen. Evenals in variant 1 is er geen opslag in het tarief voor diesel
   * en lpg voertuigen. Voor elke brandstofsoort geldt dus dezelfde
   * tariefstructuur.
   */
  const { propulsions, bngVariant } = params;

  validatePropulsions(propulsions);
  validateBngVariant(bngVariant);

  const kmRate = kmRateComponent(bngVariant);
  const coEmission = highestPropulsionEmission(propulsions);

  if (typeof coEmission === "undefined" || coEmission === null) {
    throw new NotImplementedError(
      "V3 is only available when coEmission is defined"
    );
  }

  const fixed = 0.022;
  const variableRate = 0.000525;
  const minEmission = 80;
  const maxEmission = 200;

  const baseEmission = Math.min(Math.max(minEmission, coEmission), maxEmission);
  const base = fixed + baseEmission * variableRate;

  // Stap 3: verhoging van 1,6%
  const stap3 = base + (base * 1.6) / 100;

  output.push(kmRate(stap3));
}

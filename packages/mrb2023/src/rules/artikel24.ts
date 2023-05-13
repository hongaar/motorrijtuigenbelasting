import {
  Period,
  PropulsionType,
  Unit,
  calculateTotal,
  containsPropulsionType,
  validatePropulsions,
  type ModelOutput,
  type Params,
} from "@motorrijtuigenbelasting/core";
import {
  artikel_23_1,
  artikel_23_2_a,
  artikel_23_2_b,
  artikel_23_3,
} from "./artikel23.js";

/**
 * Motorrijtuigenbelasting voor een bestelauto
 */
export function artikel_24_1(output: ModelOutput, params: Params) {
  artikel_23_1(output, params);
  artikel_23_2_a(output, params);
  artikel_23_2_b(output, params);
  artikel_23_3(output, params);
}

/**
 * Fijnstoftoeslag voor een bestelauto rijdend op diesel, zijnde 15%
 */
export function artikel_24_2(output: ModelOutput, params: Params) {
  const { propulsions } = params;

  validatePropulsions(propulsions);

  if (
    containsPropulsionType(PropulsionType.Diesel, propulsions) &&
    params.particulateMatterSurtax
  ) {
    output.push({
      name: "Fijnstoftoeslag",
      description:
        "Fijnstoftoeslag voor een bestelauto rijdend op diesel, zijnde 15%",
      reference: {
        title: "Artikel 24, tweede lid, Wet op de motorrijtuigenbelasting 1994",
        url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=3&artikel=24&lid=2&z=2023-01-01&g=2023-01-01",
      },
      subtotal:
        calculateTotal(output, { period: Period.quarter }).unrounded! * 0.15,
      unit: Unit.euro_per_quarter,
    });
  }
}

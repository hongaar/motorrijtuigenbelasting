import {
  Unit,
  VehicleType,
  type ModelOutput,
  type Params,
} from "@motorrijtuigenbelasting/core";
import { taxAmountByWeight } from "@motorrijtuigenbelasting/mrb1995";
import { rateMap } from "../rates.js";

/**
 * Motorrijtuigenbelasting voor een bestelauto ondernemer
 */
export function artikel_24b(output: ModelOutput, params: Params) {
  const { weight } = params;
  const { rates } = rateMap[VehicleType["Bestelauto ondernemer"]];
  const base = taxAmountByWeight({
    weight,
    rates,
  });

  output.push({
    name: "Motorrijtuigenbelasting",
    description: "Motorrijtuigenbelasting voor een bestelauto ondernemer",
    reference: {
      title: "Artikel 24b, Wet op de motorrijtuigenbelasting 1994",
      url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=3&artikel=24b&z=2023-01-01&g=2023-01-01",
    },
    subtotal: base,
    unit: Unit.euro_per_quarter,
  });
}

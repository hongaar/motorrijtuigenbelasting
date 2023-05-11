import {
  Period,
  PropulsionType,
  Unit,
  VehicleType,
  calculateTotal,
  containsPropulsionType,
  validatePropulsions,
  type ModelOutput,
  type Params,
} from "@motorrijtuigenbelasting/core";
import { taxAmountByWeight } from "@motorrijtuigenbelasting/mrb1995";
import { rateMap } from "../rates.js";

/**
 * Voorwaarden bestelautotarief voor ondernemers
 *
 * U betaalt een lager tarief voor uw bestelauto, als u voldoet aan alle
 * volgende voorwaarden:
 * - U bent ondernemer voor de omzetbelasting en u hebt een btw-nummer.
 * - De bestelauto staat op uw naam, en u bent de (rechts)persoon aan wie het
 *   btw-nummer is toegekend.
 * - U gebruikt de bestelauto meer dan bijkomstig voor uw onderneming. Dit
 *   betekent dat u uw bestelauto voor meer dan 10% van de jaarlijks verreden
 *   kilometers voor uw onderneming gebruikt.
 */
export function bestelautoOndernemer(params: Params): ModelOutput {
  const { propulsions, weight } = params;

  validatePropulsions(propulsions);

  if (
    containsPropulsionType(
      [PropulsionType.Elektrisch, PropulsionType.Waterstof],
      propulsions
    )
  ) {
    return [
      {
        name: "Motorrijtuigenbelasting",
        description:
          "Voor een auto die volledig en uitsluitend op elektriciteit of waterstof rijdt, betaalt u geen motorrijtuigenbelasting.",
        reference: {
          title: "Artikel 31 Wet op de motorrijtuigenbelasting 1994",
          url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=9&artikel=31&z=2023-01-01&g=2023-01-01",
        },
        subtotal: 0,
      },
    ];
  }

  const output: ModelOutput = [];
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

  return output;
}

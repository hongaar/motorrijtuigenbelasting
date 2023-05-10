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
 * Een personenauto moet voor de motorrijtuigenbelasting voldoen aan de volgende
 * eisen:
 * - 3 of meer wielen
 * - ingericht voor het vervoer van maximaal 8 personen
 *   De bestuurder rekenen wij daar niet bij.
 *
 * De volgende motorrijtuigen zijn voor de motorrijtuigenbelasting ook
 * personenauto's:
 * - kampeerauto's
 * - bestelauto's die niet aan de inrichtingseisen voor een bestelauto voldoen
 * - Motorrijtuigen met een dubbele cabine en een laadruimte en een toegestane
 *   maximum massa van meer dan 3.500 kg als het motorrijtuig voor meer dan 50%
 *   is ingericht voor personenvervoer.
 */
export function bestelautoParticulier(params: Params): ModelOutput {
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
  const { rates, surtaxes } = rateMap[VehicleType["Personenauto"]];

  const base = taxAmountByWeight({
    weight,
    rates,
  });
  output.push({
    name: "Motorrijtuigenbelasting",
    description: "Motorrijtuigenbelasting voor een bestelauto particulier",
    reference: {
      title: "Artikel 24b, Wet op de motorrijtuigenbelasting 1994",
      url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=3&artikel=24&z=2023-01-01&g=2023-01-01",
    },
    subtotal: base,
    unit: Unit.euro_per_quarter,
  });

  if (containsPropulsionType([PropulsionType.Diesel], propulsions)) {
    const surtax = taxAmountByWeight({
      weight,
      rates: surtaxes?.[PropulsionType.Diesel] || [],
    });
    output.push({
      name: "Brandstoftoeslag",
      description: "Brandstoftoeslag voor een personenauto rijdend op diesel",
      reference: {
        title: "Artikel 23, tweede lid, Wet op de motorrijtuigenbelasting 1994",
        url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23&lid=2&z=2023-01-01&g=2023-01-01",
      },
      subtotal: surtax,
      unit: Unit.euro_per_quarter,
    });
  }

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

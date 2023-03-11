import {
  calculateTotal,
  containsPropulsionType,
  highestPropulsionEmission,
  ModelOutput,
  Params,
  Period,
  PropulsionType,
  Unit,
  validatePropulsions,
  validateProvince,
  VehicleType,
} from "@motorrijtuigenbelasting/core";
import {
  rateMap as rateMap1995,
  taxAmountByWeight,
} from "@motorrijtuigenbelasting/mrb1995";
import { provinceSurtaxPercentage } from "../provinceSurtax.js";
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
export function personenauto(params: Params): ModelOutput {
  const { province, propulsions, weight } = params;

  validateProvince(province);
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
          "Voor een Personenauto die volledig en uitsluitend op elektriciteit of waterstof rijdt, betaalt u geen motorrijtuigenbelasting.",
        reference: {
          title: "Artikel 31 Wet op de motorrijtuigenbelasting 1994",
          url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=9&artikel=31&z=2023-01-01&g=2023-01-01",
        },
        subtotal: 0,
      },
    ];
  }

  if (highestPropulsionEmission(propulsions) === 0) {
    return [
      {
        name: "Motorrijtuigenbelasting",
        description:
          "Hebt u een personenauto met een CO2-uitstoot van 0 gram per kilometer? Dan betaalt u geen motorrijtuigenbelasting.",
        reference: {
          title:
            "Artikel 23b, eerste lid, Wet op de motorrijtuigenbelasting 1994",
          url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23b&z=2023-01-01&g=2023-01-01",
        },
        subtotal: 0,
      },
    ];
  }

  const output: ModelOutput = [];
  const { rates, surtaxes } = rateMap[VehicleType.Personenauto];

  const base = taxAmountByWeight({
    weight,
    rates,
  });
  output.push({
    name: "Motorrijtuigenbelasting",
    description: "Motorrijtuigenbelasting voor een personenauto",
    reference: {
      title: "Artikel 23, eerste lid, Wet op de motorrijtuigenbelasting 1994",
      url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23&z=2023-01-01&g=2023-01-01",
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
        url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23&z=2023-01-01&g=2023-01-01",
      },
      subtotal: surtax,
      unit: Unit.euro_per_quarter,
    });
  }

  const provinceSurtax = taxAmountByWeight({
    weight,
    rates: rateMap1995[VehicleType.Personenauto].rates,
  });
  output.push({
    name: "Grondslag opcenten",
    description: `Motorrijtuigenbelasting (1995) voor een personenauto, zijnde € ${provinceSurtax.toFixed(
      2
    )}`,
    reference: {
      title: "Wet op de motorrijtuigenbelasting 1994 (geldig op 1 april 1995)",
      url: "https://zoek.officielebekendmakingen.nl/stb-1995-152.html",
    },
  });

  const opcentenPercentage = provinceSurtaxPercentage(province);
  output.push({
    name: "Opcenten",
    description: `Provinciale opcenten voor ${
      province || "(geen provincie)"
    }, zijnde ${opcentenPercentage * 100}%`,
    reference: {
      title: "Artikel 222, Provinciewet",
      url: "https://wetten.overheid.nl/jci1.3:c:BWBR0005645&titeldeel=IV&hoofdstuk=XV&paragraaf=2&artikel=222&z=2023-01-01&g=2023-01-01",
    },
    subtotal: provinceSurtax * opcentenPercentage,
    unit: Unit.euro_per_quarter,
  });

  /**
   * Hebt u een personenauto met een CO2-uitstoot van 1 tot en met 50 gram per
   * kilometer? Dan geldt een halftarief. Dit betekent dat u de helft betaalt
   * van het tarief voor een gewone personenauto.
   */
  const highestPropulsion = highestPropulsionEmission(propulsions);
  if (highestPropulsion && highestPropulsion <= 50) {
    output.push({
      name: "Halftarief",
      description:
        "Hebt u een personenauto met een CO2-uitstoot van 1 tot en met 50 gram per kilometer? Dan geldt een halftarief. Dit betekent dat u de helft betaalt van het tarief voor een gewone personenauto. (correctie)",
      reference: {
        title:
          "Artikel 23b, eerste lid, Wet op de motorrijtuigenbelasting 1994",
        url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23b&z=2023-01-01&g=2023-01-01",
      },
      subtotal:
        calculateTotal(output, { period: Period.quarter }).unrounded! / -2,
      unit: Unit.euro_per_quarter,
    });
  }

  return output;
}

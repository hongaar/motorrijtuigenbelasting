import {
  Period,
  PropulsionType,
  Unit,
  calculateTotal,
  containsOnlyPropulsionType,
  highestPropulsionEmission,
  validatePropulsions,
  type ModelOutput,
  type Params,
} from "@motorrijtuigenbelasting/core";

/**
 * Voor een personenauto die volledig en uitsluitend op elektriciteit of
 * waterstof rijdt, betaalt u geen motorrijtuigenbelasting.
 */
export function artikel_23b_1_a(output: ModelOutput, params: Params) {
  const { propulsions } = params;

  validatePropulsions(propulsions);

  if (
    containsOnlyPropulsionType(
      [PropulsionType.Elektrisch, PropulsionType.Waterstof],
      propulsions
    )
  ) {
    output.push({
      name: "Motorrijtuigenbelasting",
      description:
        "Voor een personenauto die volledig en uitsluitend op elektriciteit of waterstof rijdt, betaalt u geen motorrijtuigenbelasting.",
      reference: {
        title:
          "Artikel 23b, eerste lid, Wet op de motorrijtuigenbelasting 1994",
        url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23b&z=2023-01-01&g=2023-01-01",
      },
      subtotal: 0,
    });

    return true;
  }

  return false;
}

/**
 * Hebt u een personenauto met een CO2-uitstoot van 0 gram per kilometer? Dan
 * betaalt u geen motorrijtuigenbelasting.
 */
export function artikel_23b_1_b(output: ModelOutput, params: Params) {
  const { propulsions } = params;

  validatePropulsions(propulsions);

  if (highestPropulsionEmission(propulsions) === 0) {
    output.push({
      name: "Motorrijtuigenbelasting",
      description:
        "Hebt u een personenauto met een CO2-uitstoot van 0 gram per kilometer? Dan betaalt u geen motorrijtuigenbelasting.",
      reference: {
        title:
          "Artikel 23b, eerste lid, Wet op de motorrijtuigenbelasting 1994",
        url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23b&z=2023-01-01&g=2023-01-01",
      },
      subtotal: 0,
    });

    return true;
  }

  return false;
}

/**
 * Hebt u een personenauto met een CO2-uitstoot van 1 tot en met 50 gram per
 * kilometer? Dan geldt een halftarief. Dit betekent dat u de helft betaalt
 * van het tarief voor een gewone personenauto.
 */
export function artikel_23b_2(output: ModelOutput, params: Params) {
  const { propulsions } = params;

  validatePropulsions(propulsions);

  const highestPropulsion = highestPropulsionEmission(propulsions);

  if (highestPropulsion && highestPropulsion <= 50) {
    output.push({
      name: "Halftarief",
      description:
        "Hebt u een personenauto met een CO2-uitstoot van 1 tot en met 50 gram per kilometer? Dan geldt een halftarief. Dit betekent dat u de helft betaalt van het tarief voor een gewone personenauto. (correctie)",
      reference: {
        title:
          "Artikel 23b, eerste lid, Wet op de motorrijtuigenbelasting 1994",
        url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23b&lid=1&z=2023-01-01&g=2023-01-01",
      },
      subtotal:
        calculateTotal(output, { period: Period.quarter }).unrounded! / -2,
      unit: Unit.euro_per_quarter,
    });
  }
}

import {
  PropulsionType,
  containsPropulsionType,
  validatePropulsions,
  type ModelOutput,
  type Params,
} from "@motorrijtuigenbelasting/core";

/**
 * Voor een motorrijtuig die volledig en uitsluitend op elektriciteit of
 * waterstof rijdt, betaalt u geen motorrijtuigenbelasting.
 */
export function artikel_31(output: ModelOutput, params: Params) {
  const { propulsions } = params;

  validatePropulsions(propulsions);

  if (
    containsPropulsionType(
      [PropulsionType.Elektrisch, PropulsionType.Waterstof],
      propulsions
    )
  ) {
    output.push({
      name: "Motorrijtuigenbelasting",
      description:
        "Voor een motorrijtuig die volledig en uitsluitend op elektriciteit of waterstof rijdt, betaalt u geen motorrijtuigenbelasting.",
      reference: {
        title: "Artikel 31 Wet op de motorrijtuigenbelasting 1994",
        url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=9&artikel=31&z=2023-01-01&g=2023-01-01",
      },
      subtotal: 0,
    });

    return true;
  }

  return false;
}

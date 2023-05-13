import {
  Period,
  Unit,
  calculateTotal,
  type ModelOutput,
  type Params,
} from "@motorrijtuigenbelasting/core";

/**
 * Voor kampeerauto's geldt dat de belasting een kwart van het normale tarief
 * bedraagt. (correctie)
 */
export function artikel_23a_1(output: ModelOutput, _params: Params) {
  output.push({
    name: "Kampeerauto tarief",
    description:
      "Voor kampeerauto's geldt dat de belasting een kwart van het normale tarief bedraagt. (correctie)",
    reference: {
      title: "Artikel 23a, eerste lid, Wet op de motorrijtuigenbelasting 1994",
      url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23a&lid=1&z=2023-01-01&g=2023-01-01",
    },
    subtotal:
      (calculateTotal(output, { period: Period.quarter }).unrounded! / -4) * 3,
    unit: Unit.euro_per_quarter,
  });
}

/**
 * Voor kampeerauto's die bedrijfsmatig worden verhuurd geldt dat de belasting
 * de helft van het normale tarief bedraagt. (correctie)
 */
export function artikel_23a_2(output: ModelOutput, params: Params) {
  if (params.rentedForBusinessPurposes) {
    output.push({
      name: "Kampeerauto tarief",
      description:
        "Voor kampeerauto's die bedrijfsmatig worden verhuurd geldt dat de belasting de helft van het normale tarief bedraagt. (correctie)",
      reference: {
        title:
          "Artikel 23a, tweede lid, Wet op de motorrijtuigenbelasting 1994",
        url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23a&lid=2&z=2023-01-01&g=2023-01-01",
      },
      subtotal:
        calculateTotal(output, { period: Period.quarter }).unrounded! / -2,
      unit: Unit.euro_per_quarter,
    });

    return true;
  }

  return false;
}

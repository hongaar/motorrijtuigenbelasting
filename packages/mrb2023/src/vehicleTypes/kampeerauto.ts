import {
  Period,
  Unit,
  calculateTotal,
  type ModelOutput,
  type Params,
} from "@motorrijtuigenbelasting/core";
import { personenauto } from "./personenauto.js";

/**
 * Kampeerauto (camper)
 *
 * Een kampeerauto is voor de motorrijtuigenbelasting een personenauto:
 * - waarvan de binnenruimte is ingericht voor het vervoer en verblijf van
 *   personen
 * - die is voorzien van een vaste kook- en slaapgelegenheid
 * - die voldoet aan de inrichtingseisen die gelden sinds 1 mei 2002.
 */
export function kampeerauto(params: Params): ModelOutput {
  const output = personenauto(params);

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

    return output;
  }

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

  return output;
}

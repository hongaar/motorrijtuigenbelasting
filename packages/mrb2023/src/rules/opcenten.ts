import {
  Unit,
  VehicleType,
  validateProvince,
  type ModelOutput,
  type Params,
} from "@motorrijtuigenbelasting/core";
import {
  rateMap as rateMap1995,
  taxAmountByWeight,
} from "@motorrijtuigenbelasting/mrb1995";
import { provinceSurtaxPercentage } from "../provinceSurtax.js";

/**
 * Provinciale opcenten
 */
export function opcenten(output: ModelOutput, params: Params) {
  const { province, weight } = params;

  validateProvince(province);

  const provinceSurtax = taxAmountByWeight({
    weight,
    rates: rateMap1995[VehicleType.Personenauto].rates,
  });
  const opcentenPercentage = provinceSurtaxPercentage(province);

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

  output.push({
    name: "Opcenten",
    description: `Provinciale opcenten voor ${
      province || "(geen provincie)"
    }, zijnde ${(opcentenPercentage * 100).toFixed(2)}%`,
    reference: {
      title: "Artikel 222, Provinciewet",
      url: "https://wetten.overheid.nl/jci1.3:c:BWBR0005645&titeldeel=IV&hoofdstuk=XV&paragraaf=2&artikel=222&z=2023-01-01&g=2023-01-01",
    },
    subtotal: provinceSurtax * opcentenPercentage,
    unit: Unit.euro_per_quarter,
  });
}

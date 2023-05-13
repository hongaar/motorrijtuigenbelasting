import { type ModelOutput, type Params } from "@motorrijtuigenbelasting/core";
import { artikel_24_1, artikel_24_2, artikel_31 } from "../rules/index.js";

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
  const output: ModelOutput = [];

  if (artikel_31(output, params)) {
    return output;
  }

  artikel_24_1(output, params);

  artikel_24_2(output, params);

  return output;
}

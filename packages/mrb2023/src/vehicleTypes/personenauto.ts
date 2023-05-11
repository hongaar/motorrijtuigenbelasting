import { type ModelOutput, type Params } from "@motorrijtuigenbelasting/core";
import {
  artikel_23_1,
  artikel_23_2_a,
  artikel_23_2_b,
  artikel_23_3,
  artikel_23_4,
  artikel_23b_1_a,
  artikel_23b_1_b,
  artikel_23b_2,
  opcenten,
} from "../rules/index.js";

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
  const output: ModelOutput = [];

  if (artikel_23b_1_a(output, params)) {
    return output;
  }

  if (artikel_23b_1_b(output, params)) {
    return output;
  }

  artikel_23_1(output, params);

  artikel_23_2_a(output, params);

  artikel_23_2_b(output, params);

  artikel_23_3(output, params);

  artikel_23_4(output, params);

  opcenten(output, params);

  artikel_23b_2(output, params);

  return output;
}

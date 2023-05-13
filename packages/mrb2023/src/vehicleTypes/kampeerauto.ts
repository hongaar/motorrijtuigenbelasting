import { type ModelOutput, type Params } from "@motorrijtuigenbelasting/core";
import { artikel_23a_1, artikel_23a_2 } from "../rules/artikel23a.js";
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

  if (artikel_23a_2(output, params)) {
    return output;
  }

  artikel_23a_1(output, params);

  return output;
}

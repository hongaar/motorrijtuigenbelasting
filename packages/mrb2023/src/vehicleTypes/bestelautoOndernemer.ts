import { type ModelOutput, type Params } from "@motorrijtuigenbelasting/core";
import { artikel_24_2, artikel_24b, artikel_31 } from "../rules/index.js";

/**
 * Voorwaarden bestelautotarief voor ondernemers
 *
 * U betaalt een lager tarief voor uw bestelauto, als u voldoet aan alle
 * volgende voorwaarden:
 * - U bent ondernemer voor de omzetbelasting en u hebt een btw-nummer.
 * - De bestelauto staat op uw naam, en u bent de (rechts)persoon aan wie het
 *   btw-nummer is toegekend.
 * - U gebruikt de bestelauto meer dan bijkomstig voor uw onderneming. Dit
 *   betekent dat u uw bestelauto voor meer dan 10% van de jaarlijks verreden
 *   kilometers voor uw onderneming gebruikt.
 */
export function bestelautoOndernemer(params: Params): ModelOutput {
  const output: ModelOutput = [];

  if (artikel_31(output, params)) {
    return output;
  }

  artikel_24b(output, params);

  artikel_24_2(output, params);

  return output;
}

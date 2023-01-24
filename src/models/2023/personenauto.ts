import { ModelParams, Voertuigtype } from "../../params.js";
import { Model_1995_Tarieven_Benzine } from "../1995/tarieven.js";
import { Model_Personenauto } from "../personenauto.js";
import { Model_2023_Opcenten } from "./opcenten.js";
import { Model_2023_Tarieven_Benzine } from "./tarieven.js";

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
export function Model_2023_Personenauto(params: ModelParams) {
  const {
    provincie,
    brandstof,
    elektrisch_of_waterstof,
    gewicht,
    voertuigtype,
  } = params;

  /**
   * Voor een Personenauto die volledig en uitsluitend op elektriciteit of
   * waterstof rijdt, betaalt u geen motorrijtuigenbelasting.
   */
  if (elektrisch_of_waterstof) {
    return 0;
  }

  if (
    voertuigtype ===
    Voertuigtype["Personenauto met een CO2-uitstoot van 0 gr/km"]
  ) {
    /**
     * Hebt u een personenauto met een CO2-uitstoot van 0 gram per kilometer? Dan
     * betaalt u geen motorrijtuigenbelasting.
     */
    return 0;
  }

  let bedrag: number;

  const grondslag = Model_Personenauto({
    gewicht,
    brandstof,
    tarieven: Model_2023_Tarieven_Benzine,
  });

  const opcentenGrondslag = Model_Personenauto({
    gewicht,
    brandstof,
    tarieven: Model_1995_Tarieven_Benzine,
  });

  const opcentenPercentage = Model_2023_Opcenten(provincie);

  bedrag = grondslag + opcentenGrondslag * opcentenPercentage;

  /**
   * Hebt u een personenauto met een CO2-uitstoot van 1 tot en met 50 gram per
   * kilometer? Dan geldt een halftarief. Dit betekent dat u de helft betaalt
   * van het tarief voor een gewone personenauto.
   */
  if (
    voertuigtype ===
    Voertuigtype["Personenauto met een CO2-uitstoot van 1 t/m 50 gr/km"]
  ) {
    bedrag = bedrag / 2;
  }

  return Math.floor(bedrag);
}

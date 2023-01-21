import { Brandstof, ModelParams, Voertuigtype } from "../../index.js";
import { NotImplementedError } from "./index.js";
import { Model_2023_Opcenten } from "./opcenten.js";

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

  /**
   * Wet op de motorrijtuigenbelasting 1994
   * Artikel 23
   * https://wetten.overheid.nl/BWBR0006324/2023-01-01#HoofdstukIV
   */

  if (brandstof === Brandstof.Benzine) {
    if (gewicht <= 550) {
      bedrag = 18.75;
    } else if (gewicht <= 650) {
      bedrag = 25.44;
    } else if (gewicht <= 750) {
      bedrag = 32.33;
    } else if (gewicht <= 850) {
      bedrag = 42.2;
    } else if (gewicht > 950 && gewicht <= 3250) {
      const factor = Math.ceil((gewicht - 900) / 100);
      bedrag = 56.13 + 15.09 * factor;
    } else {
      const factor = Math.ceil((gewicht - 3300) / 100);
      bedrag = 414.29 + 10.48 * factor;
    }
  } else if (brandstof === Brandstof.Diesel) {
    throw new NotImplementedError();
  } else {
    throw new NotImplementedError();
  }

  /**
   * Vermeerderen met provinciale opcenten
   */
  const opcentenPercentage = Model_2023_Opcenten(provincie);
  bedrag = bedrag * (1 + opcentenPercentage);

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

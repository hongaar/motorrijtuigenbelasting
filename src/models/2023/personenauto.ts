import { InvalidParameters } from "../../errors.js";
import { berekenOutput, ModelOutputOnderdelen } from "../../output.js";
import { ModelParams, Voertuigtype } from "../../params.js";
import { Model_1995_Tarieven } from "../1995/tarieven.js";
import { Model_Personenauto } from "../personenauto.js";
import { Model_2023_Opcenten } from "./opcenten.js";
import { Model_2023_Tarieven } from "./tarieven.js";

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

  if (elektrisch_of_waterstof) {
    return berekenOutput([
      {
        omschrijving:
          "Voor een Personenauto die volledig en uitsluitend op elektriciteit of waterstof rijdt, betaalt u geen motorrijtuigenbelasting.",
        subtotaal: 0,
      },
    ]);
  }

  if (
    voertuigtype ===
    Voertuigtype["Personenauto met een CO2-uitstoot van 0 gr/km"]
  ) {
    /**
     *
     */
    return berekenOutput([
      {
        omschrijving:
          "Hebt u een personenauto met een CO2-uitstoot van 0 gram per kilometer? Dan betaalt u geen motorrijtuigenbelasting.",
        subtotaal: 0,
      },
    ]);
  }

  if (!brandstof) {
    throw new InvalidParameters("brandstof is verplicht");
  }

  const onderdelen: ModelOutputOnderdelen = [];

  const grondslag = Model_Personenauto({
    gewicht,
    brandstof,
    tarieven: Model_2023_Tarieven[Voertuigtype.Personenauto],
  });

  onderdelen.push({
    omschrijving: `Motorrijtuigenbelasting voor een personenauto die op ${brandstof.toLowerCase()} rijdt`,
    waarde: grondslag,
    subtotaal: grondslag,
  });

  const opcentenGrondslag = Model_Personenauto({
    gewicht,
    brandstof,
    tarieven: Model_1995_Tarieven[Voertuigtype.Personenauto],
    brandstoftoeslag: false,
  });

  onderdelen.push({
    omschrijving: `Motorrijtuigenbelasting voor een personenauto die op ${brandstof.toLowerCase()} rijdt (grondslag 1995)`,
    waarde: opcentenGrondslag,
  });

  const opcentenPercentage = Model_2023_Opcenten(provincie);

  onderdelen.push({
    omschrijving: "Provinciale opcenten (berekend over grondslag 1995)",
    waarde: `${opcentenPercentage * 100}%`,
    subtotaal: opcentenGrondslag * opcentenPercentage,
  });

  /**
   * Hebt u een personenauto met een CO2-uitstoot van 1 tot en met 50 gram per
   * kilometer? Dan geldt een halftarief. Dit betekent dat u de helft betaalt
   * van het tarief voor een gewone personenauto.
   */
  if (
    voertuigtype ===
    Voertuigtype["Personenauto met een CO2-uitstoot van 1 t/m 50 gr/km"]
  ) {
    onderdelen.push({
      omschrijving:
        "Hebt u een personenauto met een CO2-uitstoot van 1 tot en met 50 gram per kilometer? Dan geldt een halftarief. Dit betekent dat u de helft betaalt van het tarief voor een gewone personenauto. (correctie)",
      subtotaal: berekenOutput(onderdelen)._precise / -2,
    });

    return berekenOutput(onderdelen);
  }

  if (voertuigtype === Voertuigtype["Personenauto"]) {
    return berekenOutput(onderdelen);
  }

  throw new InvalidParameters(`voertuigtype: ${voertuigtype}`);
}

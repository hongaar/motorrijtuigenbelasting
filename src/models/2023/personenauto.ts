import { InvalidParameters } from "../../errors.js";
import { berekenOutput, ModelOutputOnderdelen } from "../../output.js";
import { Brandstof, ModelParams, Voertuigtype } from "../../params.js";
import { Model_1995_Tarieven } from "../1995/tarieven.js";
import { gewichtsTarief } from "../gewichtsTarief.js";
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
        referentie: {
          titel: "Artikel 31 Wet op de motorrijtuigenbelasting 1994",
          url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=9&artikel=31&z=2023-01-01&g=2023-01-01",
        },

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
        referentie: {
          titel:
            "Artikel 23b, eerste lid, Wet op de motorrijtuigenbelasting 1994",
          url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23b&z=2023-01-01&g=2023-01-01",
        },
        subtotaal: 0,
      },
    ]);
  }

  if (!brandstof) {
    throw new InvalidParameters("brandstof is verplicht");
  }

  const onderdelen: ModelOutputOnderdelen = [];

  const basis = gewichtsTarief({
    gewicht,
    tarieven: Model_2023_Tarieven[Voertuigtype.Personenauto].basis,
  });

  onderdelen.push({
    omschrijving: `Motorrijtuigenbelasting voor een personenauto`,
    referentie: {
      titel: "Artikel 23, eerste lid, Wet op de motorrijtuigenbelasting 1994",
      url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23&z=2023-01-01&g=2023-01-01",
    },
    subtotaal: basis,
  });

  if (brandstof === Brandstof.Diesel) {
    const brandstoftoeslag = gewichtsTarief({
      gewicht,
      tarieven:
        Model_2023_Tarieven[Voertuigtype.Personenauto].toeslagen[
          Brandstof.Diesel
        ],
    });

    onderdelen.push({
      omschrijving: `Brandstoftoeslag voor een personenauto rijdend op diesel`,
      referentie: {
        titel: "Artikel 23, tweede lid, Wet op de motorrijtuigenbelasting 1994",
        url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23&z=2023-01-01&g=2023-01-01",
      },
      subtotaal: brandstoftoeslag,
    });
  }

  const opcentenGrondslag = gewichtsTarief({
    gewicht,
    tarieven: Model_1995_Tarieven[Voertuigtype.Personenauto].basis,
  });

  onderdelen.push({
    omschrijving: `Motorrijtuigenbelasting voor een personenauto (grondslag 1995)`,
    referentie: {
      titel: "Wet op de motorrijtuigenbelasting 1994 (geldig op 1 april 1995)",
      url: "https://zoek.officielebekendmakingen.nl/stb-1995-152.html",
    },
    waarde: `€ ${opcentenGrondslag.toFixed(2)}`,
  });

  const opcentenPercentage = Model_2023_Opcenten(provincie);

  onderdelen.push({
    omschrijving: "Provinciale opcenten (berekend over grondslag 1995)",
    referentie: {
      titel: "Artikel 222, Provinciewet",
      url: "https://wetten.overheid.nl/jci1.3:c:BWBR0005645&titeldeel=IV&hoofdstuk=XV&paragraaf=2&artikel=222&z=2023-01-01&g=2023-01-01",
    },
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
      referentie: {
        titel:
          "Artikel 23b, eerste lid, Wet op de motorrijtuigenbelasting 1994",
        url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23b&z=2023-01-01&g=2023-01-01",
      },
      subtotaal: berekenOutput(onderdelen)._precise / -2,
    });

    return berekenOutput(onderdelen);
  }

  if (voertuigtype === Voertuigtype["Personenauto"]) {
    return berekenOutput(onderdelen);
  }

  throw new InvalidParameters(`voertuigtype: ${voertuigtype}`);
}

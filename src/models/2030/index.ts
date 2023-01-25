import { InvalidParameters } from "../../errors.js";
import type { ModelParams } from "../../params.js";

/**
 * Hypothetisch model
 */
export function Model_2030(params: ModelParams) {
  const { km_per_jaar } = params;

  /**
   * Datum 1 juli 2022
   * Betreft 1e hoofdlijnenbrief Betalen naar Gebruik
   * https://open.overheid.nl/repository/ronl-9dd3e422527fe9acae0639582c9b11a792813853/1/pdf/Kamerbrief%20eerste%20hoofdlijnen%20Betalen%20naar%20gebruik.pdf:
   *
   * > In 2022 wordt met de autobelastingen voor personen- en bestelauto’s
   * > naar verwachting ongeveer 14 mld. euro opgehaald, waarvan 4,2 mld. via
   * > het rijksdeel van de huidige mrb. De overige opbrengsten van de
   * > autobelastingen komen uit de bpm, de accijnzen, de bijtelling en de
   * > energiebelasting voor het opladen van elektrische auto’s.
   *
   * > Het kabinet werkt momenteel meerdere varianten uit en zal onderzoeken
   * > welke tarieven nodig zijn om de gestelde doelen (de opbrengsten van de
   * > autobelastingen op het niveau van 2025 houden en 2,5 Mton CO2-reductie
   * > in 2030) te behalen en welke beleidseffecten daarbij optreden.
   *
   * Hoeveel rijden Nederlandse motorvoertuigen?
   * https://www.cbs.nl/nl-nl/visualisaties/verkeer-en-vervoer/verkeer/verkeersprestaties
   *
   * > Nederlandse motorvoertuigen, exclusief motor- en bromfietsen, legden in
   * > 2021 ruim 133,6 miljard kilometer af in binnen- en buitenland.
   */

  const opcenten_percentage_gemiddeld = 0.5;
  const gewenste_opbrengsten_rijksdeel = 14_000_000_000;

  const gewenste_opbrengsten =
    gewenste_opbrengsten_rijksdeel * (1 + opcenten_percentage_gemiddeld);

  const aantal_km_totaal = 133_600_000_000;

  const km_tarief = gewenste_opbrengsten / aantal_km_totaal;

  if (typeof km_per_jaar !== "number") {
    throw new InvalidParameters(`km_per_jaar: ${km_per_jaar}`);
  }

  // Bedrag per kwartaal
  return Math.floor((km_tarief * km_per_jaar) / 4);
}

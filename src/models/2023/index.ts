import { NotImplementedError } from "../../errors.js";
import type { ModelOutput } from "../../output.js";
import { ModelParams, Voertuigtype } from "../../params.js";
import { Model_2023_Personenauto } from "./personenauto.js";

export function Model_2023(params: ModelParams): ModelOutput {
  const {
    // provincie,
    // brandstof,
    // elektrisch_of_waterstof,
    // gewicht,
    voertuigtype,
  } = params;

  /**
   * Overzicht vrijstellingen motorrijtuigenbelasting
   * https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/auto_en_vervoer/belastingen_op_auto_en_motor/motorrijtuigenbelasting/vrijstelling_onder_andere_voor_oldtimers/
   *
   * Not implemented
   */

  /**
   * Bijzonder tarief motorrijtuigenbelasting
   * https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/auto_en_vervoer/belastingen_op_auto_en_motor/motorrijtuigenbelasting/bijzonder_tarief/
   *
   * Not implemented
   */

  /**
   * Motorrijtuigenbelasting per soort motorrijtuig
   * https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/auto_en_vervoer/belastingen_op_auto_en_motor/motorrijtuigenbelasting/soort_motorrijtuig/
   */
  switch (voertuigtype) {
    case Voertuigtype.Personenauto:
    case Voertuigtype["Personenauto met een CO2-uitstoot van 0 gr/km"]:
    case Voertuigtype["Personenauto met een CO2-uitstoot van 1 t/m 50 gr/km"]:
      /**
       * Personenauto
       * https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/auto_en_vervoer/belastingen_op_auto_en_motor/motorrijtuigenbelasting/soort_motorrijtuig/personenauto
       */
      return Model_2023_Personenauto(params);
  }

  throw new NotImplementedError();
}

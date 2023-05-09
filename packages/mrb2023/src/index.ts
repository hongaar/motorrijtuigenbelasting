import {
  InvalidArgument,
  NotImplementedError,
  VehicleType,
  type Model,
} from "@motorrijtuigenbelasting/core";
import {
  bestelautoOndernemer,
  bestelautoParticulier,
  kampeerauto,
  personenauto,
} from "./vehicleTypes/index.js";

const model: Model = (params) => {
  const {
    // provincie,
    // brandstof,
    // elektrisch_of_waterstof,
    weight,
    vehicleType,
  } = params;

  if (typeof vehicleType === "undefined") {
    throw new InvalidArgument("vehicleType is missing");
  }

  if (typeof weight === "undefined") {
    throw new InvalidArgument("weight is missing");
  }

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
  switch (vehicleType) {
    case VehicleType.Personenauto:
      /**
       * Personenauto
       * https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/auto_en_vervoer/belastingen_op_auto_en_motor/motorrijtuigenbelasting/soort_motorrijtuig/personenauto
       */
      return personenauto(params);

    case VehicleType.Kampeerauto:
      /**
       * Kampeerauto (camper)
       * https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/auto_en_vervoer/belastingen_op_auto_en_motor/motorrijtuigenbelasting/bijzonder_tarief/kampeerauto-camper
       */
      return kampeerauto(params);

    case VehicleType["Bestelauto particulier"]:
      /**
       * Bestelauto
       * https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/auto_en_vervoer/belastingen_op_auto_en_motor/motorrijtuigenbelasting/soort_motorrijtuig/bestelauto/
       */
      return bestelautoParticulier(params);

    case VehicleType["Bestelauto gehandicapte"]:
      /**
       * Bestelauto gehandicapte
       * https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/auto_en_vervoer/belastingen_op_auto_en_motor/motorrijtuigenbelasting/soort_motorrijtuig/bestelauto/bestelautotarief_voor_gehandicapte_personen
       */
      // @todo
      break;

    case VehicleType["Bestelauto ondernemer"]:
      /**
       * Bestelauto ondernemer
       * https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/auto_en_vervoer/belastingen_op_auto_en_motor/motorrijtuigenbelasting/soort_motorrijtuig/bestelauto/bestelautotarief_voor_ondernemers
       */
      return bestelautoOndernemer(params);
  }

  throw new NotImplementedError();
};

export default model;

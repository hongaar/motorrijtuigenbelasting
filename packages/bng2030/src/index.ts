import {
  BngVariant,
  InvalidArgument,
  NotImplementedError,
  Unit,
  VehicleType,
  type Model,
  type ModelOutput,
} from "@motorrijtuigenbelasting/core";
import { opcenten } from "@motorrijtuigenbelasting/mrb2023";

const kmTariefComponent = (variant: string) => (tarief: number) => {
  return {
    name: "Kilometertarief",
    description: `Kilometertarief variant ${variant}`,
    reference: {
      title: "Varianten voor tariefstructuur Betalen naar Gebruik",
      url: "https://www.rijksoverheid.nl/documenten/rapporten/2022/10/27/varianten-voor-tariefstructuur-betalen-naar-gebruik",
    },
    subtotal: tarief!,
    unit: Unit.euro_per_km,
  };
};

const model: Model = (params) => {
  const {
    // provincie,
    // brandstof,
    // elektrisch_of_waterstof,
    weight,
    vehicleType,
    bngVariant,
  } = params;
  const output: ModelOutput = [];

  if (typeof bngVariant === "undefined") {
    throw new InvalidArgument("bngVariant is missing");
  }

  switch (vehicleType) {
    case VehicleType.Personenauto:
    case VehicleType["Bestelauto gehandicapte"]:
    case VehicleType["Bestelauto particulier"]:
    case VehicleType["Bestelauto ondernemer"]:
      break;
    default:
      throw new NotImplementedError(
        "BNG is only available for Personenauto en Bestelauto"
      );
  }

  const kmTarief = kmTariefComponent(bngVariant);

  switch (params.bngVariant) {
    case BngVariant.V1a:
      /**
       * de mrb en de provinciale opcenten worden gevariabiliseerd en
       * budgetneutraal omgezet in een kilometertarief gelijk voor alle
       * personenauto’s en een tarief gelijk voor alle bestelauto’s.
       */
      output.push(
        kmTarief(vehicleType === VehicleType.Personenauto ? 0.0682 : 0.0416)
      );
      break;
    case BngVariant.V1b:
      /**
       * alleen het Rijksdeel mrb wordt gevariabiliseerd en budgetneutraal
       * omgezet in een kilometertarief. De provinciale opcenten gebaseerd op
       * gewicht blijven bestaan. Voor het overige is deze variant gelijk aan
       * V1a.
       */
      output.push(
        kmTarief(vehicleType === VehicleType.Personenauto ? 0.0464 : 0.0416)
      );
      output.push(...opcenten(output, params));
      break;
    case BngVariant.V1a_alt1:
      /**
       * gelijk aan variant V1a maar het tarief is dusdanig verhoogd dat in 2030
       * 2,5 Mton reductie aan CO2 resulteert t.o.v. de basispad. Er is dan geen
       * sprake meer van budgetneutraliteit.
       */
      output.push(
        kmTarief(vehicleType === VehicleType.Personenauto ? 0.1086 : 0.078)
      );
      break;
    case BngVariant.V1a_alt2:
      /**
       * gelijk aan variant V1a maar de eerste 3.000 kilometers zijn
       * vrijgesteld. Voor elke kilometer boven de 3.000 kilometer geldt
       * hierdoor een hoger tarief dan in variant V1a om dezelfde totale
       * inkomsten uit het kilometertarief en de overige autobelastingen te
       * kunnen genereren
       */
      break;

    default:
      throw new InvalidArgument("bngVariant has an invalid value");
  }

  if (bngVariant === BngVariant.V1b) {
    /**
     * De provinciale opcenten, gebaseerd op gewicht, blijven in de huidige vorm
     * bestaan
     */
    output.push();
  }

  return output;
};

export default model;

import { InvalidArgument } from "./errors.js";

export enum Province {
  "Drenthe" = "Drenthe",
  "Flevoland" = "Flevoland",
  "Friesland" = "Friesland",
  "Gelderland" = "Gelderland",
  "Groningen" = "Groningen",
  "Limburg" = "Limburg",
  "Noord-Brabant" = "Noord-Brabant",
  "Noord-Holland" = "Noord-Holland",
  "Overijssel" = "Overijssel",
  "Utrecht" = "Utrecht",
  "Zeeland" = "Zeeland",
  "Zuid-Holland" = "Zuid-Holland",
}

export enum VehicleType {
  "Personenauto" = "Personenauto",
  "Bestelauto ondernemer" = "Bestelauto ondernemer",
  "Bestelauto particulier" = "Bestelauto particulier",
  "Bestelauto gehandicapte" = "Bestelauto gehandicapte",
  "Motor" = "Motor",
  "Aanhangwagen/oplegger" = "Aanhangwagen/oplegger",
  "Kampeerauto" = "Kampeerauto",
  "Caravan, vouwwagen of woonwagen" = "Caravan, vouwwagen of woonwagen",
  "Autobus" = "Autobus",
  "Rijdende winkel" = "Rijdende winkel",
  "Handelaarskenteken" = "Handelaarskenteken",
  "Vrachtauto" = "Vrachtauto",
}

export enum PropulsionType {
  "Hybride" = "Hybride",
  "Elektrisch" = "Elektrisch",
  "Waterstof" = "Waterstof",
  "Benzine" = "Benzine",
  "Diesel" = "Diesel",
  "LPG3 en Aardgas" = "LPG3 en Aardgas",
  "LPG en overige (behalve elektriciteit en waterstof)" = "LPG en overige (behalve elektriciteit en waterstof)",
}

export type Propulsion = {
  type: PropulsionType;
  emission: number | null;
};

export type Params = {
  vehicleType: VehicleType;
  propulsions: Propulsion[];
  weight: number;
  province?: Province | null;
  mileage?: number;
};

export function containsPropulsionType(
  type: PropulsionType | PropulsionType[],
  propulsions: Propulsion[]
): boolean {
  if (Array.isArray(type)) {
    return type.some((t) => containsPropulsionType(t, propulsions));
  }

  return propulsions.some((propulsion) => propulsion.type === type);
}

export function highestPropulsionEmission(
  propulsions: Propulsion[]
): number | null {
  if (propulsions.some((propulsion) => propulsion.emission === null)) {
    return null;
  }

  return Math.max(
    ...propulsions.map((propulsion) => propulsion.emission as number)
  );
}

export function validateProvince(
  province?: Province | null
): asserts province is Province {
  if (typeof province === "undefined") {
    throw new InvalidArgument("province is missing");
  }
}

export function validatePropulsions(
  propulsions?: Propulsion[] | null
): asserts propulsions is [Propulsion, ...Propulsion[]] {
  if (
    typeof propulsions === "undefined" ||
    propulsions === null ||
    propulsions.length === 0 ||
    (propulsions[0] && !propulsions[0].type)
  ) {
    throw new InvalidArgument("propulsions is missing or empty");
  }
}

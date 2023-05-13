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
  co2Emission: number | null; //  g/km
};

export enum BngVariant {
  "V1a" = "V1a",
  "V1b" = "V1b",
  "V1a_alt1" = "V1a_alt1",
  "V1a_alt2" = "V1a_alt2",
  "V2" = "V2",
  "V2_alt1" = "V2_alt1",
  "V2_alt2" = "V2_alt2",
  "V3" = "V3",
}

export type Params = {
  vehicleType: VehicleType;
  propulsions: Propulsion[];
  weight: number;
  province?: Province | null;
  mileage?: number;

  // Special cases
  particulateMatterSurtax?: boolean | null;
  rentedForBusinessPurposes?: boolean | null;

  // Only for BNG
  bngVariant?: BngVariant;
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

export function containsOnlyPropulsionType(
  type: PropulsionType | PropulsionType[],
  propulsions: Propulsion[]
): boolean {
  if (Array.isArray(type)) {
    return type.some((t) => containsOnlyPropulsionType(t, propulsions));
  }

  return propulsions.every((propulsion) => propulsion.type === type);
}

export function highestPropulsionEmission(
  propulsions: Propulsion[]
): number | null {
  if (propulsions.some((propulsion) => propulsion.co2Emission === null)) {
    return null;
  }

  return Math.max(
    ...propulsions.map((propulsion) => propulsion.co2Emission as number)
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

export function validateMileage(
  mileage?: number | null
): asserts mileage is number {
  if (typeof mileage === "undefined" || mileage === null) {
    throw new InvalidArgument("mileage is missing or empty");
  }
}

export function validateBngVariant(
  bngVariant?: BngVariant | null
): asserts bngVariant is BngVariant {
  if (typeof bngVariant === "undefined") {
    throw new InvalidArgument("bngVariant is missing");
  }
}

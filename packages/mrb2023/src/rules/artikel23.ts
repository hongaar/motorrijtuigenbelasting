import {
  Period,
  PropulsionType,
  Unit,
  VehicleType,
  calculateTotal,
  containsPropulsionType,
  validatePropulsions,
  type ModelOutput,
  type Params,
} from "@motorrijtuigenbelasting/core";
import { taxAmountByWeight } from "@motorrijtuigenbelasting/mrb1995";
import { rateMap } from "../rates.js";

/**
 * Motorrijtuigenbelasting voor een personenauto
 */
export function artikel_23_1(output: ModelOutput, params: Params) {
  const { weight } = params;
  const { rates } = rateMap[VehicleType.Personenauto];
  const base = taxAmountByWeight({
    weight,
    rates,
  });

  output.push({
    name: "Motorrijtuigenbelasting",
    description: "Motorrijtuigenbelasting voor een personenauto",
    reference: {
      title: "Artikel 23, eerste lid, Wet op de motorrijtuigenbelasting 1994",
      url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23&lid=1&z=2023-01-01&g=2023-01-01",
    },
    subtotal: base,
    unit: Unit.euro_per_quarter,
  });
}

/**
 * Brandstoftoeslag voor een personenauto rijdend op diesel
 */
export function artikel_23_2_a(output: ModelOutput, params: Params) {
  const { propulsions, weight } = params;

  validatePropulsions(propulsions);

  const { surtaxes } = rateMap[VehicleType.Personenauto];

  if (containsPropulsionType([PropulsionType.Diesel], propulsions)) {
    const surtax = taxAmountByWeight({
      weight,
      rates: surtaxes?.[PropulsionType.Diesel] || [],
    });
    output.push({
      name: "Brandstoftoeslag",
      description: "Brandstoftoeslag voor een personenauto rijdend op diesel",
      reference: {
        title: "Artikel 23, tweede lid, Wet op de motorrijtuigenbelasting 1994",
        url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23&lid=2&z=2023-01-01&g=2023-01-01",
      },
      subtotal: surtax,
      unit: Unit.euro_per_quarter,
    });
  }
}

/**
 * Brandstoftoeslag voor een personenauto niet rijdend op benzine of diesel
 */
export function artikel_23_2_b(output: ModelOutput, params: Params) {
  const { propulsions, weight } = params;

  validatePropulsions(propulsions);

  const { surtaxes } = rateMap[VehicleType.Personenauto];

  if (
    containsPropulsionType(
      [PropulsionType["LPG en overige (behalve elektriciteit en waterstof)"]],
      propulsions
    )
  ) {
    const surtax = taxAmountByWeight({
      weight,
      rates:
        surtaxes?.[
          PropulsionType["LPG en overige (behalve elektriciteit en waterstof)"]
        ] || [],
    });
    output.push({
      name: "Brandstoftoeslag",
      description:
        "Brandstoftoeslag voor een personenauto niet rijdend op benzine of diesel",
      reference: {
        title: "Artikel 23, tweede lid, Wet op de motorrijtuigenbelasting 1994",
        url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23&lid=2&z=2023-01-01&g=2023-01-01",
      },
      subtotal: surtax,
      unit: Unit.euro_per_quarter,
    });
  }
}

/**
 * Brandstoftoeslag voor een personenauto rijdend op LPG3
 */
export function artikel_23_3(output: ModelOutput, params: Params) {
  const { propulsions, weight } = params;

  validatePropulsions(propulsions);

  const { surtaxes } = rateMap[VehicleType.Personenauto];

  if (
    containsPropulsionType([PropulsionType["LPG3 en Aardgas"]], propulsions)
  ) {
    const surtax = taxAmountByWeight({
      weight,
      rates: surtaxes?.[PropulsionType["LPG3 en Aardgas"]] || [],
    });
    output.push({
      name: "Brandstoftoeslag",
      description: "Brandstoftoeslag voor een personenauto rijdend op LPG3",
      reference: {
        title: "Artikel 23, derde lid, Wet op de motorrijtuigenbelasting 1994",
        url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23&lid=3&z=2023-01-01&g=2023-01-01",
      },
      subtotal: surtax,
      unit: Unit.euro_per_quarter,
    });
  }
}

/**
 * Fijnstoftoeslag voor een personenauto rijdend op diesel, zijnde 19%
 */
export function artikel_23_4(output: ModelOutput, params: Params) {
  const { propulsions } = params;

  validatePropulsions(propulsions);

  if (
    containsPropulsionType(PropulsionType.Diesel, propulsions) &&
    params.particulateMatterSurtax
  ) {
    output.push({
      name: "Fijnstoftoeslag",
      description:
        "Fijnstoftoeslag voor een personenauto rijdend op diesel, zijnde 19%",
      reference: {
        title: "Artikel 23, vierde lid, Wet op de motorrijtuigenbelasting 1994",
        url: "https://wetten.overheid.nl/jci1.3:c:BWBR0006324&hoofdstuk=IV&afdeling=2&artikel=23&lid=4&z=2023-01-01&g=2023-01-01",
      },
      subtotal:
        calculateTotal(output, { period: Period.quarter }).unrounded! * 0.19,
      unit: Unit.euro_per_quarter,
    });
  }
}

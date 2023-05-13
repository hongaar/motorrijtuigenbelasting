import { PropulsionType, VehicleType } from "@motorrijtuigenbelasting/core";
import type { Rate } from "@motorrijtuigenbelasting/mrb1995";

type RateMap = Record<VehicleType, Record<PropulsionType, Rate[]>>;

/**
 * Varianten voor tariefstructuur Betalen naar Gebruik
 * https://www.rijksoverheid.nl/documenten/rapporten/2022/10/27/varianten-voor-tariefstructuur-betalen-naar-gebruik
 */
export const rateMap_V2 = {
  [VehicleType.Personenauto]: {
    [PropulsionType.Benzine]: [
      {
        threshold: 0,
        fixedAmount: 0.027,
      },
      {
        threshold: 950,
        fixedAmount: 0.047,
      },
      {
        threshold: 1150,
        fixedAmount: 0.065,
      },
      {
        threshold: 1350,
        fixedAmount: 0.083,
      },
      {
        threshold: 1550,
        fixedAmount: 0.109,
      },
    ],
    [PropulsionType.Diesel]: [
      {
        threshold: 0,
        fixedAmount: 0.068,
      },
      {
        threshold: 950,
        fixedAmount: 0.078,
      },
      {
        threshold: 1150,
        fixedAmount: 0.089,
      },
      {
        threshold: 1350,
        fixedAmount: 0.098,
      },
      {
        threshold: 1550,
        fixedAmount: 0.117,
      },
    ],
    [PropulsionType.Hybride]: [
      {
        threshold: 0,
        fixedAmount: 0.029,
      },
      {
        threshold: 950,
        fixedAmount: 0.048,
      },
      {
        threshold: 1150,
        fixedAmount: 0.066,
      },
      {
        threshold: 1350,
        fixedAmount: 0.084,
      },
      {
        threshold: 1550,
        fixedAmount: 0.12,
      },
    ],
    [PropulsionType.Elektrisch]: [
      {
        threshold: 0,
        fixedAmount: 0.03,
      },
      {
        threshold: 950,
        fixedAmount: 0.046,
      },
      {
        threshold: 1150,
        fixedAmount: 0.063,
      },
      {
        threshold: 1350,
        fixedAmount: 0.08,
      },
      {
        threshold: 1550,
        fixedAmount: 0.113,
      },
    ],
  },
} as RateMap;

export const rateMap_V2_alt1 = {
  [VehicleType.Personenauto]: {
    [PropulsionType.Benzine]: [
      {
        threshold: 0,
        fixedAmount: 0.029,
      },
      {
        threshold: 950,
        fixedAmount: 0.048,
      },
      {
        threshold: 1150,
        fixedAmount: 0.065,
      },
      {
        threshold: 1350,
        fixedAmount: 0.082,
      },
      {
        threshold: 1550,
        fixedAmount: 0.107,
      },
    ],
    [PropulsionType.Diesel]: [
      {
        threshold: 0,
        fixedAmount: 0.06,
      },
      {
        threshold: 950,
        fixedAmount: 0.067,
      },
      {
        threshold: 1150,
        fixedAmount: 0.082,
      },
      {
        threshold: 1350,
        fixedAmount: 0.098,
      },
      {
        threshold: 1550,
        fixedAmount: 0.129,
      },
    ],
    [PropulsionType.Hybride]: [
      {
        threshold: 0,
        fixedAmount: 0.015,
      },
      {
        threshold: 950,
        fixedAmount: 0.015,
      },
      {
        threshold: 1150,
        fixedAmount: 0.018,
      },
      {
        threshold: 1350,
        fixedAmount: 0.027,
      },
      {
        threshold: 1550,
        fixedAmount: 0.061,
      },
    ],
    [PropulsionType.Elektrisch]: [
      {
        threshold: 0,
        fixedAmount: 0.014,
      },
      {
        threshold: 950,
        fixedAmount: 0.017,
      },
      {
        threshold: 1150,
        fixedAmount: 0.025,
      },
      {
        threshold: 1350,
        fixedAmount: 0.039,
      },
      {
        threshold: 1550,
        fixedAmount: 0.071,
      },
    ],
  },
} as RateMap;

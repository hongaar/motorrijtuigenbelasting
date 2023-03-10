import { PropulsionType, VehicleType } from "@motorrijtuigenbelasting/core";
import type { RateMap } from "@motorrijtuigenbelasting/mrb1995";

export const rateMap = {
  [VehicleType.Personenauto]: {
    /**
     * Wet op de motorrijtuigenbelasting 1994
     * Artikel 23
     * Geldig op 1-1-2023
     * https://wetten.overheid.nl/BWBR0006324/2023-01-01#HoofdstukIV
     */
    rates: [
      {
        threshold: 0,
        fixedAmount: 18.75,
      },
      {
        threshold: 600,
        fixedAmount: 25.44,
      },
      {
        threshold: 700,
        fixedAmount: 32.33,
      },
      {
        threshold: 800,
        fixedAmount: 42.2,
      },
      {
        threshold: 900,
        fixedAmount: 56.13,
        variable: {
          amount: 15.09,
        },
      },
      {
        threshold: 3300,
        fixedAmount: 414.29,
        variable: {
          amount: 10.48,
        },
      },
    ],
    surtaxes: {
      /**
       * Wet op de motorrijtuigenbelasting 1994
       * Artikel 23
       * Geldig op 1-1-2023
       * https://wetten.overheid.nl/BWBR0006324/2023-01-01#HoofdstukIV
       */
      [PropulsionType.Diesel]: [
        {
          threshold: 0,
          fixedAmount: 73.52,
        },
        {
          threshold: 600,
          fixedAmount: 87.02,
        },
        {
          threshold: 700,
          fixedAmount: 100.51,
        },
        {
          threshold: 800,
          fixedAmount: 114.25,
        },
        {
          threshold: 900,
          fixedAmount: 133.69,
          variable: {
            amount: 14.48,
          },
        },
      ],
    },
  },
} as RateMap;

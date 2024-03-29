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
       * Artikel 23, tweede lid
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
      /**
       * Wet op de motorrijtuigenbelasting 1994
       * Artikel 23, tweede lid
       * Geldig op 1-1-2023
       * https://wetten.overheid.nl/BWBR0006324/2023-01-01#HoofdstukIV
       */
      [PropulsionType["LPG en overige (behalve elektriciteit en waterstof)"]]: [
        {
          threshold: 0,
          fixedAmount: 86.25,
        },
        {
          threshold: 600,
          fixedAmount: 103.39,
        },
        {
          threshold: 700,
          fixedAmount: 120.54,
        },
        {
          threshold: 800,
          fixedAmount: 137.65,
        },
        {
          threshold: 900,
          fixedAmount: 150.36,
          variable: {
            amount: 15.92,
          },
        },
      ],
      /**
       * Wet op de motorrijtuigenbelasting 1994
       * Artikel 23, derde lid
       * Geldig op 1-1-2023
       * https://wetten.overheid.nl/BWBR0006324/2023-01-01#HoofdstukIV
       */
      [PropulsionType["LPG3 en Aardgas"]]: [
        {
          threshold: 0,
          fixedAmount: 0,
        },
        {
          threshold: 900,
          fixedAmount: 16.64,
          variable: {
            amount: 16.64,
          },
        },
      ],
    },
  },
  [VehicleType["Bestelauto ondernemer"]]: {
    /**
     * Wet op de motorrijtuigenbelasting 1994
     * Artikel 24b
     * Geldig op 1-1-2023
     * https://wetten.overheid.nl/BWBR0006324/2023-01-01#HoofdstukIV
     */
    rates: [
      {
        threshold: 0,
        fixedAmount: 45.42,
      },
      {
        threshold: 600,
        fixedAmount: 55.53,
        variable: {
          amount: 7.12,
        },
      },
      {
        threshold: 1100,
        fixedAmount: 91.24,
        variable: {
          amount: 7.65,
        },
      },
      {
        threshold: 2100,
        fixedAmount: 168.17,
        variable: {
          amount: 8.23,
        },
      },
      {
        threshold: 2800,
        fixedAmount: 222.62,
        variable: {
          amount: 1.87,
        },
      },
    ],
  },
} as RateMap;

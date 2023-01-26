import { Brandstof } from "../../params.js";

/**
 * Wet op de motorrijtuigenbelasting 1994
 * Artikel 23
 * Geldig op 1-1-2023
 * https://wetten.overheid.nl/BWBR0006324/2023-01-01#HoofdstukIV
 */
export const Model_2023_Tarieven_Benzine = [
  {
    threshold_kg: 0,
    vast_euro: 18.75,
  },
  {
    threshold_kg: 600,
    vast_euro: 25.44,
  },
  {
    threshold_kg: 700,
    vast_euro: 32.33,
  },
  {
    threshold_kg: 800,
    vast_euro: 42.2,
  },
  {
    threshold_kg: 900,
    vast_euro: 56.13,
    variabel: {
      euro: 15.09,
    },
  },
  {
    threshold_kg: 3300,
    vast_euro: 414.29,
    variabel: {
      euro: 10.48,
    },
  },
];

/**
 * Wet op de motorrijtuigenbelasting 1994
 * Artikel 23
 * Geldig op 1-1-2023
 * https://wetten.overheid.nl/BWBR0006324/2023-01-01#HoofdstukIV
 */
export const Model_2023_Tarieven_Diesel = [
  {
    threshold_kg: 0,
    vast_euro: 73.52,
  },
  {
    threshold_kg: 600,
    vast_euro: 87.02,
  },
  {
    threshold_kg: 700,
    vast_euro: 100.51,
  },
  {
    threshold_kg: 800,
    vast_euro: 114.25,
  },
  {
    threshold_kg: 900,
    vast_euro: 133.69,
    variabel: {
      euro: 14.48,
    },
  },
];

export const Model_2023_Tarieven = {
  [Brandstof.Benzine]: Model_2023_Tarieven_Benzine,
  [Brandstof.Diesel]: Model_2023_Tarieven_Diesel,
};

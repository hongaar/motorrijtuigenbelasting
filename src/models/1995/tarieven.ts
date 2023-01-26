import { Brandstof } from "../../params.js";

const euroGuldenWisselkoers = 2.20371;

/**
 * Wet op de motorrijtuigenbelasting 1994
 * Artikel 23
 * Geldig in 1995
 * Took some reverse engineering:
 * - https://zoek.officielebekendmakingen.nl/stb-1994-17.pdf
 * - https://zoek.officielebekendmakingen.nl/stb-1995-152.html
 */
export const Model_1995_Tarieven_Benzine = [
  {
    threshold_kg: 0,
    vast_euro: 31.95 / euroGuldenWisselkoers,
  },
  {
    threshold_kg: 600,
    vast_euro: 38.2 / euroGuldenWisselkoers,
  },
  {
    threshold_kg: 700,
    vast_euro: 44.95 / euroGuldenWisselkoers,
  },
  {
    threshold_kg: 800,
    vast_euro: 59.45 / euroGuldenWisselkoers,
  },
  {
    threshold_kg: 900,
    vast_euro: 75.2 / euroGuldenWisselkoers,
  },
  {
    threshold_kg: 1000,
    vast_euro: 100.95 / euroGuldenWisselkoers,
    variabel: {
      euro: 25.75 / euroGuldenWisselkoers,
    },
  },
];

/**
 * Wet op de motorrijtuigenbelasting 1994
 * Artikel 23
 * Geldig in 1995
 * Took some reverse engineering:
 * - https://zoek.officielebekendmakingen.nl/stb-1994-17.pdf
 * - https://zoek.officielebekendmakingen.nl/stb-1995-152.html
 */
export const Model_1995_Tarieven_Diesel = [
  {
    threshold_kg: 0,
    vast_euro: 87.5 / euroGuldenWisselkoers,
    variabel: {
      ondergrens: 500,
      euro: 17.25 / euroGuldenWisselkoers,
    },
  },
];

export const Model_1995_Tarieven = {
  [Brandstof.Benzine]: Model_1995_Tarieven_Benzine,
  [Brandstof.Diesel]: Model_1995_Tarieven_Diesel,
};

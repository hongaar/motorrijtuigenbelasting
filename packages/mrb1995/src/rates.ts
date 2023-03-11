import {
  Params,
  PropulsionType,
  VehicleType,
} from "@motorrijtuigenbelasting/core";

export type Rate = {
  threshold: number; // kg
  fixedAmount: number; // euro
  variable?: {
    amount: number; // euro
    threshold?: number; // kg
    interval?: number; // kg
  };
};

export type RateMap = Record<
  VehicleType,
  { rates: Rate[]; surtaxes?: Record<PropulsionType, Rate[]> }
>;

/**
 * De eigen massa van het motorrijtuig afgerond tot het naaste honderdtal
 * kilogrammen, met dien verstande dat 50 kg naar beneden wordt afgerond;
 * https://wetten.overheid.nl/BWBR0006324/2023-01-01
 */
function roundWeight(weight: number) {
  return Math.max(0, Math.round((weight - 1) / 100) * 100);
}

/**
 * Returns the correct tarief for the given weight
 */
function findRate({
  rates,
  roundedWeight,
}: {
  rates: Rate[];
  roundedWeight: number;
}) {
  if (Math.round(roundedWeight / 100) * 100 !== roundedWeight) {
    throw new Error("roundedWeight should be a multiple of 100");
  }

  return [...rates].reverse().find((tarief) => {
    return tarief.threshold <= roundedWeight;
  });
}

/**
 * Dit is de formule voor het berekening van de grondslag voor de
 * motorrijtuigenbelasting gebaseerd op de Wet op de motorrijtuigenbelasting
 * 1994
 */
export function taxAmountByWeight({
  rates,
  weight,
}: {
  weight: Params["weight"];
  rates: Rate[];
}) {
  const roundedWeight = roundWeight(weight);

  let amount: number;

  const rate = findRate({
    rates,
    roundedWeight,
  });

  if (!rate) {
    throw new Error("No rate found");
  }

  amount = rate.fixedAmount;

  if (rate.variable) {
    const factor = Math.ceil(
      (roundedWeight - (rate.variable.threshold || rate.threshold)) /
        (rate.variable.interval || 100)
    );
    const variable = Math.max(0, rate.variable.amount * factor);

    amount = amount + variable;
  }

  return amount;
}

const euroGuldenExchangeRate = 2.20371;

export const rateMap = {
  [VehicleType.Personenauto]: {
    /**
     * Wet op de motorrijtuigenbelasting 1994
     * Artikel 23
     * Geldig in 1995
     * Took some reverse engineering:
     * - https://zoek.officielebekendmakingen.nl/stb-1994-17.pdf
     * - https://zoek.officielebekendmakingen.nl/stb-1995-152.html
     */
    rates: [
      {
        threshold: 0,
        fixedAmount: 31.95 / euroGuldenExchangeRate,
      },
      {
        threshold: 600,
        fixedAmount: 38.2 / euroGuldenExchangeRate,
      },
      {
        threshold: 700,
        fixedAmount: 44.95 / euroGuldenExchangeRate,
      },
      {
        threshold: 800,
        fixedAmount: 59.45 / euroGuldenExchangeRate,
      },
      {
        threshold: 900,
        fixedAmount: 75.2 / euroGuldenExchangeRate,
      },
      {
        threshold: 1000,
        fixedAmount: 100.95 / euroGuldenExchangeRate,
        variable: {
          amount: 25.75 / euroGuldenExchangeRate,
        },
      },
    ],
    surtaxes: {
      /**
       * Wet op de motorrijtuigenbelasting 1994
       * Artikel 23
       * Geldig in 1995
       * Took some reverse engineering:
       * - https://zoek.officielebekendmakingen.nl/stb-1994-17.pdf
       * - https://zoek.officielebekendmakingen.nl/stb-1995-152.html
       */
      [PropulsionType.Diesel]: [
        {
          threshold: 0,
          fixedAmount: 87.5 / euroGuldenExchangeRate,
          variable: {
            threshold: 500,
            amount: 17.25 / euroGuldenExchangeRate,
          },
        },
      ],
    },
  },
} as RateMap;

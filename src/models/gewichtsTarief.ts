import type { ModelParams } from "../params.js";

type Tarief = {
  threshold_kg: number;
  vast_euro: number;
  variabel?: {
    euro: number;
    ondergrens?: number;
    per_kg?: number;
  };
};

/**
 * De eigen massa van het motorrijtuig afgerond tot het naaste honderdtal
 * kilogrammen, met dien verstande dat 50 kg naar beneden wordt afgerond;
 * https://wetten.overheid.nl/BWBR0006324/2023-01-01
 */
function rondGewichtAf(gewicht: number) {
  return Math.max(0, Math.round((gewicht - 1) / 100) * 100);
}

/**
 * Returns the correct tarief for the given weight
 */
function findTarief({
  tarieven,
  afgerondGewicht,
}: {
  tarieven: Tarief[];
  afgerondGewicht: number;
}) {
  if (Math.round(afgerondGewicht / 100) * 100 !== afgerondGewicht) {
    throw new Error("afgerondGewicht should be a multiple of 100");
  }

  return [...tarieven].reverse().find((tarief) => {
    return tarief.threshold_kg <= afgerondGewicht;
  });
}

/**
 * Dit is de formule voor het berekening van de grondslag voor de
 * motorrijtuigenbelasting gebaseerd op de Wet op de motorrijtuigenbelasting
 * 1994
 */
export function gewichtsTarief({
  tarieven,
  gewicht,
}: {
  gewicht: ModelParams["gewicht"];
  tarieven: Tarief[];
}) {
  const afgerondGewicht = rondGewichtAf(gewicht);

  let bedrag: number;

  const tarief = findTarief({
    tarieven,
    afgerondGewicht,
  });

  if (!tarief) {
    throw new Error("No tarief found");
  }

  bedrag = tarief.vast_euro;

  if (tarief.variabel) {
    const factor = Math.ceil(
      (afgerondGewicht - (tarief.variabel.ondergrens || tarief.threshold_kg)) /
        (tarief.variabel.per_kg || 100)
    );
    const variabel = Math.max(0, tarief.variabel.euro * factor);

    bedrag = bedrag + variabel;
  }

  return bedrag;
}
export type ModelOutputOnderdelen = {
  /**
   * Omschrijving van dit onderdeel.
   */
  omschrijving: string;

  /**
   * Wet referenties die van toepassing zijn op dit onderdeel.
   */
  referentie?: { titel: string; url: string };

  /**
   * Waarde van dit onderdeel, niet opgenomen in subtotaal.
   */
  waarde?: string;

  /**
   * De motorrijtuigenbelasting per tijdvak van 3 maanden in euro's voor dit
   * onderdeel, indien van toepassing.
   */
  subtotaal?: number;
}[];

export type ModelOutput = {
  onderdelen: ModelOutputOnderdelen;

  /**
   * Bedrag is de totale motorrijtuigenbelasting per tijdvak van 3 maanden in
   * euro's.
   */
  bedrag: number;
};

export function berekenOutput(onderdelen: ModelOutputOnderdelen) {
  const sum = onderdelen.reduce((acc, curr) => acc + (curr.subtotaal || 0), 0);
  return {
    onderdelen,
    bedrag: Math.floor(sum),
    _precise: sum,
  };
}

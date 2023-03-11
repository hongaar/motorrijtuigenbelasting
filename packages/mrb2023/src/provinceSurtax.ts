import { InvalidArgument, Province } from "@motorrijtuigenbelasting/core";

// https://opendata.cbs.nl/statline/#/CBS/nl/dataset/80889NED/table
export const percentageData = {
  [Province.Drenthe]: 0.92,
  [Province.Flevoland]: 0.822,
  [Province.Friesland]: 0.87,
  [Province.Gelderland]: 0.93,
  [Province.Groningen]: 0.957,
  [Province.Limburg]: 0.806,
  [Province["Noord-Brabant"]]: 0.808,
  [Province["Noord-Holland"]]: 0.679,
  [Province.Overijssel]: 0.799,
  [Province.Utrecht]: 0.794,
  [Province.Zeeland]: 0.823,
  [Province["Zuid-Holland"]]: 0.957,
};

export function provinceSurtaxPercentage(province: Province | null): number {
  /**
   * De houders van motorrijtuigen die niet hier te lande wonen of gevestigd
   * zijn, maar die wel aan de heffing van motorrijtuigenbelasting zijn
   * onderworpen, worden voor de heffing van opcenten geacht te wonen of te zijn
   * gevestigd in een provincie die het laagste aantal opcenten heft.
   * http://wetten.overheid.nl/jci1.3:c:BWBR0005645&titeldeel=IV&hoofdstuk=XV&paragraaf=2&artikel=222a&lid=4
   */
  if (province === null) {
    return Math.min(...Object.values(percentageData));
  }

  if (!(province in percentageData)) {
    throw new InvalidArgument(province);
  }

  return percentageData[province];
}

import { InvalidParameters } from "../../errors.js";
import { Provincie } from "../../params.js";

// https://opendata.cbs.nl/statline/#/CBS/nl/dataset/80889NED/table
export const data = {
  [Provincie.Drenthe]: 0.92,
  [Provincie.Flevoland]: 0.822,
  [Provincie.Friesland]: 0.87,
  [Provincie.Gelderland]: 0.93,
  [Provincie.Groningen]: 0.957,
  [Provincie.Limburg]: 0.806,
  [Provincie["Noord-Brabant"]]: 0.808,
  [Provincie["Noord-Holland"]]: 0.679,
  [Provincie.Overijssel]: 0.799,
  [Provincie.Utrecht]: 0.794,
  [Provincie.Zeeland]: 0.823,
  [Provincie["Zuid-Holland"]]: 0.957,
};

export function Model_2023_Opcenten(provincie: Provincie | null): number {
  /**
   * De houders van motorrijtuigen die niet hier te lande wonen of gevestigd
   * zijn, maar die wel aan de heffing van motorrijtuigenbelasting zijn
   * onderworpen, worden voor de heffing van opcenten geacht te wonen of te zijn
   * gevestigd in een provincie die het laagste aantal opcenten heft.
   * http://wetten.overheid.nl/jci1.3:c:BWBR0005645&titeldeel=IV&hoofdstuk=XV&paragraaf=2&artikel=222a&lid=4
   */
  if (provincie === null) {
    return Math.min(...Object.values(data));
  }

  if (provincie in data) {
    return data[provincie];
  }

  throw new InvalidParameters(`provincie: ${provincie}`);
}

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
  return provincie === null ? 0 : data[provincie];
}

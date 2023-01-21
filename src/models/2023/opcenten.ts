import { Provincie } from "../../berekenMrb.js";

// https://opendata.cbs.nl/statline/#/CBS/nl/dataset/80889NED/table
export function Model_2023_Opcenten(provincie: Provincie | null): number {
  switch (provincie) {
    case null:
      return 0;
    case Provincie.Drenthe:
      return 0.92;
    case Provincie.Flevoland:
      return 0.822;
    case Provincie.Friesland:
      return 0.87;
    case Provincie.Gelderland:
      return 0.93;
    case Provincie.Groningen:
      return 0.957;
    case Provincie.Limburg:
      return 0.806;
    case Provincie["Noord-Brabant"]:
      return 0.808;
    case Provincie["Noord-Holland"]:
      return 0.679;
    case Provincie.Overijssel:
      return 0.799;
    case Provincie.Utrecht:
      return 0.794;
    case Provincie.Zeeland:
      return 0.823;
    case Provincie["Zuid-Holland"]:
      return 0.957;
  }
}

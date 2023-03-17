import {
  containsPropulsionType,
  NotImplementedError,
  Params,
  Propulsion,
  PropulsionType,
  VehicleType,
} from "@motorrijtuigenbelasting/core";
import fetch from "cross-fetch";

const BASE_SERVICE_URL = "https://opendata.rdw.nl/resource/m9d7-ebf2.json";
const PROPULSIONS_SERVICE_URL =
  "https://opendata.rdw.nl/resource/8ys7-d773.json";
const BODYTYPE_SERVICE_URL = "https://opendata.rdw.nl/resource/vezc-m2t6.json";

class InvalidRdwData extends Error {
  constructor() {
    super();
    this.message = "RDW data is invalid or incomplete";
    this.name = "InvalidRdwData";
  }
}

class VehicleIdNotFound extends Error {
  constructor() {
    super();
    this.message = "Vehicle ID not found";
    this.name = "VehicleIdNotFound";
  }
}

export type BaseData = {
  kenteken: string;
  europese_voertuigcategorie: string;
  massa_ledig_voertuig: string;
  datum_eerste_toelating_dt: string;

  vervaldatum_apk?: string;
  bruto_bpm?: string;
  aantal_zitplaatsen?: string;
  cilinderinhoud?: string;
  toegestane_maximum_massa_voertuig?: string;
  maximum_massa_trekken_ongeremd?: string;
  maximum_trekken_massa_geremd?: string;
  catalogusprijs?: string;
  plaats_chassisnummer?: string;
  type?: string;
  type_gasinstallatie?: string;
  typegoedkeuringsnummer?: string;
  variant?: string;
  uitvoering?: string;
  aantal_rolstoelplaatsen?: string;
  maximum_ondersteunende_snelheid?: string;
  vervaldatum_apk_dt?: string;
  hoogte_voertuig?: string;
  zuinigheidsclassificatie?: string;
  voertuigsoort?: string;
  merk?: string;
  handelsbenaming?: string;
  datum_tenaamstelling?: string;
  inrichting?: string;
  eerste_kleur?: string;
  tweede_kleur?: string;
  aantal_cilinders?: string;
  massa_rijklaar?: string;
  datum_eerste_toelating?: string;
  datum_eerste_tenaamstelling_in_nederland?: string;
  wacht_op_keuren?: string;
  wam_verzekerd?: string;
  aantal_deuren?: string;
  aantal_wielen?: string;
  afstand_hart_koppeling_tot_achterzijde_voertuig?: string;
  afstand_voorzijde_voertuig_tot_hart_koppeling?: string;
  lengte?: string;
  breedte?: string;
  technische_max_massa_voertuig?: string;
  volgnummer_wijziging_eu_typegoedkeuring?: string;
  vermogen_massarijklaar?: string;
  wielbasis?: string;
  export_indicator?: string;
  openstaande_terugroepactie_indicator?: string;
  taxi_indicator?: string;
  maximum_massa_samenstelling?: string;
  jaar_laatste_registratie_tellerstand?: string;
  tellerstandoordeel?: string;
  code_toelichting_tellerstandoordeel?: string;
  tenaamstellen_mogelijk?: string;
  datum_tenaamstelling_dt?: string;
  datum_eerste_tenaamstelling_in_nederland_dt?: string;
  api_gekentekende_voertuigen_assen?: string;
  api_gekentekende_voertuigen_brandstof?: string;
  api_gekentekende_voertuigen_carrosserie?: string;
  api_gekentekende_voertuigen_carrosserie_specifiek?: string;
  api_gekentekende_voertuigen_voertuigklasse?: string;
};

export type PropulsionData = {
  kenteken: string;
  brandstof_volgnummer: string;
  brandstof_omschrijving: string;
  co2_uitstoot_gecombineerd: string;

  brandstofverbruik_buiten?: string;
  brandstofverbruik_gecombineerd?: string;
  brandstofverbruik_stad?: string;
  geluidsniveau_rijdend?: string;
  geluidsniveau_stationair?: string;
  emissiecode_omschrijving?: string;
  milieuklasse_eg_goedkeuring_licht?: string;
  uitstoot_deeltjes_licht?: string;
  uitstoot_deeltjes_zwaar?: string;
  nettomaximumvermogen?: string;
  toerental_geluidsniveau?: string;
  uitlaatemissieniveau?: string;
};

export type BodyData = {
  kenteken: string;
  carrosserie_volgnummer: string;
  carrosserietype: string;
  type_carrosserie_europese_omschrijving: string;
};

export type RdwData = {
  base: BaseData;
  propulsions: PropulsionData[];
  body: BodyData;
};

/**
 * Voertuigcategorie
 *
 * Europese voertuigcategorie, gevolgd door de nationale voertuigsoort zoals
 * deze staat geregistreerd in het kentekenregister. De nationale voertuigsoort
 * is afgeleid van de Europese voertuigcategorie.
 * De RDW onderscheidt momenteel de volgende voertuigsoorten:
 *
 * M1
 *  Personenauto
 * N1, N2, N3
 *  Bedrijfsauto
 * M2, M3
 *  Bus
 * L3e, L4e
 *  Motorfiets
 * L5e, L7e
 *  Driewielig motorrijtuig
 * L1e, L2e, L6e
 *  Bromfiets
 * O1, O2, O3, O4
 *  Aanhangwagen (Oplegger)
 * T, C, U, Z
 *  Landbouw- of bosbouwtrekker
 * R, S
 *  Landbouw- of bosbouwtrekker Landbouw- of bosbouw AHW of VGU
 *
 * Een 'G' achter de voertuigcategorie is de aanduiding voor 'Geländefahrzeug'.
 * Een voertuig met de toevoeging ‘G’ achter de voertuigcategorie is een
 * voertuig dat gebouwd is als ‘terreinvoertuig’. Onder ‘terreinvoertuig’ wordt
 * verstaan een voertuig van categorie M of N met specifieke technische
 * kenmerken waardoor het buiten de normale wegen kan worden gebruikt.
 */
export function toVehicleType(rdwData: RdwData): VehicleType {
  switch (rdwData.base.europese_voertuigcategorie) {
    case "M1":
      return VehicleType.Personenauto;

    case "N1":
    case "N2":
    case "N3":
      /**
       * @todo is this correct?
       */
      if (rdwData.body.carrosserietype === "BB") {
        return VehicleType["Bestelauto ondernemer"];
      }
  }

  throw new NotImplementedError();
}

export function toWeight(rdwData: RdwData): number {
  return Number(rdwData.base.massa_ledig_voertuig);
}

export function toPropulsionType(
  base: BaseData,
  propulsion: PropulsionData
): PropulsionType {
  switch (propulsion.brandstof_omschrijving) {
    case "Diesel":
      return PropulsionType.Diesel;
    case "Benzine":
      return PropulsionType.Benzine;
    case "Elektrisch":
      return PropulsionType.Elektrisch;
    case "Waterstof":
      return PropulsionType.Waterstof;
    case "Hybride":
      return PropulsionType.Hybride;
    case "LPG":
      // @todo add 115R-installatie
      const LPG3 = ["G3 gasinstallatie", "Af-fabriek gasinstallatie"];
      if (base.type_gasinstallatie && LPG3.includes(base.type_gasinstallatie)) {
        return PropulsionType["LPG3 en Aardgas"];
      } else {
        return PropulsionType[
          "LPG en overige (behalve elektriciteit en waterstof)"
        ];
      }
    default:
      throw new NotImplementedError();
  }
}

export function toPropulsions(rdwData: RdwData): Propulsion[] {
  const { base, propulsions } = rdwData;

  if (propulsions.length === 0) {
    // No Flintmobiles
    throw new InvalidRdwData();
  }

  return propulsions.map((propulsion) => ({
    type: toPropulsionType(base, propulsion),
    co2Emission: Number(propulsion.co2_uitstoot_gecombineerd) || null,
  }));
}

/**
 * Is op uw motorrijtuig de fijnstoftoeslag van toepassing?
 *
 * De fijnstoftoeslag is van toepassing wanneer:
 * - de fijnstofuitstoot hoger is dan 0,005 g/km, of
 * - de fijnstofuitstoot hoger is dan 0,01 g/kWh
 * - bij het motorrijtuig vermeld staat dat het affabriek roetfilter verwijderd
 *   is
 * - van het motorrijtuig geen uitstootgegevens bekend zijn en het
 *   motorrijtuig een datum eerste toelating heeft van vóór 1 september 2009
 *
 * Deze regels gelden voor personenauto’s en bestelauto’s die op diesel rijden.
 *
 * Voor bestelauto’s komt er 1 regel bij:
 * - De bestelauto moet minimaal 12 jaar oud zijn bij het begin van het tijdvak
 *   waarover de fijnstoftoeslag geheven gaat worden.
 *
 * @todo this should be moved to mrb{revision} as it could change yoy
 */
export function toParticulateMatterSurtax(rdwData: RdwData): boolean | null {
  if (!containsPropulsionType(PropulsionType.Diesel, toPropulsions(rdwData))) {
    return null;
  }

  /**
   * @todo De bestelauto moet minimaal 12 jaar oud zijn bij het begin van het
   * tijdvak waarover de fijnstoftoeslag geheven gaat worden.
   */

  const diesel = rdwData.propulsions.find(
    (propulsion) =>
      toPropulsionType(rdwData.base, propulsion) === PropulsionType.Diesel
  ) as PropulsionData;

  if (
    Number(diesel.uitstoot_deeltjes_licht) > 0.005 ||
    Number(diesel.uitstoot_deeltjes_zwaar) > 0.01
  ) {
    return true;
  }

  /**
   * @todo bij het motorrijtuig vermeld staat dat het affabriek roetfilter
   * verwijderd is
   */

  if (
    typeof diesel.uitstoot_deeltjes_licht === "undefined" &&
    typeof diesel.uitstoot_deeltjes_zwaar === "undefined" &&
    toDateOfFirstAdmission(rdwData) < new Date("2009-09-01T00:00:00.000'")
  ) {
    return true;
  }

  return false;
}

export function toDateOfFirstAdmission(rdwData: RdwData): Date {
  return new Date(rdwData.base.datum_eerste_toelating_dt);
}

export function sanitizeVehicleId(vehicleId: string) {
  return vehicleId.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

export async function fetchRdwData(vehicleId: string, appToken: string) {
  vehicleId = sanitizeVehicleId(vehicleId);

  async function fetchRdwUrl(url: string) {
    url = `${url}?kenteken=${vehicleId}`;
    const headers = {
      "X-App-Token": appToken,
    };

    const response = await fetch(url, { headers });

    return (await response.json()) as any[];
  }

  function validateResponse(response: any) {
    if (response.length === 0) {
      throw new VehicleIdNotFound();
    }

    if (response.error === true) {
      throw new Error(response.message);
    }
  }

  const base = await fetchRdwUrl(BASE_SERVICE_URL);
  validateResponse(base);

  const propulsions = await fetchRdwUrl(PROPULSIONS_SERVICE_URL);
  validateResponse(propulsions);

  const body = await fetchRdwUrl(BODYTYPE_SERVICE_URL);
  validateResponse(body);

  return {
    base: base[0] as BaseData,
    propulsions: propulsions as PropulsionData[],
    body: body[0] as BodyData,
  };
}

export function rdwDataToParams(rdwData: RdwData): Params {
  return {
    vehicleType: toVehicleType(rdwData),
    weight: toWeight(rdwData),
    propulsions: toPropulsions(rdwData),
    particulateMatterSurtax: toParticulateMatterSurtax(rdwData),
  };
}

export async function vehicleIdToParams(id: string, appToken: string) {
  const rdwData = await fetchRdwData(id, appToken);

  return rdwDataToParams(rdwData);
}

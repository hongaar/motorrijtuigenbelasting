import { InvalidRdwData, NotImplementedError } from "./errors.js";
import { Brandstof, Voertuigtype } from "./params.js";

export type KentekenData = {
  kenteken: string;
  europese_voertuigcategorie: string;
  massa_ledig_voertuig: string;

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
  datum_eerste_toelating_dt?: string;
  datum_eerste_tenaamstelling_in_nederland_dt?: string;
  api_gekentekende_voertuigen_assen?: string;
  api_gekentekende_voertuigen_brandstof?: string;
  api_gekentekende_voertuigen_carrosserie?: string;
  api_gekentekende_voertuigen_carrosserie_specifiek?: string;
  api_gekentekende_voertuigen_voertuigklasse?: string;
};

export type BrandstofData = {
  kenteken: string;
  brandstof_volgnummer: string;
  brandstof_omschrijving: string;

  brandstofverbruik_buiten?: string;
  brandstofverbruik_gecombineerd?: string;
  brandstofverbruik_stad?: string;
  co2_uitstoot_gecombineerd?: string;
  geluidsniveau_rijdend?: string;
  geluidsniveau_stationair?: string;
  emissiecode_omschrijving?: string;
  milieuklasse_eg_goedkeuring_licht?: string;
  nettomaximumvermogen?: string;
  toerental_geluidsniveau?: string;
  uitlaatemissieniveau?: string;
};

export type RdwData = {
  basis: KentekenData;
  brandstof: BrandstofData[];
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
function toVoertuigType(rdwData: RdwData) {
  switch (rdwData.basis.europese_voertuigcategorie) {
    case "M1":
      return Voertuigtype.Personenauto;

    case "N1":
      // @todo: ??
      return Voertuigtype["Bestelauto ondernemer"];

    case "N2":
    case "N3":
      // @todo: ??
      return Voertuigtype.Vrachtauto;

    default:
      throw new NotImplementedError();
  }
}

function toGewicht(rdwData: RdwData) {
  return Number(rdwData.basis.massa_ledig_voertuig);
}

function toBrandstof(rdwData: RdwData) {
  const { brandstof } = rdwData;

  if (brandstof.length === 0) {
    throw new InvalidRdwData();
  }

  //   const sortedBrandstoffen = [...brandstof].sort((a, b) =>
  //     Number(a.brandstof_volgnummer) > Number(b.brandstof_volgnummer) ? 1 : -1
  //   );

  return Brandstof.Benzine;
}

function toElektrischOfWaterstof(rdwData: RdwData) {
  const { brandstof } = rdwData;

  if (brandstof.length === 0) {
    throw new InvalidRdwData();
  }

  return false;
}

export function rdwDataToParams(rdwData: RdwData) {
  return {
    voertuigtype: toVoertuigType(rdwData),
    gewicht: toGewicht(rdwData),
    brandstof: toBrandstof(rdwData),
    elektrisch_of_waterstof: toElektrischOfWaterstof(rdwData),
  };
}

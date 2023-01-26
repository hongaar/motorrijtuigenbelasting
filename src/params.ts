export type ModelParams = {
  /**
   * "In welke provincie woont u?"
   *
   * Indien "Woont u in Nederland?" op "Nee" staat, dan is dit veld "null"
   */
  provincie: Provincie | null;

  /**
   * "Voor welk soort motorrijtuig wilt u een berekening maken?"
   */
  voertuigtype: Voertuigtype;

  /**
   * "Rijdt uw personenauto volledig en uitsluitend op elektriciteit of
   * waterstof?"
   */
  elektrisch_of_waterstof: boolean;

  /**
   * "Op welke brandstof rijdt uw personenauto?"
   *
   * Indien "elektrisch_of_waterstof" op "true", dan is dit veld "null" of
   * "undefined"
   */
  brandstof?: Brandstof | null;

  /**
   * "Is op uw motorrijtuig de fijnstoftoeslag van toepassing?"
   */
  fijnstoftoeslag?: boolean;

  /**
   * "Wat is de gewichtsklasse van uw personenauto?"
   *
   * Hebt u een papieren kentekenbewijs? Dan staat het gewicht van uw
   * motorrijtuig in de rubriek 'Massa ledig voertuig'.
   *
   * Hebt u een kentekencard, en is de rubriek 'Massa rijklaar' ingevuld? Dan
   * bepaalt u het gewicht van uw motorrijtuig door van de massa rijklaar 100 kg
   * af te trekken.
   */
  gewicht: Gewichtsklasse | number;

  /**
   * Reservering voor betalen naar gebruik
   */
  km_per_jaar?: number;
};

export enum Provincie {
  "Drenthe" = "Drenthe",
  "Flevoland" = "Flevoland",
  "Friesland" = "Friesland",
  "Gelderland" = "Gelderland",
  "Groningen" = "Groningen",
  "Limburg" = "Limburg",
  "Noord-Brabant" = "Noord-Brabant",
  "Noord-Holland" = "Noord-Holland",
  "Overijssel" = "Overijssel",
  "Utrecht" = "Utrecht",
  "Zeeland" = "Zeeland",
  "Zuid-Holland" = "Zuid-Holland",
}

export enum Voertuigtype {
  "Personenauto" = "Personenauto",
  "Personenauto met een CO2-uitstoot van 0 gr/km" = "Personenauto met een CO2-uitstoot van 0 gr/km",
  "Personenauto met een CO2-uitstoot van 1 t/m 50 gr/km" = "Personenauto met een CO2-uitstoot van 1 t/m 50 gr/km",
  "Bestelauto ondernemer" = "Bestelauto ondernemer",
  "Bestelauto particulier" = "Bestelauto particulier",
  "Bestelauto gehandicapte" = "Bestelauto gehandicapte",
  "Motor" = "Motor",
  "Aanhangwagen/oplegger" = "Aanhangwagen/oplegger",
  "Kampeerauto" = "Kampeerauto",
  "Caravan, vouwwagen of woonwagen" = "Caravan, vouwwagen of woonwagen",
  "Autobus" = "Autobus",
  "Rijdende winkel" = "Rijdende winkel",
  "Handelaarskenteken" = "Handelaarskenteken",
  "Vrachtauto" = "Vrachtauto",
}

export enum Brandstof {
  "Benzine" = "Benzine",
  "Diesel" = "Diesel",
  "LPG3 en Aardgas" = "LPG3 en Aardgas",
  "LPG en overige (behalve elektriciteit en waterstof)" = "LPG en overige (behalve elektriciteit en waterstof)",
}

export enum Gewichtsklasse {
  "1 t/m 550" = 550,
  "551 t/m 650" = 650,
  "651 t/m 750" = 750,
  "751 t/m 850" = 850,
  "851 t/m 950" = 950,
  "951 t/m 1050" = 1050,
  "1051 t/m 1150" = 1150,
  "1151 t/m 1250" = 1250,
  "1251 t/m 1350" = 1350,
  "1351 t/m 1450" = 1450,
  "1451 t/m 1550" = 1550,
  "1551 t/m 1650" = 1650,
  "1651 t/m 1750" = 1750,
  "1751 t/m 1850" = 1850,
  "1851 t/m 1950" = 1950,
  "1951 t/m 2050" = 2050,
  "2051 t/m 2150" = 2150,
  "2151 t/m 2250" = 2250,
  "2251 t/m 2350" = 2350,
  "2351 t/m 2450" = 2450,
  "2451 t/m 2550" = 2550,
  "2551 t/m 2650" = 2650,
  "2651 t/m 2750" = 2750,
  "2751 t/m 2850" = 2850,
  "2851 t/m 2950" = 2950,
  "2951 t/m 3050" = 3050,
  "3051 t/m 3150" = 3150,
  "3151 t/m 3250" = 3250,
  "3251 t/m 3350" = 3350,
  "3351 t/m 3450" = 3450,
  "3451 t/m 3550" = 3550,
  "3551 t/m 3650" = 3650,
  "3651 t/m 3750" = 3750,
  "3751 t/m 3850" = 3850,
  "3851 t/m 3950" = 3950,
  "3951 t/m 4050" = 4050,
  "4051 t/m 4150" = 4150,
  "4151 t/m 4250" = 4250,
  "4251 t/m 4350" = 4350,
  "4351 t/m 4450" = 4450,
  "4451 t/m 4550" = 4550,
  "4551 t/m 4650" = 4650,
  "4651 t/m 4750" = 4750,
  "4751 t/m 4850" = 4850,
  "4851 t/m 4950" = 4950,
  "4951 t/m 5050" = 5050,
  "5051 t/m 5150" = 5150,
  "5151 t/m 5250" = 5250,
  "5251 t/m 5350" = 5350,
  "5351 t/m 5450" = 5450,
  "5451 t/m 5550" = 5550,
  "5551 t/m 5650" = 5650,
  "5651 t/m 5750" = 5750,
  "5751 t/m 5850" = 5850,
  "5851 t/m 5950" = 5950,
  "5951 t/m 6050" = 6050,
  "6051 t/m 6150" = 6150,
  "6151 t/m 6250" = 6250,
  "6251 t/m 6350" = 6350,
  "6351 t/m 6450" = 6450,
  "6451 t/m 6550" = 6550,
  "6551 t/m 6650" = 6650,
  "6651 t/m 6750" = 6750,
  "6751 t/m 6850" = 6850,
  "6851 t/m 6950" = 6950,
  "6951 t/m 7050" = 7050,
  "7051 t/m 7150" = 7150,
  "7151 t/m 7250" = 7250,
  "7251 t/m 7350" = 7350,
  "7351 t/m 7450" = 7450,
  "7451 t/m 7550" = 7550,
  "7551 t/m 7650" = 7650,
  "7651 t/m 7750" = 7750,
  "7751 t/m 7850" = 7850,
  "7851 t/m 7950" = 7950,
  "7951 t/m 8050" = 8050,
  "8051 t/m 8150" = 8150,
  "8151 t/m 8250" = 8250,
  "8251 t/m 8350" = 8350,
  "8351 t/m 8450" = 8450,
  "8451 t/m 8550" = 8550,
  "8551 t/m 8650" = 8650,
  "8651 t/m 8750" = 8750,
  "8751 t/m 8850" = 8850,
  "8851 t/m 8950" = 8950,
  "8951 t/m 9050" = 9050,
  "9051 t/m 9150" = 9150,
  "9151 t/m 9250" = 9250,
  "9251 t/m 9350" = 9350,
  "9351 t/m 9450" = 9450,
  "9451 t/m 9550" = 9550,
  "9551 t/m 9650" = 9650,
  "9651 t/m 9750" = 9750,
  "9751 t/m 9850" = 9850,
  "9851 t/m 9950" = 9950,
  "9951 t/m 10050" = 10050,
  "10051 t/m 10150" = 10150,
  "10151 t/m 10250" = 10250,
  "10251 t/m 10350" = 10350,
  "10351 t/m 10450" = 10450,
  "10451 t/m 10550" = 10550,
  "10551 t/m 10650" = 10650,
  "10651 t/m 10750" = 10750,
  "10751 t/m 10850" = 10850,
  "10851 t/m 10950" = 10950,
  "10951 t/m 11050" = 11050,
  "11051 t/m 11150" = 11150,
  "11151 t/m 11250" = 11250,
  "11251 t/m 11350" = 11350,
  "11351 t/m 11450" = 11450,
  "11451 t/m 11550" = 11550,
  "11551 t/m 11650" = 11650,
  "11651 t/m 11750" = 11750,
  "11751 t/m 11850" = 11850,
  "11851 t/m 11950" = 11950,
  "11951 t/m 12050" = 12050,
  "12051 t/m 12150" = 12150,
  "12151 t/m 12250" = 12250,
  "12251 t/m 12350" = 12350,
  "12351 t/m 12450" = 12450,
  "12451 t/m 12550" = 12550,
  "12551 t/m 12650" = 12650,
  "12651 t/m 12750" = 12750,
  "12751 t/m 12850" = 12850,
  "12851 t/m 12950" = 12950,
  "12951 t/m 13050" = 13050,
  "13051 t/m 13150" = 13150,
  "13151 t/m 13250" = 13250,
  "13251 t/m 13350" = 13350,
  "13351 t/m 13450" = 13450,
  "13451 t/m 13550" = 13550,
  "13551 t/m 13650" = 13650,
  "13651 t/m 13750" = 13750,
  "13751 t/m 13850" = 13850,
  "13851 t/m 13950" = 13950,
  "13951 t/m 14050" = 14050,
  "14051 t/m 14150" = 14150,
  "14151 t/m 14250" = 14250,
  "14251 t/m 14350" = 14350,
  "14351 t/m 14450" = 14450,
  "14451 t/m 14550" = 14550,
  "14551 t/m 14650" = 14650,
  "14651 t/m 14750" = 14750,
  "14751 t/m 14850" = 14850,
  "14851 t/m 14950" = 14950,
  "14951 t/m 15050" = 15050,
  "15051 en zwaarder" = Infinity,
}

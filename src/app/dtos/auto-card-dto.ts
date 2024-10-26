export enum Schaltung {
    HANDSCHALTUNG = 'Handschaltung',
    AUTOMAT = 'Automat'
  }
  
  export enum Kategorie {
    SUV = 'SUV',
    MINIVAN = 'Minivan',
    KLEINBUS = 'Kleinbus'
  }
  
  export interface AutoCardDto {
    id: number;
    name: string;
    sitze: number;
    handschaltung: Schaltung;
    kategorie: Kategorie;
    masseInnen: string;
    masseAussen: string;
    preis1Tag: number;
    preisWoche: number;
  }